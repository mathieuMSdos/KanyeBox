"use-strict";

//----------------------------------------
//             **VARIABLES**
//----------------------------------------

const toggle = document.querySelector(".toggle");
const indicator = document.querySelector(".indicator");
const globalContainer = document.querySelector(".globalContainer");
const moveKanyeTitleBlock = document.querySelector(".moveKanyeTitleBlock");
const padContainer = document.querySelector(".padContainer");
const yeezVid = document.querySelector("#yeezVid");
const kanyeVid = document.querySelector("#kanyeVid");
const pauseVid = document.querySelector("#pauseVid");
const scratches = document.querySelector("#scratches");
const intro = document.querySelector(".intro");
const divAudioKeyboard = document.querySelector(".padContainer");
const pauseLogo = document.querySelector(".pauseLogo");
const playLogo = document.querySelector(".playLogo");
const blockTitle = document.querySelector(".blockTitle");
const outroContainerPlayButton = document.querySelector(
  ".outroContainerPlayButton"
);
const playButtonContainer = document.querySelector(".playButtonContainer");
const outroBlockTitleContainer = document.querySelector(
  ".outroBlockTitleContainer"
);
const mainTitle = document.querySelector(".mainTitleKanye h1");
const mainTitleShadow = document.querySelector(".mainTitleKanye p");
const subTitle = document.querySelector(".subTitleContainer h2");
const subTitleShadow = document.querySelector(".subTitleContainer p");
const submoveKanyeTitleBlock = document.querySelector(
  ".submoveKanyeTitleBlock"
);
const switchButton = document.querySelector(".switchButton");

let allDrumButtons;
let onOff = false;
let switchPad = 1;

//----------------------------------------
//             **ARRAY**
//----------------------------------------

const yeezyModePad = [
  {
    keyCode: "q",
    keyName: "Q",
    url: "assets/sounds/yeezyKanye/part1FollowIntru.mp3",
  },
  {
    keyCode: "s",
    keyName: "S",
    url: "assets/sounds/yeezyKanye/part2FollowIntru.mp3",
  },
  {
    keyCode: "d",
    keyName: "D",
    url: "assets/sounds/yeezyKanye/kickFollow.mp3",
  },
  { keyCode: "f", keyName: "F", url: "assets/sounds/yeezyKanye/hitFollow.mp3" },
  {
    keyCode: "g",
    keyName: "G",
    url: "assets/sounds/yeezyKanye/snareFollow.mp3",
  },
  {
    keyCode: "w",
    keyName: "W",
    url: "assets/sounds/yeezyKanye/fatherSpreadChoirBreak.mp3",
  },
];

const youngKanyeModePad = [
  { keyCode: "q", keyName: "Q", url: "assets/sounds/youngKanye/kick.wav" },
  { keyCode: "s", keyName: "S", url: "assets/sounds/youngKanye/close.mp3" },
  {
    keyCode: "d",
    keyName: "D",
    url: "assets/sounds/youngKanye/DP - Yeezy Hat.wav",
  },
  { keyCode: "f", keyName: "F", url: "assets/sounds/youngKanye/snare.wav" },

  {
    keyCode: "w",
    keyName: "W",
    url: "assets/sounds/youngKanye/sampleInstru.mp3",
  },
  { keyCode: "x", keyName: "X", url: "assets/sounds/youngKanye/horn.wav" },
];

//----------------------------------------
//             **FUNCTIONS**
//----------------------------------------

const pauseTransition = (item, duration) => {
  // switchButton.style.display = "none";
  item.style.zIndex = 1;
  item.style.opacity = 1;
  pauseLogo.style.zIndex = 200;

  setTimeout(() => {
    pauseVid.style.opacity = 0;
    pauseVid.style.zIndex = 0;
    pauseLogo.style.opacity = 0;

    // switchButton.style.display = "";
  }, duration);
};

//apply glowyEffect on keys of the pad

const glowKeyEffect = () => {
  const keyClass = document.querySelectorAll(".keyClass");

  keyClass.forEach((item) => {
    item.classList.add("vhsShadowContainer");
  });
};

//introduction sequence :

const introSequence = () => {
  // globalContainer.style.display = "none";
  pauseLogo.style.visibility = "hidden";
  playLogo.style.visibility = "visible";
  pauseVid.style.zIndex = "1";
  pauseVid.style.mixBlendMode = "screen";

  outroContainerPlayButton.classList.add("outroTransitionPlayButton");
  outroBlockTitleContainer.classList.add("outroTransitionBlockTitle");
  //start vhsGlitch video
  pauseTransition(pauseVid, 2100);
  // vhsGlitch video background turns black
  setTimeout(() => {
    pauseVid.style.mixBlendMode = "";
  }, 1400);

  setTimeout(() => {
    pauseVid.style.zIndex = -1;
    intro.style.display = "none";
    switchButton.style.display = "";
    globalContainer.style.display = "";
    switchButton.classList.add("switchButtonOpening");
    moveKanyeTitleBlock.classList.add("kanyeTitleOpening");
    padContainer.classList.add("padOpening");
  }, 2000);
};

//to create audio and HTML element

