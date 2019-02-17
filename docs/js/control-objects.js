import Cube from "./cube.js";

const objects_count = 10;
let objects = [];
let time_limit = 15;
let time = 0;
let score = 0;
let isEnd = false;

for (let i = 0; i < objects_count; i++) {
  const angle = (Math.PI * 2 * i) / objects_count;
  const coordinates = {
    x: Math.cos(angle) * 5,
    y: 0,
    z: Math.sin(angle) * 5
  };
  create_object(coordinates);
}
setTimeout(countdown_timer, 1000);

function create_object(coordinates) {
  const time_shift = Math.random() * 5;
  const cube = new Cube(coordinates, time_shift);
  cube.object.addEventListener("click", () => {
    if (isEnd) {
      return;
    }
    objects = objects.filter(obj => {
      return obj !== cube;
    });
    cube.remove();
    document.getElementById("my-score").innerHTML = ++score;
    setTimeout(create_object, (Math.random() * 10 + 5) * 1000, coordinates);
  });
  cube.append();
  objects.push(cube);
}

function countdown_timer() {
  document.getElementById("time-limit").innerHTML = --time_limit;
  if (time_limit > 0) {
    setTimeout(countdown_timer, 1000);
  } else {
    isEnd = true;
    if (score >= 10) {
      alert(`Great!  Your Score : ${score}`);
    } else if (score >= 5) {
      alert(`Good Job!  Your Score : ${score}`);
    } else {
      alert(`Your Score : ${score}`);
    }
  }
}

(function render() {
  if (isEnd) {
    cancelAnimationFrame(render);
  } else {
    requestAnimationFrame(render);
  }
  objects.forEach(object => {
    object.animation(time);
  });
  time += 0.1;
})();
