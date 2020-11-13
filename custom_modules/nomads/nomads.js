import * as physics from '/core/physics/physics.js';
import * as THREE from '/build/three.module.js';

// game based variable setup
export const init = () => {
    console.log("hello world!");
    physics.init();
    physics.post_to_worker(["body A", new THREE.Vector3(1,1,1)]);
    physics.post_to_worker(["body B", new THREE.Vector3(1,1,1)]);
}

export const update = (t) => {
    //console.log(t);
}
