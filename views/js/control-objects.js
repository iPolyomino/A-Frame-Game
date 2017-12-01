(function() {
    'use strict';
    const objects_count = 16;
    let objects = [];
    let time = 0;

    for (let i = 0; i < objects_count; i++) {
        const angle = Math.PI * 2 * i / objects_count;
        const coordinates = {
            x: Math.cos(angle) * 5,
            y: 0,
            z: Math.sin(angle) * 5,
        };
        const cube = new Cube(coordinates);
        cube.append();
        objects.push(cube);
    }

    (function render() {
        requestAnimationFrame(render);
        objects.forEach(object => {
            object.animation(time);
        });
        time += 0.1;
    }());
}());
