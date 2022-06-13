let physics_worker
let work_reference = []

export const init = () => {
    console.log("%cPhysics Initialized", "color:#FF5AC3")
    start_physics()
}

const start_physics = () => {
    physics_worker = new Worker("/core/physics/physics_work.js")

    // physics update's happen here
    physics_worker.onmessage = function(event){
       unpack_worker_data(event.data)
    }
}

export const post_to_worker = (data) => {
    work_reference.push(data)
    work_reference[0].fixed_update()
    //console.log(data)
    physics_worker.postMessage(data)
}

const unpack_worker_data = (data) => {
    //console.log(data)
    if (data[0] != undefined && data[0].transform != undefined) {
        work_reference[0].transform = data[0].transform
        work_reference[0].fixed_update()
        //console.log(data[0].transform)
    }
    //for(let page of data) {
    //
    //    if (work_reference.includes(page)){
    //        console.log(page)
    //    }
    //    //
    //}
}