/**
 * PRIME-E - Maritime & Blue Economy Enterprise
 * Core JavaScript Operations & Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initHeaderScrollSpy();
  initServiceModals();
  initFleetExplorer();
  initOperationsEstimator();
  initContactForm();
  initCopyActions();
  initBackToTop();
  updateCurrentYear();
});

/* ==========================================================================
   1. Mobile Navigation
   ========================================================================== */
function initMobileNavigation() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const menuIcon = document.getElementById('menuIcon');
  const closeIcon = document.getElementById('closeIcon');

  if (!toggleBtn || !mobileMenu) return;

  function toggleMenu(show) {
    const isExpanded = show !== undefined ? show : mobileMenu.classList.contains('hidden');
    if (isExpanded) {
      mobileMenu.classList.remove('hidden');
      toggleBtn.setAttribute('aria-expanded', 'true');
      if (menuIcon && closeIcon) {
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
      }
      document.body.style.overflow = 'hidden';
    } else {
      mobileMenu.classList.add('hidden');
      toggleBtn.setAttribute('aria-expanded', 'false');
      if (menuIcon && closeIcon) {
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      }
      document.body.style.overflow = '';
    }
  }

  toggleBtn.addEventListener('click', () => {
    const willOpen = mobileMenu.classList.contains('hidden');
    toggleMenu(willOpen);
  });

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu(false);
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
      toggleMenu(false);
    }
  });
}

/* ==========================================================================
   2. Header Scroll & Link Spy
   ========================================================================== */
function initHeaderScrollSpy() {
  const header = document.getElementById('siteHeader');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Header styling on scroll
    if (header) {
      if (scrollY > 50) {
        header.classList.add('shadow-xl', 'bg-opacity-98');
        header.classList.remove('py-4');
        header.classList.add('py-2.5');
      } else {
        header.classList.remove('shadow-xl', 'bg-opacity-98');
        header.classList.add('py-4');
        header.classList.remove('py-2.5');
      }
    }

    // Active link highlighting
    let currentId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-cyan-400', 'font-bold');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('text-cyan-400', 'font-bold');
      }
    });
  });
}

/* ==========================================================================
   3. Service Details Modal & Data
   ========================================================================== */
