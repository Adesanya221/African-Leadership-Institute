/**
 * Supabase Integration Test (JavaScript)
 *
 * Tests:
 * 1. Supabase client connection
 * 2. Registrations table read/write
 * 3. Payment status update (simulates confirm-payment API)
 *
 * Run with:
 *   node scripts/test-supabase.js
 *
 * Requires .env.local with:
 *   NEXT_PUBLIC_SUPABASE_URL=...
 *   SUPABASE_SERVICE_ROLE_KEY=...
 */

const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });
const { createClient } = require('@supabase/supabase-js');

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const COLORS = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

function log(msg, color = COLORS.reset) {
  console.log(`${color}${msg}${COLORS.reset}`);
}

function divider() {
  console.log('\n' + '─'.repeat(60) + '\n');
}

async function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function testConnection() {
  log('TEST 1: Supabase Connection', COLORS.bold + COLORS.cyan);

  if (!url) {
    log('❌ FAIL: NEXT_PUBLIC_SUPABASE_URL is not set', COLORS.red);
    return false;
  }
  if (!serviceKey) {
    log('❌ FAIL: SUPABASE_SERVICE_ROLE_KEY is not set', COLORS.red);
    return false;
  }

  log(`  URL: ${url}`);
  log(`  Service Key: ${serviceKey.slice(0, 8)}...${serviceKey.slice(-4)}`);

  const supabase = createClient(url, serviceKey);

  const { data, error } = await supabase.from('registrations').select('id').limit(1);

  if (error && error.code === '42P01') {
    log('❌ FAIL: Table "registrations" does not exist', COLORS.red);
    log(`   Error: ${error.message}`, COLORS.yellow);
    return false;
  }

  if (error) {
    log(`❌ FAIL: Connection error - ${error.message}`, COLORS.red);
    return false;
  }

  log('✅ PASS: Connected to Supabase successfully', COLORS.green);
  return true;
}

async function testRegistrationInsert() {
  log('TEST 2: Registration Data Collection (Insert)', COLORS.bold + COLORS.cyan);

  const supabase = createClient(url, serviceKey);

  const testRef = `TEST-${Date.now().toString(36).toUpperCase()}`;
  const testData = {
    reference_id: testRef,
    full_name: 'Test User (Auto Script)',
    email: `test-${Date.now()}@example.com`,
    country: 'Testland',
    cohort: '2006',
    phone: '+0000000000',
    accommodation: 'shared',
    notes: 'This is an automated test entry. Safe to delete.',
    payment_status: 'pending',
    created_at: new Date().toISOString(),
  };

  log(`  Inserting test record with ref: ${testRef}`);

  const { data, error } = await supabase.from('registrations').insert(testData).select();

  if (error) {
    log(`❌ FAIL: Insert failed - ${error.message}`, COLORS.red);
    if (error.message.includes('violates row-level security')) {
      log('   Hint: You need the SERVICE_ROLE_KEY for server-side inserts.', COLORS.yellow);
    }
    return null;
  }

  log('✅ PASS: Registration inserted successfully', COLORS.green);
  log(`   ID: ${data?.[0]?.id ?? 'N/A'}`);
  log(`   Reference: ${testRef}`);
  return testRef;
}

async function testPaymentSuccessUpdate(testRef) {
  log('TEST 3: Payment Success Update', COLORS.bold + COLORS.cyan);

  const supabase = createClient(url, serviceKey);

  log(`  Updating payment_status to "success" for ref: ${testRef}`);

  const { data, error } = await supabase
    .from('registrations')
    .update({
      payment_status: 'success',
      lemon_order_id: `TEST-PAYPAL-${Date.now()}`,
    })
    .eq('reference_id', testRef)
    .select();

  if (error) {
    log(`❌ FAIL: Update failed - ${error.message}`, COLORS.red);
    return false;
  }

  if (!data || data.length === 0) {
    log('❌ FAIL: No row updated (reference_id not found?)', COLORS.red);
    return false;
  }

  const record = data[0];
  if (record.payment_status !== 'success') {
    log(`❌ FAIL: payment_status is "${record.payment_status}" instead of "success"`, COLORS.red);
    return false;
  }

  log('✅ PASS: Payment status updated to "success"', COLORS.green);
  log(`   Transaction ID: ${record.lemon_order_id}`);
  log(`   Payment Status: ${record.payment_status}`);
  return true;
}

