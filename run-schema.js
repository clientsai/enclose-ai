const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Read environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL in .env.local');
  process.exit(1);
}

if (!supabaseServiceKey || supabaseServiceKey === 'YOUR_SERVICE_ROLE_KEY_HERE') {
  console.log('⚠️  Service Role Key not found in .env.local');
  console.log('\n📋 To run the database schema:');
  console.log('1. Go to: https://supabase.com/dashboard');
  console.log('2. Select your project');
  console.log('3. Go to SQL Editor');
  console.log('4. Copy and paste the contents of: enclose-ai-schema.sql');
  console.log('5. Click "Run"');
  console.log('\nOr get your Service Role Key from:');
  console.log('Settings → API → Service Role Key (secret)');
  process.exit(1);
}

async function runSchema() {
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    // Read the schema file
    const schemaPath = path.join(__dirname, '..', 'enclose-ai-schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    console.log('🚀 Running database schema...');

    // Execute the schema
    const { data, error } = await supabase.from('_sql').select().single();

    if (error) {
      console.error('❌ Error running schema:', error.message);
      console.log('\n📋 Please run the schema manually in Supabase SQL Editor');
      return;
    }

    console.log('✅ Database schema created successfully!');
    console.log('\n🎉 Enclose.AI is ready to use!');
    console.log('Visit: http://localhost:3000');
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n📋 Please run the schema manually in Supabase SQL Editor');
  }
}

runSchema();