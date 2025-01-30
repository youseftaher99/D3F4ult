// Initialize Lucide icons
lucide.createIcons();

// Enhanced Skills data with descriptions
const skills = [
    { name: 'C++', level: 90, description: 'Advanced programming & algorithms' },
    { name: 'C#', level: 85, description: '.NET development' },
    { name: 'HTML', level: 95, description: 'Semantic markup & accessibility' },
    { name: 'CSS', level: 90, description: 'Modern layouts & animations' },
    { name: 'Bootstrap', level: 85, description: 'Responsive frameworks' },
    { name: 'JavaScript', level: 80, description: 'Frontend development' },
    { name: 'Java', level: 85, description: 'Object-oriented programming' },
    { name: '.NET', level: 60, description: 'Currently learning' },
    { name: 'Problem Solving', level: 75, description: 'Algorithmic thinking' }
];

// Enhanced skill item creation with hover effects and animations
const skillsGrid = document.getElementById('skillsGrid');

skills.forEach((skill, index) => {
    const skillElement = document.createElement('div');
    skillElement.className = 'skill-item';
    skillElement.style.animationDelay = `${index * 0.1}s`;
    
    skillElement.innerHTML = `
        <h4>${skill.name}</h4>
        <p class="skill-description">
            ${skill.description}
        </p>
        <div class="skill-progress">
            <div class="skill-progress-bar" style="width: 0%"></div>
        </div>
    `;
    
    skillsGrid.appendChild(skillElement);
});

// Enhanced intersection observer with smooth animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animate progress bar with easing
            const progressBar = entry.target.querySelector('.skill-progress-bar');
            const skillName = entry.target.querySelector('h4').textContent;
            const skill = skills.find(s => s.name === skillName);
            
            if (progressBar && skill) {
                setTimeout(() => {
                    progressBar.style.width = `${skill.level}%`;
                }, 200);
            }
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all skill items with initial state and stagger
document.querySelectorAll('.skill-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(item);
});

// Enhanced smooth scroll behavior for navigation
document.querySelectorAll('nav button').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = button.textContent.toLowerCase();
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enhanced parallax effect for hero image
const heroImage = document.querySelector('.hero-image');
if (heroImage) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.05;
        heroImage.style.transform = `perspective(1000px) rotateY(-5deg) translateY(${rate}px)`;
    });
}

// Add hover effect for skill items
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
    });
});


// وظيفة استخراج اسم صفحة فيسبوك وإظهار رسالة الترحيب
function showWelcomeMessage() {
    let referrer = document.referrer; // معرفة مصدر الزيارة
    let pageName = "زائر مجهول"; // الافتراضي

    // إذا كان المستخدم قادمًا من فيسبوك
    if (referrer.includes("facebook.com")) {
        try {
            let url = new URL(referrer);
            let pathParts = url.pathname.split('/');

            // محاولة استخراج اسم الصفحة
            if (pathParts.length > 1 && pathParts[1] !== "undefined" && pathParts[1] !== "") {
                pageName = decodeURIComponent(pathParts[1]); // استخراج اسم الصفحة
            } else {
                pageName = "مستخدم فيسبوك 👤"; // لو لم نتمكن من جلب الاسم
            }
        } catch (error) {
            console.error("❌ خطأ أثناء استخراج اسم الصفحة:", error);
        }
    }

    // عرض رسالة الترحيب
    let welcomeBox = document.getElementById("welcomeBox");
    if (welcomeBox) {
        welcomeBox.innerHTML = `👋 مرحبًا ${pageName}!`;
        welcomeBox.style.display = "block";
        welcomeBox.style.padding = "15px";
        welcomeBox.style.background = "#4CAF50";
        welcomeBox.style.color = "white";
        welcomeBox.style.fontSize = "20px";
        welcomeBox.style.borderRadius = "10px";
        welcomeBox.style.margin = "20px auto";
        welcomeBox.style.width = "50%";
        welcomeBox.style.textAlign = "center";
        welcomeBox.style.boxShadow = "2px 2px 10px rgba(0, 0, 0, 0.1)";
    }
}

// تشغيل الدالة عند تحميل الصفحة
window.onload = showWelcomeMessage;
