const kick = new Tone.Player("../audios/808.wav").toDestination();
const snare = new Tone.Player("../audios/snare.wav").toDestination();
const clap = new Tone.Player("../audios/clap.wav").toDestination();
const hihat = new Tone.Player("../audios/hihat.wav").toDestination();

// 1-bar (16 steps)
const sequence = new Tone.Sequence(
  (time, step) => {
    // Kick (1, 9)
    if (step === 0 || step === 8) {
      kick.start(time);
      //flash the nth box active
      flash(`.box:nth-child(${step + 1})`);
      //add kick color to the nth box
      setTimeout(() => {
        document
          .querySelector(`.box:nth-child(${step + 1})`)
          .classList.remove("kick");
      }, 120);
      document
        .querySelector(`.box:nth-child(${step + 1})`)
        .classList.add("kick");
    }

    // Snare + Clap (5, 13)
    if (step === 4 || step === 12) {
      snare.start(time);
      clap.start(time);
      //add snare color to the nth box
      setTimeout(() => {
        document
          .querySelector(`.box:nth-child(${step + 1})`)
          .classList.add("snare");
        //add clap color to the nth box
        document
          .querySelector(`.box:nth-child(${step + 1})`)
          .classList.add("clap");
      });
    }

    // Hi-hat (every 8th note)
    if (step % 2 === 0) {
      hihat.start(time);
    }
  },
  [...Array(16).keys()],
  "16n",
);

// Start beat
async function playBeat() {
  await Tone.start();

  Tone.Transport.bpm.value = 80;

  sequence.start(0);
  Tone.Transport.start();
}

// play beat button
document.getElementById("playBeat").addEventListener("click", playBeat);

//stop beat button
document.getElementById("stopBeat").addEventListener("click", () => {
  Tone.Transport.stop();
});

// Optional: Add keyboard controls
document.addEventListener("keydown", async (e) => {
  await Tone.start();

  const key = e.key.toLowerCase();

  if (key === "a") {
    play(kick);
    flash(".kick");
  }
  if (key === "s") {
    play(snare);
    flash(".snare");
  }
  if (key === "d") {
    play(clap);
    flash(".clap");
  }
  if (key === "f") {
    play(hihat);
    flash(".hi-hat");
  }
});

function play(player) {
  player.start();
}

function flash(selector) {
  const el = document.querySelector(selector);
  el.classList.add("active");

  setTimeout(() => {
    el.classList.remove("active");
  }, 120);
}
