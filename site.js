/* =========================================================
   Peak Architects — shared shell + per-page controllers
   Depends on data.js (PROJECTS_ALL, NEWS_ALL)
   ========================================================= */

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const el = (t, c, h) => { const n = document.createElement(t); if (c) n.className = c; if (h != null) n.innerHTML = h; return n; };
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const qs  = k => new URLSearchParams(location.search).get(k);
const titleCase = s => s.charAt(0) + s.slice(1).toLowerCase();

/* WordPress serves the same photo at several sizes, so the featured image and
   its inline copy are different URLs. Compare on the basename instead. */
const imgKey = u => String(u).split('/').pop()
  .replace(/-\d+x\d+(?=\.\w+$)/, '').replace(/-scaled(?=\.\w+$)/, '').toLowerCase();
const withoutHero = (list, hero) => (list || []).filter(u => imgKey(u) !== imgKey(hero));

/* Peak Architects logo — the practice's own wordmark. The lettering inherits
   currentColor so it can sit white on photography, dark on the solid header and
   white on the orange footer; the chevron is themed via .pklogo__mark. */
const LOGO = '<svg class="pklogo" viewBox="0 0 716.7828369 143.5491943" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Peak Architects"><g class="pklogo__word" fill="currentColor"><path d="m6.8479276 65.6274643h11.6593952v7.5573502h.2158527c3.454483-6.3697433 10.1475964-9.0683289 17.272419-9.0683289 17.595787 0 26.1248856 13.3862305 26.1248856 29.6868896 0 15.0055466-7.5573463 29.146843-24.073864 29.146843-7.1248207 0-14.7896862-2.5902405-18.6758785-8.744133h-.2158527v27.8517151h-12.3069573zm27.5283503 8.2049103c-10.363451 0-15.6531029 7.880722-15.6531029 19.7551498 0 11.2268677 5.7213612 19.6476288 15.6531029 19.6476288 11.227684 0 15.4380684-9.9317398 15.4380684-19.6476288 0-10.1475983-5.2904739-19.7551498-15.4380684-19.7551498z"/><path d="m80.4454956 96.7178192c0 8.744133 4.7504272 16.517334 15.0063629 16.517334 7.1240005 0 11.4427185-3.1311111 13.6012573-9.2841797h11.6593933c-2.6985779 12.198616-13.062851 18.9992447-25.2606506 18.9992447-17.488266 0-27.3124924-12.198616-27.3124924-29.3626938 0-15.8689575 10.3642654-29.4710388 26.9874802-29.4710388 17.596611 0 28.3925858 15.8689575 26.340744 32.6013336zm28.7159576-8.0957565c-.4317017-7.773201-5.7221756-14.7896881-14.0346069-14.7896881-8.5274582 0-14.3563385 6.4772644-14.6813507 14.7896881z"/><path d="m176.9592743 109.0247726c0 3.0227737.6467438 4.2103806 2.91362 4.2103806.7567291 0 1.7284698 0 3.0236053-.2158508v8.5282822c-1.8351746.6475601-5.7221832 1.4026337-7.7723846 1.4026337-4.9671021 0-8.5290985-1.7268295-9.5008545-6.8006287-4.857132 4.7496109-12.7378387 6.8006287-19.3234406 6.8006287-10.0392609 0-19.1067657-5.3971634-19.1067657-16.3006592 0-13.9254532 11.1193542-16.1923294 21.4819794-17.3799362 8.852478-1.6193085 16.7331848-.6475601 16.7331848-7.8807144 0-6.368927-6.5855865-7.5565338-11.5510559-7.5565338-6.9089661 0-11.7677307 2.8069229-12.3061371 8.8516541h-12.3077698c.8634186-14.3571548 13.062851-18.567543 25.368988-18.567543 10.9043121 0 22.3470306 4.426239 22.3470306 16.1931534v28.7151334zm-12.3077698-15.5455856c-3.7770386 2.483551-9.7142487 2.3752136-15.1130524 3.3469696-5.2888336.8634109-10.0392609 2.8069153-10.0392609 9.2841797 0 5.5055008 7.0173035 7.1248169 11.3343811 7.1248169 5.3988037 0 13.8179321-2.8069229 13.8179321-10.5792999v-9.1766663z"/><path d="m190.2388153 44.3613434h12.3077698v43.8281936l22.2370605-22.5620728h15.1147003l-21.3752899 20.5110475 23.4254913 35.3007355h-15.004715l-17.0565643-27.0958252-7.340683 7.1248245v19.9710007h-12.3077698v-77.0779038z"/><path d="m287.2610474 111.1841354c0 3.2378082 0 6.6922913 3.6703491 6.6922913.7567139 0 1.7284546-.1075211 3.0235901-.3233719v3.454483c-1.188446.2158508-2.2668762.4317093-3.3469849.4317093-6.4772339 0-7.4490051-3.5628204-7.4490051-8.0965729v-2.914444h-.2150269c-2.5918884 6.5847778-10.0408936 12.3061371-20.6202087 12.3061371-10.4709625 0-18.5667114-3.9937057-18.5667114-15.6530991 0-12.9536972 11.2260437-15.6531067 20.401886-16.4081802 18.3533325-1.2959442 19.1083984-2.483551 19.1083984-11.5510559 0-2.4827347-2.8069153-10.9034958-15.4380493-10.9034958-9.9309387 0-16.5165253 5.1821365-17.0549316 14.7896805h-4.1036987c.5400543-12.198616 8.0973969-18.3516846 21.1586304-18.3516846 9.7158813 0 19.4317627 3.0219574 19.4317627 14.4654999v32.0621033zm-4.1020508-21.2669448c-3.2386169 3.6703339-12.091095 3.2386246-20.0785217 4.317894-9.7158813 1.0792694-15.2213898 4.5337524-15.2213898 12.8461838 0 6.6931076 4.857132 12.0911026 14.5730133 12.0911026 18.6766968 0 20.7268982-15.9772949 20.7268982-18.8917313z"/><path d="m305.1842957 78.2577896h.3250122c2.1585388-7.2323303 11.2260437-13.0620346 21.2653198-12.6303253v4.1028671c-4.3170776-.5400467-10.3626404.5392227-15.3280945 5.397171-4.1020508 4.2103806-5.8305054 7.6648636-6.2622375 15.9772949v30.3344498h-4.1020203v-55.487587h4.1020203z"/><path d="m371.3603516 83.1157379c-.7550659-9.8234024-8.7441406-14.8972015-18.7833862-14.8972015-13.9262695 0-21.3752747 12.3069534-21.3752747 24.9372787 0 15.0055389 7.0173035 26.0165558 21.3752747 26.0165558 10.3626404 0 17.9199829-7.1248245 19.3234253-17.2724228h4.1020508c-1.8351746 13.2778931-11.4427185 20.8344193-23.4254761 20.8344193-18.0283203 0-25.4773254-14.141304-25.4773254-29.5785522s9.0675049-28.4992828 25.4773254-28.4992828c11.9827576 0 21.6986389 5.8288803 22.885437 18.4592056h-4.1020508z"/><path d="m389.9303589 44.3613434v33.4647446h.2166748c2.8052673-8.3124313 11.2260437-13.1695557 19.8618469-13.1695557 19.5401001 0 19.755127 15.6531067 19.755127 22.4537354v34.3289795h-4.1020203v-35.084877c0-5.7213669-.646759-18.1358337-15.7597961-18.1358337-12.4144897 0-19.9718323 9.6075516-19.9718323 23.2096252v30.0110855h-4.1020508v-77.0779038z"/><path d="m443.1535339 55.4798698v-11.1185264h4.1020508v11.1185265h-4.1020508zm0 65.9593773v-55.487587h4.1020508v55.487587z"/><path d="m482.0187378 69.5136566h-12.0911255v38.7552185c0 8.9599838 4.2103882 9.8242264 11.9827881 9.6075516v3.5628204c-8.4207764.5400391-16.5165405-.6475677-16.0848083-13.170372v-38.7552185h-10.2559509v-3.5619965h10.2559509v-17.272419h4.1020203v17.272419h12.0911255v3.5619965z"/><path d="m491.407959 94.2350845c-.2150269 13.0620346 6.6939392 24.9372864 20.4035339 24.9372864 10.4709778 0 17.9199524-6.2614059 19.8634949-16.5165176h4.1020508c-2.1585693 12.9536972-10.7960205 20.0785141-23.9655457 20.0785141-16.1931458 0-24.7206116-12.7378387-24.5055847-28.0675735-.2150269-15.2213974 7.7723999-30.0102615 24.5055847-30.0102615 17.3799133 0 25.1523132 13.7095947 24.3972473 29.5785522h-44.8007812zm40.6987305-3.5619964c-.2166748-11.6593933-7.557373-22.4545517-20.2951965-22.4545517-12.3061523 0-19.5401306 11.4427185-20.4035339 22.4545517z"/><path d="m588.2451172 83.1157379c-.7550659-9.8234024-8.7441406-14.8972015-18.7833862-14.8972015-13.9262695 0-21.3753052 12.3069534-21.3753052 24.9372787 0 15.0055389 7.017334 26.0165558 21.3753052 26.0165558 10.3626099 0 17.9199829-7.1248245 19.3234253-17.2724228h4.1020508c-1.835144 13.2778931-11.442749 20.8344193-23.4254761 20.8344193-18.0283203 0-25.477356-14.141304-25.477356-29.5785522s9.0691528-28.4992828 25.477356-28.4992828c11.9827271 0 21.6986694 5.8288803 22.885437 18.4592056h-4.1020508z"/><path d="m623.333252 69.5136566h-12.0910645v38.7552185c0 8.9599838 4.2103882 9.8242264 11.9827271 9.6075516v3.5628204c-8.4207153.5400391-16.5164795-.6475677-16.0847778-13.170372v-38.7552185h-10.2559204v-3.5619965h10.2559204v-17.272419h4.1020508v17.272419h12.0910645v3.5619965z"/><path d="m633.480896 102.9792175c.6467285 10.2559357 8.3123779 16.1931534 18.3516846 16.1931534 7.2322998 0 17.5965576-2.1593628 17.5965576-11.7669144 0-9.3916931-9.5008545-10.7951584-19.000061-12.7386627-9.6075439-1.942688-19.1083984-4.426239-19.1083984-15.7606201 0-11.0110092 10.6876221-14.2496414 20.0802002-14.2496414 11.7660522 0 20.5101929 5.0737991 20.5101929 17.7041245h-4.1020508c-.1083374-10.0400772-7.1239624-14.1421204-16.4081421-14.1421204-7.557373 0-15.9781494 2.8069229-15.9781494 10.6876373 0 8.8516541 9.5008545 10.2551117 18.460022 12.1986237 11.0110474 2.0510178 19.6484375 4.6420898 19.6484375 16.3006592 0 11.9827652-11.9827271 15.3289108-21.6986084 15.3289108-12.6311646 0-22.1303711-6.8006287-22.4537354-19.7551498h4.1020507z"/></g><path class="pklogo__mark" d="m685.8924561 1.3413855-24.1925049 47.6454271h11.1536865l13.0388184-25.0316277 13.0387573 25.0316277h11.1536865z"/></svg>';

