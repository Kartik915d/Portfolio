document.addEventListener("DOMContentLoaded", () => {

  /* ================= THEME TOGGLE ================= */
  const toggle = document.getElementById("themeToggle");
  const body = document.body;

  if (toggle) {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") body.classList.add("light");

    toggle.addEventListener("click", () => {
      body.classList.toggle("light");
      const isLight = body.classList.contains("light");
      localStorage.setItem("theme", isLight ? "light" : "dark");
    });
  }

  /* ================= NAVBAR SCROLL ================= */
  const nav = document.querySelector(".navbar");
  if (nav) {
    window.addEventListener("scroll", () => {
      nav.classList.toggle("scrolled", window.scrollY > 40);
    });
  }

  /* ================= TYPING EFFECT ================= */
  const words = [
    "Backend Developer",
    "Python Engineer",
    "GenAI Enthusiast",
    "Problem Solver"
  ];

  const typingEl = document.getElementById("typing");

  if (typingEl) {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentWord = words[wordIndex];

      if (!isDeleting) {
        typingEl.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentWord.length) {
          setTimeout(() => (isDeleting = true), 1200);
        }
      } else {
        typingEl.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
      }

      setTimeout(typeEffect, isDeleting ? 50 : 90);
    }

    typeEffect();
  }

  /* ================= HERO PARALLAX ================= */
  const heroVisual = document.querySelector(".hero-visual");
  const heroImg = document.querySelector(".hero-img");

  if (heroVisual && heroImg) {
    heroVisual.addEventListener("mousemove", (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      heroImg.style.transform = `
        translate(${x * 14}px, ${y * 14}px)
        translateY(-10px)
        scale(1.03)
      `;
    });

    heroVisual.addEventListener("mouseleave", () => {
      heroImg.style.transform = "translateY(0) scale(1)";
    });
  }

  /* ================= MOBILE MENU ================= */
  const menuBtn = document.getElementById("menuToggle");
  const navContent = document.getElementById("navContent");

  if (menuBtn && navContent) {
    menuBtn.addEventListener("click", () => {
      menuBtn.classList.toggle("active");
      navContent.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        menuBtn.classList.remove("active");
        navContent.classList.remove("active");
      });
    });
  }

  /* ================= MEMORY LANE — SCROLL LINE + SPY ================= */
  const entriesContainer = document.querySelector(".memorylane-entries");
  const mlEntries        = document.querySelectorAll(".ml-entry");
  const mlYearLinks      = document.querySelectorAll(".ml-year-link");

  if (entriesContainer && mlEntries.length > 0) {

    /* ---- 1. SCROLL-DRIVEN LINE ---- */
    function updateLine() {
      const rect        = entriesContainer.getBoundingClientRect();
      const windowH     = window.innerHeight;
      const totalHeight = entriesContainer.offsetHeight;

      const scrolled = Math.max(0, windowH * 0.4 - rect.top);
      const progress = Math.min(1, scrolled / totalHeight);
      const pct      = (progress * 100).toFixed(2);

      entriesContainer.style.setProperty("--line-progress", pct + "%");
    }

    window.addEventListener("scroll", updateLine, { passive: true });
    updateLine();

    /* ---- 2. DOT GLOW + YEAR NAV SCROLL SPY ---- */
    // Use closest-to-viewport-center logic, with special handling for the last entry
    function getActiveEntry() {
      const center = window.innerHeight / 2;
      const entries = Array.from(mlEntries);
      const lastEntry = entries[entries.length - 1];

      // If the last entry has scrolled into view past 70% of the viewport, activate it
      const lastRect = lastEntry.getBoundingClientRect();
      if (lastRect.top < window.innerHeight * 0.7) {
        return lastEntry;
      }

      let closest = null;
      let closestDist = Infinity;

      entries.forEach(entry => {
        const rect = entry.getBoundingClientRect();
        const entryCenter = rect.top + rect.height / 2;
        const dist = Math.abs(entryCenter - center);
        if (dist < closestDist) {
          closestDist = dist;
          closest = entry;
        }
      });

      return closest;
    }

    function updateActiveEntry() {
      const active = getActiveEntry();
      if (!active) return;

      mlEntries.forEach(e => e.classList.remove("ml-active"));
      active.classList.add("ml-active");

      const id = active.id;
      mlYearLinks.forEach(link => {
        link.classList.toggle("active", link.dataset.target === id);
      });
    }

    window.addEventListener("scroll", updateActiveEntry, { passive: true });
    updateActiveEntry();

    /* ---- 3. CLICK YEAR → SMOOTH SCROLL ---- */
    mlYearLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.getElementById(link.dataset.target);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  /* ================= PROJECT DOTS (MOBILE) ================= */
  const projectsScroll = document.getElementById("projectsScroll");
  const dotsContainer  = document.getElementById("projectDots");
  const swipeHint      = document.querySelector(".swipe-hint");

  if (projectsScroll && dotsContainer) {
    const cards = projectsScroll.querySelectorAll(".project-card");
    const total = cards.length;
    let hasScrolled = false;

    // Build dots
    cards.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "project-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", `Go to project ${i + 1}`);
      dot.addEventListener("click", () => {
        cards[i].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      });
      dotsContainer.appendChild(dot);
    });

    const allDots = dotsContainer.querySelectorAll(".project-dot");

    // Update active dot based on scroll position
    function updateDots() {
      const scrollLeft  = projectsScroll.scrollLeft;
      const cardWidth   = projectsScroll.scrollWidth / total;
      const activeIndex = Math.round(scrollLeft / cardWidth);

      allDots.forEach((dot, i) => {
        dot.classList.toggle("active", i === activeIndex);
      });

      // Hide swipe hint after first scroll
      if (!hasScrolled && scrollLeft > 10) {
        hasScrolled = true;
        if (swipeHint) swipeHint.classList.add("hidden");
      }
    }

    projectsScroll.addEventListener("scroll", updateDots, { passive: true });
    updateDots();
  }

});


