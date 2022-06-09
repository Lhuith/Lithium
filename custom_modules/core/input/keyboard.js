// input struct holding all current keyboard button states
import {day_event} from "../../nomads/systems/time.js";
import {get_input_meta} from "../data/antlion.js";
import {keyCodeToChar} from "./keyCodes.js"

export const input = {
    "A": false,
    "D": false,
    "E": false,
    "P": false,
    "W": false,
    "S": false,
    "Q": false,
    "X": false,
    "Z": false,
    "Space": false,
    "Shift": false,
    "Esc" : false,
}

// init keyboard by creating event listeners
export const init = () => {
    document.addEventListener( 'keydown', onKeyDown, false )
    document.addEventListener( 'keyup', onKeyUp, false )
    console.log("%cKeyboard Initialized", "color:#61AFEF")
}

const onKeyDown = (e) => {
    let input_key= input[keyCodeToChar[e.keyCode]]
    if (input_key== undefined) {
        console.log(keyCodeToChar[e.keyCode] + " - not mapped!")
    } else {
        console.log(keyCodeToChar[e.keyCode] + " - Down")
        input[keyCodeToChar[e.keyCode]] = true
    }
}

const onKeyUp = (e) => {
    let input_key= input[keyCodeToChar[e.keyCode]]
    if (input_key== undefined) {
        console.log(keyCodeToChar[e.keyCode] + " - not mapped!")
    } else {
        console.log(keyCodeToChar[e.keyCode]  + " - Up")
        input[keyCodeToChar[e.keyCode]] = false
    }
}
