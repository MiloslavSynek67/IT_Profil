// app.js — načte profile.json a vykreslí jméno, skills a interests/projects
(function(){
  function el(sel){ return document.querySelector(sel); }

  fetch('profile.json')
    .then(function(res){
      if(!res.ok) throw new Error('Network response was not ok');
      return res.json();
    })
    .then(function(data){
      // jméno
      var nameEl = el('#name');
      if(nameEl) nameEl.textContent = data.name || '';

      // skills
      var skillsEl = el('#skills');
      if(skillsEl && Array.isArray(data.skills)){
        skillsEl.innerHTML = ''; // clear
        data.skills.forEach(function(skill){
          var li = document.createElement('li');
          li.textContent = skill;
          skillsEl.appendChild(li);
        });
      }

      // interests
      var interestsSection = el('#interests');
      if(interestsSection && Array.isArray(data.interests)){
        interestsSection.innerHTML = '<h3>Zájmy</h3>';
        var ul = document.createElement('ul');
        ul.className = 'interests-list';
        data.interests.forEach(function(it){
          var li = document.createElement('li');
          li.textContent = it;
          ul.appendChild(li);
        });
        interestsSection.appendChild(ul);
      }

      // projects (bonus) — pokud jsou
      var projectsSection = el('#projects');
      if(projectsSection && Array.isArray(data.projects)){
        projectsSection.innerHTML = '<h3>Projekty</h3>';
        data.projects.forEach(function(p){
          var card = document.createElement('article');
          card.className = 'project-card';
          var title = document.createElement('h4');
          title.textContent = p.title || '';
          var desc = document.createElement('p');
          desc.textContent = p.description || '';
          card.appendChild(title);
          card.appendChild(desc);
          if(p.link){
            var a = document.createElement('a');
            a.href = p.link;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.textContent = 'Zobrazit projekt';
            a.className = 'btn btn-secondary';
            card.appendChild(a);
          }
          projectsSection.appendChild(card);
        });
      }
    })
    .catch(function(err){
      console.error('Nelze načíst profile.json:', err);
      var main = document.querySelector('main');
      if(main){
        var msg = document.createElement('div');
        msg.className = 'fetch-error';
        msg.textContent = 'Došlo k chybě při načítání profilu. Zkuste to prosím později.';
        main.insertBefore(msg, main.firstChild);
      }
    });

})();
