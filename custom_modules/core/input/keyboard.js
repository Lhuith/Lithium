// input struct holding all current keyboard button states
export const input = {
    a: false,
    d: false,
    e: false,
    p: false,
    w: false,
    s: false,
    q: false,
    space: false,
    shift: false,
    esc : false,
}

// init keyboard by creating event listeners
export const init = () => {
    document.addEventListener( 'keydown', onKeyDown, false );
    document.addEventListener( 'keyup', onKeyUp, false );
}

const onKeyDown = (e) => {
    switch ( e.keyCode ) {
        case 16: // shift
            input.shift = true;
            break;
        case 27: // esc
            input.esc = true;
            break;
        case 32: // space
            input.space = true;
            break;
        case 65: // a
            input.a = true;
            break;
        case 68: // d
            input.d = true;
            break;
        case 69: // E
            input.e = true;
            break;
        case 80: // p
            input.p = true;
            break;
        case 83: // s
            input.s = true;
            break;
        case 87: // w
            input.w = true;
            break;
    }
};

const onKeyUp = (e) => {
    switch ( e.keyCode ) {
        case 16: // shift
            input.shift = false;
            break;
        case 27: // esc
            input.esc = true;
            break;
        case 32: //space
            input.space = false;
            break;
        case 65: // a
            input.a = false;
            break;
        case 68: // d
            input.d = false;
            break;
        case 69: // e
            input.e = false;
            break;
        case 80: // p
            input.p = false;
            break;
        case 83: // s
            input.s = false;
            break;
        case 87: // w
            input.w = false;
            break;
    }
};
