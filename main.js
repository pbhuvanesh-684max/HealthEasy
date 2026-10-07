// Patient Friendly Web Application - Core Engine with 3D Tilt, Hospital COE & Admin Sharan Auth

document.addEventListener('DOMContentLoaded', () => {
  // Navigation & Drawer Elements
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const domainDrawer = document.getElementById('domainDrawer');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const drawerBackdrop = document.getElementById('drawerBackdrop');

  function openDrawer() {
    if (domainDrawer && drawerBackdrop) {
      domainDrawer.classList.add('open');
      drawerBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (domainDrawer && drawerBackdrop) {
      domainDrawer.classList.remove('open');
      drawerBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });

  // Active Link Highlighter across all Domains
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .drawer-item a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Domain Select Dropdown Sync & Auto-Navigation
  const domainSelects = document.querySelectorAll('.domain-select-dropdown');
  domainSelects.forEach(select => {
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].value === currentPath || (currentPath === '' && select.options[i].value === 'index.html')) {
        select.selectedIndex = i;
        break;
      }
    }

    select.addEventListener('change', (e) => {
      const targetUrl = e.target.value;
      if (targetUrl) {
        window.location.href = targetUrl;
      }
    });
  });

  // 3D Card Tilt Mousemove Effect
  init3DTiltEffect();

  // Doctor Auth (Bhuvanesh / 1234)
  initDoctorAuth();

  // User Admin Auth (Sharan / 1234)
  initUserAdminAuth();

  // Hospital COE Scan Timer & Department Queue Engine
  initCOEScanTimerEngine();

  // 10-Min Doctor Consultation Timer Engine
  initConsultationTimer();

  // 3D Interactive Waving Hospital & Sprinkle Particle Engine (Home Page Opening Feature)
  init3DInteractiveHospital();

  // Form Handlers
  initAppointmentForm();
  initContactForm();

  // AI Assist Problem-Solving Chatbot & Timed Care Reminders (7-10am, 12-3pm, 6-8pm)
  initAIAssistant();
  initPatientVitalsDashboard();
});

