// Mobile Menu Toggle
function toggleMenu() {
    const menuIcon = document.querySelector('.menu-icon');
    const nav = document.querySelector('nav');
    if (nav) {
        nav.classList.toggle('active');
        if (menuIcon) {
            menuIcon.classList.toggle('active');
        }
    }
}

// Close menu when a link is clicked
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a');
    const currentPage = window.location.pathname.split('/').pop().toLowerCase() || 'index.html';
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
            const page = href.split('/').pop().toLowerCase();
            if (page === currentPage || (currentPage === '' && page === 'index.html')) {
                link.classList.add('active');
            }
        }
        link.addEventListener('click', function() {
            const nav = document.querySelector('nav');
            const menuIcon = document.querySelector('.menu-icon');
            if (nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
                if (menuIcon) {
                    menuIcon.classList.remove('active');
                }
            }
        });
    });
});

window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.display = 'none';
    }
});

window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.display = 'none';
    }
});

function sendMessage() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields.');
        return;
    }

    // For static site, use mailto or alert
    const mailtoLink = `mailto:res.toptravelplanneszambia@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.location.href = mailtoLink;

    alert('Thank you for your message! We will get back to you soon.');
}

window.addEventListener("scroll", function(){
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const position = card.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if(position < screenHeight - 100){
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }
    });
});
document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", function(e) {
    if (this.href.includes(".html")) {
      console.log("Loading page:", this.href);
    }
  });
});

/* ------------------------- LIGHTBOX ------------------------- */
function initLightbox() {
    const imgs = Array.from(document.querySelectorAll('.gallery-grid img'));
    if (!imgs.length) return;

    let currentIndex = 0;
    const overlay = document.createElement('div');
    overlay.id = 'lightboxOverlay';
    overlay.style.display = 'none';
    overlay.innerHTML = `
        <div class="lightbox-inner">
            <button class="lightbox-close">✕</button>
            <button class="lightbox-prev">‹</button>
            <img class="lightbox-img" src="" alt="" />
            <button class="lightbox-next">›</button>
        </div>
    `;
    document.body.appendChild(overlay);

    const lbImg = overlay.querySelector('.lightbox-img');
    const closeBtn = overlay.querySelector('.lightbox-close');
    const nextBtn = overlay.querySelector('.lightbox-next');
    const prevBtn = overlay.querySelector('.lightbox-prev');

    function show(index) {
        currentIndex = (index + imgs.length) % imgs.length;
        lbImg.src = imgs[currentIndex].src;
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function hide() {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    }

    imgs.forEach((img, i) => img.addEventListener('click', () => show(i)));
    closeBtn.addEventListener('click', hide);
    overlay.addEventListener('click', function(e) { if (e.target === overlay) hide(); });
    nextBtn.addEventListener('click', function(e){ e.stopPropagation(); show(currentIndex + 1); });
    prevBtn.addEventListener('click', function(e){ e.stopPropagation(); show(currentIndex - 1); });

    document.addEventListener('keydown', function(e){
        if (overlay.style.display !== 'flex') return;
        if (e.key === 'Escape') hide();
        if (e.key === 'ArrowRight') show(currentIndex + 1);
        if (e.key === 'ArrowLeft') show(currentIndex - 1);
    });
}

/* ------------------------- BOOKING MODAL & FORM ------------------------- */
function openBookingModal(destination) {
    const modal = document.getElementById('bookingModal');
    if (!modal) return;
    modal.classList.add('open');
    const destInput = modal.querySelector('[name="destination"]');
    if (destInput && destination) destInput.value = destination;
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (!modal) return;
    modal.classList.remove('open');
}

document.addEventListener('DOMContentLoaded', function(){
    initLightbox();

    // attach data-book triggers
    document.querySelectorAll('[data-book]').forEach(btn => {
        btn.addEventListener('click', function(e){
            e.preventDefault();
            openBookingModal(this.dataset.book || this.textContent.trim());
        });
    });

    // booking form submit -> mailto fallback
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e){
            e.preventDefault();
            const form = e.target;
            const name = form.querySelector('[name="name"]').value || '';
            const email = form.querySelector('[name="email"]').value || '';
            const arrival = form.querySelector('[name="arrival"]').value || '';
            const departure = form.querySelector('[name="departure"]').value || '';
            const destination = form.querySelector('[name="destination"]').value || '';
            const message = form.querySelector('[name="message"]').value || '';

            const subject = `Booking enquiry: ${destination}`;
            const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0AArrival: ${arrival}%0D%0ADeparture: ${departure}%0D%0ADestination: ${destination}%0D%0A%0D%0A${encodeURIComponent(message)}`;
            const mailto = `mailto:info@kawatours.com?subject=${encodeURIComponent(subject)}&body=${body}`;
            window.location.href = mailto;
            // close modal after invoking mailto
            closeBookingModal();
        });
    }
});
