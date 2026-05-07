// ==========================================
// 1. LOGIKA ANIMASI TAB & SLIDER BIRU
// ==========================================

function moveIndicator(button) {
    const indicator = document.getElementById('tab-indicator');
    if (indicator && button) {
        indicator.style.width = button.offsetWidth + 'px';
        indicator.style.left = button.offsetLeft + 'px';
    }
}

function showTab(tabId, event) {
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => {
        content.classList.remove('active-content');
    });

    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById(tabId).classList.add('active-content');

    if (event) {
        const btn = event.currentTarget;
        btn.classList.add('active');
        moveIndicator(btn);
    }
}

// Inisialisasi posisi awal slider saat web dimuat
document.addEventListener('DOMContentLoaded', () => {
    const projectsTab = document.getElementById('projects');
    if(projectsTab) projectsTab.classList.add('active-content');

    const activeBtn = document.querySelector('.tab-btn.active');
    if(activeBtn) {
        setTimeout(() => {
            moveIndicator(activeBtn);
        }, 100);
    }
});

// Menyesuaikan posisi slider jika layar di-resize
window.addEventListener('resize', () => {
    const activeBtn = document.querySelector('.tab-btn.active');
    if(activeBtn) moveIndicator(activeBtn);
});


// ==========================================
// 2. LOGIKA MODAL / POPUP DETAIL PROJECT
// ==========================================

function openModal(title, desc) {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');

    if (modal && modalTitle && modalDesc) {
        // Mengisi teks judul dan deskripsi ke dalam popup
        modalTitle.innerText = title;
        modalDesc.innerText = desc;
        
        // Memunculkan kotak popup
        modal.style.display = 'flex';
        
        // Jeda sangat tipis untuk memicu animasi CSS 'fade in'
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        // Hapus class 'show' agar animasi fade out jalan
        modal.classList.remove('show');
        
        // Sembunyikan elemen setelah animasi selesai (300ms)
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

// Fitur klik di luar kotak popup untuk menutupnya
window.addEventListener('click', function(event) {
    const modal = document.getElementById('projectModal');
    // Jika area yang diklik adalah background gelap (bukan isi kotaknya)
    if (event.target === modal) {
        closeModal();
    }
});

// ==========================================
// LOGIKA REVEAL CARD PROJECT
// ==========================================
function toggleDetail(button) {
    // 1. Cari elemen .card terdekat dari tombol yang diklik
    const card = button.closest('.card');
    const btnText = button.querySelector('.btn-text');

    // 2. Tambah/Hapus class 'expanded' pada card
    card.classList.toggle('expanded');

    // 3. Ubah teks tombol secara dinamis
    if (card.classList.contains('expanded')) {
        btnText.innerText = 'Tutup Detail';
    } else {
        btnText.innerText = 'Lihat Detail';
    }
}

function openProjectDetail(title, desc) {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');

    if (modal && modalTitle && modalDesc) {
        modalTitle.innerText = title;
        modalDesc.innerText = desc;
        
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
}

function closeProjectDetail() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 500); // Harus sama dengan durasi transisi di CSS
    }
}

// Menutup jika area luar kotak diklik
window.onclick = function(event) {
    const modal = document.getElementById('projectModal');
    if (event.target == modal) {
        closeProjectDetail();
    }
};

// ==========================================
// LOGIKA MODAL / FULL-SCREEN REVEAL DETAIL
// ==========================================

function openProjectDetail(title, desc) {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');

    if (modal && modalTitle && modalDesc) {
        // Isi judul dan deskripsi secara dinamis
        modalTitle.innerText = title;
        modalDesc.innerText = desc;
        
        // Munculkan kontainer overlay (flex)
        modal.style.display = 'flex';
        
        // Jeda tipis untuk memicu transisi smooth meluncur
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
}

function closeProjectDetail() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        // Hilangkan kelas 'show' agar efek transisi mengecil/memudar jalan
        modal.classList.remove('show');
        
        // Sembunyikan elemen setelah transisi selesai (400ms)
        setTimeout(() => {
            modal.style.display = 'none';
        }, 400);
    }
}

// Tutup otomatis jika pengguna mengklik area luar box modal (background gelap)
window.addEventListener('click', function(event) {
    const modal = document.getElementById('projectModal');
    if (event.target === modal) {
        closeProjectDetail();
    }
});

