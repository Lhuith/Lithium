let physics_worker
let bodies = []

export const init = () => {
    console.log("%cPhysics Initialized", "color:#FF5AC3")
    start_physics()
}

const start_physics = () => {
    physics_worker = new Worker("/core/physics/physics_work.js")

    // physics update's happen here
    physics_worker.onmessage = function(event){
        fixed_update(event.data)
    }
}

export const register_body = (body) => {
    if (bodies.includes(body)) {
        physics_worker.postMessage(body)
        return
    }
    if (body.parent != null)
        console.log("\t " + body.parent.name + " registered")

    bodies.push(body)
}

const fixed_update = (work) => {
    for(let i = 0; i < bodies.length; i++) {
        if (work[i] != undefined){
            bodies[i].transform = work[i].transform

            for (let collider_index in work[i].colliders) {
                bodies[i].colliders[collider_index].colliding = work[i].colliders[collider_index].colliding
            }
        }
        bodies[i].fixed_update()
        register_body(bodies[i])
    }
}


//const unpack_worker_data = (data) => {
//    console.log(data)
//  // if (data[0] != undefined && data[0].transform != undefined) {
//  //     work_reference[0].transform = data[0].transform
//  //     work_reference[0].fixed_update()
//  //     //console.log(data[0].transform)
//  // }
//  // //for(let page of data) {
//  // //
//  // //    if (work_reference.includes(page)){
//  // //        console.log(page)
//  // //    }
//  // //    //
//  // //}
//}