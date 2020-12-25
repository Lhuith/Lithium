module.exports = (app) => {
    const controller = require('../controllers/data.controller.js')
    
    // create
    app.post('/data', controller.handle_request);

    // get 
    app.get('/data/:id', controller.find);

    // update
    app.put('/data/:id', controller.update);

    // delete
    app.delete('/data/:id', controller.delete);
}