const serviceData = {
  asset: {
    title: 'Marine Asset Ownership & Management',
    tagline: 'Vessel Lifecycle Governance, Asset Security & Flag State Compliance',
    badge: 'Core Competency',
    overview: 'PRIME-E operates an integrated marine asset management framework tailored for commercial vessel owners, private operators, and maritime charterers across the Gulf of Guinea.',
    highlights: [
      'Fleet acquisition, technical survey, and condition appraisal',
      'Preventive hull maintenance, dry-docking scheduling, and class renewal',
      'Full statutory compliance with NIMASA, IMO, and Classification Societies (ABS/BV/DNV)',
      'Certified marine crew provisioning, offshore payroll, and safety training',
      '24/7 Remote telemetry and fuel optimization systems'
    ],
    operationalSpecs: {
      'Fleet Governance': 'ISM Code / ISO 9001:2015',
      'Operational Area': 'Gulf of Guinea / Niger Delta Corridor',
      'Asset Categories': 'Tugs, Barges, Crew Transfer Boats, Utility Supply',
      'Regulatory Authority': 'NIMASA / NPA Compliant'
    },
    ctaSubject: 'Marine Asset Management Inquiry'
  },
  fisheries: {
    title: 'Commercial Fisheries & Aquaculture Value Chain',
    tagline: 'Sustainable Deep-Sea Trawling, Industrial Cold Chain & Domestic Seafood Security',
    badge: 'Blue Economy Pillar',
    overview: 'Addressing Nigeria’s marine protein deficit by developing an industrial-grade seafood harvesting, processing, and distribution cold chain centered in Akwa Ibom’s coastal zones.',
    highlights: [
      'Sustainable trawler fleet operations adhering to strict catch quotas',
      'Immediate on-board flash freezing at -25°C to preserve peak freshness',
      'Direct off-take distribution to supermarkets, hotels, and industrial processors',
      'Empowerment of artisanal fishing cooperatives through fair trade buyback schemes',
      'Zero by-catch reduction technologies and coastal ecosystem monitoring'
    ],
    operationalSpecs: {
      'Cold Storage Temp': '-25°C Flash Freeze',
      'Target Species': 'Atlantic Croaker, Bonga, Tiger Prawns, Red Snapper',
      'Terminal Hub': 'Akwa Ibom Coastal Terminal (Ibeno/Oron axis)',
      'Sustainability Standard': 'FAO Code of Conduct for Responsible Fisheries'
    },
    ctaSubject: 'Commercial Fisheries Partnership'
  },
  transport: {
    title: 'Marine Transportation Services',
    tagline: 'Rapid Personnel Shuttles, Industrial Barging & Bulk Cargo Transit',
    badge: 'Critical Infrastructure',
    overview: 'Safe, punctual, and weather-resilient passenger, crew, and cargo marine transport connecting commercial centers and offshore assets throughout Akwa Ibom and the Niger Delta.',
    highlights: [
      'Offshore Crew Transfer Vessels (CTV) with advanced motion-dampening hulls',
      'Industrial flat-top and hopper barges for heavy machinery and bulk aggregates',
      'Corporate executive marine water taxis between Uyo/Calabar/Port Harcourt waterways',
      'Real-time vessel tracking with Automatic Identification System (AIS)',
      'Trained SOLAS-certified crews with first aid and rapid survival protocols'
    ],
    operationalSpecs: {
      'Passenger Capacity': '20 - 150 pax per vessel unit',
      'Cargo Capacity': 'Up to 3,500 MT per barge train',
      'Safety Record': '99.4% incident-free voyages',
      'Waterways Covered': 'Qua Iboe River, Imo River Estuary, Cross River Delta'
    },
    ctaSubject: 'Marine Transportation Booking'
  },
  logistics: {
    title: 'Maritime Logistics & Offshore Support',
    tagline: 'Supply Base Management, Offshore Replenishment & Terminal Support',
    badge: 'Integrated Supply Chain',
    overview: 'PRIME-E delivers end-to-end maritime logistics services ensuring offshore installations, deep-sea vessels, and coastal industries maintain uninterrupted operational uptime.',
    highlights: [
      'Offshore rig replenishment (potable water, provisions, deck equipment, spares)',
      'Bonded marine storage, freight forwarding, and customs clearance liaison',
      'Bunkering assistance and marine lubricants distribution',
      'Harbor towage, mooring assistance, and pilotage support coordination',
      'Emergency maritime response, spill mitigation gear, and salvage logistics'
    ],
    operationalSpecs: {
      'Response Time': '< 2 Hours for coastal dispatch',
      'Storage Capacity': 'Secure bonded coastal staging yard',
      'Handling Equipment': 'Heavy marine cranes, reach stackers & forklifts',
      'Dispatch Line': '+234 803 177 9169 (24/7 Operations Duty)'
    },
    ctaSubject: 'Maritime Logistics & Support Request'
  }
};

