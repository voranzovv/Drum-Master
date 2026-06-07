const clap = new Audio("../audios/clap.wav");
const hihat = new Audio("../audios/hihat.wav");
const e8 = new Audio("../audios/808.wav");
const snare = new Audio("../audios/snare.wav");

document.addEventListener("keydown", (event) => {
  if (event.key === "a") {
    document.querySelector(".kick").classList.add("active");
    clap.currentTime = 0;
    clap.play();
    setInterval(() => {
      document.querySelector(".kick").classList.remove("active");
    }, 600);
  }
  if (event.key === "s") {
    document.querySelector(".snare").classList.add("active");
    hihat.currentTime = 0;
    hihat.play();
    setInterval(() => {
      document.querySelector(".snare").classList.remove("active");
    }, 600);
  }
  if (event.key === "d") {
    document.querySelector(".clap").classList.add("active");
    e8.currentTime = 0;
    e8.play();
    setInterval(() => {
      document.querySelector(".clap").classList.remove("active");
    }, 600);
  }
  if (event.key === "f") {
    document.querySelector(".hi-hat").classList.add("active");
    snare.currentTime = 0;
    snare.play();
    setInterval(() => {
      document.querySelector(".hi-hat").classList.remove("active");
    }, 600);
  }

  console.log(event.key);
});
