// Test admin API endpoint
import dotenv from 'dotenv';

dotenv.config();

console.log('Testing admin API endpoint...\n');

const BASE_URL = 'http://localhost:5173';

async function testAdminAPI() {
  try {
    console.log('1. Fetching themes from admin API...');
    const response = await fetch(`${BASE_URL}/api/admin/themes`);
    
    console.log('Status:', response.status);
    console.log('Status Text:', response.statusText);
    console.log('Headers:', Object.fromEntries(response.headers.entries()));
    
    const data = await response.json();
    
    console.log('\n2. Response data:');
    console.log('Type:', Array.isArray(data) ? 'Array' : typeof data);
    console.log('Length:', Array.isArray(data) ? data.length : 'N/A');
    
    if (Array.isArray(data)) {
      console.log('\n3. First theme (sample):');
      console.log(JSON.stringify(data[0], null, 2));
      console.log('\n✅ API returning array of themes');
    } else if (data.error) {
      console.log('\n❌ API returned error:', data.error);
    } else {
      console.log('\n⚠️  Unexpected response:', data);
    }
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
  }
}

testAdminAPI();
