// 1. Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAlbRzPaXf4Tw_f9oFM39Ca4Un0GsyvFeI",
  authDomain: "muul-lab.firebaseapp.com",
  databaseURL: "https://muul-lab-default-rtdb.firebaseio.com",
  projectId: "muul-lab",
  storageBucket: "muul-lab.firebasestorage.app",
  messagingSenderId: "289981524698",
  appId: "1:289981524698:web:f58c296609ca0bd4d253e3",
  measurementId: "G-HBM6XEERZR"
};

// 2. Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();

// 3. Hakikisha Page Ime-load kabla ya kuanza
window.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('uploadForm');

    if (uploadForm) {
        console.log("Admin System: Tayari kupokea video!");

        uploadForm.addEventListener('submit', function(e) {
            // HII NI MUHIMU: Inazuia page isijirefresh (isifute details)
            e.preventDefault(); 
            
            console.log("Kitufe kimebonyezwa, inaanza kupakia...");

            // Pata data
            const movieData = {
                id: Date.now(),
                title: document.getElementById('title').value,
                videoUrl: document.getElementById('videoUrl').value,
                poster: document.getElementById('poster').value,
                type: document.getElementById('type').value,
                isTrending: document.getElementById('isTrending').checked,
                isRecent: document.getElementById('isRecent').checked,
                views: 0,
                uploadedAt: new Date().toLocaleDateString('en-GB')
            };

            // Tuma Firebase
            database.ref('movies/').push(movieData)
                .then(() => {
                    console.log("Imefanikiwa!");
                    alert("MUUH Lab: Kazi imepakiwa Cloud! 🔥");
                    uploadForm.reset(); // Inafuta details BAADA ya kufanikiwa tu
                })
                .catch((error) => {
                    console.error("Firebase Error:", error);
                    alert("Imefeli: " + error.message);
                });
        });
    } else {
        console.error("MUUH Error: Form ya 'uploadForm' haikuonekana!");
    }
});