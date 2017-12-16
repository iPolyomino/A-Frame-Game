'use strict';

class Cube {
    constructor(coordinates, time_shift) {
        if (coordinates.x == null || coordinates.y == null || coordinates.z == null) {
            throw new Error('coordinates are essential');
        }

        if (time_shift == null || isNaN(time_shift)) {
            time_shift = 0;
        }

        this.x = coordinates.x;
        this.y = coordinates.y;
        this.z = coordinates.z;

        this.time_shift = time_shift;

        const box = document.createElement('a-box');
        box.setAttribute('position', `${coordinates.x} ${coordinates.y} ${coordinates.z}`);
        box.setAttribute('color', '#4CC3D9');
        box.setAttribute('class', 'box');
        box.addEventListener('click', () => {
            console.log('HIT!!');
            this.remove();
        });
        this.object = box;
    }

    append() {
        const scene = document.querySelector('a-scene');
        scene.appendChild(this.object);
    }

    animation(time) {
        if (time == null) {
            throw new Error('invalid value of time');
        }
        const object_time = time - this.time_shift;
        this.object.setAttribute('position', `${this.x} ${Math.cos(object_time)} ${this.z}`);
    }

    remove() {
        this.object.parentNode.removeChild(this.object);
    }
}

module.exports = Cube;