const ICON = {
  pin:'<svg viewBox="0 0 24 24" fill="none"><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><circle cx="12" cy="10" r="2.4" stroke="currentColor" stroke-width="1.7"/></svg>',
  cal:'<svg viewBox="0 0 24 24" fill="none"><rect x="3.5" y="5" width="17" height="16" rx="2.5" stroke="currentColor" stroke-width="1.7"/><path d="M3.5 10h17M8 3v4M16 3v4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
  plan:'<svg viewBox="0 0 24 24" fill="none"><rect x="3.5" y="3.5" width="17" height="17" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M3.5 10h7v11M10.5 10h10" stroke="currentColor" stroke-width="1.7"/></svg>',
  arrow:'<svg viewBox="0 0 24 24" fill="none"><path d="M7 17 17 7M17 7H9m8 0v8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  right:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  left:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M19 12H5m6-6-6 6 6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'
};

/* ---------------- static content ---------------- */
const STUDIOS = [
  { n:'Sheffield Studio', tel:'0114 303 4442', telHref:'01143034442',
    addr:'Broom Hall, 8–10 Broomhall Road,<br>Sheffield, South Yorkshire S10 2DR' },
  { n:'Hope Valley Studio', tel:'01433 424 442', telHref:'01433424442',
    addr:'Underedge, Back Lane, Hathersage,<br>Hope Valley S32 1AR' }
];

