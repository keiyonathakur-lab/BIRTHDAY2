const previewMode = false;
const unlockTime = new Date("2026-04-19T18:30:00.000Z");
const countdownGate = document.getElementById("countdownGate");
const gateFooter = document.getElementById("gateFooter");
const countdownParts = {
  days: document.getElementById("daysValue"),
  hours: document.getElementById("hoursValue"),
  minutes: document.getElementById("minutesValue")
};
const trigger = document.getElementById("messageTrigger");
const reveal = document.getElementById("memoryReveal");
const photoInputs = document.querySelectorAll(".photo-input");
let countdownTimer;

function pad(value) {
  return String(value).padStart(2, "0");
}

function unlockSite() {
  countdownGate.classList.add("is-hidden");
  document.body.classList.remove("is-locked");
  gateFooter.textContent = "Unlocked.";
  clearInterval(countdownTimer);
}

function updateCountdown() {
  const now = new Date();
  const remaining = unlockTime.getTime() - now.getTime();

  if (remaining <= 0) {
    Object.values(countdownParts).forEach((node) => {
      node.textContent = "00";
    });
    unlockSite();
    return;
  }

  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remaining / (1000 * 60)) % 60);
  const nextValues = {
    days: pad(days),
    hours: pad(hours),
    minutes: pad(minutes)
  };

  Object.entries(nextValues).forEach(([key, value]) => {
    const node = countdownParts[key];
    if (!node) {
      return;
    }

    if (node.dataset.value !== value) {
      node.dataset.value = value;
      node.textContent = value;
      node.classList.remove("is-flipping");
      window.requestAnimationFrame(() => {
        node.classList.add("is-flipping");
      });
      return;
    }

    node.textContent = value;
  });
}

if (previewMode) {
  countdownGate.classList.add("is-hidden");
  document.body.classList.remove("is-locked");
} else {
  document.body.classList.add("is-locked");
  updateCountdown();
  countdownTimer = window.setInterval(updateCountdown, 1000);
}

function toggleReveal() {
  const isVisible = reveal.classList.toggle("is-visible");
  reveal.setAttribute("aria-hidden", String(!isVisible));
  trigger.setAttribute("aria-expanded", String(isVisible));

  if (isVisible) {
    reveal.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

trigger.addEventListener("click", toggleReveal);
trigger.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    toggleReveal();
  }
});

photoInputs.forEach((input) => {
  input.addEventListener("change", () => {
    const [file] = input.files || [];
    const photoSlot = document.querySelector(`label[for="${input.id}"]`);

    if (!file || !photoSlot) {
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    photoSlot.style.backgroundImage = `url("${objectUrl}")`;
    photoSlot.classList.add("has-image");
  });
});
