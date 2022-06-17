const GRAVITY = .00015
const INTERVAL = 1000
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