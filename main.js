const profileSlider = document.getElementById("aboutMe");
const diagram = profileSlider.querySelector(".diagram");
const diagramFill = diagram.querySelectorAll(".fill");
const diagramCircle = diagram.querySelectorAll(".circle");

// about section slider

const imgWrapperImg = document.querySelectorAll(".about-above-img");
let imgWrapperIndex = 0;
function updateIndex() {
  imgWrapperImg.forEach((el, index) => {
    el.classList.toggle("active", imgWrapperIndex === index);
  });
}
setInterval(() => {
  if (imgWrapperIndex === 2) {
    imgWrapperIndex = 0;
  }
  updateIndex(imgWrapperIndex);
  imgWrapperIndex++;
}, 5000);

// burger icon logic

const headerList = document.querySelector(".header-nav ul");
const burgerIcon = document.querySelector(".burger-btn");
burgerIcon.addEventListener("click", (el) => {
  headerList.classList.toggle("active");
  el.target.classList.toggle("rotate");
});

// animating diagram sliders
function sliderAnimation(index, width, left) {
  diagramFill[index].style.width = `${width}%`;
  diagramCircle[index].style.left = `${left}%`;
}
const options = {
  root: null,
  threshold: 0.3,
};
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      sliderAnimation(0, 95, 93);
      sliderAnimation(1, 96, 94);
      sliderAnimation(2, 96, 94);
      sliderAnimation(3, 96, 94);
      observer.unobserve(entry.target);
    }
    return;
  });
}, options);
observer.observe(profileSlider);

// carousel slider
const slide = document.querySelectorAll(".testimonials-slide");
const dot = document.querySelectorAll(".dot");
let activeIndex = 0;
let intervalId = null;

function updateSlider() {
  slide.forEach((el, index) => {
    el.classList.toggle("active", activeIndex === index);
  });
  dot.forEach((el, index) => {
    el.classList.toggle("active", activeIndex === index);
  });
}
function autoSlider() {
  intervalId = setInterval(() => {
    updateSlider();
    activeIndex++;
    if (activeIndex > slide.length - 1) activeIndex = 0;
    if (activeIndex > dot.length - 1) activeIndex = 0;
  }, 5000);
}
autoSlider();
dot.forEach((el, index) => {
  el.addEventListener("click", () => {
    clearInterval(intervalId);
    activeIndex = index;
    updateSlider();
    autoSlider();
  });
});
slide.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    clearInterval(intervalId);
  });
  el.addEventListener("mouseleave", () => {
    autoSlider();
  });
});
// my project logic
const projectsContainer = document.querySelector(
  ".myProjcets-projects-wrapper"
);
const btnContainer = document.querySelectorAll(".btn-container button");

fetch("./myProjects.json")
  .then((res) => res.json())
  .then((result) => {
    projectsContainer.innerHTML = result
      .map(
        (element) => `
      <div class="myProjcets-card invisible" data-group="${element.projectGroup}">
        <a href="${element.projectUrl}" target="_blank">
          <img src="${element.projectImg}" alt="project image" />
        </a>
        <p>${element.projectName}</p>
        <h3>${element.projectTitle}</h3>
      </div>
    `
      )
      .join("");

    const projectCards = projectsContainer.querySelectorAll(".myProjcets-card");
    projectCards.forEach((card) => card.classList.remove("invisible"));
  });

btnContainer.forEach((el) => {
  el.addEventListener("click", () => {
    const btnValue = el.value;
    console.log(btnValue);
    fetch("./myProjects.json")
      .then((res) => res.json())
      .then((result) => {
        projectsContainer.innerHTML = result
          .map(
            (element) =>
              `
              <div class="myProjcets-card invisible"data-group="${element.projectGroup}">
                <a href="${element.projectUrl}" target="_blank">
                  <img src="${element.projectImg}" alt="project image" />
                </a>
                <p>${element.projectName}</p>
                <h3>${element.projectTitle}</h3>
              </div>
            `
          )
          .join("");
        const projectName =
          projectsContainer.querySelectorAll(".myProjcets-card");
        projectName.forEach((card) => {
          if (card.dataset.group === btnValue) {
            card.classList.toggle("invisible");
          }
          if (btnValue === "All") {
            card.classList.toggle("invisible");
          }
        });
      });
    btnContainer.forEach((btn) => btn.removeAttribute("active"));
    el.setAttribute("active", "");
  });
});

// contact form logic

const contactForm = document.querySelector("form");
const dialog = document.getElementById("dialog");
const body = document.querySelector("body");
const nameInput = contactForm.querySelector(".name");
const emailInput = contactForm.querySelector(".email");
const webInput = contactForm.querySelector(".yourWeb");
const messageInput = contactForm.querySelector(".yourMessage");
const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
const emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
const errorMessage = document.querySelector(".errorMessage");
const formGroup = document.querySelectorAll(".form-group");
const contactBtn = contactForm.querySelector(".contact-btn");
const closeContact = document.querySelector(".cross");
closeContact.addEventListener("click", () => {
  dialog.close();
  body.classList.remove("overFlow-hidden");
  contactForm.reset();
});
document.addEventListener("click", (e) => {
  if (e.target === dialog) {
    dialog.close();
    body.classList.remove("overFlow-hidden");
    contactForm.reset();
  }
});

function showSuccess(input) {
  input.closest(".form-group").querySelector(".errorMessage").innerText = "";
  return true;
}
function showError(input, message) {
  input.closest(".form-group").querySelector(".errorMessage").innerText =
    message;
  return false;
}
function checkNameValue() {
  const name = nameInput.value.trim();
  const namePattern = /^[A-Za-z\s]+$/;

  if (name.length === 0) {
    showError(nameInput, "Name value shouldn't be empty!");
  } else if (name.length < 3) {
    showError(nameInput, "Name should be at least 3 characters long!");
  } else if (!namePattern.test(name)) {
    showError(nameInput, "Name should contain only letters!");
  } else {
    showSuccess(nameInput);
    return true;
  }
}

function checkEmailValue() {
  if (emailInput.value.trim().length === 0) {
    showError(emailInput, "Email value shoudn't be ampty!");
  } else if (!gmailPattern.test(emailInput.value.trim())) {
    showError(emailInput, "We accept only @gmail.com");
  } else {
    showSuccess(emailInput);
    return true;
  }
}
function checkWebValue() {
  if (webInput.value.trim().length === 0) {
    showError(webInput, "Website value shouldn't be ampty!");
  } else if (webInput.value.trim().length < 5) {
    showError(webInput, "Enter correct website link!");
  } else {
    showSuccess(webInput);
    return true;
  }
}
function checkMessageValue() {
  if (messageInput.value.trim().length === 0) {
    showError(messageInput, "Message value shouldn't be ampty!");
  } else if (messageInput.value.trim().length < 10) {
    showError(messageInput, "Your message is too short!");
  } else {
    showSuccess(messageInput);
    return true;
  }
}

nameInput.addEventListener("input", checkNameValue);
emailInput.addEventListener("input", checkEmailValue);
webInput.addEventListener("input", checkWebValue);
messageInput.addEventListener("input", checkMessageValue);
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch("https://borjomi.loremipsum.ge/api/send-message", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      web: webInput.value.trim(),
      message: messageInput.value.trim(),
    }),
  })
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((err) => console.error(err));

  const name = checkNameValue();
  const email = checkEmailValue();
  const web = checkWebValue();
  const message = checkMessageValue();
  if (name && email && web && message) {
    dialog.showModal();
    body.classList.add("overFlow-hidden");
    contactForm.reset();
  } else {
    dialog.close();
    body.classList.remove("overFlow-hidden");
  }
});