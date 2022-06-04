export const get = (data, callback, n) => {
    //append route operation flag
    data.task = "g"
    $.ajax({
        type : 'POST',
        url : "http://127.0.0.1:3000/data",
        contentType : 'application/json; charset=utf-8',
        data : JSON.stringify(data),
        success: (e) => {
            //console.log("%c  -> success : " + e, "color:#05b275")
            callback(e, n)
        },
        error :  (e) => {
            //console.log("%c  -> error : " + e, "color:#ff4d42")
        }
    })
}

export const update = (data) => {
    //append route operation flag
    data.task = "u"
    $.ajax({
        type : 'POST',
        url : "http://127.0.0.1:3000/data",
        contentType : 'application/json; charset=utf-8',
        data : JSON.stringify(data),
        success: (e) => {
            console.log("%c\t" + e + " -> " + data.id , "color:#05b275")
        },
        error :  (e) => {
            console.log("%c  -> error : " + e, "color:#ff4d42")
        }
    })
}

export const remove = (data) => {
    //append route operation flag
    data.task = "r"
    $.ajax({
        type : 'POST',
        url : "http://127.0.0.1:3000/data",
        contentType : 'application/json; charset=utf-8',
        data : JSON.stringify(data),
        success: (e) => {
        //    console.log("%c  -> success : " + e, "color:#05b275")
        },
        error :  (e) => {
        //    console.log("%c  -> error : " + e, "color:#ff4d42")
        }
    })
}