// ==============================================================================
// 3D INTERACTIVE HOSPITAL WAVING & PARTICLE SPRINKLE ENGINE
// ==============================================================================
function init3DInteractiveHospital() {
  const canvas = document.getElementById('hospital3DCanvas');
  const screenElem = document.getElementById('hospitalHeroCard') || document.getElementById('monitorScreen3D');
  const photoLayer = document.getElementById('hospitalPhotoLayer');
  if (!screenElem) return;

  // 3D Perspective Tilt on Mouse Movement over Hospital Photo
  screenElem.addEventListener('mousemove', (e) => {
    const rect = screenElem.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const tiltX = (-y / rect.height) * 14;
    const tiltY = (x / rect.width) * 14;

    if (photoLayer) {
      photoLayer.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05) translateZ(20px)`;
    }
  });

  screenElem.addEventListener('mouseleave', () => {
    if (photoLayer) {
      photoLayer.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1.02) translateZ(10px)';
    }
  });

  // Mobile Touch Tilt Support
  screenElem.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      const rect = screenElem.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left - rect.width / 2;
      const y = e.touches[0].clientY - rect.top - rect.height / 2;
      const tiltX = (-y / rect.height) * 10;
      const tiltY = (x / rect.width) * 10;
      if (photoLayer) {
        photoLayer.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.04) translateZ(15px)`;
      }
    }
  }, { passive: true });

  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = canvas.width = screenElem.clientWidth;
  let height = canvas.height = screenElem.clientHeight;

  window.addEventListener('resize', () => {
    if (screenElem && canvas) {
      width = canvas.width = screenElem.clientWidth;
      height = canvas.height = screenElem.clientHeight;
      initAmbientParticles();
    }
  });

  let particles = [];
  let burstParticles = [];
  const colors = ['#FACC15', '#FDE047', '#F59E0B', '#38BDF8', '#FFFFFF', '#FEF08A'];

  function initAmbientParticles() {
    particles = [];
    const count = 45;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -Math.random() * 0.6 - 0.2,
        size: Math.random() * 2.2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.7 + 0.3,
        pulseSpeed: Math.random() * 0.04 + 0.01
      });
    }
  }

  initAmbientParticles();

  // Dynamic 3D Particle Sprinkle Explosion on Click / Touch
  function triggerSprinkle(e) {
    const rect = screenElem.getBoundingClientRect();
    const touchX = (e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : rect.width / 2)) - rect.left;
    const touchY = (e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : rect.height / 2)) - rect.top;

    // 3D Pulse ripple on the photo layer
    if (photoLayer) {
      photoLayer.style.transform = 'perspective(1000px) scale(1.08) translateZ(35px)';
      setTimeout(() => {
        photoLayer.style.transform = 'perspective(1000px) scale(1.04) translateZ(12px)';
      }, 350);
    }

    // Spawn 150+ 3D Sprinkle Burst Particles
    for (let i = 0; i < 150; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 12 + 4;
      burstParticles.push({
        x: touchX,
        y: touchY,
        targetX: touchX,
        targetY: touchY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 3.5 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        life: 1,
        decay: Math.random() * 0.015 + 0.01,
        returning: false
      });
    }

    // Magnetic Return Phase
    setTimeout(() => {
      burstParticles.forEach(p => {
        p.returning = true;
      });
    }, 450);
  }

  screenElem.addEventListener('click', triggerSprinkle);
  screenElem.addEventListener('touchstart', triggerSprinkle, { passive: true });

  // Animation Loop
  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Render Ambient Drifting Starlight Particles
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.alpha += Math.sin(Date.now() * p.pulseSpeed) * 0.015;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;

      ctx.save();
      ctx.globalAlpha = Math.max(0.1, Math.min(1, p.alpha));
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    // Render Sprinkle Burst Particles
    for (let i = burstParticles.length - 1; i >= 0; i--) {
      const bp = burstParticles[i];

      if (bp.returning) {
        // Magnetic spring pull back to touch center
        const dx = bp.targetX - bp.x;
        const dy = bp.targetY - bp.y;
        bp.x += dx * 0.14;
        bp.y += dy * 0.14;
        bp.alpha -= 0.035;
      } else {
        bp.x += bp.vx;
        bp.y += bp.vy;
        bp.vx *= 0.94;
        bp.vy *= 0.94;
      }

      bp.life -= bp.decay;

      if (bp.life <= 0 || bp.alpha <= 0) {
        burstParticles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = Math.max(0, bp.alpha);
      ctx.shadowColor = bp.color;
      ctx.shadowBlur = 12;
      ctx.fillStyle = bp.color;
      ctx.beginPath();
      ctx.arc(bp.x, bp.y, bp.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    requestAnimationFrame(animate);
  }

  animate();
}

// ==============================================================================
// 1. 3D CARD PERSPECTIVE TILT EFFECT
// ==============================================================================
function init3DTiltEffect() {
  const tiltCards = document.querySelectorAll('.card-3d');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotateX = (-y / rect.height) * 12;
      const rotateY = (x / rect.width) * 12;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

// ==============================================================================
// 2. USER ADMIN AUTHENTICATION (Admin Username: Sharan | Password: 1234)
// ==============================================================================
function initUserAdminAuth() {
  const loginForm = document.getElementById('userAdminLoginForm');
  const adminNameInput = document.getElementById('adminNameInput');
  const adminPasswordInput = document.getElementById('adminPasswordInput');
  const loginView = document.getElementById('userAdminLoginView');
  const dashboardView = document.getElementById('userAdminDashboardView');
  const loggedAdminBadge = document.getElementById('loggedAdminBadge');
  const logoutBtn = document.getElementById('userAdminLogoutBtn');

  // Check existing session
  const activeAdmin = localStorage.getItem('loggedInUserAdmin');
  if (activeAdmin && dashboardView && loginView) {
    loginView.style.display = 'none';
    dashboardView.style.display = 'block';
    if (loggedAdminBadge) loggedAdminBadge.textContent = activeAdmin;
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const adminName = adminNameInput?.value.trim() || '';
      const password = adminPasswordInput?.value.trim() || '';

      // Validate Admin Credentials: Username = Sharan, Password = 1234
      if (adminName.toLowerCase() === 'sharan' && password === '1234') {
        const fullAdminName = 'Admin Sharan';
        localStorage.setItem('loggedInUserAdmin', fullAdminName);
        
        showToastNotification(`🔓 Login Successful! Welcome, ${fullAdminName}`);
        
        if (loginView) loginView.style.display = 'none';
        if (dashboardView) dashboardView.style.display = 'block';
        if (loggedAdminBadge) loggedAdminBadge.textContent = fullAdminName;

        renderCOEAdminQueue();
      } else {
        showNotification('Authentication Failed', 'Invalid User Admin Name or Password. (Username: Sharan, Password: 1234)');
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('loggedInUserAdmin');
      showToastNotification('User Admin logged out.');
      if (dashboardView) dashboardView.style.display = 'none';
      if (loginView) loginView.style.display = 'block';
    });
  }
}

// ==============================================================================
// 3. HOSPITAL COE SCAN TIMER (10-15 MINS) & QUEUE ENGINE (CT Scan, X-Ray, etc.)
// ==============================================================================
let currentScanDepartment = 'CT Scan';
let scanTimerInterval = null;
let scanSecondsRemaining = 900; // 15 Minutes = 900 Seconds

const defaultCOEQueue = {
  'CT Scan': [
    { id: 101, name: "Karthik Subramanian", slot: "10:00 AM", status: "Scanning In Progress", completed: false },
    { id: 102, name: "Ananya Iyer", slot: "10:15 AM", status: "Waiting", completed: false },
    { id: 103, name: "Deepak Sharma", slot: "10:30 AM", status: "Waiting", completed: false },
    { id: 104, name: "Meera Nambiar", slot: "10:45 AM", status: "Waiting", completed: false },
    { id: 105, name: "Arvind Swamy", slot: "11:00 AM", status: "Waiting", completed: false },
    { id: 106, name: "Divya Krishnan", slot: "11:15 AM", status: "Waiting", completed: false },
    { id: 107, name: "Sanjay Verma", slot: "11:30 AM", status: "Waiting", completed: false },
    { id: 108, name: "Kavitha Rajan", slot: "11:45 AM", status: "Waiting", completed: false },
    { id: 109, name: "Amit Patel", slot: "12:00 PM", status: "Waiting", completed: false }
  ],
  'X-Ray': [
    { id: 201, name: "Siddharth Rao", slot: "10:00 AM", status: "Scanning In Progress", completed: false },
    { id: 202, name: "Nisha Patel", slot: "10:15 AM", status: "Waiting", completed: false },
    { id: 203, name: "Sneha Joshi", slot: "10:30 AM", status: "Waiting", completed: false },
    { id: 204, name: "Harish Chandra", slot: "10:45 AM", status: "Waiting", completed: false },
    { id: 205, name: "Swati Kulkarni", slot: "11:00 AM", status: "Waiting", completed: false },
    { id: 206, name: "Suresh Nair", slot: "11:15 AM", status: "Waiting", completed: false },
    { id: 207, name: "Lakshmi Prasanna", slot: "11:30 AM", status: "Waiting", completed: false },
    { id: 208, name: "Arun Kumar", slot: "11:45 AM", status: "Waiting", completed: false }
  ],
  'Ultrasound': [
    { id: 301, name: "Vikram Malhotra", slot: "10:00 AM", status: "Scanning In Progress", completed: false },
    { id: 302, name: "Sunita Reddy", slot: "10:15 AM", status: "Waiting", completed: false },
    { id: 303, name: "Ritu Agarwal", slot: "10:30 AM", status: "Waiting", completed: false },
    { id: 304, name: "Vijay Sethi", slot: "10:45 AM", status: "Waiting", completed: false },
    { id: 305, name: "Nandini Roy", slot: "11:00 AM", status: "Waiting", completed: false },
    { id: 306, name: "Nitin Saxena", slot: "11:15 AM", status: "Waiting", completed: false },
    { id: 307, name: "Bhavana Reddy", slot: "11:30 AM", status: "Waiting", completed: false },
    { id: 308, name: "Rahul Dravid", slot: "11:45 AM", status: "Waiting", completed: false }
  ],
  'Gastrology': [
    { id: 401, name: "Manoj Deshmukh", slot: "10:00 AM", status: "Scanning In Progress", completed: false },
    { id: 402, name: "Radhika Apte", slot: "10:15 AM", status: "Waiting", completed: false },
    { id: 403, name: "Gautam Gambhir", slot: "10:30 AM", status: "Waiting", completed: false },
    { id: 404, name: "Vidya Balan", slot: "10:45 AM", status: "Waiting", completed: false },
    { id: 405, name: "Chetan Bhagat", slot: "11:00 AM", status: "Waiting", completed: false },
    { id: 406, name: "Shreya Ghoshal", slot: "11:15 AM", status: "Waiting", completed: false },
    { id: 407, name: "Mahesh Babu", slot: "11:30 AM", status: "Waiting", completed: false },
    { id: 408, name: "Samantha Ruth", slot: "11:45 AM", status: "Waiting", completed: false }
  ],
  'Chronology': [
    { id: 501, name: "Ramesh Babu", slot: "10:00 AM", status: "Scanning In Progress", completed: false },
    { id: 502, name: "Keerthy Suresh", slot: "10:15 AM", status: "Waiting", completed: false },
    { id: 503, name: "Dulquer Salmaan", slot: "10:30 AM", status: "Waiting", completed: false },
    { id: 504, name: "Rashmika Mandanna", slot: "10:45 AM", status: "Waiting", completed: false },
    { id: 505, name: "Fahadh Faasil", slot: "11:00 AM", status: "Waiting", completed: false },
    { id: 506, name: "Sai Pallavi", slot: "11:15 AM", status: "Waiting", completed: false },
    { id: 507, name: "Prithviraj Sukumaran", slot: "11:30 AM", status: "Waiting", completed: false },
    { id: 508, name: "Nayanthara Kurian", slot: "11:45 AM", status: "Waiting", completed: false }
  ],
  'MRI': [
    { id: 601, name: "Pooja Hegde", slot: "10:00 AM", status: "Scanning In Progress", completed: false },
    { id: 602, name: "Trisha Krishnan", slot: "10:15 AM", status: "Waiting", completed: false },
    { id: 603, name: "Vijay Deverakonda", slot: "10:30 AM", status: "Waiting", completed: false },
    { id: 604, name: "Dhanush Raja", slot: "10:45 AM", status: "Waiting", completed: false },
    { id: 605, name: "Surya Sivakumar", slot: "11:00 AM", status: "Waiting", completed: false },
    { id: 606, name: "Karthi Sivakumar", slot: "11:15 AM", status: "Waiting", completed: false },
    { id: 607, name: "Kamal Haasan", slot: "11:30 AM", status: "Waiting", completed: false },
    { id: 608, name: "Rajinikanth", slot: "11:45 AM", status: "Waiting", completed: false }
  ]
};

function getCOEQueue() {
  const stored = localStorage.getItem('hospitalCOEQueueData');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      const totalCount = Object.values(parsed).reduce((acc, list) => acc + (list ? list.length : 0), 0);
      if (totalCount >= 30) return parsed;
    } catch (e) {}
  }
  localStorage.setItem('hospitalCOEQueueData', JSON.stringify(defaultCOEQueue));
  return defaultCOEQueue;
}

function saveCOEQueue(queue) {
  localStorage.setItem('hospitalCOEQueueData', JSON.stringify(queue));
}

