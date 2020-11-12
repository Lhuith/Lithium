var i = 0;
var physics_bodies = [];

const physics_init = () => { 
    fixed_update();
}

const fixed_update = () => {
    i = i + 1;
    postMessage(physics_bodies);
    setTimeout("fixed_update()", 250);
}

physics_init();

const add_body = (p) => {
    physics_bodies.push(p)
}