const SECTORS = [
  { t:'Domestic Residential', d:'Extensions · Refurbishment · New build homes', cat:'HOMES',
    url:'https://peakarchitects.co.uk/sectors/domestic-residential/' },
  { t:'Heritage &amp; Conservation', d:'Listed buildings · Conservation areas · Retrofit', cat:'HERITAGE',
    url:'https://peakarchitects.co.uk/sectors/heritage-conservation/' },
  { t:'Commercial Residential', d:'Apartments · Mixed use · Masterplanning', cat:'COMMERCIAL',
    url:'https://peakarchitects.co.uk/sectors/commercial-residential/' },
  { t:'Leisure &amp; Hospitality', d:'Hotels · Restaurants · Visitor buildings', cat:'LEISURE',
    url:'https://peakarchitects.co.uk/sectors/leisure-hospitality/' },
  { t:'Education', d:'Schools · Learning centres · Campus', cat:'EDUCATION',
    url:'https://peakarchitects.co.uk/sectors/sectors-education/' },
  { t:'Care &amp; Senior Living', d:'Independent living · Extra care · Later living', cat:'COMMUNITY',
    url:'https://peakarchitects.co.uk/sectors/care-senior-living/' }
];

const AWARDS = [
  { t:'Winner — Northern Design Awards', y:'2022', m:'Northern Design Awards',
    d:'Peak Architects took the win at the Northern Design Awards, and returned as a nominee again in 2023.' },
  { t:'Winner — Design Excellence', y:'2022', m:'South Yorkshire Property Awards',
    d:'Recognised for Design Excellence at the South Yorkshire Property Awards, following nomination earlier that year.' },
  { t:'Shortlisted — RIBA Yorkshire Awards', y:'2023', m:'RIBA Yorkshire',
    d:'Shortlisted by the Royal Institute of British Architects for its Yorkshire regional awards.' },
  { t:'Shortlisted — National Retrofit Awards', y:'2023', m:'AJ Retrofit Awards',
    d:"Recognised in the Architects' Journal National Retrofit Awards for work bringing existing buildings back into use." },
  { t:'Shortlisted — Practice of the Year', y:'2022', m:'Yorkshire Awards',
    d:"Shortlisted for Yorkshire's Architectural Practice of the Year." },
  { t:'Two awards — Peak District Planning', y:'2018', m:'Peak District Planning Awards',
    d:'Picked up two awards at the Peak District Planning Awards, winning the best non-residential category for a Chatsworth building.' },
  { t:'Best UK Small Project of the Year', y:'2016', m:'Build Awards',
    d:'Won the Build Award for Best UK Small Project of the Year for a building on the Chatsworth Estate.' },
  { t:'Shortlisted — RICS Awards', y:'2016', m:'RICS Awards',
    d:'A second major shortlisting for the Chatsworth Stickyard project, alongside a RIBA East Midlands nomination.' }
];