function initCOEScanTimerEngine() {
  const timerDisplay = document.getElementById('coeScanTimerDisplay');
  const tabButtons = document.querySelectorAll('.coe-tab-btn');

  // Department Tab Switching
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentScanDepartment = btn.getAttribute('data-dept') || 'CT Scan';
      scanSecondsRemaining = 900; // Reset to 15 mins for selected department
      renderCOEAdminQueue();
      renderPatientCOEView();
    });
  });

  // 15-Minute Scan Timer Countdown Interval
  if (timerDisplay) {
    clearInterval(scanTimerInterval);
    scanTimerInterval = setInterval(() => {
      const allQueues = getCOEQueue();
      const currentQueue = allQueues[currentScanDepartment] || [];
      const activePatient = currentQueue.find(p => p.status === 'Scanning In Progress');

      if (activePatient) {
        scanSecondsRemaining--;

        if (scanSecondsRemaining <= 0) {
          // SCANNING OVERTIME (> 15 Mins) -> Triggers Delay Notice
          timerDisplay.classList.add('overtime');
          const overSecs = Math.abs(scanSecondsRemaining);
          const overMins = String(Math.floor(overSecs / 60)).padStart(2, '0');
          const overS = String(overSecs % 60).padStart(2, '0');
          timerDisplay.textContent = `OVERTIME +${overMins}:${overS}`;

          updatePatientCOEDelayNotice(currentScanDepartment, activePatient.name, true);
        } else {
          timerDisplay.classList.remove('overtime');
          const mins = String(Math.floor(scanSecondsRemaining / 60)).padStart(2, '0');
          const secs = String(scanSecondsRemaining % 60).padStart(2, '0');
          timerDisplay.textContent = `${mins}:${secs}`;

          updatePatientCOEDelayNotice(currentScanDepartment, activePatient.name, false);
        }
      } else {
        timerDisplay.classList.remove('overtime');
        timerDisplay.textContent = "00:00";
        updatePatientCOEDelayNotice(currentScanDepartment, null, false);
      }
    }, 1000);
  }

  renderCOEAdminQueue();
  renderPatientCOEView();
}

function updatePatientCOEDelayNotice(dept, activePatientName, isOvertime) {
  const noticeContainer = document.getElementById('patientCOEDelayNoticeBanner');
  if (!noticeContainer) return;

  if (activePatientName) {
    if (isOvertime) {
      noticeContainer.innerHTML = `
        <div class="delay-notice-alert">
          <span style="font-size:1.8rem;">⚠️</span>
          <div>
            <strong>Scanning is currently delayed, please wait for some time.</strong><br>
            <span style="font-weight:500; font-size:0.92rem;">${dept} department is currently examining ${activePatientName} (Session exceeded 15 mins slot).</span>
          </div>
        </div>
      `;
    } else {
      noticeContainer.innerHTML = `
        <div class="card" style="background-color:#FEF9C3; border-color:#FDE68A; padding:1.2rem;">
          <div style="display:flex; align-items:center; gap:0.8rem; font-weight:600; color:var(--text-dark);">
            <span style="font-size:1.5rem;">🔬</span>
            <div>
              <strong>${dept} Scanner Active:</strong> Currently examining <strong>${activePatientName}</strong> (10-15 Min Scan Timer Active). Next patient please be ready.
            </div>
          </div>
        </div>
      `;
    }
  } else {
    noticeContainer.innerHTML = `
      <div class="card" style="background-color:#D1FAE5; border-color:#6EE7B7; padding:1.2rem;">
        <div style="display:flex; align-items:center; gap:0.8rem; font-weight:600; color:#065F46;">
          <span style="font-size:1.5rem;">✅</span>
          <div>All scheduled scan consultations in ${dept} department are currently completed!</div>
        </div>
      </div>
    `;
  }
}

// User COE Admin Queue Renderer (Includes Active Completed Checkboxes for Admin Sharan)
function renderCOEAdminQueue() {
  const container = document.getElementById('adminCOEQueueList');
  if (!container) return;

  const allQueues = getCOEQueue();
  const queue = allQueues[currentScanDepartment] || [];

  container.innerHTML = '';

  if (queue.length === 0) {
    container.innerHTML = `<p style="color:var(--text-muted);">No patients in queue for ${currentScanDepartment}.</p>`;
    return;
  }

  queue.forEach((patient, index) => {
    const item = document.createElement('div');
    item.className = `checklist-item ${patient.completed ? 'completed' : ''}`;
    item.innerHTML = `
      <input type="checkbox" class="checklist-checkbox js-admin-complete-checkbox" ${patient.completed ? 'checked disabled' : ''} data-id="${patient.id}">
      <div style="flex:1;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <strong style="font-size:1.05rem; color:var(--text-dark);">
            Patient #${index + 1}: ${patient.name}
          </strong>
          <span class="badge ${patient.completed ? 'badge-success' : (patient.status === 'Scanning In Progress' ? 'badge-primary' : 'badge-yellow')}">
            ${patient.completed ? '✓ Completed' : patient.status}
          </span>
        </div>
        <div style="font-size:0.85rem; color:var(--text-muted); margin-top:0.2rem;">
          Department: ${currentScanDepartment} | Allocated Slot: ${patient.slot}
        </div>
      </div>
      ${(!patient.completed && patient.status === 'Scanning In Progress') ? `
        <button class="btn btn-primary js-admin-complete-btn" data-id="${patient.id}" style="background-color:#10B981; border-color:#059669; font-size:0.85rem; padding:0.4rem 0.85rem;">
          ✓ Mark Completed
        </button>
      ` : ''}
    `;

    container.appendChild(item);
  });

  // Admin Sharan Completion Click Listeners
  const triggers = container.querySelectorAll('.js-admin-complete-checkbox, .js-admin-complete-btn');
  triggers.forEach(elem => {
    elem.addEventListener('click', () => {
      const pId = parseInt(elem.getAttribute('data-id'));
      markCOEScanCompleted(pId);
    });
  });
}

// Patient COE View Renderer (READ-ONLY View for Patients - Cannot access checkboxes!)
function renderPatientCOEView() {
  const container = document.getElementById('patientCOEQueueList');
  if (!container) return;

  const allQueues = getCOEQueue();
  const queue = allQueues[currentScanDepartment] || [];

  container.innerHTML = '';

  queue.forEach((patient, index) => {
    const item = document.createElement('div');
    item.className = `checklist-item ${patient.completed ? 'completed' : ''}`;
    item.innerHTML = `
      <div style="width:24px; font-size:1.2rem; color:${patient.completed ? '#10B981' : 'var(--text-muted)'};">
        ${patient.completed ? '✅' : '⏳'}
      </div>
      <div style="flex:1;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <strong style="font-size:1.05rem; color:var(--text-dark);">
            Patient #${index + 1}: ${patient.name}
          </strong>
          <span class="badge ${patient.completed ? 'badge-success' : (patient.status === 'Scanning In Progress' ? 'badge-primary' : 'badge-yellow')}">
            ${patient.completed ? '✓ Completed by Admin Sharan' : patient.status}
          </span>
        </div>
        <div style="font-size:0.85rem; color:var(--text-muted); margin-top:0.2rem;">
          Department: ${currentScanDepartment} | Est. Slot Arrival: ${patient.slot}
        </div>
      </div>
    `;

    container.appendChild(item);
  });
}

function markCOEScanCompleted(patientId) {
  let allQueues = getCOEQueue();
  let queue = allQueues[currentScanDepartment] || [];
  const index = queue.findIndex(p => p.id === patientId);

  if (index !== -1) {
    queue[index].completed = true;
    queue[index].status = 'Completed';
    const completedName = queue[index].name;

    // Call Next Patient in Department
    const nextIndex = queue.findIndex(p => !p.completed);
    if (nextIndex !== -1) {
      queue[nextIndex].status = 'Scanning In Progress';
      scanSecondsRemaining = 900; // Reset 15-min scan timer
      showToastNotification(`✅ Admin Sharan marked ${completedName} completed! Next patient: ${queue[nextIndex].name}`);
    } else {
      scanSecondsRemaining = 0;
      showToastNotification(`🎉 All scheduled ${currentScanDepartment} scans completed!`);
    }

    allQueues[currentScanDepartment] = queue;
    saveCOEQueue(allQueues);

    renderCOEAdminQueue();
    renderPatientCOEView();
  }
}

