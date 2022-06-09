export const maps_entry = (name, path, isAnimated, is3D) => {
    // TODO add type checks
    return {
        map: path,
        animate: isAnimated,
        is3D: is3D,
    }
}

export const sprite_entry = (name, coords, colors, frames, map_key) => {
    // TODO add type checks
    return {
        mapping: coords,
        frames: frames,
        colors: colors,
        map_key: map_key
    }
}

export const new_sprite = () => {

}