// 1. Firebase Config - Iweke mara moja tu
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

// 2. Washa Firebase kwa usalama
try {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
} catch (e) {
    console.error("Firebase initialization failed", e);
}

const database = firebase.database();

// 3. LOGIC YA SPLASH SCREEN (Hii ndio mchawi)
function hideSplash() {
    const splash = document.getElementById('splash-screen');
    const loader = document.getElementById('loader'); // Kwa sababu unayo loader kwenye index
    
    if (splash) {
        splash.style.transition = "opacity 0.5s ease";
        splash.style.opacity = '0';
        setTimeout(() => {
            splash.style.display = 'none';
            if (loader) loader.style.display = 'none'; // Hakikisha loader pia inatoka
            console.log("MUUH Lab: Splash and Loader hidden.");
        }, 500);
    }
}

// Hii itazima Splash Screen hata kama mambo mengine yamefeli
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(hideSplash, 2000); // Sekunde 2 Splash inatoka lazima
    loadMUUHApp();
});

// 4. Kupata Data
function loadMUUHApp() {
    console.log("Inasoma data kutoka Firebase...");
    database.ref('movies/').on('value', (snapshot) => {
        const data = snapshot.val();
        let moviesArray = [];
        if (data) {
            for (let id in data) {
                moviesArray.push({ firebaseId: id, ...data[id] });
            }
            renderMUUHGrids(moviesArray);
        }
    }, (error) => {
        console.error("Firebase read error: ", error);
    });
}

// 5. Kupanga kwenye Screen
function renderMUUHGrids(movies) {
    const recentGrid = document.getElementById('recent-grid');
    const trendingGrid = document.getElementById('trending-grid');
    const shortsGrid = document.getElementById('shorts-grid');
    const seriesGrid = document.getElementById('series-grid');

    // Safisha kwanza
    if(recentGrid) recentGrid.innerHTML = '';
    if(trendingGrid) trendingGrid.innerHTML = '';
    if(shortsGrid) shortsGrid.innerHTML = '';
    if(seriesGrid) seriesGrid.innerHTML = '';

    movies.forEach(movie => {
        const card = `
            <div class="series-card" onclick="window.location.href='player.html?id=${movie.firebaseId}'">
                <div class="card-img-container">
                    <img src="${movie.poster}" alt="${movie.title}" onerror="this.src='https://via.placeholder.com/200x300?text=MUUH+LAB'">
                </div>
                <div class="series-info" style="padding:10px;">
                    <h3 style="font-size:14px;">${movie.title}</h3>
                    <p style="font-size:11px; color:var(--gold);">${movie.views || 0} Views</p>
                </div>
            </div>
        `;

        // Panga kulingana na checkbox kule Admin
        if (movie.isRecent && recentGrid) recentGrid.innerHTML += card;
        if (movie.isTrending && trendingGrid) trendingGrid.innerHTML += card;
        
        // Panga kulingana na Aina
        if (movie.type === 'short' && shortsGrid) {
            shortsGrid.innerHTML += card;
        } else if (movie.type === 'movie' && seriesGrid) {
            seriesGrid.innerHTML += card;
        }
    });
}