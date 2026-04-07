import admin from 'firebase-admin';

// In a real scenario, you'd provide service account credentials via env
// For now, we'll initialize with default credentials or a project ID if provided
const serviceAccountRaw = process.env.FIREBASE_SERVICE_ACCOUNT;
let serviceAccount: any = undefined;

if (serviceAccountRaw && serviceAccountRaw !== 'path/to/service-account.json') {
  try {
    serviceAccount = JSON.parse(serviceAccountRaw);
  } catch (err) {
    console.warn('FIREBASE_SERVICE_ACCOUNT is set but not valid JSON. Falling back to default.');
  }
}

if (!admin.apps.length) {
  let credential;
  
  if (serviceAccount) {
    console.log('Firebase Admin: Using Service Account JSON from FIREBASE_SERVICE_ACCOUNT.');
    credential = admin.credential.cert(serviceAccount);
  } else {
    // Check if the placeholder is in the environment
    const placeholder = 'path/to/service-account.json';
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS === placeholder) {
      console.warn('Firebase Admin: Detected placeholder for GOOGLE_APPLICATION_CREDENTIALS. Removing to prevent crash.');
      delete process.env.GOOGLE_APPLICATION_CREDENTIALS;
    }
    
    console.log('Firebase Admin: Using Application Default Credentials.');
    credential = admin.credential.applicationDefault();
  }

  admin.initializeApp({
    credential,
  });
}

export const auth = admin.auth();
export default admin;
