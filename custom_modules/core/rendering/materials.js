export const land_mat = () =>{
    return new THREE.ShaderMaterial({
        uniforms: THREE.UniformsUtils.merge([
            THREE.UniformsLib['lights'],
            THREE.UniformsLib['fog'],
            land_uniform]),
        vertexShader: this.shader.vert,
        fragmentShader: this.shader.frag,
        lights: true,
        wireframe: this.shader.extra.wf,
        transparent: this.shader.extra.trans,
        fog: true
    });
}