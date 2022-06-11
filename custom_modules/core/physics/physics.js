let physics_worker;

export const init = () => {
    console.log("%cPhysics Initialized", "color:#FF5AC3")
    start_physics();
}

const start_physics = () => {
    physics_worker = new Worker("/core/physics/physics_work.js");

    // physics update's happen here
    physics_worker.onmessage = function(event){
       unpack_worker_data(event.data)
    }
}

const unpack_worker_data = (data) => {
    for(let page of data) {
        console.log(page)
    }
}

export const post_to_worker = (data) => {
    console.log("\twork posted?")
    physics_worker.postMessage(data);
}