const TEAM = [
  { n:'Paul Holden', r:'Director', img:'assets/img/202001-Paul-Holden-Peak-Architects.jpg' },
  { n:'Gail Newsome', r:'Finance Director', img:'assets/img/202001-Gail-Newsome-Peak-Architects.jpg' },
  { n:'Oliver Glaves', r:'Associate', img:'assets/img/202010-Oliver-Glaves.jpg' },
  { n:'Alasdair Struthers', r:'Associate', img:'assets/img/202310-Alasdair-Struthers-Peak-Architects.jpg' },
  { n:'Dan Anderson', r:'Senior Architect', img:'assets/img/202001-Dan-Anderson-Peak-Architects.jpg' },
  { n:'Will Beesley', r:'Project Architect', img:'assets/img/202107-Will-head-BW.jpg' },
  { n:'Anna Dawson', r:'Project Architect', img:'assets/img/202310-Anna-Dawson-Peak-Architects.jpg' },
  { n:'Alex Erskine', r:'Project Architect', img:'assets/img/202001-Alex-Erskine-Peak-Architects.jpg' },
  { n:'Jayne Brodie', r:'Finance &amp; Office Manager', img:'assets/img/202001-Jayne-Brodie-Peak-Architects.jpg' },
  { n:'Elizabeth Caulton', r:'Office Manager', img:'assets/img/202304-Elizabeth-Caulton-Peak-Architects.jpg' },
  { n:'Rich Blakey', r:'Marketing Manager', img:'assets/img/202510-Rich.jpg.jpg' },
  { n:'Georgia Marsh', r:'Part 2 Architectural Assistant', img:'assets/img/202510-Georgia.jpg.jpg' },
  { n:'Vicky Robertson', r:'Part 2 Architectural Assistant', img:'assets/img/202510-Vicky.jpg-e1760520971201.jpg' },
  { n:'Katharine Chadwell', r:'Part 2 Architectural Assistant', img:'assets/img/202510-Katharine.jpg.jpg' },
  { n:'Karen Zhou', r:'Part 2 Architectural Assistant', img:'assets/img/202501-Karen.jpg' },
  { n:'Al Newbould', r:'Part 1 Architectural Assistant', img:'assets/img/202501-Al.jpg' }
];

const FAQ = [
  { q:'What happens during the initial design consultation?',
    a:"Once we've received your enquiry we arrange an in-person meeting, ideally at your home or on site. Consultations typically last around two hours, giving us time to explore your aspirations, understand how you live and how you'd like to live, and begin shaping a shared vision. Where possible we review any existing plans or site information, develop a series of initial sketches, and talk through the key planning considerations." },
  { q:'What does a pre-planning application involve?',
    a:"We start by understanding your ambitions, then visit the site to review its opportunities, constraints and the relevant planning policies. That early review gives us a good sense of what's likely to be supported by the local authority and where the challenges might lie. From there we develop an initial sketch proposal responding to your brief and the site, which can include simple massing studies." },
  { q:'How does the planning application process work?',
    a:"Once the design is developed we either lead, or work closely with a planning consultant, to prepare everything needed for submission — the Design and Access Statement, consultant reports and any additional forms the local authority requires. A planning fee is payable at this point and varies with the type and scale of the project. We liaise directly with the council's validation team to resolve queries and get your application validated quickly." },
  { q:'What happens at tender stage?',
    a:'This is where we move beyond the big ideas to the finer points — the style of internal doors, the placement of light switches, bathroom layouts. We translate your preferences into detailed drawings and specifications so builders tendering for the work can offer accurate, transparent costs, and we manage the tender process for you.' },
  { q:'How do you handle Building Regulations?',
    a:"Once planning approval is secured we develop the planning drawings into a coordinated technical design covering structure, drainage, wall, floor and roof build-ups and construction details. We work with structural engineers, energy assessors and civil engineers, then submit the Building Regulations package to either a private Approved Inspector or the local authority's Building Control department." },
  { q:'Do you stay involved during construction?',
    a:'Yes. Once your preferred contractor is selected we work with both you and the contractor to refine the design and keep the project financially sound. Agreed updates are captured in a Construction Drawing that forms part of the formal contract between you and your builder, and we continue as your on-site client advisor as the work progresses.' },
  { q:'Do you work inside the Peak District National Park?',
    a:'We do. A large part of our work sits in the Peak District, green belt and conservation areas, including listed buildings and Class Q barn conversions. Unlocking challenging sites in sensitive settings is one of the things the practice is known for, and we work closely with local planning authorities to protect ecological and heritage value.' }
];

/* ---------------- shell: nav + footer ---------------- */
const NAVLINKS = [
  ['Sectors','index.html#sectors'], ['Projects','projects.html'],
  ['About','about.html'], ['Journal','journal.html'], ['Contact','contact.html']
];