// ==========================================
// CONTROL INTERAKTIF ROADMAP EXPERIENCE
// ==========================================
function activateMilestone(index) {
    // 1. Matikan semua class active di tombol bulat (roadmap-node)
    const nodes = document.querySelectorAll('.roadmap-node');
    nodes.forEach(node => {
        node.classList.remove('active');
    });

    // 2. Matikan semua kartu penjelasan (experience-card)
    const cards = document.querySelectorAll('.experience-card');
    cards.forEach(card => {
        card.classList.remove('active');
    });

    // 3. Cari dan nyalakan tombol serta kartu yang dipilih sesuai urutannya
    const targetNode = document.querySelector(`.node-${index}`);
    const targetCard = document.getElementById(`exp-${index}`);

    if (targetNode && targetCard) {
        targetNode.classList.add('active');
        targetCard.classList.add('active');
    } else {
        console.warn(`Milestone index ${index} tidak berhasil dimuat.`);
    }
}

// ==========================================
// CONTROL INTERAKTIF SUB-TABS SKILLS
// ==========================================
function toggleSubSkill(subTabId, event) {
    // 1. Ambil semua konten sub-skill dan sembunyikan
    const subContents = document.querySelectorAll('.sub-skill-content');
    subContents.forEach(content => {
        content.classList.remove('active-sub-content');
    });

    // 2. Ambil semua tombol sub-tab dan matikan status aktifnya
    const subButtons = document.querySelectorAll('.sub-tab-btn');
    subButtons.forEach(btn => {
        btn.classList.remove('active');
    });

    // 3. Tampilkan sub-konten yang dipilih
    const targetContent = document.getElementById(`sub-${subTabId}`);
    if (targetContent) {
        targetContent.classList.add('active-sub-content');
    }

    // 4. Aktifkan tombol sub-tab yang sedang diklik
    if (event) {
        event.currentTarget.classList.add('active');
    }
}

// ==========================================
// CONTROL VIDEO REVEAL ACHIEVEMENTS FOCUSED
// ==========================================
function toggleAchievementVideo(videoId, button) {
    const videoReveal = document.getElementById(videoId);
    const achievementItem = button.closest('.achievement-focused-item');
    const btnText = button.querySelector('.btn-text');

    if (videoReveal && achievementItem && btnText) {
        const isOpen = videoReveal.classList.contains('open');

        if (!isOpen) {
            videoReveal.classList.add('open');
            achievementItem.classList.add('video-open');
            btnText.innerText = 'Tutup Video Kemenangan';
        } else {
            videoReveal.classList.remove('open');
            achievementItem.classList.remove('video-open');
            btnText.innerText = 'Lihat Video Kemenangan';
            // Matikan video YouTube saat ditutup
            pauseYouTubeVideo(videoReveal);
        }
    }
}

// Fungsi bantu pause YouTube Video
function pauseYouTubeVideo(revealElement) {
    const iframe = revealElement.querySelector('iframe');
    if (iframe) {
        iframe.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
    }
}
// 1. FUNGSI TOGGLE MATA (REVEAL PASSWORD)
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('exp-password-input');
    const eyeIcon = document.getElementById('toggle-password-eye');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.classList.replace('bx-hide', 'bx-show'); // Mata terbuka
    } else {
        passwordInput.type = 'password';
        eyeIcon.classList.replace('bx-show', 'bx-hide'); // Mata tertutup (berkedip)
    }
}

// 2. FUNGSI VERIFIKASI PASSWORD
function verifyExperiencePassword() {
    const input = document.getElementById('exp-password-input');
    const error = document.getElementById('password-error');
    const box = document.getElementById('password-box');
    const lockScreen = document.getElementById('experience-lock-screen');
    const content = document.getElementById('experience-hidden-content');

    const RAHASIA = "r@h4514"; // <--- PASSWORD KAMU

    if (input.value === RAHASIA) {
        // Jika Benar
        lockScreen.style.opacity = "0";
        setTimeout(() => {
            lockScreen.style.display = "none";
            content.classList.add('unlocked');
        }, 500);
    } else {
        // Jika Salah
        error.style.display = "block";
        box.classList.add('shake-error');
        setTimeout(() => box.classList.remove('shake-error'), 400);
        input.value = "";
    }
}

// Tambahkan fungsi tekan Enter
document.getElementById('exp-password-input')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') verifyExperiencePassword();
});

// ==========================================
// SYSTEM AUTO-LOCK 30 DETIK (EXPERIENCE)
// ==========================================
let autoLockTimer;
const expSection = document.getElementById('experience');

