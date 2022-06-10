// input struct holding all current keyboard button states
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
let hot_key_field_name = "hot-key"

// init keyboard by creating event listeners
export const init = () => {
    console.log("%cKeyboard Initialized -", "color:#61AFEF")
    document.addEventListener( 'keydown', onKeyDown, false )
    document.addEventListener( 'keyup', onKeyUp, false )

    for (let key in get_input_meta()) {
        input_events.set(get_input_meta()[key][hot_key_field_name], new Event(key))
        console.log("%c\thot-key "+key+"\t: "+get_input_meta()[key][hot_key_field_name], "color:#61AFEF")
    }
}

export const subscribe_to_input_event = (input_meta_key, callback) => {
    if (input_meta_key == undefined) {
        console.error("\tinput meta key not defined")
        return
    }
    let input_event = input_events.get(input_meta_key[hot_key_field_name])
    if (input_event != undefined) {
        addEventListener(input_event.type, callback, false)
    } else {
        console.error("\t-no hot-key event by the name: " +input_meta_key[hot_key_field_name])
    }
}

const onKeyDown = (e) => {
    let input_key = input[keyCodeToChar[e.keyCode]]

    if (input_key == undefined) {
        //console.log(keyCodeToChar[e.keyCode] + " - not mapped!")
    } else {
        if (e.shiftKey) {
            if (keyCodeToChar[e.keyCode] != "Shift") {
                dispatchEvent(input_events.get("Shift "+ keyCodeToChar[e.keyCode]))
            }
        } else {
            if (input_events.get(keyCodeToChar[e.keyCode]) != undefined) {
                dispatchEvent(input_events.get(keyCodeToChar[e.keyCode]))
            }
            //console.log(keyCodeToChar[e.keyCode] + " - Down")
            input[keyCodeToChar[e.keyCode]] = true
        }
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
