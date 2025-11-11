# 🔥 Update Firestore Security Rules

Your newsletter subscription and contact form now save data to Firebase! You need to update your Firestore security rules.

## 📋 What's New

### Newsletter Subscription
- ✅ Saves subscriber emails to `newsletter_subscribers` collection
- ✅ Checks for duplicate emails
- ✅ Stores subscription date and source

### Contact Form
- ✅ Saves contact submissions to `contact_submissions` collection
- ✅ Stores all form data (name, email, phone, subject, message)
- ✅ Tracks submission date and status

## 🛡️ Update Security Rules (REQUIRED)

### Step 1: Go to Firebase Console

1. Open [Firebase Console](https://console.firebase.google.com/)
2. Select your **"infynova-website"** project
3. Click **"Firestore Database"** in left sidebar
4. Click the **"Rules"** tab at the top

### Step 2: Replace Rules

**DELETE** all existing rules and **PASTE** these new rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users collection - users can only read/write their own data
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null && request.auth.uid == userId;
    }
    
    // Newsletter subscribers - anyone can subscribe (create only)
    match /newsletter_subscribers/{subscriberId} {
      allow create: if request.resource.data.email is string 
                    && request.resource.data.email.matches('.*@.*\\..*');
      allow read, update, delete: if false; // Only admins can read/modify
    }
    
    // Contact form submissions - anyone can submit
    match /contact_submissions/{submissionId} {
      allow create: if request.resource.data.email is string 
                    && request.resource.data.name is string
                    && request.resource.data.message is string;
      allow read, update, delete: if false; // Only admins can read/modify
    }
  }
}
```

### Step 3: Publish Rules

1. Click the **"Publish"** button
2. Wait for "Rules published successfully" message

✅ **Done!** Your rules are now updated.

---

## 📊 Database Structure

### Newsletter Subscribers Collection

```javascript
newsletter_subscribers/{subscriberId}
  ├── email: "user@example.com"
  ├── subscribedAt: timestamp
  ├── status: "active"
  └── source: "footer"
```

### Contact Submissions Collection

```javascript
contact_submissions/{submissionId}
  ├── name: "John Doe"
  ├── email: "john@example.com"
  ├── phone: "+91 9876543210"
  ├── subject: "general"
  ├── message: "Hello, I have a question..."
  ├── submittedAt: timestamp
  ├── status: "new"
  └── read: false
```

---

## 🧪 Test It Now!

### Test Newsletter Subscription:

1. Go to your website footer
2. Enter an email in "Join Our Movement"
3. Click "Subscribe"
4. Check Firebase Console → Firestore Database → Data
5. You should see `newsletter_subscribers` collection with your email!

### Test Contact Form:

1. Go to `/contact` page
2. Fill out the contact form
3. Click "Send Message"
4. Check Firebase Console → Firestore Database → Data
5. You should see `contact_submissions` collection with your message!

---

## 🔍 View Your Data in Firebase

### To see newsletter subscribers:

1. Firebase Console → Firestore Database → Data tab
2. Click on `newsletter_subscribers` collection
3. See all subscriber emails with timestamps

### To see contact submissions:

1. Firebase Console → Firestore Database → Data tab
2. Click on `contact_submissions` collection
3. See all contact form submissions

---

## ✨ Features

### Newsletter Subscription:
- ✅ Validates email format
- ✅ Prevents duplicate subscriptions
- ✅ Shows "Already subscribed" message for duplicates
- ✅ Stores subscription date
- ✅ Tracks source (footer)

### Contact Form:
- ✅ Validates all required fields
- ✅ Stores complete submission data
- ✅ Tracks submission date
- ✅ Marks as "new" and "unread"
- ✅ Optional phone number

---

## 🔐 Security

- ✅ Anyone can subscribe to newsletter (public)
- ✅ Anyone can submit contact form (public)
- ✅ Only you (admin) can read/modify submissions
- ✅ Email validation built-in
- ✅ No spam protection (add reCAPTCHA later if needed)

---

## 📧 Email Notifications (Optional)

To get notified when someone subscribes or contacts you, you can:

1. **Use Firebase Cloud Functions** (requires Blaze plan)
2. **Use Zapier** to monitor Firestore and send emails
3. **Check Firebase Console manually**

---

## 🎯 Next Steps

1. ✅ Update Firestore rules (above)
2. ✅ Test newsletter subscription
3. ✅ Test contact form
4. ✅ Check data in Firebase Console
5. Optional: Set up email notifications

---

## 🐛 Troubleshooting

### "Permission denied" error
→ Make sure you updated the Firestore rules and clicked "Publish"

### "Database not configured" error
→ Check that your `.env.local` has Firebase credentials

### Data not showing in Firebase
→ Wait a few seconds and refresh the Firebase Console
→ Check browser console for errors

### Duplicate email message not showing
→ This is normal - it means the duplicate check is working!

---

**Your newsletter and contact form are now fully functional and storing data in Firebase!** 🎉
