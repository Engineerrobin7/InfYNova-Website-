# Firebase Authentication Setup Guide

This guide will help you set up Firebase Authentication with email verification for your InfYNova website.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter project name: `infynova` (or your preferred name)
4. Disable Google Analytics (optional, you can enable it later)
5. Click "Create project"

## Step 2: Register Your Web App

1. In your Firebase project dashboard, click the **Web icon** (`</>`)
2. Register app with nickname: `InfYNova Website`
3. Check "Also set up Firebase Hosting" (optional)
4. Click "Register app"
5. Copy the Firebase configuration object

## Step 3: Configure Environment Variables

1. Open `.env.local` file in your project root
2. Copy the values from Firebase config and paste them:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

## Step 4: Enable Authentication Methods

1. In Firebase Console, go to **Build** > **Authentication**
2. Click "Get started"
3. Go to **Sign-in method** tab

### Enable Email/Password Authentication:
1. Click on "Email/Password"
2. Toggle "Enable" to ON
3. Toggle "Email link (passwordless sign-in)" to OFF (optional)
4. Click "Save"

### Enable Google Sign-In (Optional):
1. Click on "Google"
2. Toggle "Enable" to ON
3. Select your project support email
4. Click "Save"

## Step 5: Set Up Firestore Database

1. In Firebase Console, go to **Build** > **Firestore Database**
2. Click "Create database"
3. Select "Start in production mode" (we'll add rules next)
4. Choose your Cloud Firestore location (closest to your users)
5. Click "Enable"

### Configure Firestore Security Rules:

Go to the **Rules** tab and replace with:

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
    
    // Admin can read all users (optional - for admin dashboard)
    match /users/{userId} {
      allow read: if request.auth != null && 
                     get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

Click "Publish"

## Step 6: Configure Email Verification Settings

1. Go to **Authentication** > **Templates** tab
2. Click on "Email address verification"
3. Customize the email template (optional):
   - From name: `InfYNova`
   - Subject: `Verify your email for InfYNova`
   - Customize the message
4. Click "Save"

### Set Action URL (Important for production):
1. Go to **Authentication** > **Settings** tab
2. Scroll to "Authorized domains"
3. Add your production domain: `infynova.in` or `infynova.vercel.app`
4. For local development, `localhost` is already added

## Step 7: Test the Authentication

1. Start your development server:
```bash
npm run dev
```

2. Open http://localhost:3000
3. Click "Sign Up" button
4. Fill in the registration form
5. Check your email for verification link
6. Click the verification link
7. Sign in with your credentials

## Step 8: Database Structure

Your Firestore database will automatically create this structure:

```
users (collection)
  └── {userId} (document)
      ├── uid: string
      ├── email: string
      ├── displayName: string
      ├── phoneNumber: string | null
      ├── createdAt: timestamp
      ├── emailVerified: boolean
      └── lastLogin: timestamp
```

## Features Included

✅ Email/Password Authentication
✅ Google Sign-In
✅ Email Verification (required before access)
✅ User Profile Storage in Firestore
✅ Automatic user data sync
✅ Last login tracking
✅ Resend verification email
✅ Secure authentication state management
✅ Protected user data with Firestore rules

## Troubleshooting

### "Firebase: Error (auth/configuration-not-found)"
- Make sure you've added your environment variables to `.env.local`
- Restart your development server after adding env variables

### "Firebase: Error (auth/unauthorized-domain)"
- Add your domain to Authorized domains in Firebase Console
- Go to Authentication > Settings > Authorized domains

### Email verification not sending
- Check your Firebase email templates are configured
- Verify your email is not in spam folder
- Check Firebase Console > Authentication > Users to see if user was created

### "Missing or insufficient permissions"
- Update your Firestore security rules as shown in Step 5
- Make sure the rules are published

## Production Deployment

Before deploying to production:

1. Add your production domain to Firebase Authorized domains
2. Update environment variables in your hosting platform (Vercel, Netlify, etc.)
3. Test authentication flow in production
4. Monitor Firebase Console for any errors

## Security Best Practices

- Never commit `.env.local` to version control
- Use Firebase Security Rules to protect user data
- Enable App Check for additional security (optional)
- Regularly review Firebase Console for suspicious activity
- Keep Firebase SDK updated

## Support

For issues or questions:
- Firebase Documentation: https://firebase.google.com/docs
- Firebase Support: https://firebase.google.com/support

---

Built with ❤️ by the InfYNova Team