// Observer untuk mendeteksi kapan user pindah tab (Tab Experience hilang dari layar)
const tabObserver = new MutationObserver(() => {
    // Mengecek apakah tab Experience sedang disembunyikan (display: none)
    const isHidden = window.getComputedStyle(expSection).display === 'none';
    
    if (isHidden) {
        // JIKA USER KELUAR TAB: Mulai hitung mundur 30 detik (30.000 ms)
        clearTimeout(autoLockTimer); // Reset timer sebelumnya (jaga-jaga)
        autoLockTimer = setTimeout(() => {
            relockExperience(); // Kunci kembali setelah 30 detik
        }, 30000); 
    } else {
        // JIKA USER KEMBALI KE TAB SEBELUM 30 DETIK: Batalkan timer penguncian
        clearTimeout(autoLockTimer);
    }
});

// Aktifkan pengamat (observer) ke tab Experience
if (expSection) {
    tabObserver.observe(expSection, { attributes: true, attributeFilter: ['class', 'style'] });
}

// Fungsi Eksekutor untuk Mengunci Kembali Roadmap
function relockExperience() {
    const lockScreen = document.getElementById('experience-lock-screen');
    const hiddenContent = document.getElementById('experience-hidden-content');
    const passwordInput = document.getElementById('exp-password-input');
    const errorMsg = document.getElementById('password-error');

    if (lockScreen && hiddenContent) {
        // 1. Munculkan lagi modal gemboknya secara halus
        lockScreen.style.display = 'flex';
        setTimeout(() => { lockScreen.style.opacity = '1'; }, 50);
        
        // 2. Sembunyikan dan blur lagi roadmap-nya
        hiddenContent.classList.remove('unlocked');
        
        // 3. Bersihkan sisa ketikan password sebelumnya
        if (passwordInput) passwordInput.value = '';
        if (errorMsg) errorMsg.style.display = 'none';
        
        // 4. Pastikan mata tertutup (jika sebelumnya diset ke mode terlihat)
        const eyeIcon = document.getElementById('toggle-password-eye');
        if (passwordInput && passwordInput.type === 'text') {
            passwordInput.type = 'password';
            if (eyeIcon) eyeIcon.classList.replace('bx-show', 'bx-hide');
        }
    }
}
function moveIndicator(button) {
    const indicator = document.getElementById('tab-indicator');
    if (indicator && button) {
        indicator.style.width = button.offsetWidth + 'px';
        indicator.style.left = button.offsetLeft + 'px';
        // Tambahan wajib agar slider bisa meluncur naik-turun antar baris di HP
        indicator.style.top = button.offsetTop + 'px';
        indicator.style.height = button.offsetHeight + 'px';
    }
}

function showTab(tabId, event) {
    // 1. Ganti konten tab yang aktif
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => {
        content.classList.remove('active-content');
    });

    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById(tabId).classList.add('active-content');

    if (event) {
        const btn = event.currentTarget;
        btn.classList.add('active');
        moveIndicator(btn);
    }

    // 2. LOGIKA MENGGANTI JUDUL DINAMIS
    const titleElement = document.getElementById('dynamic-title');
    if (titleElement) {
        // Berikan efek memudar hilang (opacity 0)
        titleElement.style.opacity = 0;

        // Tunggu sebentar (150ms) sampai teks menghilang, lalu ganti teksnya
        setTimeout(() => {
            switch(tabId) {
                case 'projects':
                    titleElement.innerText = 'My Projects';
                    break;
                case 'experience':
                    titleElement.innerText = 'Work Experience';
                    break;
                case 'skills':
                    titleElement.innerText = 'Skills & Tools';
                    break;
                case 'clients':
                    titleElement.innerText = 'Client Partners';
                    break;
                case 'achievements':
                    titleElement.innerText = 'Achievements & Awards';
                    break;
                default:
                    titleElement.innerText = 'Juxone Portfolio';
            }
            // Munculkan kembali teksnya (opacity 1)
            titleElement.style.opacity = 1;
        }, 150); // Waktu jeda harus lebih cepat dari transisi CSS
    }
}
function showTab(tabId, event) {
    // 1. Ganti konten tab yang aktif
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => {
        content.classList.remove('active-content');
    });

    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById(tabId).classList.add('active-content');

    if (event) {
        const btn = event.currentTarget;
        btn.classList.add('active');
        moveIndicator(btn);
    }

    // 2. LOGIKA MENGGANTI JUDUL DINAMIS
    const titleElement = document.getElementById('dynamic-title');
    if (titleElement) {
        titleElement.style.opacity = 0;
        setTimeout(() => {
            switch(tabId) {
                case 'projects':
                    titleElement.innerText = 'My Projects';
                    break;
                case 'experience':
                    titleElement.innerText = 'Work Experience';
                    break;
                case 'skills':
                    titleElement.innerText = 'Skills & Tools';
                    break;
                case 'clients':
                    titleElement.innerText = 'Client Partners';
                    break;
                case 'achievements':
                    titleElement.innerText = 'Achievements ';
                    break;
                default:
                    titleElement.innerText = 'Juxone Portfolio';
            }
            titleElement.style.opacity = 1;
        }, 150); 
    }

    // 3. LOGIKA AUTO-SCROLL (MELUNCUR) KHUSUS DI HP
    if (window.innerWidth <= 768) {
        const portfolioSection = document.getElementById('portfolio');
        if (portfolioSection) {
            // Memberikan sedikit delay agar transisi konten selesai dulu
            setTimeout(() => {
                // yOffset = jarak aman dari header atas agar judul tidak tertutup (bisa kamu ubah angkanya kalau kurang pas)
                const yOffset = -70; 
                const y = portfolioSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                
                window.scrollTo({top: y, behavior: 'smooth'});
            }, 150);
        }
    }
}