/* ================= PROJECT SCROLL BUTTONS ================= */
function scrollProjects(direction) {
  const container = document.getElementById("projectsScroll");
  if (!container) return;

  container.scrollBy({
    left: direction * 320,
    behavior: "smooth"
  });
}


/* ================= LEGACY ROLE TABS (SAFE TO KEEP) ================= */
function showRole(event, org, role) {
  const card = document.getElementById(`${org}-card`);
  if (!card) return;

  const durations = {
    'chair': '2025 – Present',
    'vice': '2024 – 2025',
    'publicity': '2023 – 2024',
    'media': '2023 – 2024',
    'member': '2022 – 2023'
  };

  const tabs = card.querySelectorAll('.role-tab');
  tabs.forEach(tab => tab.classList.remove('active'));
  event.currentTarget.classList.add('active');

  const lists = card.querySelectorAll('.experience-details');
  lists.forEach(list => list.style.display = 'none');

  const targetList = document.getElementById(`${org}-${role}-content`);
  const durationLabel = document.getElementById(`${org}-duration`);

  if (targetList) targetList.style.display = 'block';
  if (durationLabel && durations[role]) {
    durationLabel.innerText = durations[role];
  }
  
}

function initHeroSphere() {
  const canvas = document.getElementById('hero-sphere');
  if (!canvas || typeof THREE === 'undefined') return;

  const container = canvas.parentElement;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    65,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
  });

  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const geometry = new THREE.IcosahedronGeometry(2.2, 3);

  const wireframe = new THREE.LineSegments(
    new THREE.WireframeGeometry(geometry),
    new THREE.LineBasicMaterial({
      color: 0x00f3ff,
      transparent: true,
      opacity: 0.2
    })
  );

  const points = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
      color: 0xb500ff,
      size: 0.05,
      transparent: true,
      opacity: 0.8
    })
  );

  const group = new THREE.Group();
  group.add(wireframe);
  group.add(points);

  scene.add(group);

  let mouseX = 0;
  let mouseY = 0;

  container.addEventListener("mousemove", (e) => {
    const rect = container.getBoundingClientRect();
    mouseX = (e.clientX - rect.left - rect.width / 2);
    mouseY = (e.clientY - rect.top - rect.height / 2);
  });

  function animate() {
    requestAnimationFrame(animate);

    group.rotation.y = 0.2;
    group.rotation.x = 0.1;

    group.rotation.y += mouseX * 0.0005;
    group.rotation.x += mouseY * 0.0005;

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener("resize", () => {
    const width = container.clientWidth;
    const height = container.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
}

document.addEventListener("DOMContentLoaded", () => {

  /* ================= THEME TOGGLE ================= */
  const toggle = document.getElementById("themeToggle");
  const body = document.body;
  initHeroSphere();

});