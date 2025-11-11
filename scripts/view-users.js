// Simple script to view all users in Firestore
// Run with: node scripts/view-users.js

const admin = require('firebase-admin');

// Initialize Firebase Admin
// You'll need to download your service account key from Firebase Console
// Project Settings > Service Accounts > Generate New Private Key
// Save it as 'serviceAccountKey.json' in the scripts folder

try {
  const serviceAccount = require('./serviceAccountKey.json');
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  const db = admin.firestore();

  async function viewUsers() {
    try {
      console.log('Fetching users from Firestore...\n');
      
      const usersSnapshot = await db.collection('users').get();
      
      if (usersSnapshot.empty) {
        console.log('No users found in database.');
        return;
      }

      console.log(`Found ${usersSnapshot.size} users:\n`);
      console.log('='.repeat(80));
      
      usersSnapshot.forEach((doc, index) => {
        const userData = doc.data();
        console.log(`\nUser ${index + 1}:`);
        console.log(`  ID: ${doc.id}`);
        console.log(`  Name: ${userData.displayName}`);
        console.log(`  Email: ${userData.email}`);
        console.log(`  Phone: ${userData.phoneNumber || 'Not provided'}`);
        console.log(`  Email Verified: ${userData.emailVerified ? 'Yes' : 'No'}`);
        console.log(`  Created: ${userData.createdAt?.toDate?.() || 'N/A'}`);
        console.log(`  Last Login: ${userData.lastLogin?.toDate?.() || 'N/A'}`);
        console.log('-'.repeat(80));
      });
      
      console.log(`\nTotal Users: ${usersSnapshot.size}`);
      
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  viewUsers().then(() => {
    console.log('\nDone!');
    process.exit(0);
  });

} catch (error) {
  console.error('\n❌ Error: Could not load serviceAccountKey.json');
  console.log('\nTo use this script:');
  console.log('1. Go to Firebase Console');
  console.log('2. Project Settings > Service Accounts');
  console.log('3. Click "Generate New Private Key"');
  console.log('4. Save the file as "serviceAccountKey.json" in the scripts folder');
  console.log('5. Run: node scripts/view-users.js\n');
  process.exit(1);
}
