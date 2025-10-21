// Pre-commit automated tests
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🧪 Running pre-commit tests...\n');

let passed = 0;
let failed = 0;

// Test 1: Check .env exists
console.log('1️⃣  Checking .env file...');
if (fs.existsSync('.env')) {
  const envContent = fs.readFileSync('.env', 'utf8');
  
  // Check for required variables
  const required = [
    'MYSQL_HOST',
    'MYSQL_USER',
    'MYSQL_PASSWORD',
    'MYSQL_DATABASE',
    'ADMIN_USERNAME',
    'ADMIN_PASSWORD'
  ];
  
  const missing = required.filter(key => !envContent.includes(key));
  
  if (missing.length === 0) {
    console.log('   ✅ .env file has all required variables\n');
    passed++;
  } else {
    console.log(`   ❌ .env missing: ${missing.join(', ')}\n`);
    failed++;
  }
  
  // Check if default credentials changed
  if (envContent.includes('ADMIN_PASSWORD=changeme123')) {
    console.log('   ⚠️  WARNING: Still using default admin password!\n');
  }
} else {
  console.log('   ❌ .env file not found!\n');
  failed++;
}

// Test 2: Check .gitignore includes .env
console.log('2️⃣  Checking .gitignore...');
if (fs.existsSync('.gitignore')) {
  const gitignoreContent = fs.readFileSync('.gitignore', 'utf8');
  if (gitignoreContent.includes('.env')) {
    console.log('   ✅ .env is in .gitignore\n');
    passed++;
  } else {
    console.log('   ❌ .env NOT in .gitignore - SECURITY RISK!\n');
    failed++;
  }
} else {
  console.log('   ❌ .gitignore not found!\n');
  failed++;
}

// Test 3: Check robots.txt blocks /admin/
console.log('3️⃣  Checking robots.txt...');
if (fs.existsSync('static/robots.txt')) {
  const robotsContent = fs.readFileSync('static/robots.txt', 'utf8');
  if (robotsContent.includes('Disallow: /admin/')) {
    console.log('   ✅ robots.txt blocks /admin/\n');
    passed++;
  } else {
    console.log('   ❌ robots.txt does NOT block /admin/\n');
    failed++;
  }
} else {
  console.log('   ❌ robots.txt not found!\n');
  failed++;
}

// Test 4: Check critical files exist
console.log('4️⃣  Checking critical files...');
const criticalFiles = [
  'src/hooks.server.ts',
  'src/routes/admin/login/+page.svelte',
  'src/routes/admin/themes/+page.svelte',
  'src/routes/api/admin/auth/login/+server.ts',
  'src/routes/api/admin/themes/+server.ts',
  'src/routes/api/themes/track/+server.ts'
];

const missingFiles = criticalFiles.filter(file => !fs.existsSync(file));

if (missingFiles.length === 0) {
  console.log('   ✅ All critical files present\n');
  passed++;
} else {
  console.log(`   ❌ Missing files:\n      ${missingFiles.join('\n      ')}\n`);
  failed++;
}

// Test 5: Check hooks.server.ts has auth
console.log('5️⃣  Checking authentication middleware...');
if (fs.existsSync('src/hooks.server.ts')) {
  const hooksContent = fs.readFileSync('src/hooks.server.ts', 'utf8');
  if (hooksContent.includes('/admin') && hooksContent.includes('admin_session')) {
    console.log('   ✅ Authentication middleware configured\n');
    passed++;
  } else {
    console.log('   ❌ Authentication middleware NOT properly configured\n');
    failed++;
  }
} else {
  console.log('   ❌ hooks.server.ts not found!\n');
  failed++;
}

// Test 6: Check package.json exists
console.log('6️⃣  Checking package.json...');
if (fs.existsSync('package.json')) {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredDeps = ['mysql2', '@sveltejs/kit', 'svelte'];
  const missingDeps = requiredDeps.filter(dep => 
    !pkg.dependencies?.[dep] && !pkg.devDependencies?.[dep]
  );
  
  if (missingDeps.length === 0) {
    console.log('   ✅ All required dependencies present\n');
    passed++;
  } else {
    console.log(`   ❌ Missing dependencies: ${missingDeps.join(', ')}\n`);
    failed++;
  }
} else {
  console.log('   ❌ package.json not found!\n');
  failed++;
}

// Test 7: Check database schema file
console.log('7️⃣  Checking database schema...');
if (fs.existsSync('DATABASE_SCHEMA_ADMIN.sql')) {
  const schemaContent = fs.readFileSync('DATABASE_SCHEMA_ADMIN.sql', 'utf8');
  const requiredColumns = ['price', 'downloads', 'views', 'stock_quantity', 'featured', 'status'];
  const missingColumns = requiredColumns.filter(col => !schemaContent.includes(col));
  
  if (missingColumns.length === 0) {
    console.log('   ✅ Database schema has all required fields\n');
    passed++;
  } else {
    console.log(`   ❌ Schema missing columns: ${missingColumns.join(', ')}\n`);
    failed++;
  }
} else {
  console.log('   ❌ DATABASE_SCHEMA_ADMIN.sql not found!\n');
  failed++;
}

// Results
console.log('═'.repeat(50));
console.log(`\n📊 Test Results: ${passed} passed, ${failed} failed\n`);

if (failed === 0) {
  console.log('✅ All tests passed! Ready to commit.\n');
  console.log('📝 Next steps:');
  console.log('   1. Review PRE_COMMIT_CHECKLIST.md for manual tests');
  console.log('   2. Test admin login locally');
  console.log('   3. git add .');
  console.log('   4. git commit -m "Add admin system"');
  console.log('   5. git push\n');
  process.exit(0);
} else {
  console.log('❌ Some tests failed. Please fix issues before committing.\n');
  console.log('📚 Check these docs:');
  console.log('   - DEPLOYMENT_READY.md');
  console.log('   - ADMIN_AUTH_SETUP.md\n');
  process.exit(1);
}