function initServiceModals() {
  const modal = document.getElementById('serviceDetailModal');
  const closeBtn = document.getElementById('closeModalBtn');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalTitle = document.getElementById('modalTitle');
  const modalTagline = document.getElementById('modalTagline');
  const modalBadge = document.getElementById('modalBadge');
  const modalOverview = document.getElementById('modalOverview');
  const modalHighlights = document.getElementById('modalHighlights');
  const modalSpecs = document.getElementById('modalSpecs');
  const modalCtaBtn = document.getElementById('modalCtaBtn');

  if (!modal) return;

  function openModal(serviceKey) {
    const data = serviceData[serviceKey];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalTagline.textContent = data.tagline;
    modalBadge.textContent = data.badge;
    modalOverview.textContent = data.overview;

    // Render highlights
    modalHighlights.innerHTML = data.highlights
      .map(item => `
        <li class="flex items-start space-x-3 text-slate-700">
          <svg class="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span class="text-sm sm:text-base">${item}</span>
        </li>
      `)
      .join('');

    // Render specs
    modalSpecs.innerHTML = Object.entries(data.operationalSpecs)
      .map(([k, v]) => `
        <div class="bg-slate-50 p-3 rounded-lg border border-slate-200">
          <span class="block text-xs font-semibold text-slate-500 uppercase tracking-wider">${k}</span>
          <span class="block text-sm font-bold text-navy-900 mt-1">${v}</span>
        </div>
      `)
      .join('');

    // Configure CTA
    if (modalCtaBtn) {
      modalCtaBtn.onclick = () => {
        closeModal();
        const contactSection = document.getElementById('contact');
        const serviceSelect = document.getElementById('contactService');
        if (serviceSelect) {
          if (serviceKey === 'asset') serviceSelect.value = 'Vessel Acquisition';
          else if (serviceKey === 'fisheries') serviceSelect.value = 'Fisheries Supply Chain';
          else if (serviceKey === 'transport') serviceSelect.value = 'Crew Transport';
          else if (serviceKey === 'logistics') serviceSelect.value = 'General Logistics';
        }
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      };
    }

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-service-modal]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceKey = trigger.getAttribute('data-service-modal');
      openModal(serviceKey);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   3b. Fleet & Vessel Explorer Data & Interactions
   ========================================================================== */
const fleetData = {
  ctv: {
    id: 'ctv',
    name: 'M/V Qua Iboe Voyager',
    type: 'Fast Crew Transfer & Personnel Vessel (CTV)',
    category: 'ctv',
    image: 'assets/images/marine_logistics.jpg',
    status: 'In Active Service',
    service: 'Crew Transport',
    overview: 'Engineered for high-speed, motion-dampened personnel transfer between coastal shore bases in Akwa Ibom and offshore oil & gas platforms across the Gulf of Guinea.',
    specs: {
      'Length Overall (LOA)': '24.5 meters',
      'Beam (Width)': '7.2 meters',
      'Operating Draft': '1.4 meters (Shallow Estuary Draft)',
      'Passenger Capacity': '60 Certified Offshore Personnel',
      'Deck Cargo Capacity': '5 Metric Tons (45 m² Clear Deck)',
      'Max / Cruising Speed': '27 Knots / 22 Knots',
      'Propulsion & Power': 'Twin Caterpillar C32 Acert (2 x 1,450 BHP)',
      'Waterjet Units': 'Twin HamiltonJet HJ521 Propulsion',
      'Operating Range': '450 Nautical Miles',
      'Safety & Compliance': 'NIMASA HSC Code / Bureau Veritas Class A'
    },
    features: [
      'Active motion-dampening stepped hull for rough sea passenger comfort',
      'Specialized bow fender nose for safe offshore wind & rig platform docking',
      'Full satellite telecom, Starlink maritime data, and FLIR thermal night vision',
      'Fully air-conditioned passenger cabin with ergonomic reclining safety seating'
    ]
  },
  trawler: {
    id: 'trawler',
    name: 'M/V Atlantic Harvest',
    type: 'Deep-Sea Commercial Trawler & Flash Freezer',
    category: 'fisheries',
    image: 'assets/images/commercial_fisheries.jpg',
    status: 'Deep-Sea Fleet Active',
    service: 'Fisheries Supply Chain',
    overview: 'Flagship commercial fisheries vessel equipped with state-of-the-art sonar hydro-acoustics, sustainable demersal trawls, and industrial blast freezing systems.',
    specs: {
      'Length Overall (LOA)': '38.0 meters',
      'Beam (Width)': '8.8 meters',
      'Draft (Molded)': '3.8 meters',
      'Freeze Hold Capacity': '180 Metric Tons (-25°C Blast Freeze)',
      'Daily Freezing Rate': '15 Metric Tons / 24 Hours',
      'Sea Endurance': '21 Continuous Sea Days',
      'Main Engine': 'Yanmar 6EY17W Marine Diesel (1,138 BHP)',
      'Auxiliary Power': '2 x 180 kVA GenSets with parallel sync',
      'Bycatch Technology': 'Square-mesh escape panels & Turtle Excluder Devices',
      'Compliance & Hygiene': 'Federal Dept. of Fisheries / NAFDAC Export Class'
    },
    features: [
      'Instant -25°C blast-freeze preserving seafood cellular integrity within 30 mins of catch',
      'Automated stainless-steel fish gutting, sorting, and grading deck conveyors',
      'High-resolution Furuno dual-frequency fish finder sonar system',
      'Strict adherence to regulated Atlantic fishing zones and seasonal reproduction reserves'
    ]
  },
  tugbarge: {
    id: 'tugbarge',
    name: 'M/V Akwa Titan & PB-350',
    type: 'Twin-Screw Ocean Towage Tug & Heavy Deck Barge',
    category: 'tugbarge',
    image: 'assets/images/akwa_ibom_maritime_hub.jpg',
    status: 'Coastal Logistics Ready',
    service: 'Cargo Freight',
    overview: 'Heavy industrial marine transport combination capable of shallow riverine barging and offshore coastal haulage of heavy earthmoving machinery, line pipes, and construction aggregates.',
    specs: {
      'Tug Length / Beam': '32.0 meters / 9.5 meters',
      'Barge Dimensions': '65.0 m x 18.0 m x 4.2 m (PB-350 Flat Top)',
      'Deadweight (DWT)': '3,500 Metric Tons',
      'Bollard Pull': '45 Metric Tonnes Continuous Pull',
      'Propulsion Power': '2 x Cummins QSK50 Diesels (3,200 BHP Total)',
      'Kort Nozzles': 'Twin Fixed Pitch 4-Blade Kaplan Propellers',
      'Deck Point Load': '12 Tonnes / m² Reinforced Heavy Deck',
      'Towing Winch': '50-Tonne Hydraulic Double Drum with Brake Hold',
      'Operating Corridor': 'Akwa Ibom Coastal Corridor, Escravos, Bonny, Calabar',
      'Certification': 'NIMASA Towing Certificate / ABS +A1 Towing Service'
    },
    features: [
      'Twin-screw maneuverability with Kort nozzles for high static thrust',
      'Heavy-duty spud poles on barge for precision river mooring without jetty infrastructure',
      'Removable side coamings for roll-on / roll-off (Ro-Ro) heavy machinery loading',
      'Certified for coastal and riverine shallow water bar navigation'
    ]
  },
  psv: {
    id: 'psv',
    name: 'M/V Ibom Pioneer',
    type: 'Offshore Platform Supply & Multi-Purpose Support Vessel (PSV)',
    category: 'psv',
    image: 'assets/images/hero_maritime_vessel.jpg',
    status: 'Offshore Operations Active',
    service: 'General Logistics',
    overview: 'High-capacity offshore supply vessel delivering bulk fuel, potable water, liquid mud, drilling equipment, and deck cargo to production platforms across deepwater concessions.',
    specs: {
      'Length Overall (LOA)': '54.0 meters',
      'Beam (Width)': '13.8 meters',
      'Operating Draft': '4.5 meters',
      'Deadweight (DWT)': '1,450 Metric Tons',
      'Clear Deck Space': '380 m² Timber Protected Deck Space',
      'Liquid Cargo (Fuel)': '550 m³ Marine Gas Oil (MGO)',
      'Liquid Cargo (Water)': '400 m³ Drill Water / 350 m³ Fresh Potable',
      'Dynamic Positioning': 'DP-1 Kongsberg System',
      'Fire Fighting System': 'FiFi 1 Water Monitor (1,200 m³/hr) & Foam Cannon',
      'Regulatory Authority': 'IMO Res. A.469(XII) / NIMASA Offshore Support Class'
    },
    features: [
      'DP-1 dynamic station-keeping for precise offshore platform hovering in heavy currents',
      'High-volume centrifugal discharge pumps for rapid offshore liquid bunkering',
      'Dedicated dispersant spray booms and emergency oil spill mitigation pack',
      'Hospital bay and survivor accommodation for emergency search & rescue response'
    ]
  }
};

function initFleetExplorer() {
  const filterBtns = document.querySelectorAll('.fleet-filter-btn');
  const fleetCards = document.querySelectorAll('.fleet-vessel-card');
  const modal = document.getElementById('fleetBlueprintModal');
  const closeBtn = document.getElementById('closeFleetModalBtn');
  const modalBackdrop = document.getElementById('fleetModalBackdrop');
  const modalTitle = document.getElementById('fleetModalTitle');
  const modalType = document.getElementById('fleetModalType');
  const modalStatus = document.getElementById('fleetModalStatus');
  const modalOverview = document.getElementById('fleetModalOverview');
  const modalSpecs = document.getElementById('fleetModalSpecs');
  const modalFeatures = document.getElementById('fleetModalFeatures');
  const modalImage = document.getElementById('fleetModalImage');
  const modalCharterBtn = document.getElementById('fleetModalCharterBtn');

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active', 'bg-navy-900', 'text-white', 'border-navy-900');
        b.classList.add('bg-white', 'text-slate-700', 'border-slate-200');
      });
      btn.classList.add('active', 'bg-navy-900', 'text-white', 'border-navy-900');
      btn.classList.remove('bg-white', 'text-slate-700', 'border-slate-200');

      const filter = btn.getAttribute('data-filter');
      fleetCards.forEach(card => {
        const cat = card.getAttribute('data-vessel-category');
        if (filter === 'all' || filter === cat) {
          card.classList.remove('hidden');
          card.style.display = '';
        } else {
          card.classList.add('hidden');
          card.style.display = 'none';
        }
      });
    });
  });

  // Open Blueprint Modal
  function openFleetModal(vesselId) {
    const data = fleetData[vesselId];
    if (!data || !modal) return;

    if (modalTitle) modalTitle.textContent = data.name;
    if (modalType) modalType.textContent = data.type;
    if (modalStatus) modalStatus.textContent = data.status;
    if (modalOverview) modalOverview.textContent = data.overview;
    if (modalImage) {
      modalImage.src = data.image;
      modalImage.alt = `${data.name} technical specifications blueprint`;
    }

    if (modalSpecs) {
      modalSpecs.innerHTML = Object.entries(data.specs).map(([label, val]) => `
        <div class="bg-slate-50 p-3 rounded-lg border border-slate-200">
          <span class="block text-xs font-semibold text-slate-500 uppercase tracking-wider">${label}</span>
          <span class="block text-sm font-bold text-navy-900 mt-1">${val}</span>
        </div>
      `).join('');
    }

    if (modalFeatures) {
      modalFeatures.innerHTML = data.features.map(feat => `
        <li class="flex items-start space-x-2 text-xs sm:text-sm text-slate-700">
          <svg class="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span>${feat}</span>
        </li>
      `).join('');
    }

    if (modalCharterBtn) {
      modalCharterBtn.onclick = () => {
        closeFleetModal();
        const contactSection = document.getElementById('contact');
        const serviceSelect = document.getElementById('contactService');
        const messageField = document.getElementById('contactMessage');

        if (serviceSelect) {
          serviceSelect.value = data.service;
        }
        if (messageField) {
          messageField.value = `[Fleet Charter Request]\nVessel Requested: ${data.name} (${data.type})\nPrimary Requirements:\n- Target Deployment Date:\n- Operating Corridor:\n- Expected Duration:\nPlease provide an operational charter quote.`;
        }
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
          showToast(`Vessel ${data.name} pre-filled into charter request form.`, 'success');
        }
      };
    }

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeFleetModal() {
    if (!modal) return;
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-fleet-blueprint]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const id = trigger.getAttribute('data-fleet-blueprint');
      openFleetModal(id);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeFleetModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeFleetModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
      closeFleetModal();
    }
  });
}



