# 🚀 Quick Start - Firebase Authentication

Follow these steps to get your authentication system running:

## ✅ Step-by-Step Checklist

### 1. Create Firebase Project (5 minutes)
- [ ] Go to [Firebase Console](https://console.firebase.google.com/)
- [ ] Click "Add project"
- [ ] Name it "InfYNova" (or your choice)
- [ ] Click "Create project"

### 2. Register Web App (2 minutes)
- [ ] Click the Web icon (`</>`) in Firebase dashboard
- [ ] Register app with nickname "InfYNova Website"
- [ ] Copy the Firebase config object

### 3. Add Environment Variables (1 minute)
- [ ] Open `.env.local` file in your project
- [ ] Paste your Firebase credentials:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```
- [ ] Save the file

### 4. Enable Authentication (3 minutes)
- [ ] In Firebase Console, go to **Authentication**
- [ ] Click "Get started"
- [ ] Go to **Sign-in method** tab
- [ ] Enable "Email/Password" (toggle ON)
- [ ] Enable "Google" (toggle ON, select support email)
- [ ] Click "Save"

### 5. Create Firestore Database (3 minutes)
- [ ] In Firebase Console, go to **Firestore Database**
- [ ] Click "Create database"
- [ ] Select "Start in production mode"
- [ ] Choose your location (closest to users)
- [ ] Click "Enable"

### 6. Set Firestore Security Rules (2 minutes)
- [ ] Go to **Firestore Database** > **Rules** tab
- [ ] Copy and paste these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```
- [ ] Click "Publish"

### 7. Configure Email Templates (2 minutes)
- [ ] Go to **Authentication** > **Templates** tab
- [ ] Click "Email address verification"
- [ ] Customize (optional):
  - From name: `InfYNova`
  - Subject: `Verify your email for InfYNova`
- [ ] Click "Save"

### 8. Add Authorized Domains (1 minute)
- [ ] Go to **Authentication** > **Settings** tab
- [ ] Scroll to "Authorized domains"
- [ ] Add your production domain if needed
- [ ] `localhost` is already added for development

### 9. Start Development Server (1 minute)
```bash
npm run dev
```
- [ ] Open http://localhost:3000
- [ ] You should see "Sign In" and "Sign Up" buttons in navbar

### 10. Test Authentication (5 minutes)
- [ ] Click "Sign Up"
- [ ] Fill in the form with your email
- [ ] Submit the form
- [ ] Check your email inbox
- [ ] Click the verification link
- [ ] Go back to website
- [ ] Click "Sign In"
- [ ] Enter your credentials
- [ ] You should be signed in!
- [ ] Click on your profile picture
- [ ] Click "Dashboard"
- [ ] View your profile information

## 🎉 You're Done!

Your authentication system is now fully functional!

## 📚 What You Can Do Now

1. **Sign Up Users**: Users can create accounts
2. **Email Verification**: Automatic verification emails
3. **Sign In**: Email/password and Google sign-in
4. **User Dashboard**: View profile and account info
5. **Data Storage**: All user data stored in Firestore
6. **Secure**: Protected with Firebase security rules

## 🔍 Verify Everything Works

### Check Firebase Console:
1. **Authentication** > **Users** - See registered users
2. **Firestore Database** > **users** collection - See user data
3. **Authentication** > **Templates** - Email templates configured

### Check Your Website:
1. Sign up with a test email
2. Receive verification email
3. Click verification link
4. Sign in successfully
5. View dashboard
6. Sign out

## 📖 Need More Help?

- **Detailed Setup**: See `FIREBASE_SETUP.md`
- **Usage Guide**: See `AUTHENTICATION_GUIDE.md`
- **Firebase Docs**: https://firebase.google.com/docs

## ⚠️ Important Notes

- **Never commit** `.env.local` to Git (it's already in .gitignore)
- **Test with real email** to verify email sending works
- **Check spam folder** if verification email doesn't arrive
- **Restart dev server** after adding environment variables

## 🐛 Troubleshooting

### "Firebase not configured"
→ Add credentials to `.env.local` and restart server

### "Email not sending"
→ Check Firebase Console > Authentication > Templates

### "Permission denied"
→ Update Firestore security rules (Step 6)

### Still having issues?
→ Check browser console for error messages
→ Check Firebase Console for errors
→ Review `FIREBASE_SETUP.md` for detailed instructions

---

**Total Setup Time**: ~20 minutes

🎊 Enjoy your new authentication system!
