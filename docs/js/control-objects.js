import Cube from "./cube.js";

// initialize
const objectsCount = 10;
let objects = [];
let timeLimit = 15;
let time = 0;
let score = 0;

const createObject = (coordinates) => {
  const timeShift = Math.random() * 5;
  const cube = new Cube(coordinates, timeShift);
  cube.object.addEventListener("click", () => {
    if (timeLimit <= 0) {
      return;
    }
    objects = objects.filter((obj) => {
      return obj !== cube;
    });
    cube.remove();
    document.getElementById("my-score").innerHTML = ++score;
    setTimeout(createObject, (Math.random() * 10 + 5) * 1000, coordinates);
  });
  cube.append();
  objects.push(cube);
};

const countdownTimer = () => {
  document.getElementById("time-limit").innerHTML = --timeLimit;
  if (timeLimit > 0) {
    setTimeout(countdownTimer, 1000);
  } else {
    if (score >= 10) {
      alert(`Great!  Your Score : ${score}`);
    } else if (score >= 5) {
      alert(`Good Job!  Your Score : ${score}`);
    } else {
      alert(`Your Score : ${score}`);
    }
  }
};

(function render() {
  if (timeLimit <= 0) {
    cancelAnimationFrame(render);
  } else {
    requestAnimationFrame(render);
  }
  objects.forEach((object) => {
    object.animation(time);
  });
  time += 0.1;
})();

// main
for (let i = 0; i < objectsCount; i++) {
  const angle = (Math.PI * 2 * i) / objectsCount;
  const coordinates = {
    x: Math.cos(angle) * 5,
    y: 0,
    z: Math.sin(angle) * 5,
  };
  createObject(coordinates);
}
setTimeout(countdownTimer, 1000);