function renderShell() {
  const page = document.body.dataset.page;
  const overlay = document.body.dataset.nav === 'overlay';

  const nav = el('header', 'nav' + (overlay ? '' : ' solid static'));
  nav.id = 'nav';
  nav.innerHTML = `
    <a class="nav__brand" href="index.html" aria-label="Peak Architects — home">${LOGO}</a>
    <nav class="nav__links">${NAVLINKS.map(([t,h]) =>
      `<a href="${h}"${(page && h.startsWith(page)) ? ' class="on"' : ''}>${t}</a>`).join('')}</nav>
    <a class="nav__cta" href="contact.html">Start a project</a>
    <button class="nav__burger" aria-label="Open menu" aria-expanded="false"><span></span></button>`;
  document.body.prepend(nav);

  const foot = el('footer', 'foot');
  foot.innerHTML = `
    <div class="wrap">
      <div class="foot__row">
        <div>
          <div class="foot__brand">${LOGO}</div>
          ${STUDIOS.map(s => `<p class="foot__studio"><strong>${s.n}</strong>${s.addr}<br>
            <a href="tel:${s.telHref}">${s.tel}</a></p>`).join('')}
        </div>
        <div><h5>Explore</h5><ul>
          <li><a href="projects.html">Projects</a></li>
          <li><a href="index.html#sectors">Sectors</a></li>
          <li><a href="index.html#faq">Process</a></li>
          <li><a href="about.html">About Us</a></li>
          <li><a href="journal.html">Journal</a></li>
          <li><a href="https://peakarchitects.co.uk/careers/">Careers</a></li>
        </ul></div>
        <div><h5>Sectors</h5><ul>${SECTORS.map(s =>
          `<li><a href="projects.html?cat=${s.cat}">${s.t}</a></li>`).join('')}</ul></div>
        <div><h5>Get in touch</h5><ul>
          <li><a href="mailto:info@peakarchitects.co.uk">info@peakarchitects.co.uk</a></li>
          <li><a href="tel:01143034442">0114 303 4442</a></li>
          <li><a href="contact.html">Start a project</a></li>
        </ul>
        <div class="foot__soc" style="margin-top:22px">
          <a href="https://www.instagram.com/peakarchitects/" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.7"/><circle cx="17.2" cy="6.8" r="1.2" fill="currentColor"/></svg></a>
          <a href="https://www.linkedin.com/company/peak-architects/" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0 0-5zM3 9.5h4V21H3zM10 9.5h3.8v1.6h.05c.53-.95 1.83-1.95 3.77-1.95C21 9.15 22 11.1 22 14.3V21h-4v-6c0-1.5-.53-2.5-1.87-2.5-1.02 0-1.63.68-1.9 1.34-.1.24-.13.57-.13.9V21h-4z"/></svg></a>
          <a href="https://www.facebook.com/peakarchitects/" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7.3h2.5l.4-2.9h-2.9V9c0-.84.24-1.42 1.45-1.42H16.5V4.95C16.24 4.92 15.3 4.85 14.2 4.85c-2.28 0-3.85 1.39-3.85 3.95v2h-2.5v2.9h2.5V21z"/></svg></a>
        </div></div>
      </div>
      <div class="foot__bot">
        <span>© <span id="yr"></span> Peak Architects. All rights reserved.</span>
        <div class="foot__accred">
          <img src="assets/img/202601-riba_chartered_practice_logo_white_rgb.png" alt="RIBA Chartered Practice">
          <img src="assets/img/202509-arb-architects-registration-board-logo.svg" alt="ARB — Architects Registration Board">
        </div>
        <div style="display:flex;gap:18px">
          <a href="privacy.html">Privacy</a><a href="terms.html">Legal</a>
        </div>
      </div>
    </div>`;
  document.body.append(foot);
  $('#yr').textContent = new Date().getFullYear();

  // scroll state (overlay nav only)
  if (overlay) {
    const on = () => nav.classList.toggle('solid', scrollY > 60);
    addEventListener('scroll', on, { passive:true }); on();
  }

  // mobile menu
  const burger = $('.nav__burger'), links = $('.nav__links');
  burger.onclick = () => {
    const open = links.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  };
  $$('.nav__links a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
}

/* ---------------- reveal ---------------- */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold:0.06, rootMargin:'0px 0px -30px' });
const reveal = () => $$('.rv:not(.in)').forEach(n => io.observe(n));

/* ---------------- shared components ---------------- */
function projectCard(p) {
  const a = el('a', 'pcard rv');
  a.href = `project.html?slug=${encodeURIComponent(p.s)}`;
  const bits = [
    p.yr && `<span>${ICON.cal}${p.yr}</span>`,
    p.type && `<span>${ICON.plan}${esc(p.type)}</span>`,
    p.loc && `<span>${ICON.pin}${esc(p.loc)}</span>`
  ].filter(Boolean).slice(0, 3).join('');
  a.innerHTML = `
    <div class="pcard__ph">
      <img src="${p.img}" alt="${esc(p.t)}${p.loc ? ', ' + esc(p.loc) : ''}" loading="lazy">
      <div class="pcard__tags">
        <span class="chip">${p.cat}</span>
        ${p.status ? `<span class="chip chip--solid">${esc(p.status).toUpperCase()}</span>` : ''}
      </div>
    </div>
    <div class="pcard__b">
      <h3 class="pcard__t">${esc(p.t)}</h3>
      <p class="pcard__loc">${esc(p.loc || p.sector || p.cat)}</p>
      ${bits ? `<div class="pcard__meta">${bits}</div>` : ''}
    </div>`;
  return a;
}

function newsCard(n) {
  const a = el('a', 'ncard rv');
  a.href = `post.html?slug=${encodeURIComponent(n.s)}`;
  const d = new Date(n.d + 'T00:00:00');
  const ds = d.toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' });
  a.innerHTML = `
    <div class="ncard__ph"><img src="${n.img}" alt="${esc(n.t)}" loading="lazy"></div>
    <div class="ncard__b">
      <div class="ncard__meta"><span>${n.cats[0] ? esc(n.cats[0]) : 'News'}</span><span>${ds}</span></div>
      <h3>${esc(n.t)}</h3>
      <p>${esc(n.ex).slice(0, 130)}${n.ex.length > 130 ? '…' : ''}</p>
    </div>`;
  return a;
}

/* filter tabs — returns the container */
function buildTabs(host, cats, current, onPick) {
  host.innerHTML = '';
  cats.forEach(c => {
    const b = el('button', 'tab' + (c === current ? ' on' : ''), c);
    b.setAttribute('role', 'tab');
    b.onclick = () => { onPick(c); $$('.tab', host).forEach(t => t.classList.toggle('on', t.textContent === c)); };
    host.appendChild(b);
  });
}

/* accordion */
function buildAccordion(host, items, openFirst) {
  items.forEach((f, i) => {
    const item = el('div', 'ai');
    item.innerHTML = `<button class="ai__q" aria-expanded="false">${f.q}<span class="ai__ic"></span></button>
      <div class="ai__a"><p>${f.a}</p></div>`;
    const btn = $('.ai__q', item), pane = $('.ai__a', item);
    btn.onclick = () => {
      const open = item.classList.contains('on');
      $$('.ai', host).forEach(o => {
        o.classList.remove('on'); $('.ai__a', o).style.maxHeight = '';
        $('.ai__q', o).setAttribute('aria-expanded', 'false');
      });
      if (!open) { item.classList.add('on'); pane.style.maxHeight = pane.scrollHeight + 'px'; btn.setAttribute('aria-expanded','true'); }
    };
    host.appendChild(item);
    if (openFirst && i === 0) requestAnimationFrame(() => btn.click());
  });
}

