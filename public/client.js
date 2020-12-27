import * as THREE from '/build/three.module.js';
import {OrbitControls} from '/jsm/controls/OrbitControls.js';
import Stats from '/jsm/libs/stats.module.js';
import * as antlion from '/core/data/antlion.js';
import * as game from '/nomads/nomads.js';
import * as ajax from '/meta/helpers/ajax.js';

var scene, camera, stats, clock, renderer, renderers, game_time
var controls;

const init = (data) => {
    console.log("%cThree Initialized", "color:#F22C2F")
    
    scene = new THREE.Scene();
    game_time = 0;

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 10;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor( 0xffffff, 1 );
    
    document.body.appendChild(renderer.domElement);

    //controls = new OrbitControls(camera, renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
    });

    const cube = new THREE.Mesh(geometry, material);
    //scene.add(cube);

    const gridHelper = new THREE.GridHelper( 10, 10 );
    scene.add( gridHelper );

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
    game.init(data, 
        {
            renderer: renderer, 
            camera: camera, 
            scene:scene, 
            //  controls:controls
        })
    //!------------------- nomads -------------------//
    renderers = antlion.get_renderers()

    for(let r of renderers){
        scene.add(r[1].mesh);
    }

    // file.get({playerName: "poopoo", position:{x:1, y:1, z:1}});
    // file.update({playerName: "poopoo", position:{x:1, y:52, z:1}});
    // file.update({playerName: "poopoo", position:{x:1, y:123, z:1}});
    // file.get({playerName: "poopoo", position:{x:1, y:52, z:1}});
    // file.remove({playerName: "poopoo", position:{x:1, y:1, z:1}});
} 

const animate = () => {
    requestAnimationFrame(animate);

    //if(controls != undefined) controls.update();
    if(clock != undefined) { game.update(clock.getDelta());}
    if(renderer != undefined) render();
    if(stats != undefined) stats.update();
};

const render = () => { 
    renderer.render(scene, camera);
}

const get_renderer = () => {
    return renderer;
}

antlion.init(init);
animate();