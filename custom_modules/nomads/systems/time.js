let game_time = 0
let day_length = 200 // length in second
export const init = (three, data) => {
    console.log("%cTime Initialized", "color:#eb33b5")
}

export const update = (delta) => {
    game_time += delta

    if (game_time > day_length) {
        console.log("new day")
        game_time = 0
    }
}