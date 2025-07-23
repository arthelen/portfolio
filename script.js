// ****intro section typing effect
const name = "hi there! i'm allison :)";
const typedElement = document.getElementById("typed-name");
let i = 0;

function typeLetter() {
  if (i < name.length) {
    typedElement.textContent += name.charAt(i);
    i++;
    setTimeout(typeLetter, 120); // typing speed
  }
}

document.addEventListener("DOMContentLoaded", typeLetter);

// *******scroll reveal effect
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');

  reveals.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const elementBottom = el.getBoundingClientRect().bottom;
    const revealPoint = 150;

    if (elementTop < windowHeight - revealPoint && elementBottom > 0) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
document.addEventListener('DOMContentLoaded', revealOnScroll);

// ***********Badge or certification section scroll functionality
function scrollBadges(direction) {
  const carousel = document.getElementById('badgeCarousel');
  const card = carousel.querySelector('.badge-card');
  const scrollAmount = card.offsetWidth + 24; // 24 = gap size
  carousel.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}

// ********skills section buttons for skill tabs
function showSkillInfo(id) {
  // Close all other subskills
  const allCards = document.querySelectorAll('.skill-card');
  allCards.forEach(card => {
    if (card.querySelector('.subskills').id !== id) {
      card.classList.remove('active');
    }
  });

  // Toggle clicked one
  const clickedCard = document.getElementById(id).parentElement;
  clickedCard.classList.toggle('active');
}

const skills = {
  frontend: [
    { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' }
  ],
  design: [
    { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
    { name: 'Canva', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg' },
    { name: 'Photoshop', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg' },
    { name: 'Illustrator', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/illustrator/illustrator-original.svg' },
    { name: 'InDesign', icon: 'https://img.icons8.com/?size=100&id=51lMuEpYaQ8k&format=png&color=000000' },
    { name: 'Wireframing', icon: 'img/wireframe-logo.png' },
    { name: 'Prototyping', icon: 'img/prototype-logo.png' },
    { name: 'Accessibility & Responsive Design', icon: 'img/accessible-logo.png' }
  ],
  tools: [
    { name: 'VSCode', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
    { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
    { name: 'Docs', icon: 'https://img.icons8.com/?size=100&id=30464&format=png&color=000000' },
    { name: 'Sheets', icon: 'https://img.icons8.com/?size=100&id=30461&format=png&color=000000' },
    { name: 'Slides', icon: 'https://img.icons8.com/?size=100&id=30462&format=png&color=000000' },
    { name: 'Forms', icon: 'https://img.icons8.com/?size=100&id=30465&format=png&color=000000' },
    { name: 'Excel', icon: 'https://img.icons8.com/?size=100&id=117561&format=png&color=000000' },
    { name: 'Access', icon: 'https://img.icons8.com/?size=100&id=121160&format=png&color=000000' },
    { name: 'PowerPoint', icon: 'https://img.icons8.com/?size=100&id=ifP93G7BXUhU&format=png&color=000000' },
    { name: 'Word', icon: 'https://img.icons8.com/?size=100&id=pGHcje298xSl&format=png&color=000000' },
    { name: 'ChatGPT', icon: 'https://img.icons8.com/?size=100&id=TUk7vxvtu6hX&format=png&color=000000' },
    { name: 'Notion', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/notion/notion-original.svg' }
  ]
};        
          
let activeCategory = 'frontend'; // Track current active category

// *****skills section functionality for button dropdown
function showSkillCategory(category, buttonEl = null) {
  const container = document.getElementById('skill-display');
  const button = buttonEl || document.querySelector(`.skill-tab[data-category="${category}"]`);
  const alreadyActive = button.classList.contains('active');

  if (alreadyActive) {
    button.classList.remove('active');
    const cardsToRemove = container.querySelectorAll(`.skill-card[data-category="${category}"]`);
    cardsToRemove.forEach(card => card.remove());
  } else {
    button.classList.add('active');
    const newCards = skills[category].map(skill => `
      <div class="skill-card" data-category="${category}">
        <img src="${skill.icon}" alt="${skill.name} icon">
        <h5>${skill.name}</h5>
      </div>
    `).join('');
    container.insertAdjacentHTML('beforeend', newCards);
  }
}

// ********skill section button bouncin
document.querySelectorAll('.skill-tab').forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.category;
    showSkillCategory(category, button);

    // Bounce animation
    button.classList.remove('bounce');
    void button.offsetWidth;
    button.classList.add('bounce');
  });
});

// ******
window.addEventListener('DOMContentLoaded', () => {
  const defaultTab = document.querySelector('.skill-tab[data-category="frontend"]');
  if (defaultTab) {
    showSkillCategory('frontend', defaultTab);
  }
});

// ********design section query selector for see more buttons to change text accordingly
document.querySelectorAll('.see-more-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const isSeeMore = btn.innerHTML.includes("See More");

    // Swap inner HTML with icon + text
    btn.innerHTML = isSeeMore
  ? 'See Less <i class="bi bi-arrow-up-short"></i>'
  : 'See More <i class="bi bi-arrow-down-short"></i>';

  });
});

// ******* design section see more buttons bounce effect
document.querySelectorAll('.card-subtitle').forEach(button => {
  button.addEventListener('click', () => {
    button.classList.remove('bounce'); // Reset animation if already applied
    void button.offsetWidth; // Trigger reflow to restart animation
    button.classList.add('bounce');
  });
});



// *******Design section see more button functionality toggle
const triggers = document.querySelectorAll('.toggle-trigger');

triggers.forEach(trigger => {
  trigger.addEventListener('click', () => {
    const nextGroup = trigger.nextElementSibling;

    // Toggle class to show/hide with fade
    if (nextGroup.classList.contains('show')) {
      nextGroup.classList.remove('show');
      // Wait for opacity transition to finish before hiding
      setTimeout(() => {
        nextGroup.style.display = 'none';
      }, 400);
    } else {
      nextGroup.style.display = 'block';
      // Small delay to trigger the transition
      setTimeout(() => {
        nextGroup.classList.add('show');
      }, 10);
    }
  });
});

// ********Function to play or pause audio and animate the progress bar
function playAudio(audioSrc, progressBarId) {
  const audioPlayer = document.getElementById('audio-player');
  const progressBar = document.getElementById(progressBarId);

  // If the same audio is already playing, pause it
  if (audioPlayer.src.includes(audioSrc) && !audioPlayer.paused) {
    audioPlayer.pause();
    clearInterval(audioPlayer.progressInterval); // Stop updating the progress bar
  } else {
    // If a new audio is selected or the audio was paused, set the source and play
    if (!audioPlayer.src.includes(audioSrc)) {
      audioPlayer.src = audioSrc; // Set the audio source
    }
    audioPlayer.play(); // Resume or start playing

    // Reset and animate the progress bar
    progressBar.style.width = '0'; // Reset progress bar width
    clearInterval(audioPlayer.progressInterval); // Clear any existing interval
    audioPlayer.progressInterval = setInterval(() => {
      const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100; // Calculate progress percentage
      progressBar.style.width = progress + '%'; // Update progress bar width
      if (audioPlayer.ended) {
        // stop updating when audio ends
        clearInterval(audioPlayer.progressInterval);
      }
    // update every 100ms
    }, 100);
  }
}