async function testReadBack(testRef) {
  log('TEST 4: Read-Back Verification', COLORS.bold + COLORS.cyan);

  const supabase = createClient(url, serviceKey);

  const { data, error } = await supabase
    .from('registrations')
    .select('*')
    .eq('reference_id', testRef)
    .single();

  if (error || !data) {
    log(`❌ FAIL: Could not read back record - ${error?.message ?? 'Not found'}`, COLORS.red);
    return false;
  }

  log('✅ PASS: Record retrieved successfully', COLORS.green);
  log(`   Full Name: ${data.full_name}`);
  log(`   Email: ${data.email}`);
  log(`   Payment Status: ${data.payment_status}`);
  log(`   Created At: ${data.created_at}`);
  return true;
}

async function cleanup(testRef) {
  log('CLEANUP: Deleting test record', COLORS.bold + COLORS.yellow);

  const supabase = createClient(url, serviceKey);

  const { error } = await supabase.from('registrations').delete().eq('reference_id', testRef);

  if (error) {
    log(`⚠️  Warning: Could not delete test record - ${error.message}`, COLORS.yellow);
    return;
  }

  log('✅ Test record deleted', COLORS.green);
}

async function runAll() {
  console.clear();
  log('╔══════════════════════════════════════════════════════════╗', COLORS.cyan);
  log('║       SUPABASE & PAYMENT FLOW INTEGRATION TEST           ║', COLORS.cyan);
  log('╚══════════════════════════════════════════════════════════╝', COLORS.cyan);

  divider();

  log('Environment Variables', COLORS.bold);
  if (!url) {
    log('  ❌ NEXT_PUBLIC_SUPABASE_URL    — NOT SET', COLORS.red);
  } else {
    log('  ✅ NEXT_PUBLIC_SUPABASE_URL    — SET', COLORS.green);
  }
  if (!anonKey) {
    log('  ⚠️  NEXT_PUBLIC_SUPABASE_ANON_KEY — NOT SET (optional for this test)', COLORS.yellow);
  } else {
    log('  ✅ NEXT_PUBLIC_SUPABASE_ANON_KEY — SET', COLORS.green);
  }
  if (!serviceKey) {
    log('  ❌ SUPABASE_SERVICE_ROLE_KEY   — NOT SET', COLORS.red);
  } else {
    log('  ✅ SUPABASE_SERVICE_ROLE_KEY   — SET', COLORS.green);
  }

  if (!url || !serviceKey) {
    divider();
    log('ABORTED: Please create a .env.local file with the required variables.', COLORS.red + COLORS.bold);
    log('See .env.example for the template.', COLORS.yellow);
    process.exit(1);
  }

  divider();

  const connected = await testConnection();
  if (!connected) process.exit(1);

  divider();

  const testRef = await testRegistrationInsert();
  if (!testRef) process.exit(1);

  divider();
  await delay(500);

  const updated = await testPaymentSuccessUpdate(testRef);
  if (!updated) {
    await cleanup(testRef);
    process.exit(1);
  }

  divider();
  await delay(500);

  const readBack = await testReadBack(testRef);
  if (!readBack) {
    await cleanup(testRef);
    process.exit(1);
  }

  divider();
  await cleanup(testRef);

  divider();
  log('🎉 ALL TESTS PASSED', COLORS.green + COLORS.bold);
  log('Your Supabase integration and payment flow are working correctly.', COLORS.green);
}

runAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
