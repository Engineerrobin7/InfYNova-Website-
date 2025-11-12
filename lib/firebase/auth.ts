import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  updateProfile,
  User,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './config';
import { trackSignUp, trackSignIn } from '../analytics';

export interface UserData {
  uid: string;
  email: string;
  displayName: string;
  phoneNumber?: string;
  createdAt: any;
  emailVerified: boolean;
  lastLogin: any;
}

// Sign up with email and password
export const signUpWithEmail = async (
  email: string,
  password: string,
  displayName: string,
  phoneNumber?: string
) => {
  if (!auth || !db) {
    throw new Error('Firebase is not configured. Please add your Firebase credentials to .env.local');
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update profile with display name
    await updateProfile(user, { displayName });

    // Send email verification
    await sendEmailVerification(user);

    // Store user data in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      displayName,
      phoneNumber: phoneNumber || null,
      createdAt: serverTimestamp(),
      emailVerified: false,
      lastLogin: serverTimestamp(),
    });

    // Track sign-up in analytics
    trackSignUp('email');

    return { user, success: true };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Sign in with email and password
export const signInWithEmail = async (email: string, password: string) => {
  if (!auth || !db) {
    throw new Error('Firebase is not configured. Please add your Firebase credentials to .env.local');
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update last login
    await setDoc(
      doc(db, 'users', user.uid),
      { lastLogin: serverTimestamp() },
      { merge: true }
    );

    // Track sign-in in analytics
    trackSignIn('email');

    return { user, success: true };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Sign in with Google
export const signInWithGoogle = async () => {
  if (!auth || !db) {
    throw new Error('Firebase is not configured. Please add your Firebase credentials to .env.local');
  }

  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    // Check if user exists in Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));

    if (!userDoc.exists()) {
      // Create new user document
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        phoneNumber: user.phoneNumber || null,
        createdAt: serverTimestamp(),
        emailVerified: user.emailVerified,
        lastLogin: serverTimestamp(),
      });
      
      // Track sign-up for new user
      trackSignUp('google');
    } else {
      // Update last login
      await setDoc(
        doc(db, 'users', user.uid),
        { lastLogin: serverTimestamp() },
        { merge: true }
      );
      
      // Track sign-in for existing user
      trackSignIn('google');
    }

    return { user, success: true };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Sign out
export const logOut = async () => {
  if (!auth) {
    throw new Error('Firebase is not configured. Please add your Firebase credentials to .env.local');
  }

  try {
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Resend verification email
export const resendVerificationEmail = async (user: User) => {
  try {
    await sendEmailVerification(user);
    return { success: true };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Get user data from Firestore
export const getUserData = async (uid: string): Promise<UserData | null> => {
  if (!db) {
    throw new Error('Firebase is not configured. Please add your Firebase credentials to .env.local');
  }

  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    }
    return null;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
