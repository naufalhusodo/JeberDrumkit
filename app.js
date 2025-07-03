window.addEventListener("load", () => {
  const pads = document.querySelectorAll(".pads div");

  // Drum Kit 1
  const drumKit1 = {
    a: "sounds/OpenHH.mp3",
    s: "sounds/CloseHH.mp3",
    d: "sounds/Crash.mp3",
    j: "sounds/Snare.mp3",
    k: "sounds/Ride.mp3",
    " ": "sounds/Kick.mp3",
  };

  // Drum Kit 2
  const drumKit2 = {
    a: "sounds/ROpenHihat.mp3",
    s: "sounds/RHihat.mp3",
    d: "sounds/RCrash.mp3",
    j: "sounds/RSnare.mp3",
    k: "sounds/RRide.mp3",
    " ": "sounds/RKick.mp3",
  };

  // Current active kit
  let currentKit = drumKit1;

  // Play sound on pad click
  pads.forEach((pad) => {
    pad.addEventListener("click", () => {
      const key = pad.classList[1];
      makeSound(key);
      buttonAnimation(key);
    });
  });

  // Play sound on keydown
  document.addEventListener("keydown", function (event) {
    const key = event.key.toLowerCase();
    if (key === " ") event.preventDefault(); // prevent scroll on space
    makeSound(key);
    buttonAnimation(key);
  });

  // Play sound from current kit
  // Cooldown per key (misalnya untuk 180 BPM = 333ms)
  const cooldowns = {};
  const COOLDOWN_TIME = 50; // in ms

  function makeSound(key) {
    const now = Date.now();

    // Cek apakah key sedang cooldown
    if (cooldowns[key] && now - cooldowns[key] < COOLDOWN_TIME) {
      return; // masih cooldown, skip
    }

    if (currentKit[key]) {
      const audio = new Audio(currentKit[key]);
      audio.currentTime = 0;
      audio.play();

      // Set cooldown time terakhir kali dipencet
      cooldowns[key] = now;
    }
  }

  // Button press animation
  function buttonAnimation(currentKey) {
    const keyClass = currentKey === " " ? "space" : currentKey;
    const activeButton = document.querySelector("." + keyClass);
    if (!activeButton) return;
    activeButton.classList.add("pressed");
    setTimeout(() => {
      activeButton.classList.remove("pressed");
    }, 100);
  }

  // Theme switch
  const themeSwitch = document.querySelector("input");
  themeSwitch.addEventListener("change", () => {
    document.body.classList.toggle("dark-theme");
  });

  // Drum kit switch buttons
  const btn1 = document.getElementById("btn1");
  const btn2 = document.getElementById("btn2");

  btn1.addEventListener("click", () => {
    btn1.classList.add("active");
    btn2.classList.remove("active");
    currentKit = drumKit1;
  });

  btn2.addEventListener("click", () => {
    btn2.classList.add("active");
    btn1.classList.remove("active");
    currentKit = drumKit2;
  });
});
