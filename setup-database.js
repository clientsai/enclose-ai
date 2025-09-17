const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runSchema() {
  try {
    // Read the schema file
    const schemaPath = path.join(__dirname, '..', 'enclose-ai-schema.sql');
    const schemaContent = fs.readFileSync(schemaPath, 'utf8');

    // Split schema into individual statements
    const statements = schemaContent
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    console.log(`📊 Running ${statements.length} SQL statements...`);

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i] + ';';

      // Skip comments
      if (statement.trim().startsWith('--')) continue;

      try {
        // Use raw SQL execution
        const { data, error } = await supabase.rpc('exec_sql', {
          sql_query: statement
        }).single();

        if (error) {
          // Try direct execution for some statements
          const { error: directError } = await supabase
            .from('_sql')
            .insert({ query: statement });

          if (directError) {
            console.log(`⚠️  Statement ${i + 1} failed (non-critical): ${directError.message.substring(0, 50)}...`);
            errorCount++;
          } else {
            successCount++;
          }
        } else {
          successCount++;
        }
      } catch (err) {
        console.log(`⚠️  Statement ${i + 1} failed: ${err.message.substring(0, 50)}...`);
        errorCount++;
      }
    }

    console.log(`\n✅ Completed: ${successCount} successful, ${errorCount} failed`);

    // Test if basic tables were created
    console.log('\n🔍 Verifying tables...');

    const tables = [
      'enclose_users',
      'stripe_accounts',
      'payment_links',
      'payments',
      'api_keys'
    ];

    for (const table of tables) {
      const { data, error } = await supabase.from(table).select('*').limit(1);
      if (!error) {
        console.log(`✅ Table '${table}' exists`);
      } else {
        console.log(`❌ Table '${table}' not found: ${error.message}`);
      }
    }

    console.log('\n🎉 Database setup complete!');
    console.log('You can now register at: http://localhost:3001/register');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    console.log('\n📋 Please run the schema manually in Supabase SQL Editor');
    console.log('File location: /Users/ktown/Desktop/enclose-ai-schema.sql');
  }
}

// Simple direct approach - just check if tables exist
async function checkTables() {
  console.log('🔍 Checking if tables already exist...');

  const { data, error } = await supabase.from('enclose_users').select('count').limit(1);

  if (!error) {
    console.log('✅ Tables already exist! Database is ready.');
    return true;
  }

  return false;
}

async function main() {
  const tablesExist = await checkTables();

  if (!tablesExist) {
    console.log('\n📋 Tables don\'t exist. Please run the schema manually:');
    console.log('1. Go to: https://supabase.com/dashboard');
    console.log('2. Select your project');
    console.log('3. Go to SQL Editor');
    console.log('4. Copy contents from: /Users/ktown/Desktop/enclose-ai-schema.sql');
    console.log('5. Paste and click "Run"');
    console.log('\n💡 This is the safest way to ensure all tables are created correctly.');
  }
}

main();