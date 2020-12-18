import * as THREE from '/build/three.module.js';
import {OrbitControls} from '/jsm/controls/OrbitControls.js';
import Stats from '/jsm/libs/stats.module.js';
import * as antlion from '/core/data/antlion.js';
import * as game from '/nomads/nomads.js';

var scene, camera, renderer, controls, stats, clock, renderers, game_time

export class three {
    constructor(data) {
        console.log("%cThree Struct Initialized", "color:#F22C2F")

        this.renderer = new THREE.WebGLRenderer();

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor( 0xffffff, 1 );

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);

        this.controls = new OrbitControls( this.camera, this.renderer.domElement);

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            render();
        }, false);

        this.clock = new THREE.Clock();
        this.clock.start();

        this.stat = Stats();
        document.body.appendChild(this.stat.dom);

        //!------------------- nomads -------------------//
        game.init(data)
        //!------------------- nomads -------------------//
        renderers = antlion.get_renderers()

        for(let r of renderers){
            this.scene.add(r[1].mesh);
        }
    }
    get_renderer(){
        return this.renderer;
    }
    get_scene(){
        return this.scene;
    }
}

const init = (data) => {
    //var three_struct = new three(data);

    console.log("%cThree Initialized", "color:#F22C2F")
    scene = new THREE.Scene();
    game_time = 0;

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 10;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor( 0xffffff, 1 );
    document.body.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
    });

    //const cube = new THREE.Mesh(geometry, material);
    //scene.add(cube);

    const size = 10;
    const divisions = 10;

    const gridHelper = new THREE.GridHelper( size, divisions );
    scene.add( gridHelper );

   //window.addEventListener('resize', () => {
   //    camera.aspect = window.innerWidth / window.innerHeight;
   //    camera.updateProjectionMatrix();
   //    renderer.setSize(window.innerWidth, window.innerHeight);
   //    render();
   //}, false);

    //!------------------- clock -------------------//
    clock = new THREE.Clock();
    clock.start();
    //!------------------- clock -------------------//
    stats = Stats();
    document.body.appendChild(stats.dom);
    
    //!------------------- nomads -------------------//
    game.init(data)
    //!------------------- nomads -------------------//
    renderers = antlion.get_renderers()

    for(let r of renderers){
        scene.add(r[1].mesh);
    }
}

const animate = () => {
    requestAnimationFrame(animate);

    if(controls != undefined) controls.update();
    if(clock != undefined) { game.update(clock.getDelta());}
    if(renderer != undefined) render();
    if(stats != undefined) stats.update();


};

function render() { 
    renderer.render(scene, camera);
}

antlion.init(init);
animate();