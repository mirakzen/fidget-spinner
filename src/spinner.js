'use strict';

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var step = 2 * Math.PI / 360;
var radius = 120;

var img_size = 80;
var linkText="https://github.com/mirakzen";

var drag_start = false;
var move_start = false;
var mouse_down = false;
var break_spin = false;

var angle = 0;
var cursor_old_angle = 0;
var cursor_current_angle = 0;
var speed = 7.0;


canvas.addEventListener('mousedown', function(_ev) {
    if (speed != 0 && !move_start && !mouse_down) {
        mouse_down = true;
        break_spin = true;
    }
    if (speed == 0 && !move_start && !mouse_down) {
        move_start = true;
        mouse_down = true;
    }
    
    var clientX = _ev.clientX;
    var clientY = _ev.clientY;

    drag_start = {
        clientX: clientX,
        clientY: clientY
    };

    if (move_start) {
        render();
    }
});


canvas.addEventListener('mousemove', function(_ev) {
    var clientX = _ev.clientX;
    var clientY = _ev.clientY;

    return drag_start && function() {
        update_speed(drag_start, {
            clientX: clientX,
            clientY: clientY
        });
        drag_start = {
            clientX: clientX,
            clientY: clientY
        };
    }();
});


window.addEventListener('mouseup', function() {
    drag_start = false;
    move_start = false;
    mouse_down = false;
});


function update_speed(startPos, endPos) {
    speed = (Math.atan2(startPos.clientX - (canvas.offsetLeft + canvas.width / 2), startPos.clientY - (canvas.offsetTop + canvas.height / 2)) - Math.atan2(endPos.clientX - (canvas.offsetLeft + canvas.width / 2), endPos.clientY - (canvas.offsetTop + canvas.height / 2))) * radius;
    if (speed < 0) {
        speed = Math.max(speed, -25);
    }
    speed = Math.min(speed, 25);
}


function get_cursor_angle() {
    return Math.atan2(drag_start.clientY - (canvas.offsetTop + canvas.height / 2), drag_start.clientX - (canvas.offsetLeft + canvas.width / 2)) + Math.PI;
}


function get_angle_diff(current, old) {
    if (current >= 0 && current <= (Math.PI / 2) && old >= (3 * Math.PI / 2) && old < (2 * Math.PI)) {
        return (2 * Math.PI) - old + current;
    }
    if (old >= 0 && old <= (Math.PI / 2) && current >= (3 * Math.PI / 2) && current < (2 * Math.PI)) {
        return (-1) * ((2 * Math.PI) - current + old);
    }
    return current - old;
}


function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    speed = parseFloat(speed)
    if (break_spin) {
        speed = 0;
        break_spin = false;
    }

    if (speed == 0 && mouse_down) {
        cursor_old_angle = get_cursor_angle();
        cursor_current_angle = get_cursor_angle();
    }
    if (speed != 0 && mouse_down) {
        cursor_old_angle = cursor_current_angle;
        cursor_current_angle = get_cursor_angle();
        angle += get_angle_diff(cursor_current_angle, cursor_old_angle);
    }

    if (!mouse_down) {
        angle += step * speed;
        speed = Math.max(speed - 0.05, Math.min(speed + 0.05, 0));
    }

    for (var i = 0; i < 3; i++) {
        var x = canvas.width / 2 + radius * Math.sin(angle + i * (120 * step));
        var y = canvas.height / 2 - radius * Math.cos(angle + i * (120 * step));

        ctx.strokeStyle = '#003c9c';
        ctx.fillStyle = "#35363A";
        ctx.lineWidth = radius / 5.5;

        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.closePath();

        ctx.lineWidth = radius / 3;
        ctx.beginPath();
        ctx.arc(x, y, radius / 3.5, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        
        ctx.strokeStyle = '#989499';
        ctx.fillStyle = "#35363A";
        ctx.lineWidth = radius / 5.5;

        ctx.beginPath();
        ctx.arc(x, y, radius / 5, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }

    ctx.strokeStyle = '#003c9c';
    ctx.fillStyle = "#989499";
    ctx.lineWidth = radius / 3.5;

    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, radius / 2.7, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();

    if (speed != 0 || mouse_down) {
        window.requestAnimationFrame(render);
    }
}


var canvas_img = document.getElementById('canvas_img');
var ctx_img = canvas_img.getContext('2d');
canvas_img.width = img_size;
canvas_img.height = img_size;


canvas_img.addEventListener('click', function(_ev) {
    var X = _ev.clientX - (canvas_img.offsetLeft + canvas_img.width / 2);
    var Y = _ev.clientY - (canvas_img.offsetTop + canvas_img.height / 2);

    if (X*X + Y*Y < img_size*img_size / 4) {
        window.location = linkText;
    }
});


function render_img() {
    var image = new Image(img_size, img_size);
    image.onload = drawImageActualSize;
    image.src = 'moon.png';

    function drawImageActualSize() {
        ctx_img.drawImage(this, 0, 0, img_size, img_size);
    }
}


render_img();
render();
