import * as THREE from '/build/three.module.js';
import {OrbitControls} from '/jsm/controls/OrbitControls.js';
import Stats from '/jsm/libs/stats.module.js';
import * as nomads from '/nomads/nomads.js';

var scene, camera, renderer, controls, stats, clock

const three_init = () => {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 2;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
    });

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        render();
    }, false);

    //!------------------- clock -------------------//
    clock = new THREE.Clock();
    clock.start();
    //!------------------- clock -------------------//
    stats = Stats();
    document.body.appendChild(stats.dom);
    
    //!------------------- nomads -------------------//
    nomads.init();
    //!------------------- nomads -------------------//
}

const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    nomads.update(clock.getDelta());
    render();
    stats.update();
};

function render() {
    renderer.render(scene, camera);
}


 
three_init();
animate();