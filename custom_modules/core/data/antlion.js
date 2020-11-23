// data after being processed
import {payload}  from '/core/data/payload.js';
import * as THREE from '/build/three.module.js';
import {img, is} from '/utils/utilities.js';

var compiled = []

// ensure nothing else interfaces as resources are loading
var DONE = false;

var async_time = 0;
var elapsed_time = 0;
var pool = null;
var meta = null;
var manifest = [];

var map_index = 0;
var renderers = new Map();

// init function of actual program 
var bootstrap = null;

// used to grab all outside resources for the game since all resources
// are async and require some to be compiled
export const init = (bs) => {
    console.log("%cAntlion Initialized", "color:#F28022")
    DONE = false;
    
    bootstrap = bs;
    //load('saved/pool_data', 'json', antlion_pool_load);
    //load('saved/object_manifest', 'json', antlion_manifest_load);
    //load('meta_data', 'json', meta_data_load);

    async_time = Date.now(); 
    fall(payload.length - 1, []);
    //done()
}

// TODO clean up after everything is confirmed to work
const load_renderers = () => {
    for(var i = 0; i < renderer_text_info.length; i++){
        var inst_renderer = new instance_renderer(
            i,
            renderer_text_info[i].container,
            renderer_text_info[i].animate,
            renderer_text_info[i].is3D,
            get_data(renderer_text_info[i].shader),
        );
    
        renderers.set(renderer_text_info[i].name, inst_renderer);
        scene.add(renderer_text_info[i].container)
        inst_renderer.bake_buffer();
    }
}

const fall = (i, data) => {
    // catch data dropping in from prevois call, except the first init
    if(data.length != 0){ payload.push(data);}
    
    // onload function will pass on to done
    if(i == 0){
        if(payload[i].type == "s"){
            shader_loader(
                payload[i].name, 
                payload[i].vert, 
                payload[i].frag, 
                payload[i].extra, 
                done, 
                i - 1);
        } else if(payload[i].type == "t"){
            texture_loader(
                payload[i].name, 
                payload[i].color, 
                payload[i].height, 
                payload[i].detail,
                fall, 
                i - 1);
        } else if(payload[i].type == "m"){
            map_texture_loader(
                payload[i].name, 
                payload[i].url,
                map_index++, 
                fall, 
                i - 1);
        }
        return;
    }

    // Keep falling baby
    if(payload[i].type == "s"){
        shader_loader(
            payload[i].name, 
            payload[i].vert, 
            payload[i].frag, 
            payload[i].extra, 
            fall, 
            i - 1);
    } else if(payload[i].type == "t"){
        texture_loader(
            payload[i].name, 
            payload[i].color, 
            payload[i].height, 
            payload[i].detail,
            fall, 
            i - 1);
    } else if(payload[i].type == "m"){
        map_texture_loader(
            payload[i].name, 
            payload[i].url,
            map_index++, 
            fall, 
            i - 1);
    }

    //console.log("%cFALLING: " + i, 'color: #FF0000');
}

// push the last data, and flag for done;
const done = (i, data) => {
    DONE = true;

    payload.push(data);
    elapsed_time = Date.now() - async_time;

    // loading renderers here as they need textures/shaders loaded first
    // load_renderers();

    // start up init after data loaded
    console.log("%cAntlion Completed in "+ elapsed_time*0.000001+" seconds", "color:#FF9900")
    bootstrap(payload);
}

// Credit to THeK3nger - https://gist.github.com/THeK3nger/300b6a62b923c913223fbd29c8b5ac73
// Sorry to any soul that bare's witness to this Abomination....May the gods have mercy on me
const shader_loader = (name, vertex_url, fragment_url, custom, onLoad, i, onProgress, onError) => {
    var vertex_loader = new THREE.FileLoader(THREE.DefaultLoadingManager);
    vertex_loader.setResponseType('text');
    vertex_loader.load(vertex_url, function (vertex_text) {
        var fragment_loader = new THREE.FileLoader(THREE.DefaultLoadingManager);
        fragment_loader.setResponseType('text');
        fragment_loader.load(fragment_url, function (fragment_text) {
            var shadow_loader = new THREE.FileLoader(THREE.DefaultLoadingManager);
            shadow_loader.setResponseType('text');
            shadow_loader.load("/data/shaders/shadow.glsl", function (shadow_text) {
                var dither_loader = new THREE.FileLoader(THREE.DefaultLoadingManager);
                dither_loader.setResponseType('text');
                dither_loader.load("/data/shaders/dither.glsl", function (dither_text) {
                    //this needs an i
                    onLoad(i, {name: name, extra: custom, vert: shader_parse(vertex_text, shadow_text, dither_text), frag: shader_parse(fragment_text, shadow_text, dither_text) });
                }

                )
            });
        })
    }, onProgress, onError);
}

const texture_loader  = (name, urlc, urlh, urld, onLoad, i, onProgress, onError) => {
    var texture_c = new THREE.TextureLoader().load(urlc, function (event) {
        var texture_h = new THREE.TextureLoader().load(urlh, function (event) {
            var texture_d = new THREE.TextureLoader().load(urld, function (event) {

        var imagedata = img.get_image_data(texture_h.image);    
        var detail_data = img.get_image_data(texture_d.image); 

        texture_c.magFilter = THREE.NearestFilter;
        texture_c.minFilter = THREE.NearestFilter;

        texture_h.magFilter = THREE.NearestFilter;
        texture_h.minFilter = THREE.NearestFilter;
        
        detail_data.magFilter = THREE.NearestFilter;
        detail_data.minFilter = THREE.NearestFilter;

        texture_d.magFilter = THREE.NearestFilter;
        texture_d.minFilter = THREE.NearestFilter;
        
       
        onLoad(i, {name:name, color: texture_c, height:imagedata, detail: detail_data, detail_test: texture_d}, onProgress, onError)

            })
        })
    });
}

const map_texture_loader = (name, url, index, onLoad, i, onProgress, onError) => {
    var texture = new THREE.TextureLoader().load(url, function () {
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;
        onLoad(i, {name:name, index:index, map: texture}, onProgress, onError)
    });
}

//Yummy Yum Yum
const shader_parse = (glsl, shadow_text, dither_text) => {
    var text = glsl.replace("AddShadow", shadow_text);
    text = text.replace("AddDither", dither_text);

    return text;
}

export const get_data = (key) => {
    if(is.alpha(key)){
        //console.log(key);
        for(var i = 0; i < payload.length; i++){
            if(payload[i].name == key){return payload[i];}
        }

    } else if(is.num(key)){
       // console.log(key);
        for(var i = 0; i < payload.length; i++){
            if(payload[i].index != null){
                    if(payload[i].index == key){return payload[i];}
            }
        }
    }
}