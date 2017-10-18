const route = require('express').Router();
const todos = require('../db/todotable');

route.get('/', (req, res) => {
    todos.showtodo((todolist) => {
        res.send(todolist)
    })
});

route.post('/add', (req, res) => {
    todos.addtodo(req.body.task, () => {
        res.redirect('.')
    })
});
route.post('/delete', (req, res) => {
    todos.delete(() => {
        res.redirect('.')
    })
});
route.post('/del', (req, res) => {
    todos.deletetodo(req.body.id, () => {
        res.redirect('.')
    })
});
route.post('/strike', (req, res) => {
    if(req)
    todos.checktodo(req.body.id, () => {
        res.redirect('.')
    })
});
route.post('/unstrike', (req, res) => {
    if(req)
        todos.unchecktodo(req.body.id, () => {
            res.redirect('.')
        })
});
route.post('/up', (req, res) => {
    todos.up(req.body.id, () => {
        res.redirect('.')
    })
});
route.post('/down', (req, res) => {
    todos.down(req.body.id, () => {
        res.redirect('.')
    })
});
exports.route = route;