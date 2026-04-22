/**
 * MASTER COMPONENT: Firebase Lite Connector
 * Logic: Optimized for speed and small bundle size.
 * Features: Auth, Firestore persistence.
 */
import { initializeApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";

const firebaseConfig = {
  // Config provided via directives.md at runtime
};

export const initFirebase = (config) => {
  const app = initializeApp(config || firebaseConfig);
  const db = getFirestore(app);
  
  // Offline persistence for robustness
  enableIndexedDbPersistence(db).catch((err) => {
    console.warn("Firebase persistence failed:", err.code);
  });
  
  return { app, db };
};
