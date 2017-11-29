(function(){
    'use strict';
    let time = 0;
    (function render() {
        requestAnimationFrame(render);
        const object = document.getElementById('box');
        if(object == null) return;
        object.setAttribute('position', `-1 ${Math.cos(time)} -3`);
        time += 0.1;
    }());
}());
