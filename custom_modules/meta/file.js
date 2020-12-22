    export const create = (name, data, type) => {
        $.ajax({
            type : 'POST',
            url : "http://127.0.0.1:3000/data",
            contentType : 'application/json; charset=utf-8',
            data : JSON.stringify(data),
            success: (e) => {
                console.log("%c  -> saving fuck this shit, msg: " + e, "color:#05b275");
            },
            error :  (e) => {
                console.log("%c  -> saving error, msg: " + e, "color:#ff4d42");
            }
        });
    }