import * as THREE from '/build/three.module.js'
import {OrbitControls} from '/jsm/controls/OrbitControls.js'
import Stats from '/jsm/libs/stats.module.js'
import * as antlion from '/core/data/antlion.js'
import * as game from '/nomads/nomads.js'
import * as ajax from '/core/meta/helpers/ajax.js'
import {PointerLockControls} from '/jsm/controls/PointerLockControls.js'

// https://discoverthreejs.com/tips-and-tricks/
var scene, camera, stats, clock, renderer, renderers, game_time

const init = (data) => {
    console.log("%cThree Initialized", "color:#F22C2F")
    
    scene = new THREE.Scene()
    game_time = 0

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000)
    camera.position.z = 10

    renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor( 0xffffff, 1 )
    
    document.body.appendChild(renderer.domElement)

    const directionalLight = new THREE.DirectionalLight( 0xffffff, .8);
    scene.add( directionalLight );

    const gridHelper = new THREE.GridHelper( 10, 10 )
    scene.add( gridHelper )

   window.addEventListener('resize', () => {
       camera.aspect = window.innerWidth / window.innerHeight
       camera.updateProjectionMatrix()
       renderer.setSize(window.innerWidth, window.innerHeight)
       render()
   }, false)

    //!------------------- clock -------------------//
    clock = new THREE.Clock()
    clock.start()
    //!------------------- clock -------------------//
    stats = Stats()
    document.body.appendChild(stats.dom)
    
    //!------------------- nomads -------------------//
    game.init(data, 
        {
            renderer: renderer, 
            camera: camera, 
            scene:scene,
            light:directionalLight,
        })
    //!------------------- nomads -------------------//
    renderers = antlion.get_renderers()

    for(let r of renderers){
        scene.add(r[1].mesh)
    }
} 

const animate = () => {
    requestAnimationFrame(animate)

    //if(controls != undefined) controls.update();
    if(clock != undefined) { game.update(clock.getDelta())}
    if(renderer != undefined) render()
    if(stats != undefined) stats.update()
}

const render = () => { 
    renderer.render(scene, camera)
}

antlion.init(init)
animate()