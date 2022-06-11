const GRAVITY = 3.4 
const BOUNDARY = -10

let i = 0
let physics_bodies = []

const physics_init = () => { 
    fixed_update()
}

const fixed_update = () => {
    // updating any active physics bodies here
    for(let i = 0; i < physics_bodies.length; i++){
        apply_gravity(physics_bodies[i])
    }

    // post work done by physics' worker thread
    postMessage(physics_bodies)
    setTimeout("fixed_update()", 250)
}

const add_body = (p) => {
    console.log("\tADDING NEW BODY!", p)
    physics_bodies.push(p)
}
// TODO: setup proper physics object! 
const apply_gravity = (body) => {
    if (body[1].y - GRAVITY > BOUNDARY){
        body[1].y -= GRAVITY
    } else {
        body[1].y = BOUNDARY
    }
}

self.onmessage = function(msg) {
    console.log("POSTED TO WORKER!", msg.data)
    add_body(msg.data)
}

physics_init()