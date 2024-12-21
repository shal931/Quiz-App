import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBbyUU6CWiEcA4ZPCUnbnQM7DcHF3QM2JA",
  authDomain: "quiz-af9ee.firebaseapp.com",
  projectId: "quiz-af9ee",
  storageBucket: "quiz-af9ee.firebasestorage.app",
  messagingSenderId: "1078533831139",
  appId: "1:1078533831139:web:9a525c5fbd3311306088d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
 

//submit button
const submit = document.getElementById('submit');
submit.addEventListener("click", async function(event){
    event.preventDefault()

    //inputs
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;
    
try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Retrieve user role from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
        const userData = userDoc.data();
        const role = userData.role;

        // Redirect to respective homepage
        if (role === "admin") {
            window.location.href = "admin_home.html";
        } else if (role === "student") {
            window.location.href = "student_home.html";
        } else {
            alert("Unknown role. Please contact support.");
        }
    } else {
        alert("No user data found.");
    }
} catch (error) {
    alert("Error: " + error.message);
}
});