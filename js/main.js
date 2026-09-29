// The Crown & Blade Barbershop — Main JavaScript

document.addEventListener('DOMContentLoaded', () => {

  // Footer year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- MOBILE DRAWER ---
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerClose');
  const drawerBackdrop = document.getElementById('drawerBackdrop');

  function openMobileMenu() {
    mobileDrawer.classList.add('open');
    drawerBackdrop.classList.add('open');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileDrawer.classList.remove('open');
    drawerBackdrop.classList.remove('open');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openMobileMenu);
  if (drawerClose) drawerClose.addEventListener('click', closeMobileMenu);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeMobileMenu);
  document.querySelectorAll('.mobile-nav-link, .mobile-drawer-cta').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // --- STICKY HEADER & BACK TO TOP ---
  const siteHeader = document.getElementById('siteHeader');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    siteHeader.classList.toggle('scrolled', y > 60);
    backToTopBtn.classList.toggle('show', y > 400);
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // --- SCROLL SPY ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');

  window.addEventListener('scroll', () => {
    const pos = window.scrollY + 120;
    sections.forEach(sec => {
      if (pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${sec.id}`);
        });
      }
    });
  });

  // --- LIVE BUSINESS HOURS ---
  const liveStatusText = document.getElementById('liveStatusText');
  const liveStatusDot = document.getElementById('liveStatusDot');

  function updateLiveHours() {
    const now = new Date();
    const day = now.getDay();
    const t = now.getHours() + now.getMinutes() / 60;

    // [open, close, closeStr, openStr] — indexed by day (0=Sun … 6=Sat)
    const schedule = [
      [10, 17, '5:00 PM', '10:00 AM'], // Sun
      [9,  20, '8:00 PM', '9:00 AM'],  // Mon
      [9,  20, '8:00 PM', '9:00 AM'],  // Tue
      [9,  20, '8:00 PM', '9:00 AM'],  // Wed
      [9,  20, '8:00 PM', '9:00 AM'],  // Thu
      [9,  20, '8:00 PM', '9:00 AM'],  // Fri
      [8.5,19, '7:00 PM', '8:30 AM'],  // Sat
    ];

    const [open, close, closeStr, openStr] = schedule[day];
    const isOpen = t >= open && t < close;

    liveStatusDot.style.backgroundColor = isOpen ? '#22c55e' : '#d4af37';
    liveStatusDot.style.boxShadow = `0 0 8px ${isOpen ? '#22c55e' : '#d4af37'}`;
    liveStatusText.innerHTML = isOpen
      ? `<strong>Open Now</strong> • Chairs available until ${closeStr}`
      : `<strong>Currently Closed</strong> • Opens at ${openStr}`;
  }
  updateLiveHours();

  // --- SERVICE FILTER TABS ---
  const serviceTabs = document.querySelectorAll('.filter-tab');
  const serviceCards = document.querySelectorAll('.service-card');

  serviceTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      serviceTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.getAttribute('data-filter');
      serviceCards.forEach(card => {
        card.style.display = (filter === 'all' || card.getAttribute('data-category') === filter) ? 'flex' : 'none';
      });
    });
  });

  // --- QUICK-SELECT SERVICE & BARBER (auto-fills booking form) ---
  const serviceSelect = document.getElementById('serviceSelect');
  const barberSelect = document.getElementById('barberSelect');
  const bookingSection = document.getElementById('booking');

  document.querySelectorAll('.book-this-service').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const val = btn.getAttribute('data-service');
      if (serviceSelect && val) {
        serviceSelect.value = val;
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  document.querySelectorAll('.book-with-barber').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const val = btn.getAttribute('data-barber');
      if (barberSelect && val) {
        barberSelect.value = val;
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // --- GALLERY FILTER & LIGHTBOX ---
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('.gallery-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.gallery-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-category');
      galleryItems.forEach(item => {
        item.classList.toggle('hide', cat !== 'all' && item.getAttribute('data-category') !== cat);
      });
    });
  });

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('.gallery-img');
      if (!img || !lightboxModal) return;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      const cat = item.querySelector('.gallery-category')?.textContent || '';
      const title = item.querySelector('.gallery-item-title')?.textContent || '';
      lightboxCaption.textContent = cat ? `${cat} — ${title}` : title;
      lightboxModal.classList.add('active');
      lightboxModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxModal) lightboxModal.addEventListener('click', e => { if (e.target === lightboxModal) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

  // --- DATE LIMITS & TIME SLOTS ---
  const bookingDateInput = document.getElementById('bookingDate');
  const timeSlotBtns = document.querySelectorAll('.time-slot-btn');
  const selectedTimeSlotInput = document.getElementById('selectedTimeSlot');

  if (bookingDateInput) {
    const todayISO = new Date().toISOString().split('T')[0];
    bookingDateInput.min = todayISO;
    bookingDateInput.value = todayISO;
  }

  timeSlotBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      timeSlotBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedTimeSlotInput.value = btn.getAttribute('data-time');
      selectedTimeSlotInput.closest('.form-group')?.classList.remove('has-error');
    });
  });

  // --- FORM VALIDATION & CONFIRMATION MODAL ---
  const appointmentForm = document.getElementById('appointmentForm');
  const confirmationModal = document.getElementById('confirmationModal');
  const modalSummary = document.getElementById('modalSummary');
  const modalWhatsAppShareBtn = document.getElementById('modalWhatsAppShareBtn');
  const clientName = document.getElementById('clientName');
  const clientPhone = document.getElementById('clientPhone');
  const clientEmail = document.getElementById('clientEmail');
  const clientNotes = document.getElementById('clientNotes');

  function validateForm() {
    let valid = true;
    document.querySelectorAll('.form-group').forEach(g => g.classList.remove('has-error'));

    function flag(el) { el.closest('.form-group')?.classList.add('has-error'); valid = false; }

    if (!clientName.value.trim() || clientName.value.trim().length < 2) flag(clientName);
    if (!/^[\d\s\+\-\(\)]{7,20}$/.test(clientPhone.value.trim())) flag(clientPhone);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail.value.trim())) flag(clientEmail);
    if (!barberSelect.value) flag(barberSelect);
    if (!serviceSelect.value) flag(serviceSelect);
    if (!bookingDateInput.value) flag(bookingDateInput);
    if (!selectedTimeSlotInput.value) flag(selectedTimeSlotInput);

    return valid;
  }

  if (appointmentForm) {
    appointmentForm.addEventListener('submit', e => {
      e.preventDefault();
      if (!validateForm()) {
        document.querySelector('.form-group.has-error input, .form-group.has-error select')?.focus();
        return;
      }

      const ref = 'CB-' + Math.floor(1000 + Math.random() * 9000);

      const rows = [
        ['Booking Reference', `<span style="color:#d4af37">${ref}</span>`],
        ['Guest Name', escapeHtml(clientName.value.trim())],
        ['Service', escapeHtml(serviceSelect.value)],
        ['Master Barber', escapeHtml(barberSelect.value)],
        ['Date & Time', `${escapeHtml(bookingDateInput.value)} at ${escapeHtml(selectedTimeSlotInput.value)}`],
        ['Phone', escapeHtml(clientPhone.value.trim())],
      ];

      modalSummary.innerHTML = rows.map(([label, val]) =>
        `<div class="modal-summary-row"><span class="modal-summary-label">${label}:</span><span class="modal-summary-val">${val}</span></div>`
      ).join('');

      modalWhatsAppShareBtn.onclick = () => {
        const msg = `Hello Crown & Blade, my booking ref is *${ref}*.\nName: ${clientName.value.trim()}\nService: ${serviceSelect.value}\nBarber: ${barberSelect.value}\nDate: ${bookingDateInput.value}\nTime: ${selectedTimeSlotInput.value}`;
        window.open(`https://wa.me/1234567890?text=${encodeURIComponent(msg)}`, '_blank');
      };

      confirmationModal.classList.add('active');
      confirmationModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      appointmentForm.reset();
      timeSlotBtns.forEach(b => b.classList.remove('selected'));
      selectedTimeSlotInput.value = '';
    });
  }

  function closeConfirmationModal() {
    confirmationModal?.classList.remove('active');
    confirmationModal?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.getElementById('modalCloseBtn')?.addEventListener('click', closeConfirmationModal);
  document.getElementById('modalDoneBtn')?.addEventListener('click', closeConfirmationModal);
  confirmationModal?.addEventListener('click', e => { if (e.target === confirmationModal) closeConfirmationModal(); });

  // --- WHATSAPP BOOKING ---
  function buildWhatsAppMessage() {
    const notes = clientNotes.value.trim() ? `\nNotes: ${clientNotes.value.trim()}` : '';
    return `👑 *Crown & Blade Reservation*\n👤 *Name:* ${clientName.value.trim() || 'Guest'}\n📞 *Phone:* ${clientPhone.value.trim() || 'N/A'}\n✂️ *Service:* ${serviceSelect.value || 'TBD'}\n💈 *Barber:* ${barberSelect.value || 'First Available'}\n📅 *Date:* ${bookingDateInput.value || 'Earliest'}\n⏰ *Time:* ${selectedTimeSlotInput.value || 'TBD'}${notes}\n\nPlease confirm my reservation. Thank you!`;
  }

  document.getElementById('bookViaWhatsAppBtn')?.addEventListener('click', () => {
    window.open(`https://wa.me/1234567890?text=${encodeURIComponent(buildWhatsAppMessage())}`, '_blank');
  });

  document.getElementById('directWhatsAppBtn')?.addEventListener('click', () => {
    const msg = "Hello Crown & Blade, I'd like to book an appointment. Please let me know available slots.";
    window.open(`https://wa.me/1234567890?text=${encodeURIComponent(msg)}`, '_blank');
  });

  // HTML escape helper
  function escapeHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
  }

});
