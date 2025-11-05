/**
 * includes.js
 * Loads header/navigation and footer into pages dynamically.
 * Adds: active link highlighting, mobile menu handling, smooth scrolling,
 * reveal-on-scroll animations, simple AJAX form feedback, and lazy image handling.
 *
 * Intervention: Images are replaced with lightweight placeholders and loaded lazily.
 * A deferred custom event ("lazyloaded" / "lazyerror") is dispatched after an image finishes loading.
 */

let lazyObserver = null;

async function loadHTMLInto(id, url) {
  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`Failed to load ${url}: ${resp.status}`);
    const html = await resp.text();
    const container = document.getElementById(id);
    if (container) {
      container.innerHTML = html;
      // process any images just injected into the container
      processLazyImagesIn(container);
    }
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

async function loadNavigation() {
  const ok = await loadHTMLInto('navigation', 'nav.html');
  if (ok) initializeNavigation();
}

async function loadFooter() {
  await loadHTMLInto('footer', 'footer.html');
}

function initializeNavigation() {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuButton && mobileMenu) {
    // Initialize menu as hidden on mobile
    mobileMenu.classList.add('hidden');
    mobileMenu.classList.remove('active');
    
    mobileMenuButton.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      
      this.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.setAttribute('aria-hidden', isExpanded);
      
      // Toggle active class
      mobileMenu.classList.toggle('active');
      mobileMenu.classList.toggle('hidden');
    });

    // Mobile dropdown toggles
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
    mobileDropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        const parent = this.closest('.mobile-dropdown');
        parent.classList.toggle('active');
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideMenu = mobileMenu.contains(event.target);
      const isClickOnButton = mobileMenuButton.contains(event.target);
      
      if (!isClickInsideMenu && !isClickOnButton && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        mobileMenu.classList.add('hidden');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      }
    });

    // Close mobile menu when window is resized to desktop size
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        mobileMenu.classList.add('hidden');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.navbar') && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        mobileMenu.classList.add('hidden');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      }
    });

    // Keyboard accessibility: close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        mobileMenu.classList.add('hidden');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // Setup smooth internal-link scrolling
  setupSmoothScrolling();

  // Highlight active link
  setActiveNavLink();

  // Reveal animations on scroll
  setupScrollReveal();

  // Attach simple AJAX form handler for forms with `.ajax-form`
  setupAjaxForms();
}

/* -----------------------------
   Active nav link detection
   ----------------------------- */
function setActiveNavLink() {
  const raw = decodeURIComponent(window.location.pathname || '');
  let current = raw.split('/').pop();
  if (!current || current === '/') current = 'Home.html';
  current = current.toLowerCase().replace(/\s+/g, ' ').trim();

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    let href = (link.getAttribute('href') || '').toLowerCase();
    href = href.replace(/\s+/g, ' ').trim();
    const normalizedHref = (!href || href === './' || href === '/') ? 'home.html' : href;
    if (normalizedHref === current || (current === '' && normalizedHref === 'home.html') || (current === 'home.html' && normalizedHref === 'home.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
}

/* -----------------------------
   Smooth scrolling
   ----------------------------- */
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  });
}

/* -----------------------------
   Scroll reveal
   ----------------------------- */
function setupScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.section, .card, .hero-content, .gallery-item').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}

/* -----------------------------
   AJAX form handling
   ----------------------------- */
function setupAjaxForms() {
  document.querySelectorAll('form.ajax-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]') || null;
      if (submitBtn) submitBtn.disabled = true;

      // Simple front-end validation: ensure required fields have values
      const required = form.querySelectorAll('[required]');
      let ok = true;
      required.forEach(field => {
        if (!field.value.trim()) {
          field.classList.add('input-error');
          ok = false;
        } else {
          field.classList.remove('input-error');
        }
      });

      const feedback = form.querySelector('.form-feedback') || createFormFeedback(form);

      if (!ok) {
        feedback.textContent = 'Please fill in the required fields.';
        feedback.classList.add('error');
        if (submitBtn) submitBtn.disabled = false;
        return;
      }

      // Simulate async submission
      setTimeout(() => {
        feedback.textContent = 'Thank you — your message has been received.';
        feedback.classList.remove('error');
        feedback.classList.add('success');
        form.reset();
        if (submitBtn) submitBtn.disabled = false;
      }, 700);
    });
  });
}

function createFormFeedback(form) {
  const el = document.createElement('div');
  el.className = 'form-feedback';
  el.setAttribute('role', 'status');
  el.style.marginTop = '0.5rem';
  form.appendChild(el);
  return el;
}

/* -----------------------------
   Lazy image helpers
   ----------------------------- */

/**
 * Create a small SVG placeholder data URI. Uses provided width/height for aspect ratio.
 */
function createPlaceholderDataURI(w = 20, h = 12, bg = '#efefef') {
  // normalize to integers
  w = Math.max(1, parseInt(w, 10) || 20);
  h = Math.max(1, parseInt(h, 10) || 12);
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}' preserveAspectRatio='none'><rect width='100%' height='100%' fill='${bg}'/></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/**
 * Ensure a shared IntersectionObserver is available.
 */
