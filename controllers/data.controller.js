
exports.create = (req, res) => {
    console.log(req.body)
    res.send("creating ")
}

exports.findAll = (req, res) => {
    res.send("find all")
}

exports.find = (req, res) => {
    res.send("find specific")
} 

exports.update = (req, res) => {
    res.send("update")
}

exports.delete = (req, res) => {
    res.send("delete")
}

