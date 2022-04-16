import {dither4x4, gray_scale} from "./misc/dither.js";

let land_uniform = {
    indexMatrix16x16: { type: "fv1", value: dither4x4 },
    palette: { type: "v3v", value: gray_scale },
    paletteSize: { type: "i", value: 8 },
    texture: { type: "t", value: null},
    extra: { type: "t", value: null },
    time: { type: "f", value: 1.0 },
    lightpos: { type: 'v3', value: new THREE.Vector3(0, 30, 20) },
    noTexture: { type: "i", value: 0 },
    customColorSwitch: { type: "i", value: 1 },
    customColor: { type: "i", value: new THREE.Vector4(.48, .89, .90, 1) }
}
