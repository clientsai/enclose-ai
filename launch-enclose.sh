#!/bin/bash

# Enclose.AI Launch Script with Unique Ports
# Generated with unique ports to avoid conflicts with other services

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Unique port configuration
# Using randomized ports in the 40000-49999 range to avoid conflicts
NEXT_PORT=47832
NEXT_PORT_HTTPS=47833

echo -e "${BLUE}╔══════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║          ${GREEN}Enclose.AI Development Server${BLUE}              ║${NC}"
echo -e "${BLUE}║          ${YELLOW}Payment Infrastructure Platform${BLUE}            ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════╝${NC}"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js first.${NC}"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed. Please install npm first.${NC}"
    exit 1
fi

echo -e "${BLUE}📦 Checking dependencies...${NC}"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📥 Installing dependencies...${NC}"
    npm install
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo -e "${YELLOW}⚠️  Warning: .env.local file not found${NC}"
    echo -e "${YELLOW}   Creating template .env.local file...${NC}"

    cat > .env.local << 'EOF'
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# OAuth Configuration
STRIPE_CLIENT_ID=your_stripe_client_id

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:47832
ENCRYPTION_KEY=your_32_character_encryption_key_here

# Clients.AI Configuration (Optional)
CLIENTS_AI_WEBHOOK_URL=http://localhost:3000
CLIENTS_AI_WEBHOOK_SECRET=your_webhook_secret
EOF

    echo -e "${GREEN}✅ Created template .env.local file${NC}"
    echo -e "${YELLOW}   Please update it with your actual configuration values${NC}"
fi

# Check if ports are available
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        return 1
    else
        return 0
    fi
}

echo -e "${BLUE}🔍 Checking port availability...${NC}"

# Find available port if default is taken
while ! check_port $NEXT_PORT; do
    echo -e "${YELLOW}⚠️  Port $NEXT_PORT is in use, trying next port...${NC}"
    NEXT_PORT=$((NEXT_PORT + 1))
done

echo -e "${GREEN}✅ Port $NEXT_PORT is available${NC}"

# Build the application for production testing
echo -e "${BLUE}🔨 Building application...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed. Please fix the errors and try again.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build completed successfully${NC}"

# Function to cleanup on exit
cleanup() {
    echo -e "\n${YELLOW}🛑 Shutting down Enclose.AI server...${NC}"
    kill $SERVER_PID 2>/dev/null
    exit 0
}

# Set up trap for cleanup
trap cleanup INT TERM

# Start the development server
echo -e "${BLUE}🚀 Starting Enclose.AI on port $NEXT_PORT...${NC}"
echo ""

# Export the port for Next.js to use
export PORT=$NEXT_PORT

# Start the server in the background
npm run dev &
SERVER_PID=$!

# Wait for server to start
sleep 3

# Check if server started successfully
if ps -p $SERVER_PID > /dev/null; then
    echo -e "${GREEN}╔══════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║           🎉 Enclose.AI is running!                  ║${NC}"
    echo -e "${GREEN}╚══════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${BLUE}📍 Local URL:${NC} http://localhost:${NEXT_PORT}"
    echo -e "${BLUE}📍 Network URL:${NC} http://$(hostname -I | awk '{print $1}'):${NEXT_PORT}"
    echo ""
    echo -e "${YELLOW}Available Routes:${NC}"
    echo -e "  ${GREEN}•${NC} Homepage:        http://localhost:${NEXT_PORT}"
    echo -e "  ${GREEN}•${NC} Features:        http://localhost:${NEXT_PORT}/features"
    echo -e "  ${GREEN}•${NC} Pricing:         http://localhost:${NEXT_PORT}/pricing"
    echo -e "  ${GREEN}•${NC} Documentation:   http://localhost:${NEXT_PORT}/docs"
    echo -e "  ${GREEN}•${NC} API Reference:   http://localhost:${NEXT_PORT}/api-reference"
    echo -e "  ${GREEN}•${NC} Demo:            http://localhost:${NEXT_PORT}/demo"
    echo -e "  ${GREEN}•${NC} Security:        http://localhost:${NEXT_PORT}/security"
    echo -e "  ${GREEN}•${NC} Blog:            http://localhost:${NEXT_PORT}/blog"
    echo -e "  ${GREEN}•${NC} Support:         http://localhost:${NEXT_PORT}/support"
    echo -e "  ${GREEN}•${NC} Status:          http://localhost:${NEXT_PORT}/status"
    echo -e "  ${GREEN}•${NC} Careers:         http://localhost:${NEXT_PORT}/careers"
    echo -e "  ${GREEN}•${NC} Login:           http://localhost:${NEXT_PORT}/login"
    echo -e "  ${GREEN}•${NC} Dashboard:       http://localhost:${NEXT_PORT}/dashboard"
    echo ""
    echo -e "${YELLOW}API Endpoints:${NC}"
    echo -e "  ${GREEN}•${NC} Payment Links:   http://localhost:${NEXT_PORT}/api/payment-links"
    echo -e "  ${GREEN}•${NC} Checkout (v1):   http://localhost:${NEXT_PORT}/api/v1/checkout"
    echo -e "  ${GREEN}•${NC} Payments (v1):   http://localhost:${NEXT_PORT}/api/v1/payments"
    echo ""
    echo -e "${BLUE}Press Ctrl+C to stop the server${NC}"
    echo ""

    # Open in browser
    if command -v open &> /dev/null; then
        echo -e "${BLUE}🌐 Opening in browser...${NC}"
        sleep 2
        open "http://localhost:${NEXT_PORT}"
    fi

    # Keep script running
    wait $SERVER_PID
else
    echo -e "${RED}❌ Failed to start server. Check the logs above for errors.${NC}"
    exit 1
fi