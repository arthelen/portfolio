// intro section typing effect
const name = "Hi there! I'm Allison :)";
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

// scroll reveal effect for sections
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

// badge or certification section scroll functionality
function scrollBadges(direction) {
  const carousel = document.getElementById('badgeCarousel');
  const card = carousel.querySelector('.badge-card');
  const scrollAmount = card.offsetWidth + 24; // 24 = gap size
  carousel.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}

// skills section category buttons
function showSkillInfo(id) {
  // close all other subskills
  const allCards = document.querySelectorAll('.skill-card');
  allCards.forEach(card => {
    if (card.querySelector('.subskills').id !== id) {
      card.classList.remove('active');
    } 
  });

  // toggle clicked skill category
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
    { name: 'Copilot', icon: 'https://img.icons8.com/?size=100&id=Yl9ip6CjqAEI&format=png&color=000000' },
    { name: 'Teams', icon: 'https://img.icons8.com/?size=100&id=zQ92KI7XjZgR&format=png&color=000000' },
    { name: 'Slack', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/slack/slack-original.svg' },
    { name: 'Notion', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/notion/notion-original.svg' }
  ]
};        

// track current active category
let activeCategory = 'frontend';

// skills section category buttons display function
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

// skill section category buttons bounce effect
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

// window event listener to show default frontend skill category on page load
window.addEventListener('DOMContentLoaded', () => {
  const defaultTab = document.querySelector('.skill-tab[data-category="frontend"]');
  if (defaultTab) {
    showSkillCategory('frontend', defaultTab);
  }
});

// project section "see more" button functionality toggle
document.querySelectorAll('.project-toggle-trigger').forEach(button => {
  button.addEventListener('click', () => {
    const wrapper = button.closest('.project-group-wrapper');
    const group = wrapper.querySelector('.project-group');
    const isOpen = group.classList.contains('fading-in');

    if (isOpen) {
      group.classList.remove('fading-in');
      setTimeout(() => {
        group.classList.remove('showing');
        group.style.display = 'none';
      // match CSS transition duration
      }, 400); 
      button.innerHTML = 'See More <i class="bi bi-arrow-down-short"></i>';
      wrapper.insertBefore(button, group);
    } else {
      group.style.display = 'block';
      group.classList.add('showing');
      setTimeout(() => {
        group.classList.add('fading-in');
      }, 5);
      button.innerHTML = 'See Less <i class="bi bi-arrow-up-short"></i>';
      group.appendChild(button);
    }
  });
});

// design and project section "see more" buttons bounce effect
document.querySelectorAll('.card-subtitle').forEach(button => {
  button.addEventListener('click', () => {
    button.classList.remove('bounce'); // Reset animation if already applied
    void button.offsetWidth; // Trigger reflow to restart animation
    button.classList.add('bounce');
  });
});

// design section "see more" button functionality toggle
document.querySelectorAll('.toggle-trigger').forEach(button => {
  button.addEventListener('click', () => {
    const wrapper = button.closest('.design-group-wrapper');
    const group = wrapper.querySelector('.design-group');
    const isOpen = group.classList.contains('fading-in');

    if (isOpen) {
      group.classList.remove('fading-in');
      setTimeout(() => {
        group.classList.remove('showing');
        group.style.display = 'none';
      // match CSS transition duration
      }, 400); 
      button.innerHTML = 'See More <i class="bi bi-arrow-down-short"></i>';
      wrapper.insertBefore(button, group);
    } else {
      group.style.display = 'block';
      group.classList.add('showing');
      setTimeout(() => {
        group.classList.add('fading-in');
      }, 5); 
      button.innerHTML = 'See Less <i class="bi bi-arrow-up-short"></i>';
      group.appendChild(button);
    }
  });
});

// play or pause audio and animate the progress bar
function playAudio(audioSrc, progressBarId) {
  const audioPlayer = document.getElementById('audio-player');
  const progressBar = document.getElementById(progressBarId);
  const volumeSlider = document.getElementById('volume-slider');

  // sync volume if slider moved
  if (volumeSlider) {
    audioPlayer.volume = volumeSlider.value;
  }

  // if the same audio is already playing, pause it
  if (audioPlayer.src.includes(audioSrc) && !audioPlayer.paused) {
    audioPlayer.pause();
    clearInterval(audioPlayer.progressInterval);
  } else {
    if (!audioPlayer.src.includes(audioSrc)) {
      audioPlayer.src = audioSrc;
    }
    audioPlayer.play();

    progressBar.style.width = '0';
    clearInterval(audioPlayer.progressInterval);
    audioPlayer.progressInterval = setInterval(() => {
      const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
      progressBar.style.width = progress + '%';
      if (audioPlayer.ended) {
        clearInterval(audioPlayer.progressInterval);
      }
    }, 100);
  }
}

const volumeSlider = document.getElementById('volume-slider');
const volumeIcon = document.getElementById('volume-icon');
const audioPlayer = document.getElementById('audio-player');

// update the volume icon based on the current volume level
function updateVolumeIcon(volume) {
  if (volume == 0) {
    volumeIcon.className = 'bi bi-volume-mute-fill';
  } else if (volume > 0 && volume <= 0.3) {
    volumeIcon.className = 'bi bi-volume-off-fill';
  } else if (volume > 0.3 && volume <= 0.6) {
    volumeIcon.className = 'bi bi-volume-down-fill';
  } else {
    volumeIcon.className = 'bi bi-volume-up-fill';
  }
}

// update volume slider fill based on the current volume
function updateSliderFill() {
  const value = volumeSlider.value;
  volumeSlider.style.setProperty('--value', `${value}%`);
  audioPlayer.volume = value / 100;
}

volumeSlider.addEventListener('input', updateSliderFill);

// make sure volumse slider detects volume/input change and updates immediately
if (volumeSlider && audioPlayer) {
  volumeSlider.addEventListener('input', () => {
    const volume = parseFloat(volumeSlider.value);
    audioPlayer.volume = volume;
    updateVolumeIcon(volume);
  });

  // keep icon updated if volume changes elsewhere
  audioPlayer.addEventListener('volumechange', () => {
    updateVolumeIcon(audioPlayer.volume);
  });
}