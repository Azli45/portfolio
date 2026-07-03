/* ============================================================
   APP LOGIC
   Vanilla JS, no build step required. Organized into small,
   single-purpose functions so each block below is easy to lift
   into a React/Next component later if the stack is ported.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  renderSkills();
  renderTimeline();
  renderGithub();
  initScrollProgress();
  initRevealOnScroll();
  initCounters();
  initSkillBars();
  initRecruiterMode();
});

/* ---------- PROJECTS: render mini product pages ---------- */
function renderProjects(){
  const list = document.getElementById("projectList");
  list.innerHTML = PROJECTS.map((p, i) => `
    <article class="project-card" data-index="${i}">
      <div class="project-summary" role="button" tabindex="0" aria-expanded="false">
        <div class="project-summary-left">
          <div class="project-index">${String(i+1).padStart(2,"0")}</div>
          <div class="project-titles">
            <h3>${p.title}</h3>
            <span>${p.tag}</span>
          </div>
        </div>
        <div class="project-summary-right">
          <div class="project-metrics">
            ${p.metrics.map(m => `<div><strong>${m.value}</strong><span>${m.label}</span></div>`).join("")}
          </div>
          <i class="ri-arrow-down-s-line expand-icon"></i>
        </div>
      </div>
      <div class="project-detail">
        <div class="project-detail-inner">
          <div>
            <div class="pd-block">
              <h4>Problem</h4>
              <p>${p.problem}</p>
            </div>
            <div class="pd-block detail-extra">
              <h4>Dataset</h4>
              <p>${p.dataset}</p>
            </div>
            <div class="pd-block detail-extra">
              <h4>Workflow</h4>
              <ul>${p.workflow.map(w => `<li>${w}</li>`).join("")}</ul>
            </div>
            <div class="pd-block detail-extra">
              <h4>Architecture</h4>
              <div class="arch-diagram">
                ${p.architecture.map((a,idx) => `<span class="arch-node">${a}</span>${idx < p.architecture.length-1 ? '<i class="ri-arrow-right-line arch-arrow"></i>' : ''}`).join("")}
              </div>
            </div>
          </div>
          <div>
            <div class="screenshot-placeholder detail-extra"><i class="ri-image-2-line"></i> Dashboard screenshot</div>
            <div class="pd-block">
              <h4>Business impact</h4>
              <p>${p.impact}</p>
            </div>
            <div class="pd-block detail-extra">
              <h4>Lessons learned</h4>
              <p>${p.lessons}</p>
            </div>
            <div class="pd-block">
              <h4>Tech stack</h4>
              <div class="stack-pills">${p.stack.map(s => `<span>${s}</span>`).join("")}</div>
            </div>
            <div class="pd-actions">
              <a href="${p.github}" target="_blank" rel="noopener" class="btn btn-secondary btn-sm"><i class="ri-github-fill"></i> GitHub</a>
              ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">Live demo <i class="ri-arrow-right-up-line"></i></a>` : ""}
            </div>
          </div>
        </div>
      </div>
    </article>
  `).join("");

  list.querySelectorAll(".project-summary").forEach(el => {
    const toggle = () => {
      const card = el.closest(".project-card");
      const detail = card.querySelector(".project-detail");
      const isOpen = card.classList.toggle("open");
      el.setAttribute("aria-expanded", isOpen);
      detail.style.maxHeight = isOpen ? detail.scrollHeight + "px" : "0px";
    };
    el.addEventListener("click", toggle);
    el.addEventListener("keydown", e => { if(e.key === "Enter" || e.key === " "){ e.preventDefault(); toggle(); }});
  });
}

/* ---------- SKILLS: render category cards with progress bars ---------- */
function renderSkills(){
  const grid = document.getElementById("skillsGrid");
  grid.innerHTML = SKILLS.map(cat => `
    <div class="skill-block">
      <div class="skill-block-head">
        <i class="${cat.icon}"></i>
        <h4>${cat.category}</h4>
      </div>
      <div class="skill-bars">
        ${cat.items.map(s => `
          <div class="skill-bar-row">
            <span class="skill-bar-name">${s.name}</span>
            <div class="skill-bar-track"><div class="skill-bar-fill" data-level="${s.level}"></div></div>
          </div>
        `).join("")}
      </div>
    </div>
  `).join("");
}

/* fill skill bars once visible, so the animation reads as "live" rather than pre-set */
function initSkillBars(){
  const bars = document.querySelectorAll(".skill-bar-fill");
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.style.width = entry.target.dataset.level + "%";
        obs.unobserve(entry.target);
      }
    });
  }, { threshold:0.3 });
  bars.forEach(b => obs.observe(b));
}

/* ---------- TIMELINE ---------- */
function renderTimeline(){
  const el = document.getElementById("timelineList");
  el.innerHTML = TIMELINE.map(t => `
    <div class="timeline-item reveal">
      <div class="timeline-when">${t.when}</div>
      <h4>${t.title}</h4>
      <p>${t.body}</p>
    </div>
  `).join("");
}

/* ---------- GITHUB PANEL (illustrative — swap for live API calls if hosting with a backend) ---------- */
function renderGithub(){
  document.getElementById("ghRepos").textContent = "12+";
  const graph = document.getElementById("contribGraph");
  let cells = "";
  for(let i=0;i<26*7;i++){
    const intensity = Math.random();
    const shade = intensity > 0.85 ? "background:var(--violet);" : intensity > 0.6 ? "background:rgba(139,123,255,0.55);" : intensity > 0.35 ? "background:rgba(139,123,255,0.25);" : "";
    cells += `<div class="contrib-cell" style="${shade}"></div>`;
  }
  graph.innerHTML = cells;

  document.getElementById("pinnedRepos").innerHTML = PINNED_REPOS.map(r => `
    <div class="pinned-repo">
      <div class="pinned-repo-name"><i class="ri-git-repository-line"></i>${r.name}</div>
      <div class="pinned-repo-desc">${r.desc}</div>
      <div class="pinned-repo-meta"><span><span class="lang-dot"></span>${r.lang}</span></div>
    </div>
  `).join("");
}

/* ---------- SCROLL PROGRESS BAR ---------- */
function initScrollProgress(){
  const bar = document.getElementById("scrollProgress");
  window.addEventListener("scroll", () => {
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    bar.style.width = pct + "%";
  }, { passive:true });
}

/* ---------- REVEAL-ON-SCROLL ---------- */
function initRevealOnScroll(){
  const targets = document.querySelectorAll(".reveal");
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add("in-view"); obs.unobserve(e.target); }});
  }, { threshold:0.12 });
  targets.forEach(t => obs.observe(t));
}

/* ---------- ANIMATED COUNTERS (hero dashboard) ---------- */
function initCounters(){
  const counters = document.querySelectorAll(".metric-value");
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold:0.4 });
  counters.forEach(c => obs.observe(c));
}
function animateCounter(el){
  const target = parseFloat(el.dataset.target);
  const decimals = parseInt(el.dataset.decimals || "0");
  const suffix = el.dataset.suffix || "";
  const duration = 1400;
  const start = performance.now();
  function tick(now){
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;
    el.textContent = (decimals ? value.toFixed(decimals) : Math.round(value).toLocaleString()) + suffix;
    if(progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ---------- RECRUITER MODE ---------- */
function initRecruiterMode(){
  const toggle = document.getElementById("recruiterToggle");
  toggle.innerHTML = '<i class="ri-flashlight-line"></i> <span>Recruiter mode</span>';
  toggle.addEventListener("click", () => {
    const active = document.body.classList.toggle("recruiter-mode");
    toggle.classList.toggle("active", active);
    toggle.setAttribute("aria-pressed", active);
    toggle.innerHTML = active
      ? '<i class="ri-flashlight-fill"></i> <span>Full view</span>'
      : '<i class="ri-flashlight-line"></i> <span>Recruiter mode</span>';
  });
}