// Doctor Portal Authentication (Bhuvanesh / 1234)
function initDoctorAuth() {
  const loginForm = document.getElementById('doctorLoginForm');
  const doctorNameInput = document.getElementById('doctorNameInput');
  const doctorPasswordInput = document.getElementById('doctorPasswordInput');
  const loginView = document.getElementById('doctorLoginView');
  const dashboardView = document.getElementById('doctorDashboardView');
  const loggedDoctorBadge = document.getElementById('loggedDoctorBadge');
  const logoutBtn = document.getElementById('logoutBtn');

  const activeDoctor = localStorage.getItem('loggedInDoctor');
  if (activeDoctor && dashboardView && loginView) {
    loginView.style.display = 'none';
    dashboardView.style.display = 'block';
    if (loggedDoctorBadge) loggedDoctorBadge.textContent = activeDoctor;
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const doctorName = doctorNameInput?.value.trim() || '';
      const password = doctorPasswordInput?.value.trim() || '';

      if ((doctorName.toLowerCase() === 'bhuvanesh' || doctorName.toLowerCase() === 'dr. bhuvanesh') && password === '1234') {
        const fullDoctorName = 'Dr. Bhuvanesh';
        localStorage.setItem('loggedInDoctor', fullDoctorName);
        showToastNotification(`🔓 Login Successful! Welcome, ${fullDoctorName}`);
        if (loginView) loginView.style.display = 'none';
        if (dashboardView) dashboardView.style.display = 'block';
        if (loggedDoctorBadge) loggedDoctorBadge.textContent = fullDoctorName;
        renderPatientQueue();
      } else {
        showNotification('Authentication Failed', 'Invalid Doctor Name or Password. (Try Name: Bhuvanesh, Password: 1234)');
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('loggedInDoctor');
      showToastNotification('Logged out successfully.');
      if (dashboardView) dashboardView.style.display = 'none';
      if (loginView) loginView.style.display = 'block';
    });
  }
}

// 10-Min Doctor Consultation Timer Engine
let timerInterval = null;
let secondsRemaining = 600;

const defaultQueue = [
  { id: 1, name: "Rajesh Kumar", phone: "+91 9876543210", specialty: "Cardiology", date: "2026-09-24", slot: "09:00 AM", status: "In Progress", timeSpent: 0 },
  { id: 2, name: "Priya Sharma", phone: "+91 9812345678", specialty: "Cardiology", date: "2026-09-24", slot: "09:15 AM", status: "Waiting", timeSpent: 0 }
];

function getPatientQueue() {
  const stored = localStorage.getItem('patientQueueData');
  if (stored) {
    try { return JSON.parse(stored); } catch (e) {}
  }
  localStorage.setItem('patientQueueData', JSON.stringify(defaultQueue));
  return defaultQueue;
}

function savePatientQueue(queue) {
  localStorage.setItem('patientQueueData', JSON.stringify(queue));
}

function initConsultationTimer() {
  const timerDisplay = document.getElementById('consultationTimerDisplay');
  if (!timerDisplay) return;

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    const queue = getPatientQueue();
    const activePatientIndex = queue.findIndex(p => p.status === 'In Progress');

    if (activePatientIndex !== -1) {
      secondsRemaining--;
      if (secondsRemaining <= 0) {
        timerDisplay.classList.add('overtime');
        const overtimeSeconds = Math.abs(secondsRemaining);
        const overMins = String(Math.floor(overtimeSeconds / 60)).padStart(2, '0');
        const overSecs = String(overtimeSeconds % 60).padStart(2, '0');
        timerDisplay.textContent = `OVERTIME +${overMins}:${overSecs}`;
        updateQueueMessageBanner(queue[activePatientIndex].name, true);
      } else {
        timerDisplay.classList.remove('overtime');
        const mins = String(Math.floor(secondsRemaining / 60)).padStart(2, '0');
        const secs = String(secondsRemaining % 60).padStart(2, '0');
        timerDisplay.textContent = `${mins}:${secs}`;
        updateQueueMessageBanner(queue[activePatientIndex].name, false);
      }
    } else {
      timerDisplay.classList.remove('overtime');
      timerDisplay.textContent = "00:00";
      updateQueueMessageBanner(null, false);
    }
  }, 1000);

  renderPatientQueue();
}

function updateQueueMessageBanner(currentPatientName, isOvertime) {
  const banner = document.getElementById('patientQueueStatusBanner');
  if (!banner) return;

  if (currentPatientName) {
    if (isOvertime) {
      banner.className = "patient-status-alert";
      banner.innerHTML = `
        <span style="font-size:1.4rem;">⚠️</span>
        <div>
          <strong>Status for Next Patient:</strong> Wait for some more minutes, Dr. Bhuvanesh is still examining <strong>${currentPatientName}</strong> (Consultation exceeded 10 mins).
        </div>
      `;
    } else {
      banner.className = "card";
      banner.style.backgroundColor = "#FEF9C3";
      banner.style.borderColor = "#FDE68A";
      banner.innerHTML = `
        <div style="display:flex; align-items:center; gap:0.8rem; font-weight:600;">
          <span style="font-size:1.4rem;">🩺</span>
          <div>
            Dr. Bhuvanesh is currently examining <strong>${currentPatientName}</strong> (10-Min Timer Active). Next patient please be ready.
          </div>
        </div>
      `;
    }
  } else {
    banner.className = "card";
    banner.style.backgroundColor = "#D1FAE5";
    banner.style.borderColor = "#6EE7B7";
    banner.innerHTML = `
      <div style="display:flex; align-items:center; gap:0.8rem; font-weight:600; color:#065F46;">
        <span style="font-size:1.4rem;">✅</span>
        <div>All scheduled patient consultations completed! Doctor is available.</div>
      </div>
    `;
  }
}

function renderPatientQueue() {
  const queueContainer = document.getElementById('doctorQueueList');
  if (!queueContainer) return;

  const queue = getPatientQueue();
  queueContainer.innerHTML = '';

  queue.forEach((patient, index) => {
    const item = document.createElement('div');
    item.className = `checklist-item ${patient.status === 'Completed' ? 'completed' : ''}`;
    
    item.innerHTML = `
      <input type="checkbox" class="checklist-checkbox" ${patient.status === 'Completed' ? 'checked disabled' : ''} data-id="${patient.id}">
      <div style="flex:1;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <strong style="font-size:1.05rem; color:var(--text-dark);">
            Patient #${index + 1}: ${patient.name}
          </strong>
          <span class="badge ${patient.status === 'Completed' ? 'badge-success' : (patient.status === 'In Progress' ? 'badge-primary' : 'badge-yellow')}">
            ${patient.status}
          </span>
        </div>
        <div style="font-size:0.85rem; color:var(--text-muted); margin-top:0.2rem;">
          Specialty: ${patient.specialty} | Slot: ${patient.slot} | Phone: ${patient.phone}
        </div>
      </div>
      ${patient.status === 'In Progress' ? `
        <button class="btn btn-primary js-mark-complete-btn" data-id="${patient.id}" style="background-color:#10B981; border-color:#059669; font-size:0.85rem; padding:0.4rem 0.8rem;">
          ✓ Mark Completed
        </button>
      ` : ''}
    `;

    queueContainer.appendChild(item);
  });

  const checkboxes = queueContainer.querySelectorAll('.checklist-checkbox, .js-mark-complete-btn');
  checkboxes.forEach(elem => {
    elem.addEventListener('click', () => {
      const pId = parseInt(elem.getAttribute('data-id'));
      markPatientCompleted(pId);
    });
  });
}

function markPatientCompleted(patientId) {
  let queue = getPatientQueue();
  const index = queue.findIndex(p => p.id === patientId);

  if (index !== -1) {
    queue[index].status = 'Completed';
    const completedPatientName = queue[index].name;

    const nextIndex = queue.findIndex(p => p.status === 'Waiting');
    if (nextIndex !== -1) {
      queue[nextIndex].status = 'In Progress';
      secondsRemaining = 600;
      showToastNotification(`✅ Completed ${completedPatientName}! Calling next patient: ${queue[nextIndex].name}`);
    } else {
      secondsRemaining = 0;
      showToastNotification(`🎉 All consultations completed!`);
    }

    savePatientQueue(queue);
    renderPatientQueue();
  }
}

