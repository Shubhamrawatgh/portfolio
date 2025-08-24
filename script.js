document.addEventListener('DOMContentLoaded', () => {

    // ==== MOBILE NAVIGATION TOGGLE ====
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('is-active');
            navToggle.classList.toggle('is-active');
        });

        // Close menu when a link is clicked
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('is-active')) {
                    navMenu.classList.remove('is-active');
                    navToggle.classList.remove('is-active');
                }
            });
        });
    }

    // ==== THEME SWITCHER ====
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const currentTheme = localStorage.getItem('theme');

        function setIconForTheme(theme) {
            if (theme === 'light') {
                themeToggle.classList.remove('fa-moon');
                themeToggle.classList.add('fa-sun');
                document.documentElement.setAttribute('data-theme', 'light');
            } else {
                themeToggle.classList.remove('fa-sun');
                themeToggle.classList.add('fa-moon');
                document.documentElement.setAttribute('data-theme', 'dark');
            }
        }

        if (currentTheme) {
            setIconForTheme(currentTheme);
        } else {
            setIconForTheme('dark');
        }

        themeToggle.addEventListener('click', () => {
            let currentTheme = document.documentElement.getAttribute('data-theme');
            let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            setIconForTheme(newTheme);
        });
    }

    // ✨ ==== TYPED.JS INITIALIZATION ====
    const typedTextSpan = document.getElementById('typed-text');
    if (typedTextSpan && typeof Typed !== 'undefined') {
        new Typed('#typed-text', {
            strings: ['Full Stack Developer', 'Creative Professional', '<span class="ai-enthusiast-gradient">AI Enthusiast</span>'],
            typeSpeed: 40,
            backSpeed: 30,
            backDelay: 2000,
            loop: true
        });
    }


    // ==== SCROLL FADE-IN ANIMATION ====
    const sections = document.querySelectorAll('.fade-in-section');
    if (sections.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, {
            threshold: 0.1
        });

        sections.forEach(section => {
            observer.observe(section);
        });
    }


    // ==== CONTACT FORM VALIDATION & POPUP ====
    const contactForm = document.getElementById('contact-form');
    const popup = document.getElementById('thank-you-popup');
    const closePopupButton = document.getElementById('close-popup');

    if (contactForm && popup && closePopupButton) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name === '' || email === '' || message === '') {
                alert('Please fill in all fields.');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            popup.style.display = 'flex';
            setTimeout(() => popup.classList.add('show'), 10);
            contactForm.reset();
        });
        
        closePopupButton.addEventListener('click', () => {
            popup.classList.remove('show');
            setTimeout(() => popup.style.display = 'none', 300);
        });
    }


    // ==== SCROLL TO TOP BUTTON ====
    const scrollBtn = document.getElementById("scrollToTopBtn");
    if (scrollBtn) {
        scrollBtn.style.display = "none";

        window.addEventListener("scroll", () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                scrollBtn.style.display = "flex";
            } else {
                scrollBtn.style.display = "none";
            }
        });

        scrollBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    /* Starfield background (respect reduce motion) */
    const backgroundAnimation = document.querySelector('.background-animation');
    const canvas = document.getElementById('stars-canvas');
    if (canvas && backgroundAnimation) {
        const ctx = canvas.getContext('2d');
        let stars = [], w=0,h=0, animId;
        const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const resize = ()=>{ w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; init(); };
        const init = ()=>{ stars = Array.from({length: rm? 80: 200}, ()=>({ x: Math.random()*w, y: Math.random()*h, z: Math.random()*1.5 + 0.5, r: Math.random()*1.2 + 0.3 })); };
        const step = ()=>{
            ctx.clearRect(0,0,w,h);
            ctx.fillStyle = 'rgba(255,255,255,0.9)';
            for(const s of stars){
                s.x += s.z * 0.15; s.y += s.z * 0.05;
                if(s.x>w || s.y>h){ s.x = Math.random()*w*0.2; s.y = -5; }
                ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI*2); ctx.fill();
            }
            animId = requestAnimationFrame(step);
        };

        window.addEventListener('scroll', () => {
            if (window.scrollY > window.innerHeight / 2) {
                backgroundAnimation.classList.add('visible');
            } else {
                backgroundAnimation.classList.remove('visible');
            }
        });

        window.addEventListener('resize', resize);
        resize();
        if(!rm) step();
    }


    /* Command palette (Ctrl/Cmd + K) */
    const cmdk = document.getElementById('cmdk');
    const input = document.getElementById('cmdk-input');
    const list = document.getElementById('cmdk-results');
    if (cmdk && input && list) {
        const commands = [
            {label:'Go to Home', action:()=>location.hash='#home'},
            {label:'Go to Skills', action:()=>location.hash='#skills'},
            {label:'Go to Projects', action:()=>location.hash='#projects'},
            {label:'Go to Contact', action:()=>location.hash='#contact'},
            {label:'Open Resume', action:()=>window.open('https://drive.google.com/uc?export=download&id=1_kqy5GRMojP7V4anfhcSK_hMSxnn8fb2','_blank')},
            {label:'Toggle Theme', action:()=>document.getElementById('theme-toggle')?.click()},
            {label:'Scroll to Top', action:()=>window.scrollTo({top:0,behavior:'smooth'})},
        ];
        let idx = 0;
        const render = (q='')=>{
            const items = commands.filter(c=> c.label.toLowerCase().includes(q.toLowerCase()));
            list.innerHTML = items.map((c,i)=>`<li role="option" aria-selected="${i===idx}" data-i="${i}"><i class='fa fa-bolt'></i><span>${c.label}</span></li>`).join('');
        };
        const open = ()=>{ cmdk.setAttribute('aria-hidden','false'); input.value=''; idx=0; render(); setTimeout(()=>input.focus(), 10); };
        const close = ()=> cmdk.setAttribute('aria-hidden','true');
        document.addEventListener('keydown', (e)=>{
            if((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==='k'){ e.preventDefault(); open(); }
            if(cmdk.getAttribute('aria-hidden')==='false'){
                if(e.key==='Escape'){ close(); }
                if(e.key==='ArrowDown'){ idx=Math.min(idx+1, list.children.length-1); render(input.value); }
                if(e.key==='ArrowUp'){ idx=Math.max(idx-1, 0); render(input.value); }
                if(e.key==='Enter'){ const items = [...list.children]; const item = items[idx]; const label = item?.innerText.trim(); const cmd = commands.find(c=>c.label===label); if(cmd){ close(); cmd.action(); }}
            }
        });
        input.addEventListener('input', ()=>{ idx=0; render(input.value); });
        list.addEventListener('click', (e)=>{
            const li = e.target.closest('li');
            if(!li) return; idx = Number(li.dataset.i)||0; const label = li.innerText.trim(); const cmd = commands.find(c=>c.label===label); if(cmd){ close(); cmd.action(); }
        });
    }
});