/* counters — true value already in markup, animate only when possible */
function counters() {
  const obs = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const n = e.target; obs.unobserve(n);
    if (n.dataset.plain) return;
    const target = +n.dataset.count, suffix = n.dataset.suffix || '', final = target + suffix;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || document.visibilityState !== 'visible') {
      n.textContent = final; return;
    }
    const dur = 1400, t0 = performance.now();
    const tick = now => {
      const p = Math.min((now - t0) / dur, 1), e2 = 1 - Math.pow(1 - p, 3);
      n.textContent = Math.round(target * e2) + (p === 1 ? suffix : '');
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    setTimeout(() => { n.textContent = final; }, dur + 300);
  }), { threshold:0.5 });
  $$('.stat__n').forEach(n => obs.observe(n));
}

/* ---------------- lightbox (gallery + showreel) ---------------- */
const LB = {
  imgs: [], i: 0, box: null,
  open(imgs, i = 0) {
    this.imgs = imgs; this.i = i;
    if (!this.box) {
      this.box = el('div', 'lb');
      this.box.innerHTML = `
        <button class="lb__x" aria-label="Close">&times;</button>
        <button class="lb__nav lb__prev" aria-label="Previous">${ICON.left}</button>
        <figure class="lb__fig"><img alt=""><figcaption class="lb__cap"></figcaption></figure>
        <button class="lb__nav lb__next" aria-label="Next">${ICON.right}</button>`;
      document.body.append(this.box);
      $('.lb__x', this.box).onclick = () => this.close();
      $('.lb__prev', this.box).onclick = e => { e.stopPropagation(); this.go(-1); };
      $('.lb__next', this.box).onclick = e => { e.stopPropagation(); this.go(1); };
      this.box.onclick = e => { if (e.target === this.box) this.close(); };
      addEventListener('keydown', e => {
        if (!this.box.classList.contains('on')) return;
        if (e.key === 'Escape') this.close();
        if (e.key === 'ArrowRight') this.go(1);
        if (e.key === 'ArrowLeft') this.go(-1);
      });
    }
    this.paint(); this.box.classList.add('on');
    document.body.style.overflow = 'hidden';
  },
  paint() {
    $('.lb__fig img', this.box).src = this.imgs[this.i];
    $('.lb__cap', this.box).textContent = `${this.i + 1} / ${this.imgs.length}`;
    const multi = this.imgs.length > 1;
    $('.lb__prev', this.box).style.display = multi ? '' : 'none';
    $('.lb__next', this.box).style.display = multi ? '' : 'none';
  },
  go(d) { this.i = (this.i + d + this.imgs.length) % this.imgs.length; this.paint(); },
  close() { this.box.classList.remove('on'); document.body.style.overflow = ''; }
};

/* ---------------- contact form ---------------- */
/* Set FORM_ENDPOINT to a form service (Formspree, Basin, Netlify) to go live.
   Until then the form falls back to opening a pre-filled email. */
const FORM_ENDPOINT = '';

function initForm(form) {
  if (!form) return;
  const note = $('.fnote', form), btn = $('button[type=submit]', form);
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    if (!data.name?.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email || '')) {
      note.textContent = 'Please add your name and a valid email address.';
      note.classList.add('err'); return;
    }
    note.classList.remove('err');
    btn.disabled = true; btn.style.opacity = '.7';
    const label = btn.textContent;
    btn.textContent = 'Sending…';

    if (FORM_ENDPOINT) {
      try {
        const r = await fetch(FORM_ENDPOINT, {
          method:'POST', headers:{ Accept:'application/json' }, body:new FormData(form)
        });
        if (!r.ok) throw new Error(r.status);
        location.href = 'thank-you.html';
        return;
      } catch (err) {
        note.textContent = 'Sorry — that didn\'t send. Please email info@peakarchitects.co.uk.';
        note.classList.add('err');
        btn.disabled = false; btn.style.opacity = ''; btn.textContent = label;
        return;
      }
    }

    // No endpoint configured: hand off to the visitor's mail client.
    const body = [
      `Name: ${data.name}`, `Email: ${data.email}`,
      data.phone ? `Phone: ${data.phone}` : '',
      data.type ? `Project type: ${data.type}` : '',
      '', data.message || ''
    ].filter(Boolean).join('\n');
    location.href = `mailto:info@peakarchitects.co.uk?subject=${
      encodeURIComponent('Website enquiry — ' + data.name)}&body=${encodeURIComponent(body)}`;
    setTimeout(() => { location.href = 'thank-you.html'; }, 700);
  });
}

/* =========================================================
   PAGE CONTROLLERS
   ========================================================= */