function ensureLazyObserver() {
  if (lazyObserver) return;
  if (!('IntersectionObserver' in window)) {
    lazyObserver = null;
    return;
  }
  lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        lazyObserver.unobserve(entry.target);
        loadImageLazy(entry.target);
      }
    });
  }, { rootMargin: '300px 0px', threshold: 0.01 });
}

/**
 * Turn images (and <picture> sources) inside a container into lazily-loaded images with placeholders.
 * This function is idempotent for elements already processed.
 */
function processLazyImagesIn(container = document) {
  const imgs = Array.from(container.querySelectorAll('img'));
  if (imgs.length === 0) return;

  imgs.forEach(img => {
    // skip if already processed or if it has explicit data-skip-lazy attribute
    if (img.dataset.lazyProcessed || img.dataset.skipLazy === 'true') return;
    img.dataset.lazyProcessed = '1';

    // Leave alone very small or data/blob images
    const src = img.getAttribute('src') || '';
    if (src.startsWith('data:') || src.startsWith('blob:')) return;

    // store original attributes
    if (src) img.dataset.src = src;
    const srcset = img.getAttribute('srcset') || '';
    if (srcset) {
      img.dataset.srcset = srcset;
      // move actual srcset from any <source> tags inside picture, too
      const picture = img.closest('picture');
      if (picture) {
        picture.querySelectorAll('source').forEach(sourceEl => {
          const ss = sourceEl.getAttribute('srcset');
          if (ss) {
            sourceEl.dataset.srcset = ss;
            sourceEl.removeAttribute('srcset');
          }
        });
      }
      img.removeAttribute('srcset');
    }

    // Use native lazy attribute where supported
    if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');

    // Use width/height attrs if present to create better placeholder; fallback to small box
    const w = img.getAttribute('width') || img.naturalWidth || 20;
    const h = img.getAttribute('height') || img.naturalHeight || 12;
    const placeholder = createPlaceholderDataURI(w, h);
    img.src = placeholder;
    img.classList.add('lazy', 'lazy-placeholder');

    // Observe or load immediately if no IntersectionObserver
    if ('IntersectionObserver' in window) {
      ensureLazyObserver();
      lazyObserver && lazyObserver.observe(img);
    } else {
      // immediate load fallback
      loadImageLazy(img);
    }
  });
}

/**
 * Load the real image using an off-DOM Image to allow fetch and then set the real src/srcset.
 * Dispatches deferred custom events "lazyloaded" and "lazyerror" (useful to react after load).
 */
function loadImageLazy(img) {
  if (!img || img.dataset._lazyLoading) return;
  img.dataset._lazyLoading = '1';

  const realSrc = img.dataset.src || null;
  const realSrcset = img.dataset.srcset || null;

  // preload via an off-screen Image so we can dispatch a deferred event when it's ready,
  // while the page continues responsive work. This also warms the cache before swapping.
  const pre = new Image();

  if (realSrcset) pre.srcset = realSrcset;
  if (realSrc) pre.src = realSrc;
  // carry crossOrigin if present on original
  if (img.crossOrigin) pre.crossOrigin = img.crossOrigin;

  pre.onload = () => {
    // restore <picture> sources first (if any)
    const picture = img.closest('picture');
    if (picture) {
      picture.querySelectorAll('source').forEach(sourceEl => {
        const ds = sourceEl.dataset.srcset;
        if (ds) sourceEl.setAttribute('srcset', ds);
      });
    }

    if (realSrcset) img.setAttribute('srcset', realSrcset);
    if (realSrc) img.setAttribute('src', realSrc);

    img.classList.remove('lazy-placeholder');
    img.classList.add('lazy-loaded');

    // Dispatch a deferred custom event so other code can listen for the "effective" load.
    const ev = new Event('lazyloaded');
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => img.dispatchEvent(ev));
    } else {
      setTimeout(() => img.dispatchEvent(ev), 60);
    }
  };

  pre.onerror = () => {
    img.classList.remove('lazy-placeholder');
    img.classList.add('lazy-error');
    const ev = new Event('lazyerror');
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => img.dispatchEvent(ev));
    } else {
      setTimeout(() => img.dispatchEvent(ev), 60);
    }
  };

  // start preload
  try {
    // assigning src/srcset begins fetch
    if (realSrcset) pre.srcset = realSrcset;
    if (realSrc) pre.src = realSrc;
  } catch (err) {
    // fallback: try setting directly on the DOM image
    if (realSrcset) img.setAttribute('srcset', realSrcset);
    if (realSrc) img.setAttribute('src', realSrc);
  }
}

/* -----------------------------
   Initialize lazy processing and other behaviors on DOM ready
   ----------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  // process images present in the initial document
  processLazyImagesIn(document);

  // dynamic includes
  loadNavigation();
  loadFooter();
});
