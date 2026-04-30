{
  "hosting": {
    "public": "public",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ]
  }
}
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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Global references (zinatumika kwenye app.js, player.js, admin.js)
const db   = firebase.firestore();
const auth = firebase.auth();

// =============================================
// FIRESTORE DATA STRUCTURE:
//
// /series/{seriesId}
//   - title:       string   (jina la series)
//   - description: string   (maelezo)
//   - genre:       string   (Drama, Action, Comedy, ...)
//   - poster:      string   (URL ya picha)
//   - year:        string   (mwaka, e.g. "2025")
//   - createdAt:   Timestamp
//
// /series/{seriesId}/episodes/{episodeId}
//   - title:         string  (jina la episode)
//   - youtubeId:     string  (YouTube video ID au URL kamili)
//   - episodeNumber: number  (nambari ya episode)
//   - duration:      string  (e.g. "45 min") — optional
//   - createdAt:     Timestamp
// =============================================