const padChange = (pad) => {
  //create keytouch div (for display)

  pad.forEach((item) => {
    const keyDiv = document.createElement("div");

    keyDiv.className = "keyClass";
    keyDiv.textContent = item.keyName;
    keyDiv.dataset.key = item.keyCode;
    divAudioKeyboard.appendChild(keyDiv);
  });

  //create audio div (no display)

  pad.forEach((item) => {
    let audioDiv = document.createElement("audio");
    audioDiv.src = item.url;
    audioDiv.dataset.key = item.keyCode;
    divAudioKeyboard.appendChild(audioDiv);
  });
};

//to play an audio element
const playSound = (id) => {
  let audioClick = document.querySelector(`audio[data-key="${id}"]`);
  if (audioClick == null) {
    //do nothing
  } else {
    audioClick.currentTime = 0;
    audioClick.play();
  }
};

//To remove audio and HTML element of padContainer (keyboard)

const clearKeyboard = (DomParentElement) => {
  while (DomParentElement.firstChild) {
    DomParentElement.removeChild(DomParentElement.firstChild);
  }
};

//To change style of audio key html element when event is happened

const changeButtonStyle = (id) => {
  let keyPressed = document.querySelector(`div[data-key="${id}"]`);

  if (keyPressed !== null) {
    if (!onOff) {
      keyPressed.classList.add("playing");
      keyPressed.classList.remove("vhsShadowContainer", "keyClass");
      setTimeout(() => {
        keyPressed.classList.remove("playing");
        keyPressed.classList.add("vhsShadowContainer", "keyClass");
      }, 100);
    } else {
      keyPressed.classList.add("playingYeezus");
      keyPressed.classList.remove("vhsShadowContainer", "keyClass");
      setTimeout(() => {
        keyPressed.classList.remove("playingYeezus");
        keyPressed.classList.add("vhsShadowContainer", "keyClass");
      }, 100);
    }
  } else {
    //do nothing}
  }
};

//All keypads events listener to interact with sounds
const padEventListner = () => {
  // to play a sound when a key is pressed
  document.addEventListener("keypress", (event) => {
    let code = event.key;
    playSound(code);
    changeButtonStyle(code);
  });

  // to play a sound when you click/touch on buttons
  allDrumButtons = document.querySelectorAll(".keyClass"); //obliged to declare the value here because before, the div with class .keyClass didn't exist

  allDrumButtons.forEach((item) => {
    let idKey = item.dataset.key;

    //when you click (desktop use case)

    item.addEventListener("click", (event) => {
      playSound(idKey);
      changeButtonStyle(idKey);
    });

    //when you touch (mobile use case)

    item.addEventListener("touchstart", (event) => {
      event.preventDefault(); //stop to play two sounds (click + touch) when you touch key on mobile version.
      playSound(idKey);
      changeButtonStyle(idKey);
    });
  });
};

//----------------------------------------
//             **EXECUTION**
//----------------------------------------

playLogo.style.visibility = "hidden";
switchButton.style.display = "none";

//click on playbutton launch intro sequence
playButtonContainer.addEventListener("click", () => {
  introSequence();
});

// build screen after intro :
padChange(youngKanyeModePad);
padEventListner();
glowKeyEffect();

//Behavior of switch button on the top of page (switch sounds, pad, background etc...)

toggle.addEventListener("click", () => {
  toggle.classList.toggle("active");
  indicator.classList.toggle("active");
  globalContainer.classList.toggle("active"); //cette ligne ne sert plus à rien

  console.log(onOff);

  if (onOff) {
    //toggle old kanye version
    setTimeout(() => {
      clearKeyboard(divAudioKeyboard);
      padChange(youngKanyeModePad);
      padEventListner();
      glowKeyEffect();
    }, 150);
    moveKanyeTitleBlock.classList.remove("kanyeTitleOpening");
    padContainer.classList.remove("padOpening");
    yeezVid.style.opacity = 0;
    pauseTransition(pauseVid, 900);
    kanyeVid.style.opacity = 1;

    void moveKanyeTitleBlock.offsetWidth; //JS trick to reset animation after each click = JS easter egg

    setTimeout(() => {
      moveKanyeTitleBlock.classList.add("kanyeTitleOpening");
      padContainer.classList.add("padOpening");

      mainTitle.innerHTML = "KANYE WEST";
      mainTitleShadow.innerHTML = "KANYE WEST";
      subTitle.innerHTML = "2001, New York";
      subTitleShadow.innerHTML = "2001, New York";
    }, 800);

    onOff = !onOff;
  } else {
    //Toggle yeezus version
    setTimeout(() => {
      clearKeyboard(divAudioKeyboard);
      padChange(yeezyModePad);
      padEventListner();
      glowKeyEffect();
    }, 150);
    const keyClass = document.querySelectorAll(".keyClass");
    keyClass.forEach((item) => {});

    moveKanyeTitleBlock.classList.remove("kanyeTitleOpening");
    padContainer.classList.remove("padOpening");
    kanyeVid.style.opacity = 0;
    pauseTransition(pauseVid, 900);

    yeezVid.style.opacity = 1;

    void moveKanyeTitleBlock.offsetWidth; //JS trick to reset animation after each click = JS easter egg

    setTimeout(() => {
      moveKanyeTitleBlock.classList.add("kanyeTitleOpening");
      padContainer.classList.add("padOpening");
      mainTitle.innerHTML = "YEEZUS";
      mainTitleShadow.innerHTML = "YEEZUS";
      subTitle.innerHTML = "2019, Los Angeles";
      subTitleShadow.innerHTML = "2019, Los Angeles";
    }, 800);

    onOff = !onOff;
  }
  console.log(onOff);
});
