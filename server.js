const express = require('express'),
    path=require('path')
    ,app= express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const routes = {
    todos: require('./routes/todos').route,
};
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));


app.use('/todos', routes.todos);
app.listen(5555,()=>
    console.log('http://localhost:5555/'));