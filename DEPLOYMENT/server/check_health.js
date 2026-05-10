const bcrypt = require('bcryptjs');
const db = require('./db');

try {
  const data = db.read();
  console.log('Database read: SUCCESS');
  
  const admin = data.users.find(u => u.email === 'admin@beyond.com');
  if (!admin) {
    console.error('Admin user: NOT FOUND');
  } else {
    console.log('Admin user: FOUND');
    const match = bcrypt.compareSync('admin123', admin.password);
    console.log('Password test (admin123):', match ? 'MATCH' : 'FAIL');
  }
  
  if (!data.energyLoad || !data.energyLoad.history) {
    console.error('Energy History: MISSING');
  } else {
    console.log('Energy History: OK');
  }
  
} catch (err) {
  console.error('Integrity Check FAILED:', err.message);
}