// Appointment Form Handler
function initAppointmentForm() {
  const confirmBtn = document.getElementById('confirmBtn');
  if (!confirmBtn) return;

  confirmBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const nameInput = document.getElementById('patientName');
    const phoneInput = document.getElementById('patientPhone');
    const doctorSelect = document.getElementById('doctorSelect');
    const dateInput = document.getElementById('patientDate');
    const timeSelect = document.getElementById('patientTime');
    const countryCodeSelect = document.getElementById('countryCode');

    const name = nameInput?.value.trim();
    const rawPhone = phoneInput?.value.trim();
    const doctorRaw = doctorSelect?.value;
    const date = dateInput?.value;
    const time = timeSelect?.value;
    const countryCode = countryCodeSelect?.value || '91';

    if (!name) {
      showNotification('Missing Name', 'Please enter your Full Name.');
      nameInput?.focus();
      return;
    }

    if (!rawPhone || rawPhone.length < 10) {
      showNotification('Invalid Phone', 'Please enter your 10-digit mobile number.');
      phoneInput?.focus();
      return;
    }

    if (!doctorRaw) {
      showNotification('Select Doctor', 'Please select a Doctor & Specialty.');
      doctorSelect?.focus();
      return;
    }

    const doctorParts = doctorRaw.split('|');
    const doctorName = doctorParts[0] || 'Dr. Bhuvanesh';
    const specialty = doctorParts[1] || 'General Consultation';
    const availability = doctorParts[2] || 'Available';

    const cleanPhoneDigits = rawPhone.replace(/\D/g, '');
    const fullWhatsAppTarget = `+${countryCode} ${cleanPhoneDigits}`;
    const targetNumberOnly = `${countryCode}${cleanPhoneDigits}`;

    let queue = getPatientQueue();
    const newPatient = {
      id: Date.now(),
      name: name,
      phone: fullWhatsAppTarget,
      specialty: specialty,
      date: date,
      slot: time,
      status: queue.length === 0 ? "In Progress" : "Waiting",
      timeSpent: 0
    };
    queue.push(newPatient);
    savePatientQueue(queue);

    const waMessage = 
`🏥 *PATIENT FRIENDLY CARE - APPOINTMENT CONFIRMATION*
--------------------------------------------------
📞 *Official Sender:* Patient Friendly Care (+91 8072246835)

Hello *${name}*,
Your appointment has been successfully booked!

👨‍⚕️ *Doctor:* ${doctorName}
🩺 *Specialty:* ${specialty}
📅 *Appointment Date:* ${date}
⏰ *Time Slot:* ${time}
✅ *Doctor Availability:* ${availability}

📲 *Sent To:* ${fullWhatsAppTarget}
--------------------------------------------------
_Thank you for choosing Patient Friendly Care (+91 8072246835)._`;

    confirmBtn.innerHTML = '⏳ Transmitting Message to WhatsApp...';
    confirmBtn.disabled = true;

    try {
      await fetch('http://127.0.0.1:5000/api/send-whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name,
          phone: `+${targetNumberOnly}`,
          specialty: `${doctorName} (${specialty})`,
          date: date,
          time: `${time} [Availability: ${availability}]`
        })
      });
    } catch (err) {}

    const waCard = document.getElementById('whatsappConfirmationCard');
    const waTargetPhone = document.getElementById('waTargetPhone');
    const waMessageBody = document.getElementById('waMessageBody');

    if (waTargetPhone) waTargetPhone.textContent = fullWhatsAppTarget;
    if (waMessageBody) waMessageBody.textContent = waMessage;
    if (waCard) {
      waCard.style.display = 'block';
      waCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    showToastNotification(`✅ Appointment Booked! Added to Consultation Queue (${fullWhatsAppTarget})`);

    confirmBtn.innerHTML = 'Confirm Appointment';
    confirmBtn.disabled = false;

    if (nameInput) nameInput.value = '';
    if (phoneInput) phoneInput.value = '';
    if (doctorSelect) doctorSelect.value = '';
  });
}

function initContactForm() {
  const contactForms = document.querySelectorAll('.js-contact-form');
  contactForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showNotification('Message Sent!', 'Thank you for reaching out to Patient Friendly Care. We will reply within 24 hours.');
      form.reset();
    });
  });
}

function showToastNotification(text) {
  let toast = document.getElementById('toastBanner');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastBanner';
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #25D366;
      color: white;
      padding: 1rem 1.6rem;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.25);
      font-weight: 700;
      font-size: 1rem;
      z-index: 3000;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.6rem;
    `;
    document.body.appendChild(toast);
  }
  toast.innerHTML = text;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-20px)';
  }, 5000);
}

function showNotification(title, message) {
  let modal = document.getElementById('globalModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'globalModal';
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-title" id="modalTitle">Notification</div>
          <button class="close-drawer-btn" onclick="closeNotification()">&times;</button>
        </div>
        <p id="modalMessage" style="color: var(--text-muted); margin-bottom: 1.5rem;"></p>
        <button class="btn btn-primary" onclick="closeNotification()" style="width:100%; justify-content:center;">Got it</button>
      </div>
    `;
    document.body.appendChild(modal);
  }

  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalMessage').textContent = message;
  modal.classList.add('active');
}

function closeNotification() {
  const modal = document.getElementById('globalModal');
  if (modal) {
    modal.classList.remove('active');
  }
}