/* ==========================================================================
   4. Interactive Maritime Project Estimator
   ========================================================================== */
function initOperationsEstimator() {
  const serviceTabs = document.querySelectorAll('.estimator-service-tab');
  const scopeSelect = document.getElementById('estimatorScope');
  const corridorSelect = document.getElementById('estimatorCorridor');
  const outputLeadTime = document.getElementById('outputLeadTime');
  const outputVesselClass = document.getElementById('outputVesselClass');
  const outputCompliance = document.getElementById('outputCompliance');
  const applyQuoteBtn = document.getElementById('estimatorApplyQuoteBtn');

  if (!serviceTabs.length || !scopeSelect) return;

  let currentService = 'transport';

  const estimatorConfig = {
    transport: {
      name: 'Marine Transportation',
      scopes: [
        { label: 'Personnel / Crew Shuttles (20 - 80 Pax)', lead: '12 - 24 Hours', vessel: 'Fast Aluminum Catamaran / CTV', cert: 'SOLAS / NIMASA Passenger Class' },
        { label: 'Bulk Cargo Barging (500 - 2,500 MT)', lead: '48 Hours', vessel: 'Flat-top Deck Barge + 2400HP Tug', cert: 'NPA / Coastal Cargo License' },
        { label: 'Corporate VIP Transit (Akwa Ibom Coastal)', lead: 'Same Day (4 Hours)', vessel: 'Executive Cabin Cruiser', cert: 'Port Health & Safety Clearance' }
      ]
    },
    asset: {
      name: 'Marine Asset Ownership & Management',
      scopes: [
        { label: 'Commercial Vessel Acquisition & Survey', lead: '3 - 5 Working Days', vessel: 'Comprehensive Technical Audit', cert: 'Class Registry Verification' },
        { label: 'Full Technical & Crew Lifecycle Management', lead: 'Immediate Mobilization', vessel: 'Dedicated Operations Manager', cert: 'ISM / Document of Compliance' },
        { label: 'Scheduled Dry-Docking & Overhaul', lead: '1 - 2 Weeks Lead Time', vessel: 'Dry-dock Slipway Liaison', cert: 'Class Renewal Certification' }
      ]
    },
    fisheries: {
      name: 'Commercial Fisheries',
      scopes: [
        { label: 'Seafood Off-Take Bulk Supply (5 - 20 MT)', lead: '24 - 48 Hours', vessel: 'Refrigerated Cold-Chain Fleet', cert: 'NAFDAC & Marine Health Inspection' },
        { label: 'Industrial Trawler Charter / Deployment', lead: '72 Hours', vessel: 'Deep-Sea Trawler with Flash Freeze', cert: 'Federal Fisheries License' },
        { label: 'Artisanal Cooperative Aggregation', lead: 'Weekly Scheduled Route', vessel: 'Coastal Collection Boat', cert: 'Fair-Trade Traceability Log' }
      ]
    },
    logistics: {
      name: 'Maritime Logistics',
      scopes: [
        { label: 'Offshore Rig Replenishment & Bunkering', lead: 'Under 12 Hours', vessel: 'Offshore Supply Vessel (OSV)', cert: 'DPR / NUPRC Approved Logistics' },
        { label: 'Bonded Coastal Staging & Freight Support', lead: 'Immediate Availability', vessel: 'Secure Port Terminal Yard', cert: 'Customs & Port Authority Bonded' },
        { label: 'Emergency Marine Response & Towage', lead: '< 2 Hours Dispatch', vessel: 'Standby Emergency Tug', cert: 'Search & Rescue (SAR) Protocol' }
      ]
    }
  };

  function updateEstimatorOptions() {
    const config = estimatorConfig[currentService];
    if (!config) return;

    scopeSelect.innerHTML = config.scopes
      .map((item, index) => `<option value="${index}">${item.label}</option>`)
      .join('');

    renderEstimatorDetails();
  }

  function renderEstimatorDetails() {
    const config = estimatorConfig[currentService];
    const selectedIndex = parseInt(scopeSelect.value, 10) || 0;
    const selectedItem = config.scopes[selectedIndex];

    if (selectedItem) {
      if (outputLeadTime) outputLeadTime.textContent = selectedItem.lead;
      if (outputVesselClass) outputVesselClass.textContent = selectedItem.vessel;
      if (outputCompliance) outputCompliance.textContent = selectedItem.cert;
    }
  }

  serviceTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      serviceTabs.forEach(t => {
        t.classList.remove('bg-navy-900', 'text-white', 'border-navy-900');
        t.classList.add('bg-white', 'text-slate-700', 'border-slate-200');
      });
      tab.classList.add('bg-navy-900', 'text-white', 'border-navy-900');
      tab.classList.remove('bg-white', 'text-slate-700', 'border-slate-200');

      currentService = tab.getAttribute('data-estimator-type');
      updateEstimatorOptions();
    });
  });

  scopeSelect.addEventListener('change', renderEstimatorDetails);
  if (corridorSelect) corridorSelect.addEventListener('change', renderEstimatorDetails);

  if (applyQuoteBtn) {
    applyQuoteBtn.addEventListener('click', () => {
      const config = estimatorConfig[currentService];
      const selectedIndex = parseInt(scopeSelect.value, 10) || 0;
      const selectedItem = config.scopes[selectedIndex];
      const corridor = corridorSelect ? corridorSelect.options[corridorSelect.selectedIndex].text : 'Akwa Ibom Coastal Corridor';

      const contactSection = document.getElementById('contact');
      const serviceSelect = document.getElementById('contactService');
      const messageField = document.getElementById('contactMessage');

      if (serviceSelect && config) {
        serviceSelect.value = config.name;
      }
      if (messageField && selectedItem) {
        messageField.value = `[Inquiry via Scope Estimator]\nScope: ${selectedItem.label}\nOperating Corridor: ${corridor}\nTarget Readiness: ${selectedItem.lead}\nPlease provide an operational proposal and quote.`;
      }

      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        showToast('Estimator specifications populated in the RFQ form below.', 'info');
      }
    });
  }

  updateEstimatorOptions();
}

