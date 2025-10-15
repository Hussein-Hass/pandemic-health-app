import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBHTTbLJbKUbvIj7amzeCmsRMKT5UtaknE",
  authDomain: "pandemic-health.firebaseapp.com",
  projectId: "pandemic-health",
  storageBucket: "pandemic-health.appspot.com",
  messagingSenderId: "80746170325",
  appId: "1:80746170325:web:2ec82c7c1711a38be85f5c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function createAdminAccount() {
  try {
    // Create admin account in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, "admin@example.com", "Admin@123");
    const user = userCredential.user;

    // Add admin details to Firestore
    await setDoc(doc(db, "users", user.uid), {
      name: "Admin User",
      email: "admin@smartkode.com",
      role: "admin",
      createdAt: new Date().toISOString()
    });

    console.log("Admin account created successfully!");
  } catch (err) {
    console.error("Error creating admin account:", err.message);
  }
}

createAdminAccount();