const express = require('express'),
    path=require('path')
    ,app= express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const routes = {
    todos: require('./routes/todos').route,
}

app.use('/todos', routes.todos);
app.use('/',express.static(path.join(__dirname ,'frontend')));
app.listen(4444,()=>
    console.log('http://localhost:4444/'));