
 exports.handle_request = (req, res) => {
    if (req.body.task == undefined) res.send("task not specified!");

    const fs = require("fs");

    if (req.body.task == "g") {
        if (exists(fs, req)){
            //console.log("%cloading entry", "color:#7ab264")
            res.send(load(fs, req));
        } else {
            //res.send("file not found")
            //console.log("%ccreating entry", "color:#7ab264")
            res.send(save(fs, req));
        }
    } else if (req.body.task == "u") {
        //console.log("%cupdateing entry", "color:#7ab264")
        if (exists(fs, req)){
            if (save(fs, req) != null) {
                res.send("update succesful");
            }
        } else {
            res.send("file not found")
        }
    } else if (req.body.task == "r") {
        //console.log("%cremoving entry", "color:#7ab264")
        if (exists(fs, req)){
            res.send(remove(fs, req));
        } else {
            res.send("file not found")
        }
    }
}

const remove = (fs, req) => {
    try {
        fs.unlinkSync('./public/data/saved/' + req.body.id +'.json')
        return "file removed successfully."
      } catch(err) {
        console.error(err)
        return "error occured"
      }
}

const save = (fs, req) =>{
    try {
        // remove appended task field
        // only used to separate post operations
        
        delete req.body.task;
        var new_json = JSON.stringify(req.body)

        fs.writeFileSync(
            './public/data/saved/' + req.body.id +'.json',
            new_json)
        return new_json
    } catch (err){
        console.error(err)
        return null
    }
}

const load = (fs, req) =>{
    try {
        return fs.readFileSync(
        './public/data/saved/' + req.body.id +'.json', 
        'utf8');
    } catch (err) {
        console.error(err)
        return "not found";
    }
}

const exists = (fs, req) =>{
    try {
        return (fs.existsSync('./public/data/saved/' + req.body.id +'.json')) 
      } catch(err) {
        console.error(err)
        return false
      }

    return false
}

exports.create = (req, res) => {
    //console.log(req.body)
    res.send("creating ")

    const fs = require("fs");
    try {
        fs.writeFileSync(
            './public/data/saved/' + req.body.id +'.json',
            JSON.stringify(req.body)
        )
    } catch {
        console.error(err)
    }
}

exports.find = (req, res) => {
    const fs = require("fs");
    //console.log(req.path)
    try {
        res.send(fs.readFileSync('./public/data/saved/' + req.body.id +'.json', 'utf8'))
    } catch (err) {
        console.error(err)
        res.send ("not found")
    }
    
    //res.send("find specific")
} 

exports.update = (req, res) => {
    //console.log(req.body)
    res.send("update")
}

exports.delete = (req, res) => {
    //console.log(req.body)
    res.send("delete")
}

