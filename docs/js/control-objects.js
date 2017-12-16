(function() {
    'use strict';
    const objects_count = 16;
    let objects = [];
    let time = 0;
    let score = 0;

    for (let i = 0; i < objects_count; i++) {
        const angle = Math.PI * 2 * i / objects_count;
        const coordinates = {
            x: Math.cos(angle) * 5,
            y: 0,
            z: Math.sin(angle) * 5
        };
        create_object(coordinates);
    }

    function create_object(coordinates) {
        const time_shift = Math.random() * 5;
        const cube = new Cube(coordinates, time_shift);
        cube.object.addEventListener('click', () => {
            objects = objects.filter( obj => {
                return obj !== cube;
            });
            cube.remove();
            document.getElementById('my-score').innerHTML = ++score;
            setTimeout(create_object, (Math.random() * 10 + 5) * 1000, coordinates);
        });
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
