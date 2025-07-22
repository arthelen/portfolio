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

// scroll reveal effect
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

// Function to play or pause audio and animate the progress bar
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
        clearInterval(audioPlayer.progressInterval); // Stop updating when audio ends
      }
    }, 100); // Update every 100ms
  }
}







function scrollBadges(direction) {
  const carousel = document.getElementById('badgeCarousel');
  const card = carousel.querySelector('.badge-card');
  const scrollAmount = card.offsetWidth + 24; // 24 = gap size
  carousel.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}

















document.addEventListener('DOMContentLoaded', () => {
  const filterGroup = document.getElementById('skillFilter');
  const checkboxes = filterGroup.querySelectorAll('input[type="checkbox"]');
  const projects = document.querySelectorAll('.col-xl-4');
  const showAllBtn = document.getElementById('showAllBtn');
  const selectedSkillsDisplay = document.getElementById('selectedSkillsDisplay');

  function getSelectedSkills() {
    return Array.from(checkboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);
  }

  function updateSelectedSkillsDisplay(selectedSkills) {
    if (selectedSkills.length === 0) {
      selectedSkillsDisplay.textContent = 'No skills selected.';
    } else {
      selectedSkillsDisplay.textContent = 'Selected: ' + selectedSkills.join(', ');
    }
  }

  function filterProjects() {
    const selectedSkills = getSelectedSkills();
    projects.forEach(project => {
      const projectSkills = Array.from(project.querySelectorAll('.skill-blurb')).map(skill => skill.textContent.trim());
      const hasMatch = selectedSkills.some(skill => projectSkills.includes(skill));
      project.style.display = selectedSkills.length === 0 || hasMatch ? 'block' : 'none';
    });
    updateSelectedSkillsDisplay(selectedSkills);
  }

  checkboxes.forEach(cb => {
    cb.addEventListener('change', filterProjects);
  });

  showAllBtn.addEventListener('click', () => {
    checkboxes.forEach(cb => cb.checked = false);
    projects.forEach(project => {
      project.style.display = 'block';
    });
    updateSelectedSkillsDisplay([]);
  });

  // Initial display
  updateSelectedSkillsDisplay([]);
});

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