function pageHome() {
  const featured = PROJECTS_ALL.slice(0, 12);
  const cats = ['ALL', ...new Set(featured.map(p => p.cat))];
  let active = 'ALL';
  const grid = $('#pgrid');

  const draw = () => {
    grid.innerHTML = '';
    featured.filter(p => active === 'ALL' || p.cat === active).slice(0, 6)
            .forEach(p => grid.appendChild(projectCard(p)));
    reveal();
    requestAnimationFrame(() => $$('.rv', grid).forEach(n => {
      if (n.getBoundingClientRect().top < innerHeight) n.classList.add('in');
    }));
  };
  buildTabs($('#tabs'), cats, active, c => { active = c; draw(); });
  draw();

  // sectors
  const sg = $('#sgrid');
  SECTORS.forEach(s => {
    const img = (PROJECTS_ALL.find(p => p.cat === s.cat) || PROJECTS_ALL[0]).img;
    const a = el('a', 'scard rv');
    a.href = `projects.html?cat=${s.cat}`;
    a.innerHTML = `<img src="${img}" alt="${s.t.replace(/&amp;/g,'&')}" loading="lazy">
      <div class="scard__scrim"></div><div class="scard__ar">${ICON.arrow}</div>
      <div class="scard__b"><h3>${s.t}</h3><p>${s.d}</p></div>`;
    sg.appendChild(a);
  });

  // recognition
  const rr = $('#rrail');
  AWARDS.forEach(a => rr.appendChild(el('article','rcard',
    `<h4>${a.t}</h4><p>${a.d}</p>
     <div class="rcard__f"><span>${a.m}</span><span class="rcard__y">${a.y}</span></div>`)));
  const step = () => ($('.rcard', rr)?.offsetWidth || 430) + 20;
  $('#rNext').onclick = () => rr.scrollBy({ left: step(), behavior:'smooth' });
  $('#rPrev').onclick = () => rr.scrollBy({ left:-step(), behavior:'smooth' });

  // team rail
  const tr = $('#trail');
  TEAM.forEach(m => tr.appendChild(el('article','tcard',
    `<div class="tcard__ph"><img src="${m.img}" alt="${m.n}" loading="lazy"></div>
     <h4>${m.n}</h4><p>${m.r}</p>`)));

  // latest journal
  const jr = $('#jrail');
  if (jr) NEWS_ALL.slice(0, 3).forEach(n => jr.appendChild(newsCard(n)));

  buildAccordion($('#acc'), FAQ, true);
  counters();
  initHeroRotator(featured.slice(0, 3));
  $('#marq').innerHTML = ('<span>' + 'Adding value by design — '.repeat(6) + '</span>').repeat(2);

  // showreel
  $('.reel__play')?.addEventListener('click', () => {
    const shots = PROJECTS_ALL.slice(0, 10).map(p => p.img);
    LB.open(shots, 0);
  });
  initForm($('#form'));
}

function initHeroRotator(picks) {
  const dots = $('#dots'); if (!dots || !picks.length) return;
  let i = 0, timer;
  picks.forEach((_, k) => {
    const d = el('i', k === 0 ? 'on' : '');
    d.onclick = () => { go(k); reset(); };
    dots.appendChild(d);
  });
  const img = $('#fcImg');
  img.style.transition = 'opacity .26s ease';
  function go(k) {
    i = k; const p = picks[i];
    img.style.opacity = '0';
    setTimeout(() => {
      img.src = p.img; img.style.opacity = '1';
      $('#fcT').textContent = p.t;
      $('#fcM').textContent = [p.type, p.loc].filter(Boolean).join(' · ');
      $('#fcard').href = `project.html?slug=${encodeURIComponent(p.s)}`;
    }, 260);
    $$('i', dots).forEach((d, n) => d.classList.toggle('on', n === i));
  }
  const reset = () => { clearInterval(timer); timer = setInterval(() => go((i + 1) % picks.length), 5200); };
  reset();
}

function pageProjects() {
  const cats = ['ALL', ...[...new Set(PROJECTS_ALL.map(p => p.cat))].sort()];
  let active = (qs('cat') || 'ALL').toUpperCase();
  if (!cats.includes(active)) active = 'ALL';
  const grid = $('#pgrid'), count = $('#pcount');

  const draw = () => {
    const list = PROJECTS_ALL.filter(p => active === 'ALL' || p.cat === active);
    grid.innerHTML = '';
    list.forEach(p => grid.appendChild(projectCard(p)));
    count.textContent = `${list.length} project${list.length === 1 ? '' : 's'}`;
    reveal();
    requestAnimationFrame(() => $$('.rv', grid).forEach(n => {
      if (n.getBoundingClientRect().top < innerHeight) n.classList.add('in');
    }));
    history.replaceState(null, '', active === 'ALL' ? 'projects.html' : `projects.html?cat=${active}`);
  };
  buildTabs($('#tabs'), cats, active, c => { active = c; draw(); });
  draw();
}

