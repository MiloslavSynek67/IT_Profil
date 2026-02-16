// app.js — načte profile.json a vykreslí jméno, skills a interests/projects
(function () {
  const q = (sel) => document.querySelector(sel);

  /** Vytvoří element s textem */
  const elWithText = (tag, text, className) => {
    const e = document.createElement(tag);
    if (className) e.className = className;
    e.textContent = text || '';
    return e;
  };

  const renderName = (name) => {
    const nameEl = q('#name');
    if (nameEl) nameEl.textContent = name || '';
  };

  const renderSkills = (skills) => {
    const skillsEl = q('#skills');
    if (!skillsEl || !Array.isArray(skills)) return;
    skillsEl.innerHTML = '';
    skills.forEach((s) => {
      const li = elWithText('li', s);
      skillsEl.appendChild(li);
    });
  };

  const renderInterests = (interests) => {
    const section = q('#interests');
    if (!section || !Array.isArray(interests)) return;
    section.innerHTML = '';
    section.appendChild(elWithText('h3', 'Zájmy'));
    const ul = document.createElement('ul');
    ul.className = 'interests-list';
    interests.forEach((it) => ul.appendChild(elWithText('li', it)));
    section.appendChild(ul);
  };

  const renderProjects = (projects) => {
    const section = q('#projects');
    if (!section || !Array.isArray(projects)) return;
    section.innerHTML = '';
    section.appendChild(elWithText('h3', 'Projekty'));
    projects.forEach((p) => {
      const card = document.createElement('article');
      card.className = 'project-card';
      card.appendChild(elWithText('h4', p.title || ''));
      card.appendChild(elWithText('p', p.description || ''));
      if (p.link) {
        const a = elWithText('a', 'Zobrazit projekt', 'btn btn-secondary');
        a.href = p.link;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        card.appendChild(a);
      }
      section.appendChild(card);
    });
  };

  const showFetchError = (err) => {
    // eslint-disable-next-line no-console
    console.error('Nelze načíst profile.json:', err);
    const main = document.querySelector('main');
    if (!main) return;
    const msg = elWithText('div', 'Došlo k chybě při načítání profilu. Zkuste to prosím později.');
    msg.className = 'fetch-error';
    main.insertBefore(msg, main.firstChild);
  };

  // Načtení dat (zůstává fetch().then().catch() podle zadání)
  fetch('profile.json')
    .then((res) => {
      if (!res.ok) throw new Error(`Network response was not ok (${res.status})`);
      return res.json();
    })
    .then((data) => {
      renderName(data.name);
      renderSkills(data.skills);
      renderInterests(data.interests);
      renderProjects(data.projects);
      // inicializace kontaktního formuláře (pokud existuje)
      setupContactForm();
    })
    .catch(showFetchError);

  /** Kontaktni formular — klientská validace + mailto fallback */
  function setupContactForm() {
    const form = q('#contact-form');
    const status = q('#form-status');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const honeypot = form.querySelector('.honeypot');
      if (honeypot && honeypot.value) return; // spam

      const name = (form.name.value || '').trim();
      const email = (form.email.value || '').trim();
      const message = (form.message.value || '').trim();
      if (!name || !email || !message) {
        if (status) status.textContent = 'Vyplňte prosím všechna povinná pole.';
        return;
      }

      const subject = encodeURIComponent(`Kontakt z profilu: ${name}`);
      const body = encodeURIComponent(`Jméno: ${name}\nE-mail: ${email}\n\n${message}`);
      window.location.href = `mailto:miloslav.synek@email.cz?subject=${subject}&body=${body}`;
      if (status) status.textContent = 'Otevírám váš e‑mailový klient...';
    });
  }

})();
