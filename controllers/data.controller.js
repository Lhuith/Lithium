
exports.create = (req, res) => {
    console.log(req.body)
    res.send("creating ")
}

exports.find = (req, res) => {
    res.send("find specific")
} 

exports.update = (req, res) => {
    console.log(req.body)
    res.send("update")
}

exports.delete = (req, res) => {
    console.log(req.body)
    res.send("delete")
}

