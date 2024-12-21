// Firebase setup (add your Firebase config here)
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

// Trigger the file input
function triggerFileInput() {
    document.getElementById('fileInput').click();
}

// Load and display the uploaded image
function loadImage(event) {
    const file = event.target.files[0];
    const profileImg = document.getElementById('profileImg');

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            profileImg.src = e.target.result;
        };
        reader.readAsDataURL(file);

        // Upload image to Firebase Storage
        const storageRef = storage.ref('profile_pictures/admin.jpg');
        storageRef.put(file).then(() => {
            alert('Profile picture uploaded successfully!');
        });
    }
}

// Retrieve profile picture on load
window.onload = function () {
    const profileImg = document.getElementById('profileImg');
    const storageRef = storage.ref('profile_pictures/admin.jpg');

    storageRef.getDownloadURL().then((url) => {
        profileImg.src = url;
    }).catch(() => {
        console.log("No profile picture found.");
    });
};