// ==========================================
// ⌨️ EFEK NGETIK (TYPING ANIMATION) HERO TITLE
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const title = document.querySelector(".hero-title");
    
    if (title) {
        title.innerHTML = ""; // Kosongkan teks bawaan HTML agar bisa diketik ulang dari nol
        
        const part1 = "Hi, I'm ";
        const part2 = "Junnn";
        let currentText = "";
        let i = 0;
        let j = 0;
        
        function typeWriter() {
            // 1. Ketik teks putih "Hi, I'm " terlebih dahulu
            if (i < part1.length) {
                currentText += part1.charAt(i);
                title.innerHTML = currentText;
                i++;
                setTimeout(typeWriter, 100); // Kecepatan ngetik (100ms per huruf)
            } 
            // 2. Ketik nama "Jujun" dengan warna cyan
            else if (j < part2.length) {
                let coloredText = part2.substring(0, j + 1);
                // Membungkus nama Jujun dengan span warna biru
                title.innerHTML = currentText + "<span style='color: #06b6d4;'>" + coloredText + "</span>";
                j++;
                setTimeout(typeWriter, 150); // Nama diketik sedikit lebih lambat biar dramatis
            }
        }
        
        // Tunggu 0.8 detik (menunggu animasi header turun dari atas selesai), baru mulai ngetik!
        setTimeout(typeWriter, 800); 
    }
});

// === 4. JS UNTUK OPEN/CLOSE FOTO POPUP ACHIEVEMENTS ===

function openImageModal(imgSrc) {
    const modal = document.getElementById('imageModal');
    const largeImg = document.getElementById('largeImage');

    if (modal && largeImg) {
        largeImg.src = imgSrc; // Set sumber gambar di modal
        modal.style.display = 'flex'; // Munculkan overlay
        setTimeout(() => {
            modal.classList.add('show'); // Trigger animasi muncul
        }, 10);
    }
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.classList.remove('show'); // Trigger animasi hilang
        setTimeout(() => {
            modal.style.display = 'none'; // Sembunyikan overlay
        }, 400); // Waktu tunggu sesuai durasi transisi CSS
    }
}

// Tambahkan listener untuk menutup modal jika area luar gambar diklik
window.addEventListener('click', function(event) {
    const imageModal = document.getElementById('imageModal');
    if (event.target === imageModal) {
        closeImageModal();
    }
});

