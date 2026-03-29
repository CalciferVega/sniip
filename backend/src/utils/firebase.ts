import admin from 'firebase-admin';

// In a real scenario, you'd provide service account credentials via env
// For now, we'll initialize with default credentials or a project ID if provided
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  : undefined;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: serviceAccount ? admin.credential.cert(serviceAccount) : admin.credential.applicationDefault(),
  });
}

export const auth = admin.auth();
export default admin;
