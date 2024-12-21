import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

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
const role = document.getElementById('role').value; // Get role from dropdown   
const username = document.getElementById('username').value;

try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user role to Firestore
    await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: role,
        username: username
    });

    alert("Account created successfully!");

    // Redirect to respective homepage
    if (role === "admin") {
        window.location.href = "./admin-home/admin_home.html";
    } else {
        window.location.href = "./student-home/student_home.html";
    }
} catch (error) {
    alert("Error: " + error.message);
}
});