// ==========================================
// 2. LOGIKA DETAIL MODAL PROJECT
// ==========================================
function openProjectDetail(title, desc, imgSrc) {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalImage = document.getElementById('modal-image'); // Penangkap gambar

    if (modal && modalTitle && modalDesc) {
        modalTitle.innerText = title;
        modalDesc.innerText = desc;
        
        // Memasukkan gambar ke dalam popup modal
        if (imgSrc && modalImage) {
            modalImage.src = imgSrc;
        }

        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
}

// ==========================================
// ⭐ SISTEM RATING, NAMA & KOMENTAR (FINAL)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const stars = document.querySelectorAll('.star-btn');
    const submittedBox = document.getElementById('submitted-rating-display');
    const starsResult = document.getElementById('stars-result');
    const commentResult = document.getElementById('comment-result');
    const ratingInputBox = document.getElementById('rating-input-box');
    const commentSection = document.getElementById('comment-section');
    const submitBtn = document.getElementById('submit-rating-btn');
    const commentInput = document.getElementById('rating-comment');
    const nameInput = document.getElementById('rating-name'); // Penangkap nama baru

    let currentSelectedRating = 0;

    // 1. Cek Data Tersimpan
    const savedData = JSON.parse(localStorage.getItem('juxoneRatingData'));
    if (savedData) {
        currentSelectedRating = savedData.rating;
        showSubmittedRating(savedData.rating, savedData.comment, savedData.name);
        setStarsActive(currentSelectedRating);
    }

    // 2. Interaksi Bintang
    stars.forEach((star, index) => {
        star.addEventListener('mouseover', () => { highlightStars(index + 1); });
        star.addEventListener('mouseout', () => { highlightStars(currentSelectedRating); });

        star.addEventListener('click', () => {
            currentSelectedRating = star.getAttribute('data-value');
            setStarsActive(currentSelectedRating);
            commentSection.classList.remove('hidden');
        });
    });

    // 3. Tombol Kirim
    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            if (currentSelectedRating === 0) return alert("Pilih bintang dulu ya!");
            
            const commentText = commentInput.value.trim();
            const nameText = nameInput.value.trim();
            
            // Simpan Data
            const ratingData = { rating: currentSelectedRating, comment: commentText, name: nameText };
            localStorage.setItem('juxoneRatingData', JSON.stringify(ratingData));
            
            // Tampilkan
            showSubmittedRating(ratingData.rating, ratingData.comment, ratingData.name);
        });
    }

    // --- Fungsi Bantuan ---
    function highlightStars(count) {
        stars.forEach((s, i) => {
            if (i < count) { s.classList.replace('bx-star', 'bxs-star'); s.classList.add('hovered'); } 
            else { s.classList.replace('bxs-star', 'bx-star'); s.classList.remove('hovered'); }
        });
    }

    function setStarsActive(count) {
        stars.forEach((s, i) => {
            if (i < count) { s.classList.replace('bx-star', 'bxs-star'); s.classList.add('active'); } 
            else { s.classList.replace('bxs-star', 'bx-star'); s.classList.remove('active'); }
        });
    }

    function showSubmittedRating(rating, comment, name) {
        submittedBox.classList.remove('hidden');
        submittedBox.classList.add('show');
        
        ratingInputBox.querySelector('h3').innerText = "Ubah Penilaian";
        ratingInputBox.querySelector('p').innerText = "Kamu bisa memperbarui rating kapan saja.";
        
        starsResult.innerHTML = '';
        for (let i = 1; i <= 5; i++) {
            starsResult.innerHTML += i <= rating ? `<i class='bx bxs-star'></i>` : `<i class='bx bx-star'></i>`;
        }

        // Tampilkan Nama & Komentar
        let displayName = name ? name : "Seseorang"; // Kalau kosong, ganti jadi "Seseorang"
        let displayComment = comment ? `"${comment}"` : "Telah memberikan penilaian.";

        commentResult.innerHTML = `<span class="submitted-name"><i class='bx bxs-user-circle'></i> ${displayName}</span> ${displayComment}`;
        commentResult.style.display = 'block';
        
        // Kembalikan isi form buat jaga-jaga kalau mau diedit
        if (commentInput) commentInput.value = comment || "";
        if (nameInput) nameInput.value = name || "";
        
        commentSection.classList.remove('hidden');
        submitBtn.innerText = "Perbarui Penilaian";
    }
});

// ==========================================
// ⭐ SISTEM RATING GLOBAL FIREBASE
// ==========================================

