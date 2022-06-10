import {subscribe_to_input_event} from "/core/input/keyboard.js"
import {get_input_meta} from "/core/data/antlion.js";
import {get_game} from "../nomads.js"

export const init = (r) => {
    console.log("%cMenu Initialized", "color:#FBFF86")

    subscribe_to_input_event(
        get_input_meta().pause, pause_event)

    subscribe_to_input_event(
        get_input_meta().edit, edit_event)
}

export const update = () => {
}

const pause_event = (e,n) => {
    if (get_game().get_game_pause_state()) {
        console.log("⏸ game un-paused ⏸")
        closeNav("pauseMenu", "pauseText")
    } else {
        console.log("⏸ game pause ⏸")
        openNav("pauseMenu", "pauseText", "PAUSED")
    }
}

const edit_event = (e,n) => {
    if (!get_game().get_game_pause_state()) {
        if (get_game().get_game_edit_state()) {
            console.log("game normal mode")
            closeNav("editMenu", "editText")
        } else {
            console.log("game edit mode")
            openNav("editMenu", "editText", "EDIT")
        }
    }
}

function openNav(menu_name, text_name, text) {
    document.getElementById(menu_name).style.display = "block";
    document.getElementById(text_name).innerHTML = text
}

function closeNav(menu_name, text_name) {
    document.getElementById(menu_name).style.display = "none";
    document.getElementById(text_name).innerHTML = ""
}