// ==============================================================================
// AI ASSIST DOMAIN - SMART PROBLEM SOLVING CHATBOT & TIMED CARE REMINDERS
// Morning (7-10 AM, every 30m), Afternoon (12-3 PM, every 30-45m), Evening (6-8 PM, dinner & delay)
// ==============================================================================
function initAIAssistant() {
  const chatContainer = document.getElementById('aiChatMessages');
  const chatForm = document.getElementById('aiChatForm');
  const userInput = document.getElementById('aiUserInput');
  const problemSelect = document.getElementById('patientProblemSelect');
  const liveClock = document.getElementById('aiLiveClock');
  const windowStatusText = document.getElementById('aiWindowStatusText');
  const soundToggle = document.getElementById('aiSoundToggle');
  const clearChatBtn = document.getElementById('aiClearChatBtn');
  const simButtons = document.querySelectorAll('.ai-sim-btn');
  const chipButtons = document.querySelectorAll('.ai-chip-btn');

  if (!chatContainer) return; // Only active on ai-assist.html

  let voiceEnabled = true;

  // Initial Welcome Message
  appendAIMessage(
    `Hello! I am your <strong>HEALTH EASY AI Care Companion</strong> 🤖.<br><br>` +
    `I am actively dedicated to solving your health issues, answering medical queries, and guiding your meal & medication times.<br><br>` +
    `⏰ <strong>My Active Timetable:</strong><br>` +
    `• <strong>🌅 7:00 AM – 10:00 AM:</strong> Breakfast & morning tablet checks every 30 mins.<br>` +
    `• <strong>☀️ 12:00 PM – 3:00 PM:</strong> Lunch meal & midday tablet checks every 30–45 mins.<br>` +
    `• <strong>🌙 6:00 PM – 8:00 PM:</strong> Dinner alert! If your dinner is delayed, I will guide you whether to take tablets or water according to your specific problem.<br><br>` +
    `<em>How may I assist you with your health today?</em>`,
    'assistant'
  );

  // Live Clock & Active Window Checker
  function updateLiveClockAndWindow() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    if (liveClock) liveClock.textContent = timeStr;

    const hour = now.getHours();

    let windowStatus = '';
    if (hour >= 7 && hour < 10) {
      windowStatus = `🌅 Active Morning Window (7:00–10:00 AM): 30m Breakfast & Tablet Cycle Running`;
    } else if (hour >= 12 && hour < 15) {
      windowStatus = `☀️ Active Afternoon Window (12:00–3:00 PM): 30–45m Lunch & Midday Tablet Cycle Running`;
    } else if (hour >= 18 && hour < 20) {
      windowStatus = `🌙 Active Evening Window (6:00–8:00 PM): Dinner & Delay Tablet/Water Advisory Running`;
    } else {
      windowStatus = `🌙 24/7 Problem Solver Active (Off-peak). Use Fast Test Simulator to preview any slot!`;
    }

    if (windowStatusText) windowStatusText.textContent = windowStatus;
  }

  updateLiveClockAndWindow();
  setInterval(updateLiveClockAndWindow, 1000);

  // Sound Toggle
  if (soundToggle) {
    soundToggle.addEventListener('click', () => {
      voiceEnabled = !voiceEnabled;
      soundToggle.textContent = voiceEnabled ? '🔊 Voice ON' : '🔇 Voice OFF';
      showToastNotification(voiceEnabled ? '🔊 AI Voice Readout Enabled' : '🔇 AI Voice Readout Disabled');
    });
  }

  // Clear Chat
  if (clearChatBtn) {
    clearChatBtn.addEventListener('click', () => {
      chatContainer.innerHTML = '';
      appendAIMessage(`Chat refreshed. How can I assist you with your health or medicines?`, 'assistant');
    });
  }

  // Quick Chips
  chipButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const msg = btn.getAttribute('data-msg');
      if (msg) {
        handleUserMessage(msg);
      }
    });
  });

  // Fast-Test Schedule Simulator Buttons
  simButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const simTime = btn.getAttribute('data-time');
      const simSlot = btn.getAttribute('data-slot');
      triggerSimulatedReminder(simTime, simSlot);
    });
  });

  // Form Submit
  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const message = userInput.value.trim();
      if (!message) return;
      userInput.value = '';
      handleUserMessage(message);
    });
  }

  // Handle User Message & Produce Intelligent Medical Solution
  function handleUserMessage(text) {
    appendAIMessage(escapeHtml(text), 'user');

    // Show temporary typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'ai-chat-msg assistant';
    typingIndicator.id = 'aiTypingIndicator';
    typingIndicator.innerHTML = `
      <div class="ai-avatar-icon" style="width:32px; height:32px; font-size:1rem;">🤖</div>
      <div class="ai-msg-bubble" style="color: var(--text-muted); font-style: italic;">
        Dr. AI Assistant is formulating medical guidance...
      </div>
    `;
    chatContainer.appendChild(typingIndicator);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    setTimeout(() => {
      const indicator = document.getElementById('aiTypingIndicator');
      if (indicator) indicator.remove();

      const response = generateAIResponse(text);
      appendAIMessage(response, 'assistant');

      if (voiceEnabled && 'speechSynthesis' in window) {
        speakResponse(response);
      }
    }, 450);
  }

  // Timed Schedule Simulator Trigger
  function triggerSimulatedReminder(timeString, slotType) {
    const condition = problemSelect ? problemSelect.value : 'General Wellness';
    let reminderText = '';

    if (slotType === 'morning') {
      reminderText = `
        <strong>🌅 30-Minute Morning Care Reminder [${timeString}]</strong><br><br>
        <strong>Condition Context:</strong> <em>${condition}</em><br><br>
        • <strong>Breakfast Guideline:</strong> You should eat the breakfast now. Eating on time balances metabolic enzymes and buffers your stomach lining.<br>
        • <strong>Tablet Protocol:</strong> You should take tablets approximately 15–20 minutes after finishing your breakfast with warm water.<br>
        • <em>Friendly Advice:</em> Please do not take tablets on an empty stomach to avoid gastric distress!
      `;
    } else if (slotType === 'afternoon') {
      reminderText = `
        <strong>☀️ Midday Care & Meal Reminder [${timeString}]</strong><br><br>
        <strong>Condition Context:</strong> <em>${condition}</em><br><br>
        • <strong>Meal Guideline:</strong> You should take the meal / lunch on time. A wholesome, balanced meal maintains your energy and medication absorption.<br>
        • <strong>Tablet Protocol:</strong> If you are prescribed afternoon tablets (antibiotics, digestive enzymes, or BP medication), you should take the tablets following your meal.<br>
        • <em>Friendly Advice:</em> Remember to rest for 15 minutes after eating.
      `;
    } else if (slotType === 'evening') {
      reminderText = `
        <strong>🌙 Evening Dinner Reminder [${timeString}]</strong><br><br>
        <strong>Condition Context:</strong> <em>${condition}</em><br><br>
        • <strong>Dinner Guideline:</strong> You should take the dinner on time before 8:00 PM to ensure optimal digestion.<br>
        • <strong>Night Tablets:</strong> Prepare your night medication so it can be taken consistently after food.
      `;
    } else if (slotType === 'evening-delayed') {
      reminderText = `
        <strong>⏰ Evening Delayed Dinner & Tablet Advisory [${timeString}]</strong><br><br>
        <strong>Condition Context:</strong> <em>${condition}</em><br><br>
        • <strong>If Your Dinner is Delayed:</strong> If you are delayed having your dinner, <strong>you should take water according to your problem</strong> (drink at least 1–2 glasses of warm water to protect stomach pH).<br>
        • <strong>Delayed Tablet Strategy:</strong> If your medication requires food, eat a small healthy light snack (banana, bread, or crackers) and <strong>you should take the tablets according to your problem</strong> so your dose is never skipped.<br>
        • <em>Friendly Reassurance:</em> Don't stress over a temporary delay! Staying hydrated and protecting your digestive lining is our priority.
      `;
    }

    appendAIMessage(reminderText, 'reminder');
    showToastNotification(`🔔 Scheduled AI Reminder Dispatched for [${timeString}]`);

    if (voiceEnabled && 'speechSynthesis' in window) {
      speakResponse(`Reminder for ${timeString}. You should take your meal and tablets according to your problem.`);
    }
  }

  // Comprehensive Clinical Knowledge Engine
  function generateAIResponse(input) {
    const lower = input.toLowerCase();
    const condition = problemSelect ? problemSelect.value : 'General Wellness';

    // Delayed Dinner Query
    if (lower.includes('delay') || lower.includes('late dinner') || lower.includes('skip dinner') || lower.includes('dinner delayed')) {
      return `
        <strong>🌙 Dinner Delay & Tablet Care Plan:</strong><br><br>
        When dinner is delayed past your standard window (6:00 PM – 8:00 PM):<br>
        1. <strong>Water First:</strong> You should take water (1–2 glasses of room temperature or warm water) according to your problem to avoid hyperacidity.<br>
        2. <strong>Take Tablets According to Problem:</strong> If your tablets specify "after meals", eat a light snack (crackers, oats, or a banana) and take your prescribed tablets immediately so you do not miss your dosage.<br>
        3. <strong>Condition Advice for <em>${condition}</em>:</strong> Never sleep immediately after a late dinner—allow at least 45 minutes of upright posture.
      `;
    }

    // Breakfast & Morning Tablets
    if (lower.includes('breakfast') || lower.includes('morning') || lower.includes('empty stomach')) {
      return `
        <strong>🌅 Morning Meal & Tablet Recommendation:</strong><br><br>
        • <strong>Breakfast:</strong> You should eat the breakfast first! A nutritious breakfast (eggs, oats, idli, fruit) jumpstarts metabolism and lines your stomach.<br>
        • <strong>Tablet Guideline:</strong> You should take tablets 15–20 minutes after finishing your breakfast, unless your doctor specifically prescribed an empty stomach pill (like a proton-pump inhibitor 30 mins before food).<br>
        • <strong>Hydration:</strong> Always swallow tablets with a full glass (250ml) of water, never with tea or coffee.
      `;
    }

    // Lunch & Afternoon Meal
    if (lower.includes('lunch') || lower.includes('afternoon') || lower.includes('midday') || lower.includes('meal')) {
      return `
        <strong>☀️ Midday Meal & Medication Protocol:</strong><br><br>
        • <strong>Meal:</strong> You should take the meal / lunch on time between 12:00 PM and 2:00 PM.<br>
        • <strong>Afternoon Tablets:</strong> If your prescription includes midday antibiotics or vitamins, you should take tablets right after your meal with ample water.<br>
        • <em>Friendly Note:</em> Light walking after lunch aids digestion and prevents afternoon drowsiness.
      `;
    }

    // Tablets & Medicines General
    if (lower.includes('tablet') || lower.includes('medicine') || lower.includes('pill') || lower.includes('dose')) {
      return `
        <strong>💊 Medication Instructions for ${condition}:</strong><br><br>
        • <strong>Morning (7–10 AM):</strong> You should eat the breakfast, then take your morning tablets.<br>
        • <strong>Afternoon (12–3 PM):</strong> You should take the meal, then take prescribed afternoon tablets.<br>
        • <strong>Evening (6–8 PM):</strong> You should take the dinner. If you delay, take water according to your problem and take your tablets with a light food buffer.<br>
        • <em>Hotline Support:</em> For customized dosage adjustments, Dr. Bhuvanesh is available via our 24/7 Hotline: <strong>+91 8072246835</strong>.
      `;
    }

    // Water & Hydration
    if (lower.includes('water') || lower.includes('hydrat') || lower.includes('drink')) {
      return `
        <strong>💧 Hydration Protocol:</strong><br><br>
        • Aim for <strong>2.5 to 3 Liters</strong> of clean drinking water daily.<br>
        • <strong>With Medication:</strong> Always take tablets with a full 250ml glass of water. It ensures the capsule or tablet reaches the stomach smoothly without sticking to the esophagus.<br>
        • <strong>If Dinner is Delayed:</strong> You should take water according to your problem to dilute stomach acid and maintain comfort.
      `;
    }

    // Gastrology / Burning / Ulcer
    if (lower.includes('gastric') || lower.includes('acid') || lower.includes('burn') || lower.includes('ulcer') || lower.includes('stomach')) {
      return `
        <strong>🫁 Gastric & Acidity Relief Protocol:</strong><br><br>
        • <strong>Immediate Step:</strong> Drink a small glass of cool or room-temperature water. Avoid citrus or spicy foods.<br>
        • <strong>Tablet Guide:</strong> Antacid suspensions or PPI tablets provide relief. You should take tablets prescribed for gastrology exactly as indicated by your physician.<br>
        • <strong>Important:</strong> Do not lay flat immediately after eating. Elevate your head 15–30 degrees.
      `;
    }

    // Headaches, Fever, Pain
    if (lower.includes('headache') || lower.includes('fever') || lower.includes('pain') || lower.includes('temperature')) {
      return `
        <strong>🌡️ Symptom Relief Advisory:</strong><br><br>
        • <strong>Rest & Hydrate:</strong> Drink electrolytes or warm fluids.<br>
        • <strong>Tablets:</strong> Mild paracetamol (500mg/650mg) can be taken after a light meal if fever exceeds 100°F (37.8°C).<br>
        • <strong>When to Call:</strong> If fever or pain persists over 48 hours, immediately reach our clinic hotline at <strong>+91 8072246835</strong>.
      `;
    }

    // Scans (CT, X-Ray, MRI, Ultrasound)
    if (lower.includes('scan') || lower.includes('ct') || lower.includes('x-ray') || lower.includes('mri') || lower.includes('ultrasound')) {
      return `
        <strong>🔬 Diagnostic Scan Preparation & Recovery:</strong><br><br>
        • <strong>Pre-Scan:</strong> For ultrasound, keep bladder full. For contrast CT scans, fast for 4 hours as directed.<br>
        • <strong>Post-Scan:</strong> You should drink plenty of water (at least 5–6 glasses) to flush contrast dye naturally.<br>
        • You can view your completed scan reports on the <strong>Scan Reports Domain</strong> or download them from <strong>Patient Entire Report</strong>.
      `;
    }

    // Default Friendly Empathetic Healthcare Response
    return `
      <strong>🩺 AI Healthcare Guidance:</strong><br><br>
      Thank you for sharing your concern. Based on your profile (<em>${condition}</em>):<br><br>
      • <strong>Daily Cycle:</strong> You should eat your breakfast (7–10 AM), take your meal on time (12–3 PM), and take your dinner (6–8 PM).<br>
      • <strong>Medication & Water:</strong> If your schedule is delayed, you should take water according to your problem or take your tablets with a light food buffer.<br>
      • <strong>Doctor Assistance:</strong> For urgent evaluations or complex symptom changes, Dr. Bhuvanesh and our medical team are available 24/7 on WhatsApp/Call: <strong>+91 8072246835</strong>.
    `;
  }

  // Append Message to Chat Container
  function appendAIMessage(htmlContent, type) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `ai-chat-msg ${type}`;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (type === 'assistant') {
      msgDiv.innerHTML = `
        <div class="ai-avatar-icon" style="width:34px; height:34px; font-size:1.1rem;">🤖</div>
        <div class="ai-msg-bubble">
          ${htmlContent}
          <span class="ai-msg-time">${time} • AI Assistant</span>
        </div>
      `;
    } else if (type === 'user') {
      msgDiv.innerHTML = `
        <div class="ai-msg-bubble">
          ${htmlContent}
          <span class="ai-msg-time">${time} • You</span>
        </div>
      `;
    } else if (type === 'reminder') {
      msgDiv.innerHTML = `
        <div class="ai-msg-bubble">
          ${htmlContent}
          <span class="ai-msg-time" style="color: #92400E; font-weight: 700;">${time} • Proactive Schedule Care</span>
        </div>
      `;
    }

    chatContainer.appendChild(msgDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  // Voice Readout Helper
  function speakResponse(rawHtml) {
    try {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = rawHtml;
      const plainText = tempDiv.textContent || tempDiv.innerText || '';
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(plainText.substring(0, 220));
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      // Audio speech gracefully ignored if blocked by browser policy
    }
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
}


// ==============================================================================
// TOP RIGHT CORNER SINGLE-USER PATIENT VITALS & HEALTH DASHBOARD ENGINE
// Displays: Problem, Disease, Issues, Scan Copy, Heart Rate, BPM, Oxygen, Tablets
// ==============================================================================

const singleUserPatientRecord = {
  id: 101,
  regNo: "HE-4089",
  name: "Karthik Subramanian",
  age: 42,
  gender: "Male",
  bloodGroup: "O+",
  department: "CT Scan",
  slot: "10:00 AM",
  status: "Scanning In Progress",
  disease: "Chronic Acid Peptic Disease (GERD) & Lumbar Radiculopathy",
  issues: "Severe post-meal epigastric burning, occasional nausea & dizziness when dinner is delayed past 8 PM, mild lumbar spine stiffness radiating to left lower extremity",
  heartRate: "74 bpm",
  heartStatus: "Normal Regular Sinus Rhythm",
  bpm: "74 BPM",
  bloodPressure: "122/82 mmHg",
  oxygenLevel: "99% SpO2",
  oxygenStatus: "Average measured over 24h (Optimal)",
  temperature: "98.6 °F (Afebrile)",
  tablets: [
    { name: "Tab. Pantoprazole 40mg", dosage: "1 Tablet", timing: "🌅 Morning 30 mins before breakfast", purpose: "Acid suppression & gastric mucosal healing" },
    { name: "Tab. Domperidone 10mg", dosage: "1 Tablet", timing: "🌅 Morning before food", purpose: "Anti-reflux & GI motility" },
    { name: "Tab. Paracetamol 650mg", dosage: "1 Tablet", timing: "⚡ SOS (When headache/backache exceeds mild)", purpose: "Analgesic & antipyretic" },
    { name: "Tab. Atorvastatin 10mg", dosage: "1 Tablet", timing: "🌙 Night after dinner", purpose: "Lipid management & vascular protection" },
    { name: "Syp. Sucralfate 10ml", dosage: "2 Teaspoons", timing: "🌙 Post-dinner / Bedtime buffer", purpose: "Cytoprotective gastric barrier coating" }
  ],
  scanCopyTitle: "High-Resolution Brain CT Angiogram & Lumbar MRI",
  scanCopyDate: "Sep 24, 2026",
  scanCopyRadiologist: "Dr. Bhuvanesh, M.D. (Lead Radiologist)",
  scanCopyFindings: "Cerebral perfusion and circle of Willis patent. L4-L5 disc desiccation with minor foraminal narrowing. Gastric mucosal thickening consistent with GERD.",
  clinicalAdvice: "Maintain daily hydration of 3.0 Liters. If evening dinner is delayed past 8 PM, drink 1-2 glasses of warm water or take a light digestive biscuit before ingesting night tablets to prevent chemical gastropathy."
};

function initPatientVitalsDashboard() {
  // 1. Inject Top Corner Button into Header if not already present
  const headerControls = document.querySelector('.header-controls');
  if (headerControls && !document.getElementById('topCornerPatientBtn')) {
    const btn = document.createElement('button');
    btn.className = 'patient-circle-profile-btn';
    btn.id = 'patientCircleProfileBtn';
    btn.setAttribute('aria-label', 'Open Patient Health Dashboard');
    btn.title = 'Patient Profile & Vitals Dashboard (Karthik Subramanian)';
    btn.innerHTML = `
      <span class="patient-circle-avatar-icon">👤</span>
      <span class="patient-circle-live-dot"></span>
    `;
    btn.addEventListener('click', openPatientVitalsDashboard);
    headerControls.prepend(btn);
  }

  // 2. Inject Right Top Corner Small Circle Profile ALONE
  if (!document.getElementById('floatingCircleProfile')) {
    const floatBtn = document.createElement('button');
    floatBtn.className = 'floating-circle-profile';
    floatBtn.id = 'floatingCircleProfile';
    floatBtn.title = 'Karthik Subramanian (#HE-4089) - Patient Health Dashboard';
    floatBtn.setAttribute('aria-label', 'Open Patient Health Dashboard');
    floatBtn.innerHTML = `
      <span class="patient-circle-avatar-icon">👤</span>
      <span class="patient-circle-live-dot"></span>
    `;
    floatBtn.addEventListener('click', openPatientVitalsDashboard);
    document.body.appendChild(floatBtn);
  }

  // 3. Inject Modal Sheet into Document
  if (!document.getElementById('patientDashboardModal')) {
    const modalBackdrop = document.createElement('div');
    modalBackdrop.className = 'patient-modal-backdrop';
    modalBackdrop.id = 'patientDashboardModal';
    modalBackdrop.innerHTML = `
      <div class="patient-dashboard-sheet" id="patientDashboardSheet">
        <!-- Header -->
        <div class="patient-dash-header">
          <div class="patient-avatar-box">
            <div class="patient-avatar-large">👤</div>
            <div>
              <div style="display:flex; align-items:center; gap:0.6rem; flex-wrap:wrap;">
                <h2 style="margin:0; font-size:1.45rem; color:var(--text-dark);" id="modalPatientName">
                  ${singleUserPatientRecord.name}
                </h2>
                <span class="badge badge-primary" style="background:#0284C7; color:white;">ID: ${singleUserPatientRecord.regNo}</span>
                <span class="badge badge-yellow">Age: ${singleUserPatientRecord.age} Y / ${singleUserPatientRecord.gender}</span>
                <span class="badge badge-success">Blood: ${singleUserPatientRecord.bloodGroup}</span>
              </div>
              <p style="margin:0.25rem 0 0 0; font-size:0.85rem; color:var(--text-muted);">
                Department: <strong>${singleUserPatientRecord.department}</strong> | Active Status: <span style="color:#D97706; font-weight:700;">${singleUserPatientRecord.status}</span>
              </p>
            </div>
          </div>
          <button class="close-drawer-btn" onclick="closePatientVitalsDashboard()" style="font-size:1.8rem;">&times;</button>
        </div>

        <!-- 4-Column Vitals HUD Grid -->
        <div class="vitals-hud-grid">
          <!-- Heart Rate -->
          <div class="vital-hud-card heart-rate">
            <div class="vital-icon">❤️</div>
            <div class="vital-label">Heart Rate (Last)</div>
            <div class="vital-val">${singleUserPatientRecord.heartRate}</div>
            <div class="vital-status">${singleUserPatientRecord.heartStatus}</div>
          </div>

          <!-- BPM / Blood Pressure -->
          <div class="vital-hud-card bpm-pressure">
            <div class="vital-icon">🩺</div>
            <div class="vital-label">BPM & Blood Pressure</div>
            <div class="vital-val">${singleUserPatientRecord.bloodPressure}</div>
            <div class="vital-status">Pulse: ${singleUserPatientRecord.bpm}</div>
          </div>

          <!-- Oxygen Level SpO2 -->
          <div class="vital-hud-card oxygen-level">
            <div class="vital-icon">🫁</div>
            <div class="vital-label">Oxygen Level (SpO2)</div>
            <div class="vital-val">${singleUserPatientRecord.oxygenLevel}</div>
            <div class="vital-status">${singleUserPatientRecord.oxygenStatus}</div>
          </div>

          <!-- Temperature -->
          <div class="vital-hud-card temperature">
            <div class="vital-icon">🌡️</div>
            <div class="vital-label">Body Temperature</div>
            <div class="vital-val">98.6 °F</div>
            <div class="vital-status">Normothermic (Normal)</div>
          </div>
        </div>

        <!-- Patient Disease & Issues Having Box -->
        <div class="patient-issues-box">
          <h4><span>🩺</span> Diagnosed Problem & Disease:</h4>
          <p style="margin:0.2rem 0 0.8rem 0; font-size:1.05rem; font-weight:800; color:#B45309;">
            ${singleUserPatientRecord.disease}
          </p>
          <h4><span>⚠️</span> Active Symptoms & Issues Having:</h4>
          <p style="margin:0.2rem 0; font-size:0.92rem; color:var(--text-dark); line-height:1.5;">
            ${singleUserPatientRecord.issues}
          </p>
          <div class="issue-pill-row">
            <span class="issue-pill">🔥 Post-Meal Burning</span>
            <span class="issue-pill">⏰ Delay Nausea / Reflux</span>
            <span class="issue-pill">🦴 Lumbar Spondylosis</span>
            <span class="issue-pill">💧 Low Midday Hydration</span>
          </div>
        </div>

        <!-- Prescribed Tablets Taking Box -->
        <div class="patient-tablets-box">
          <h4 style="margin:0 0 0.8rem 0; font-size:1.05rem; color:var(--primary-hover); display:flex; align-items:center; gap:0.4rem;">
            <span>💊</span> Current Prescribed Tablets Taking:
          </h4>
          <div id="patientTabletsList">
            ${singleUserPatientRecord.tablets.map(tab => `
              <div class="tablet-item-row">
                <div>
                  <strong>${tab.name}</strong> (${tab.dosage})
                  <div style="font-size:0.78rem; color:var(--text-muted);">${tab.purpose}</div>
                </div>
                <span class="badge badge-yellow" style="font-size:0.8rem;">${tab.timing}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Patient Scan Copy Box -->
        <div class="patient-scancopy-box">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap;">
            <h4 style="margin:0; font-size:1.05rem; color:#38BDF8; display:flex; align-items:center; gap:0.4rem;">
              <span>🔬</span> Official Diagnostic Scan Copy
            </h4>
            <span style="font-size:0.8rem; color:#94A3B8;">Radiologist: ${singleUserPatientRecord.scanCopyRadiologist}</span>
          </div>
          
          <div class="scan-copy-img-wrap">
            <img src="images/hospital.jpg" alt="Diagnostic Scan Copy" id="patientScanCopyImg">
            <div class="scan-copy-overlay">
              ${singleUserPatientRecord.scanCopyTitle} • Verified Verified CT Contrast Scan
            </div>
          </div>
          
          <p style="margin:0.4rem 0 0 0; font-size:0.85rem; color:#CBD5E1; line-height:1.45;">
            <strong>Radiological Findings:</strong> ${singleUserPatientRecord.scanCopyFindings}
          </p>
        </div>

        <!-- Clinical Advisory & Delayed Dinner Strategy -->
        <div style="background:#FEF9C3; border:1.5px solid #FDE047; border-radius:var(--radius-md); padding:1rem 1.2rem; margin-bottom:1.5rem;">
          <strong style="color:#B45309; display:flex; align-items:center; gap:0.3rem;">
            <span>💡</span> AI Clinical Advice for Medication & Delayed Meals:
          </strong>
          <p style="margin:0.4rem 0 0 0; font-size:0.88rem; color:#78350F; line-height:1.45;">
            ${singleUserPatientRecord.clinicalAdvice}
          </p>
        </div>

        <!-- Action Row -->
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.8rem;">
          <div style="display:flex; gap:0.6rem; flex-wrap:wrap;">
            <a href="tel:+918072246835" class="btn btn-primary btn-sm">📞 Call Hotline (+91 8072246835)</a>
            <a href="ai-assist.html" class="btn btn-outline btn-sm">🤖 Consult AI Care Assistant</a>
            <a href="scan-reports.html" class="btn btn-outline btn-sm">🔬 View All Diagnostic Scans</a>
          </div>
          <button class="btn btn-outline btn-sm" onclick="closePatientVitalsDashboard()">Close Dashboard</button>
        </div>
      </div>
    `;

    document.body.appendChild(modalBackdrop);

    // Close when clicking outside sheet
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closePatientVitalsDashboard();
      }
    });
  }
}

function openPatientVitalsDashboard() {
  const modal = document.getElementById('patientDashboardModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closePatientVitalsDashboard() {
  const modal = document.getElementById('patientDashboardModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}
