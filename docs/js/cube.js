"use strict";

export default class Cube {
  constructor(coordinates, timeShift) {
    if (
      coordinates.x == null ||
      coordinates.y == null ||
      coordinates.z == null
    ) {
      throw new Error("coordinates are essential");
    }

    if (timeShift == null || isNaN(timeShift)) {
      timeShift = 0;
    }

    this.x = coordinates.x;
    this.y = coordinates.y;
    this.z = coordinates.z;

    this.timeShift = timeShift;

    this.cycle = Math.random() + 0.5;

    const box = document.createElement("a-box");
    box.setAttribute(
      "position",
      `${coordinates.x} ${coordinates.y} ${coordinates.z}`
    );
    box.setAttribute("color", "#4CC3D9");
    box.setAttribute("class", "box");
    this.object = box;
  }

  append() {
    const scene = document.querySelector("a-scene");
    scene.appendChild(this.object);
  }

  animation(time) {
    if (time == null) {
      throw new Error("invalid value of time");
    }
    const objectTime = (time - this.timeShift) * this.cycle;
    this.object.setAttribute(
      "position",
      `${this.x} ${Math.cos(objectTime)} ${this.z}`
    );
  }

  remove() {
    this.object.parentNode.removeChild(this.object);
  }
}
