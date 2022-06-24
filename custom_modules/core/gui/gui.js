let gui_container

export const init = () => {
    console.log("%Gui Initialized", "color:#FF5AC3")
    gui_container = document.getElementById("gui");
}
export const update = () => {
}
export const get_gui_container = () => {
    if (gui_container == undefined){
        console.error("gui_container not defined!")
    }

    return gui_container
}