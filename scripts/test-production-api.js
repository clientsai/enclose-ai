// Test Production API Script

const PRODUCTION_URL = 'https://enclose-l559jrj9b-clientsais-projects.vercel.app';

async function testAPI() {
  console.log('🧪 Testing Enclose.AI Production APIs...\n');

  // Test 1: Health Check
  console.log('1. Testing health/home page...');
  try {
    const res = await fetch(PRODUCTION_URL);
    console.log(`   Status: ${res.status}`);
    if (res.status === 401) {
      console.log('   ⚠️  Site requires authentication (Vercel preview protection)');
    } else if (res.status === 200) {
      console.log('   ✅ Home page accessible');
    }
  } catch (error) {
    console.log('   ❌ Error:', error.message);
  }

  // Test 2: Checkout API
  console.log('\n2. Testing Checkout API...');
  try {
    const res = await fetch(`${PRODUCTION_URL}/api/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        plan: 'starter',
        billing: 'monthly',
        email: 'test@example.com',
      }),
    });
    console.log(`   Status: ${res.status}`);
    if (res.status === 200 || res.status === 201) {
      const data = await res.json();
      console.log('   ✅ Checkout API working');
      console.log(`   Response: ${JSON.stringify(data, null, 2).substring(0, 200)}...`);
    } else {
      const text = await res.text();
      console.log(`   Response: ${text.substring(0, 100)}...`);
    }
  } catch (error) {
    console.log('   ❌ Error:', error.message);
  }

  // Test 3: Demo Checkout
  console.log('\n3. Testing Demo Checkout Page...');
  try {
    const res = await fetch(`${PRODUCTION_URL}/api/checkout/demo?plan=starter&billing=monthly`);
    console.log(`   Status: ${res.status}`);
    if (res.status === 200) {
      console.log('   ✅ Demo checkout page accessible');
    }
  } catch (error) {
    console.log('   ❌ Error:', error.message);
  }

  console.log('\n📊 Summary:');
  console.log('- If you see 401 errors, the site is behind Vercel authentication');
  console.log('- This is normal for preview deployments');
  console.log('- The production domain (enclose.ai) will work without authentication');
}

// Test localhost as comparison
async function testLocalhost() {
  console.log('\n🏠 Testing Localhost for comparison...');
  try {
    const res = await fetch('http://localhost:47832');
    if (res.status === 200) {
      console.log('✅ Localhost is running and accessible');
    }
  } catch (error) {
    console.log('ℹ️  Localhost not running (expected if not developing)');
  }
}

testAPI().then(() => testLocalhost());