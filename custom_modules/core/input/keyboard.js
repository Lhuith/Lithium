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

let input_events = new Map()
let hot_key_name = "hot-key"

// init keyboard by creating event listeners
export const init = () => {
    document.addEventListener( 'keydown', onKeyDown, false )
    document.addEventListener( 'keyup', onKeyUp, false )

    for (let key in get_input_meta()) {
        input_events.set(get_input_meta()[key][hot_key_name], new Event(key))
        addEventListener(key, function (e) {
            console.log("\t"+key + " event")
        }, false)
    }

    console.log(input_events)
    console.log("%cKeyboard Initialized", "color:#61AFEF")
}

const onKeyDown = (e) => {
    let input_key= input[keyCodeToChar[e.keyCode]]
    if (input_key == undefined) {
        //console.log(keyCodeToChar[e.keyCode] + " - not mapped!")
    } else {

        if (input_events.get(keyCodeToChar[e.keyCode]) != undefined) {
            dispatchEvent(input_events.get(keyCodeToChar[e.keyCode]))
        }

        //console.log(keyCodeToChar[e.keyCode] + " - Down")
        input[keyCodeToChar[e.keyCode]] = true
    }
}

const onKeyUp = (e) => {
    let input_key= input[keyCodeToChar[e.keyCode]]
    if (input_key == undefined) {
        //console.log(keyCodeToChar[e.keyCode] + " - not mapped!")
    } else {
        //console.log(keyCodeToChar[e.keyCode]  + " - Up")
        input[keyCodeToChar[e.keyCode]] = false
    }
}
