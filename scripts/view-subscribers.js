// Script to view newsletter subscribers and contact form submissions
// Run with: node scripts/view-subscribers.js

const admin = require('firebase-admin');

try {
  const serviceAccount = require('./serviceAccountKey.json');
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  const db = admin.firestore();

  async function viewData() {
    console.log('\n📧 NEWSLETTER SUBSCRIBERS\n');
    console.log('='.repeat(80));
    
    try {
      const subscribersSnapshot = await db.collection('newsletter_subscribers')
        .orderBy('subscribedAt', 'desc')
        .get();
      
      if (subscribersSnapshot.empty) {
        console.log('No subscribers yet.');
      } else {
        console.log(`Total Subscribers: ${subscribersSnapshot.size}\n`);
        
        subscribersSnapshot.forEach((doc, index) => {
          const data = doc.data();
          console.log(`${index + 1}. ${data.email}`);
          console.log(`   Subscribed: ${data.subscribedAt?.toDate?.() || 'N/A'}`);
          console.log(`   Status: ${data.status}`);
          console.log(`   Source: ${data.source}`);
          console.log('-'.repeat(80));
        });
      }
    } catch (error) {
      console.log('Newsletter subscribers collection not found yet.');
    }

    console.log('\n\n📬 CONTACT FORM SUBMISSIONS\n');
    console.log('='.repeat(80));
    
    try {
      const contactsSnapshot = await db.collection('contact_submissions')
        .orderBy('submittedAt', 'desc')
        .get();
      
      if (contactsSnapshot.empty) {
        console.log('No contact submissions yet.');
      } else {
        console.log(`Total Submissions: ${contactsSnapshot.size}\n`);
        
        contactsSnapshot.forEach((doc, index) => {
          const data = doc.data();
          console.log(`${index + 1}. From: ${data.name} (${data.email})`);
          console.log(`   Phone: ${data.phone || 'Not provided'}`);
          console.log(`   Subject: ${data.subject}`);
          console.log(`   Message: ${data.message.substring(0, 100)}${data.message.length > 100 ? '...' : ''}`);
          console.log(`   Submitted: ${data.submittedAt?.toDate?.() || 'N/A'}`);
          console.log(`   Status: ${data.status} | Read: ${data.read ? 'Yes' : 'No'}`);
          console.log('-'.repeat(80));
        });
      }
    } catch (error) {
      console.log('Contact submissions collection not found yet.');
    }
  }

  viewData().then(() => {
    console.log('\n✅ Done!\n');
    process.exit(0);
  });

} catch (error) {
  console.error('\n❌ Error: Could not load serviceAccountKey.json');
  console.log('\nTo use this script:');
  console.log('1. Go to Firebase Console');
  console.log('2. Project Settings > Service Accounts');
  console.log('3. Click "Generate New Private Key"');
  console.log('4. Save the file as "serviceAccountKey.json" in the scripts folder');
  console.log('5. Run: node scripts/view-subscribers.js\n');
  process.exit(1);
}
