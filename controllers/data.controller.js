
 exports.handle_request = (req, res) => {
    if (req.body.task == undefined) res.send("task not specified!");

    const fs = require("fs");

    if(req.body.task == "c") {
        console.log("%csaving entry", "color:#7ab264") 
        res.send(save(fs, req));
    } else if (req.body.task == "g") {
        if (exists(fs, req)){
            console.log("%cloading entry", "color:#7ab264")
            res.send(load(fs, req));
        } else {
            res.send("file not found")
        }
    } else if (req.body.task == "u") {
        console.log("%cupdateing entry", "color:#7ab264")
        if (exists(fs, req)){
            res.send(save(fs, req));
        } else {
            res.send("file not found")
        }
    } else if (req.body.task == "r") {
        console.log("%cupdateing entry", "color:#7ab264")
        if (exists(fs, req)){
            res.send(remove(fs, req));
        } else {
            res.send("file not found")
        }
    }
}

const remove = (fs, req) => {
    try {
        fs.unlinkSync('./public/data/saved/' + req.body.playerName +'.json')
        return "file removed succesfully."
      } catch(err) {
        console.error(err)
        return "error occured"
      }
}

const save = (fs, req) =>{
    try {
        fs.writeFileSync(
            './public/data/saved/' + req.body.playerName +'.json',
            JSON.stringify(req.body))
        return "saving succesful!"
    } catch {
        console.error(err)
        return "error occurred!"
    }
}

const load = (fs, req) =>{
    try {
        return fs.readFileSync(
        './public/data/saved/' + req.body.playerName +'.json', 
        'utf8');
    } catch (err) {
        console.error(err)
        return "not found.";
    }
}

const exists = (fs, req) =>{
    try {
        return (fs.existsSync('./public/data/saved/' + req.body.playerName +'.json')) 
      } catch(err) {
        console.error(err)
        return false
      }

    return false
}

exports.create = (req, res) => {
    console.log(req.body)
    res.send("creating ")

    const fs = require("fs");
    try {
        fs.writeFileSync(
            './public/data/saved/' + req.body.playerName +'.json',
            JSON.stringify(req.body)
        )
    } catch {
        console.error(err)
    }
}

exports.find = (req, res) => {
    const fs = require("fs");
    console.log(req.path)
    try {
        res.send(fs.readFileSync('./public/data/saved/poopoo.json', 'utf8'))
    } catch (err) {
        console.error(err)
        res.send ("not found.")
    }
    
    //res.send("find specific")
} 

exports.update = (req, res) => {
    console.log(req.body)
    res.send("update")
}

exports.delete = (req, res) => {
    console.log(req.body)
    res.send("delete")
}

