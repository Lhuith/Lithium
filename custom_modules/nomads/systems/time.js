
let actual_second = 0
let actual_minute = 0
let actual_hour = 0

let time_divisor = 60
let seconds_in_rl_day = 86400

let world_time_divisor = 24*10 // x length of a real day i.e 24 times faster
let world_day_length = (seconds_in_rl_day/world_time_divisor) // length in second

export const day_event = {
    NewDay : new Event('New Day'),
    Morning : new Event('Morning'),
    Afternoon : new Event('Afternoon')
}

export const init = () => {
    console.groupCollapsed("%cTime Initialized", "color:#eb33b5")
    console.log(`%cWorld Day: ${world_day_length} seconds`, "color:#eb33b5")

    for (const event in day_event) {
        console.log(`%cTime Event Added: ${event}`, "color:#eb33b5");
    }

    console.groupEnd()
}

export const update = (delta) => {
    actual_second += delta
    actual_minute = actual_second/time_divisor
    actual_hour = actual_minute/time_divisor

    if (actual_second >= world_day_length) {
        dispatchEvent(day_event.NewDay)
        actual_second = 0
    }
}

addEventListener(day_event.NewDay.type, function (e) {
    console.log("%c☼ New Day ☼", "color:#EEB768")
}, false)

export const set_time_by_second = (time) => {
    actual_second = time % world_day_length
}

// get_time_of_day_normalized, returns 0-1 value of a day, 0.5 being 12 hours or halfway in :3
export const get_time_of_day_normalized = () => {
    return actual_second/world_day_length
}

export const get_world_hour = () => {
    return get_time_of_day_normalized() * 24
}

export const get_world_minute = () => {
    return get_world_hour() * 60
}

export const get_world_second = () => {
    return get_world_minute() * 60
}