/* ==========================================================================
   5. Contact Form & Fast RFQ Submission
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('primeContactForm');
  const submitBtn = document.getElementById('submitBtn');
  const submitText = document.getElementById('submitText');
  const submitSpinner = document.getElementById('submitSpinner');
  const successModal = document.getElementById('successModal');
  const closeSuccessBtn = document.getElementById('closeSuccessBtn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Form inputs
    const name = document.getElementById('contactName')?.value.trim();
    const org = document.getElementById('contactOrg')?.value.trim();
    const service = document.getElementById('contactService')?.value;
    const phone = document.getElementById('contactPhone')?.value.trim();
    const email = document.getElementById('contactEmail')?.value.trim();
    const message = document.getElementById('contactMessage')?.value.trim();

    if (!name || !org || !service || !phone || !message) {
      showToast('Please fill out all required operational fields.', 'error');
      return;
    }

    // Email validation
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast('Please enter a valid business email address.', 'error');
      return;
    }

    // Button loading state
    if (submitBtn) submitBtn.disabled = true;
    if (submitText) submitText.textContent = 'Transmitting to Operations...';
    if (submitSpinner) submitSpinner.classList.remove('hidden');

    // Simulate reliable dispatch
    setTimeout(() => {
      if (submitBtn) submitBtn.disabled = false;
      if (submitText) submitText.textContent = 'Submit Operational Inquiry';
      if (submitSpinner) submitSpinner.classList.add('hidden');

      // Populate summary in success modal
      const modalSummary = document.getElementById('successSummary');
      if (modalSummary) {
        modalSummary.innerHTML = `
          <div class="text-left text-xs sm:text-sm space-y-1.5 bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div><span class="font-bold text-navy-900">Reference:</span> PE-${Math.floor(100000 + Math.random() * 900000)}</div>
            <div><span class="font-bold text-navy-900">Organization:</span> ${org}</div>
            <div><span class="font-bold text-navy-900">Officer / Contact:</span> ${name} (${phone})</div>
            <div><span class="font-bold text-navy-900">Service:</span> ${service}</div>
            <div><span class="font-bold text-navy-900">Base Routing:</span> Akwa Ibom Operations Terminal</div>
          </div>
        `;
      }

      if (successModal) {
        successModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }

      form.reset();
      showToast('Inquiry logged successfully! Operations duty officer notified.', 'success');
    }, 1200);
  });

  if (closeSuccessBtn && successModal) {
    closeSuccessBtn.addEventListener('click', () => {
      successModal.classList.add('hidden');
      document.body.style.overflow = '';
    });
  }
}

/* ==========================================================================
   6. Direct Copy Actions (Phone, Email)
   ========================================================================== */
