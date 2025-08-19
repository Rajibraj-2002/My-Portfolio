// =======================
// Smooth Scroll
// =======================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

// =======================
// Contact Form Handling
// =======================
const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Create success message
    const successMsg = document.createElement("div");
    successMsg.textContent = "✅ Message sent successfully!";
    successMsg.style.color = "#64ffda";
    successMsg.style.marginTop = "10px";
    successMsg.style.textAlign = "center";
    successMsg.style.fontWeight = "bold";

    // Remove old success message if exists
    const oldMsg = document.querySelector(".success-msg");
    if (oldMsg) oldMsg.remove();

    successMsg.classList.add("success-msg");
    form.appendChild(successMsg);

    // Reset form
    form.reset();

    // Auto-hide message after 3s
    setTimeout(() => {
      successMsg.remove();
    }, 3000);
  });
}

// =======================
// GSAP Animations
// =======================

// Animate Navbar Links
gsap.from("nav .nav-links li", {
  duration: 0.8,
  y: -30,
  opacity: 0,
  stagger: 0.2,
  ease: "power2.out"
});

// Animate Hero Section on Page Load
gsap.from(".hero-text h1", {
  duration: 1,
  y: 50,
  opacity: 0,
  ease: "power3.out"
});
gsap.from(".hero-text h2", {
  duration: 1,
  y: 50,
  opacity: 0,
  delay: 0.3,
  ease: "power3.out"
});
gsap.from(".hero-text p", {
  duration: 1,
  y: 50,
  opacity: 0,
  delay: 0.6,
  ease: "power3.out"
});
gsap.from(".hero-buttons", {
  duration: 1,
  y: 50,
  opacity: 0,
  delay: 0.9,
  ease: "power3.out"
});
gsap.from(".hero-img", {
  duration: 1,
  scale: 0.8,
  opacity: 0,
  delay: 1.2,
  ease: "back.out(1.7)"
});

// Animate Sections on Scroll
gsap.utils.toArray("section").forEach(section => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      toggleActions: "play none none reset"
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
  });
});

// =======================
// Stagger Animations
// =======================

// Services Cards Stagger
gsap.from(".service-card", {
  scrollTrigger: {
    trigger: ".services-container",
    start: "top 85%",
    toggleActions: "play none none reset"
  },
  y: 50,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,
  ease: "power2.out"
});

// Portfolio Items Stagger
gsap.from(".portfolio-item", {
  scrollTrigger: {
    trigger: ".portfolio-container",
    start: "top 85%",
    toggleActions: "play none none reset"
  },
  y: 50,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,
  ease: "power2.out"
});

// =======================
// Profile Neon Glow Effect
// =======================
// GSAP pulsing glow around profile (only behind img)
gsap.to(".glow-circle", {
  boxShadow: "0 0 60px 20px #64ffda, 0 0 100px 40px #64ffda",
  repeat: -1,   // infinite loop
  yoyo: true,   // pulse effect
  duration: 2.5,
  ease: "sine.inOut"
});

// resume..
gsap.from(".resume-btn", {
  scrollTrigger: {
    trigger: ".resume-btn",
    start: "top 85%",
    toggleActions: "play none none reset"
  },
  y: 50,
  opacity: 0,
  duration: 1,
  ease: "power2.out"
});

