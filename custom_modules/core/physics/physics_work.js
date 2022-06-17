const GRAVITY = .005
const INTERVAL = 1
const BOUNDARY = -10


let i = 0
let work = []

const physics_init = () => {
    fixed_update()
}

const fixed_update = () => {
    if (work.length != 0) {
        // updating any active physics bodies here
        for(let i = 0; i < work.length; i++){
            environment_collision_check(work[i])
            body_collision_check(work[i])
            apply_gravity(work[i])
        }
    }
    postMessage(work)
    // clear work buffer
    work = []
    setTimeout("fixed_update()", INTERVAL)
}

// TODO: setup proper physics object! 
const apply_gravity = (body) => {
    if (body.transform != undefined) {
        if (body.transform.position.y - GRAVITY > BOUNDARY){
            body.transform.position.y -= GRAVITY * INTERVAL
        } else {
            body.transform.position.y = BOUNDARY
        }
    }
}

// body on body collision, the fun stuff
const body_collision_check = (body) => {
    if (body.colliders != undefined && body.colliders.length != 0) {
        for(let index in body.colliders){
            body.colliders[index].colliding = false

            for (let index in work) {
                // get all work[i] colliders
                // do checks until true
            }
        }
    }
}

// time for shenanigans
const environment_collision_check = (body) => {
    if (body.colliders != undefined && body.colliders.length != 0) {
        for(let index in body.colliders){
            body.colliders[index].colliding = false
        }
    }
}

const register_body = (p) => {
    if (p == undefined || p.type != "rigidbody") {
        console.error("component must be a rigid body!")
    }
    //console.log("\tADDING NEW BODY!", p)
    work.push(p)
}

self.onmessage = function(msg) {
    register_body(msg.data)
}

physics_init()