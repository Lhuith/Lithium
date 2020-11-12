var physics_worker;

export const init = () => {
    console.log("%cPhysics Initialize", "#FFGG11")
    start_physics();
}

const start_physics = () => {
    physics_worker = new Worker("../core/physics/physics_work.js");
    // physics update's happen here
    physics_worker.onmessage = function(event){
        for(var i = 0; i < event.data; i++){
            console.log(i)
        }
    }
}