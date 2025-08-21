// gallery.js

// Album data
const albumsData = {
  university: [
    { src: "./images/u1.jpg"},
    { src: "./images/u2.jpg"},
    { src: "./images/u3.jpg"},
    { src: "./images/u4.jpg"},
    { src: "./images/u5.jpg"},
    { src: "./images/u6.jpg"},
    { src: "./images/u7.jpg"},
    { src: "./images/u8.jpg"},
    { src: "./images/u9.jpg"},
    { src: "./images/u10.jpg"},
    { src: "./images/u11.jpg"},
    { src: "./images/u12.jpg"},
    { src: "./images/u13.jpg"},
    { src: "./images/u14.jpg"},
    { src: "./images/u15.jpg"}
  ],
  friends: [
    { src: "./images/u10.jpg"},
    { src: "./images/f1.jpg"},
    { src: "./images/f2.jpg" },
    { src: "./images/f3.jpg"},
    { src: "./images/f4.jpg"},
    { src: "./images/f5.jpg"},
    { src: "./images/f6.jpg"},
    { src: "./images/f7.jpg"},
    { src: "./images/f8.jpg"}
  ],
  
  travel: [
    { src: "./images/t1.png"},
    { src: "./images/t2.jpg"},
    { src: "./images/t3.jpg"},
    { src: "./images/t4.jpg"},
    { src: "./images/t5.jpg"},
    { src: "./images/t6.jpg"},
    { src: "./images/t7.jpg"},
    { src: "./images/t8.jpg"},
    { src: "./images/t9.jpg"},
    { src: "./images/t10.jpg"},
    { src: "./images/t11.jpg"},
    { src: "./images/t12.jpg"},
    { src: "./images/t13.jpg"},
  ]
};

const albumsContainer = document.getElementById("albums");
const loader = document.getElementById("loader");

// Lightbox elements
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const closeBtn = document.querySelector(".lightbox .close");
const prevBtn = document.querySelector(".lightbox .prev");
const nextBtn = document.querySelector(".lightbox .next");

let currentAlbum = [];
let currentIndex = 0;

// Preload images and log status
function preloadImages(album) {
  const albumData = albumsData[album];
  let loaded = 0;

  return new Promise((resolve) => {
    albumData.forEach((item) => {
      const img = new Image();
      img.src = item.src;
      img.onload = () => {
        loaded++;
        console.log("✅ Loaded:", item.src);
        if (loaded === albumData.length) resolve();
      };
      img.onerror = () => {
        console.error("❌ Failed to load:", item.src);
        loaded++;
        if (loaded === albumData.length) resolve();
      };
    });
  });
}

// Show album
async function showAlbum(album) {
  loader.style.display = "flex"; // spinner visible
  albumsContainer.innerHTML = "";

  currentAlbum = albumsData[album]; // store current album

  // Preload first, then show
  await preloadImages(album);

  // After all images are loaded → build UI
  const container = document.createElement("div");
  container.classList.add("album-container", "active");

  currentAlbum.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("gallery-item");

    // Keep image hidden until load
    const img = document.createElement("img");
    img.alt = item.caption;
    img.classList.add("hidden");

    img.onload = () => {
      img.classList.remove("hidden");
      img.classList.add("fade-in");
    };

    img.src = item.src; // set AFTER listener, so we catch load event

    const caption = document.createElement("div");
    caption.classList.add("caption");
    caption.textContent = item.caption;

    div.appendChild(img);
    div.appendChild(caption);

    div.addEventListener("click", () => openLightbox(index));
    container.appendChild(div);
  });

  loader.style.display = "none"; // hide loader
  albumsContainer.appendChild(container);
}

// Open lightbox
function openLightbox(index) {
  currentIndex = index;
  lightbox.style.display = "flex";
  updateLightbox();
}

// Update lightbox content
function updateLightbox() {
  const item = currentAlbum[currentIndex];
  lightboxImg.classList.remove("fade-in");
  void lightboxImg.offsetWidth; // trigger reflow for animation
  lightboxImg.src = item.src;
  lightboxCaption.textContent = item.caption;
  lightboxImg.classList.add("fade-in");
}

// Prev / Next navigation
function showPrev() {
  currentIndex = (currentIndex - 1 + currentAlbum.length) % currentAlbum.length;
  updateLightbox();
}
function showNext() {
  currentIndex = (currentIndex + 1) % currentAlbum.length;
  updateLightbox();
}

prevBtn.onclick = showPrev;
nextBtn.onclick = showNext;

// Close lightbox
closeBtn.onclick = () => {
  lightbox.style.display = "none";
};

window.onclick = (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
};

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (lightbox.style.display === "flex") {
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "Escape") lightbox.style.display = "none";
  }
});

// Swipe detection (touch devices)
let startX = 0;
lightbox.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});
lightbox.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) showNext(); // swipe left
  if (endX - startX > 50) showPrev(); // swipe right
});

// Album button clicks
document.querySelectorAll(".album-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const album = btn.getAttribute("data-album");
    console.log("🎯 Album clicked:", album);
    showAlbum(album);
  });
});