function pageProject() {
  const slug = qs('slug');
  const i = PROJECTS_ALL.findIndex(p => p.s === slug);
  const p = PROJECTS_ALL[i];
  if (!p) { location.replace('projects.html'); return; }

  document.title = `${p.t} — Peak Architects`;
  $('#pTitle').textContent = p.t;
  $('#pTag').textContent = p.tag || [p.type, p.sector, p.loc].filter(Boolean).join(' | ');
  $('#pHero').src = p.img;
  $('#pHero').alt = `${p.t}${p.loc ? ', ' + p.loc : ''}`;
  $('#crumbTitle').textContent = p.t;

  const facts = [['Client', p.client], ['Status', p.status], ['Sector', p.sector || titleCase(p.cat)],
                 ['Location', p.loc], ['Completed', p.yr]].filter(([, v]) => v);
  $('#pFacts').innerHTML = facts.map(([k, v]) =>
    `<div class="fact"><h5>${k}</h5><p>${esc(v)}</p></div>`).join('');

  $('#pBody').innerHTML = p.body.length
    ? p.body.map(t => `<p>${esc(t)}</p>`).join('')
    : '<p class="muted">Project description to follow.</p>';

  // gallery
  const g = withoutHero(p.g, p.img);
  const gh = $('#pGal');
  if (g.length) {
    g.forEach((u, k) => {
      const b = el('button', 'gcell' + (k % 5 === 0 ? ' gcell--wide' : ''));
      b.innerHTML = `<img src="${u}" alt="${esc(p.t)} — image ${k + 2}" loading="lazy">`;
      b.onclick = () => LB.open([p.img, ...g], k + 1);
      gh.appendChild(b);
    });
  } else { $('#pGalSec').remove(); }

  // prev / next
  const prev = PROJECTS_ALL[(i - 1 + PROJECTS_ALL.length) % PROJECTS_ALL.length];
  const next = PROJECTS_ALL[(i + 1) % PROJECTS_ALL.length];
  $('#pNav').innerHTML = [
    ['Previous', prev, 'left'], ['Next', next, 'right']
  ].map(([lbl, q, dir]) => `
    <a class="pnav__i pnav__i--${dir}" href="project.html?slug=${encodeURIComponent(q.s)}">
      <span class="pnav__l">${lbl}</span>
      <span class="pnav__t">${esc(q.t)}</span>
    </a>`).join('');

  // related
  const rel = PROJECTS_ALL.filter(x => x.cat === p.cat && x.s !== p.s).slice(0, 3);
  const rg = $('#pRel');
  if (rel.length) rel.forEach(x => rg.appendChild(projectCard(x)));
  else $('#pRelSec').remove();
}

function pageJournal() {
  const cats = ['ALL', ...[...new Set(NEWS_ALL.flatMap(n => n.cats))].sort()];
  let active = 'ALL', shown = 12;
  const grid = $('#ngrid'), more = $('#nmore'), count = $('#ncount');

  const draw = () => {
    const list = NEWS_ALL.filter(n => active === 'ALL' || n.cats.includes(active));
    grid.innerHTML = '';
    list.slice(0, shown).forEach(n => grid.appendChild(newsCard(n)));
    count.textContent = `${list.length} post${list.length === 1 ? '' : 's'}`;
    more.style.display = list.length > shown ? '' : 'none';
    reveal();
    requestAnimationFrame(() => $$('.rv', grid).forEach(n => {
      if (n.getBoundingClientRect().top < innerHeight) n.classList.add('in');
    }));
  };
  buildTabs($('#tabs'), cats, active, c => { active = c; shown = 12; draw(); });
  more.onclick = () => { shown += 12; draw(); };
  draw();
}

function pagePost() {
  const slug = qs('slug');
  const i = NEWS_ALL.findIndex(n => n.s === slug);
  const n = NEWS_ALL[i];
  if (!n) { location.replace('journal.html'); return; }

  document.title = `${n.t} — Peak Architects`;
  $('#nTitle').textContent = n.t;
  $('#crumbTitle').textContent = n.t;
  const d = new Date(n.d + 'T00:00:00');
  $('#nMeta').innerHTML = `<span>${esc(n.cats[0] || 'News')}</span><span>${
    d.toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' })}</span>`;
  if (n.img) { $('#nHero').src = n.img; $('#nHero').alt = n.t; } else { $('#nHeroWrap').remove(); }
  $('#nBody').innerHTML = n.body.length
    ? n.body.map(t => `<p>${esc(t)}</p>`).join('')
    : `<p>${esc(n.ex)}</p>`;
  $('#nSrc').href = `https://peakarchitects.co.uk/news/${n.s}/`;

  const g = withoutHero(n.g, n.img);
  if (g.length) {
    g.slice(0, 6).forEach((u, k) => {
      const b = el('button', 'gcell');
      b.innerHTML = `<img src="${u}" alt="" loading="lazy">`;
      b.onclick = () => LB.open(g, k);
      $('#nGal').appendChild(b);
    });
  } else { $('#nGalSec').remove(); }

  NEWS_ALL.filter(x => x.s !== n.s).slice(0, 3).forEach(x => $('#nRel').appendChild(newsCard(x)));
}

function pageAbout() {
  const tg = $('#tgrid');
  TEAM.forEach(m => tg.appendChild(el('article','tcard rv',
    `<div class="tcard__ph"><img src="${m.img}" alt="${m.n}" loading="lazy"></div>
     <h4>${m.n}</h4><p>${m.r}</p>`)));
  counters();
  const rr = $('#rrail');
  if (rr) AWARDS.forEach(a => rr.appendChild(el('article','rcard',
    `<h4>${a.t}</h4><p>${a.d}</p>
     <div class="rcard__f"><span>${a.m}</span><span class="rcard__y">${a.y}</span></div>`)));
}

function pageContact() {
  initForm($('#form'));
  const sg = $('#studios');
  STUDIOS.forEach(s => sg.appendChild(el('div','studio rv',
    `<h3>${s.n}</h3><p>${s.addr}</p>
     <p><a href="tel:${s.telHref}">${s.tel}</a><br>
        <a href="mailto:info@peakarchitects.co.uk">info@peakarchitects.co.uk</a></p>`)));
  buildAccordion($('#acc'), FAQ.slice(0, 5), false);
}

/* ---------------- boot ---------------- */
renderShell();
const ROUTES = { home:pageHome, projects:pageProjects, project:pageProject,
  journal:pageJournal, post:pagePost, about:pageAbout, contact:pageContact };
const run = ROUTES[document.body.dataset.page];
if (run) { try { run(); } catch (e) { console.error('[page init]', e); } }
reveal();