// 1. MASUKKAN KONFIGURASI FIREBASE KAMU DI SINI
const firebaseConfig = {
    apiKey: "AIzaSyCKgGLBmSLCvJYBWKRvr2Qq2_ul6PR2wAM",
    authDomain: "portofolio-jujun.firebaseapp.com",
    projectId: "portofolio-jujun",
    storageBucket: "portofolio-jujun.firebasestorage.app",
    messagingSenderId: "865625274287",
    appId: "1:865625274287:web:792bfbe2f65bad955a215a",
    measurementId: "G-Z4LYETCBXH"

};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.addEventListener("DOMContentLoaded", () => {
    const stars = document.querySelectorAll('.star-btn');
    const commentSection = document.getElementById('comment-section');
    const submitBtn = document.getElementById('submit-rating-btn');
    const commentInput = document.getElementById('rating-comment');
    const nameInput = document.getElementById('rating-name');
    const globalCommentsList = document.getElementById('global-comments-list');

    let currentSelectedRating = 0;

    // 2. Trik Hover & Klik Bintang (Sama seperti sebelumnya)
    stars.forEach((star, index) => {
        star.addEventListener('mouseover', () => { highlightStars(index + 1); });
        star.addEventListener('mouseout', () => { highlightStars(currentSelectedRating); });
        star.addEventListener('click', () => {
            currentSelectedRating = star.getAttribute('data-value');
            setStarsActive(currentSelectedRating);
            commentSection.classList.remove('hidden');
        });
    });

    // 3. Simpan ke Database Firebase saat diklik Kirim
    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            if (currentSelectedRating === 0) return alert("Pilih bintang dulu ya!");
            if (commentInput.value.trim() === "") return alert("Mohon isi komentarnya sedikit ya!");
            
            submitBtn.innerText = "Mengirim..."; // Efek loading
            
            // Perintah tembak data ke Firebase
            db.collection("portfolio_reviews").add({
                name: nameInput.value.trim() || "Seseorang",
                comment: commentInput.value.trim(),
                rating: parseInt(currentSelectedRating),
                timestamp: firebase.firestore.FieldValue.serverTimestamp() // Waktu otomatis
            })
            .then(() => {
                // Berhasil! Bersihkan form
                alert("Penilaian berhasil dikirim! Terima kasih.");
                nameInput.value = "";
                commentInput.value = "";
                currentSelectedRating = 0;
                setStarsActive(0);
                commentSection.classList.add('hidden');
                submitBtn.innerText = "Kirim Penilaian";
            })
            .catch((error) => {
                alert("Gagal mengirim: " + error.message);
                submitBtn.innerText = "Kirim Penilaian";
            });
        });
    }

    // 4. Tarik Semua Data dari Firebase (Real-time!)
    db.collection("portfolio_reviews")
      .orderBy("timestamp", "desc") // Urutkan dari yang terbaru
      .onSnapshot((querySnapshot) => {
        
        // Kalau ada data, hapus teks "Belum ada penilaian"
        if (!querySnapshot.empty) {
            globalCommentsList.innerHTML = ""; 
        }

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            
            // Bikin ikon bintang sesuai angka
            let starsHTML = "";
            for(let i=1; i<=5; i++) {
                starsHTML += i <= data.rating ? "<i class='bx bxs-star'></i>" : "<i class='bx bx-star'></i>";
            }

            // Rakit kotak HTML untuk tiap komentar
            const commentItem = `
                <div class="global-comment-item">
                    <div class="g-comment-header">
                        <span class="g-name"><i class='bx bxs-user-circle'></i> ${data.name}</span>
                        <span class="g-stars">${starsHTML}</span>
                    </div>
                    <p class="g-text">"${data.comment}"</p>
                </div>
            `;
            
            // Masukkan ke layar
            globalCommentsList.innerHTML += commentItem;
        });
    });

    // --- Fungsi Bantuan Bintang ---
    function highlightStars(count) {
        stars.forEach((s, i) => {
            if (i < count) { s.classList.replace('bx-star', 'bxs-star'); s.classList.add('hovered'); } 
            else { s.classList.replace('bxs-star', 'bx-star'); s.classList.remove('hovered'); }
        });
    }

    function setStarsActive(count) {
        stars.forEach((s, i) => {
            if (i < count) { s.classList.replace('bx-star', 'bxs-star'); s.classList.add('active'); } 
            else { s.classList.replace('bxs-star', 'bx-star'); s.classList.remove('active'); }
        });
    }
});

/* --- TRICK ANTI COPAS (UNTUK ORANG AWAM) --- */
// Matikan Klik Kanan
document.addEventListener('contextmenu', event => event.preventDefault());

// Matikan tombol keyboard F12, Ctrl+Shift+I, Ctrl+Shift+J, dan Ctrl+U (View Source)
document.onkeydown = function (e) {
    if (e.keyCode == 123 || 
       (e.ctrlKey && e.shiftKey && (e.keyCode == 'I'.charCodeAt(0) || e.keyCode == 'J'.charCodeAt(0))) || 
       (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0))) {
        return false;
    }
};