function initCopyActions() {
  document.querySelectorAll('[data-copy-text]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const text = btn.getAttribute('data-copy-text');
      if (!text) return;

      navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied to clipboard: ${text}`, 'success');
      }).catch(() => {
        // Fallback
        showToast(`Contact: ${text}`, 'info');
      });
    });
  });
}

/* ==========================================================================
   7. Toast Notification Utility
   ========================================================================== */
function showToast(message, type = 'info') {
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.className = 'fixed bottom-5 right-5 z-50 flex flex-col space-y-2 pointer-events-none max-w-sm w-full px-4';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'pointer-events-auto transform transition-all duration-300 ease-out translate-y-3 opacity-0 rounded-xl shadow-2xl p-4 flex items-center space-x-3 text-sm font-medium border';

  let icon = '';
  if (type === 'success') {
    toast.classList.add('bg-navy-900', 'text-white', 'border-teal-500');
    icon = `<svg class="w-5 h-5 text-teal-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
  } else if (type === 'error') {
    toast.classList.add('bg-red-900', 'text-white', 'border-red-400');
    icon = `<svg class="w-5 h-5 text-red-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
  } else {
    toast.classList.add('bg-slate-900', 'text-white', 'border-cyan-400');
    icon = `<svg class="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
  }

  toast.innerHTML = `
    ${icon}
    <span class="flex-1">${message}</span>
  `;

  toastContainer.appendChild(toast);

  // Trigger enter animation
  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-3', 'opacity-0');
  });

  // Auto dismiss after 4 seconds
  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, 4000);
}

/* ==========================================================================
   8. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
      btn.classList.remove('opacity-0', 'pointer-events-none');
      btn.classList.add('opacity-100');
    } else {
      btn.classList.add('opacity-0', 'pointer-events-none');
      btn.classList.remove('opacity-100');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   9. Footer Dynamic Year
   ========================================================================== */
function updateCurrentYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
