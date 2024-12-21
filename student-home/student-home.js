// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbyUU6CWiEcA4ZPCUnbnQM7DcHF3QM2JA",
  authDomain: "quiz-af9ee.firebaseapp.com",
  projectId: "quiz-af9ee",
  storageBucket: "quiz-af9ee.firebasestorage.app",
  messagingSenderId: "1078533831139",
  appId: "1:1078533831139:web:9a525c5fbd3311306088d6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const db = firebase.firestore();

// Trigger file input on image click
function triggerFileInput() {
  document.getElementById('fileInput').click();
}

// Upload and display the profile image
function loadImage(event) {
  const file = event.target.files[0];
  const profileImg = document.getElementById('profileImg');
  const storageRef = storage.ref(`profile_pictures/${file.name}`);

  if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
          profileImg.src = e.target.result; // Show the image locally
      };
      reader.readAsDataURL(file);

      // Upload image to Firebase Storage
      storageRef.put(file).then(() => {
          storageRef.getDownloadURL().then((url) => {
              profileImg.src = url;
              localStorage.setItem("profileImageUrl", url); // Save for persistence
              console.log("Profile picture uploaded successfully.");
          });
      });
  }
}

// Fetch and display profile image on load
document.addEventListener("DOMContentLoaded", () => {
  const profileImg = document.getElementById('profileImg');
  const savedImageUrl = localStorage.getItem("profileImageUrl");

  if (savedImageUrl) {
      profileImg.src = savedImageUrl;
  }
});
