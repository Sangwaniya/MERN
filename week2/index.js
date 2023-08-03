const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json())

function middleware1(req, res, next) {
    console.log(`from inside middleware with key ${req.query.key}`);
    if (req.query.key == "mks") {
        next();
    }
    else{
        res.send("Error, authentication failed");
    }
    
}
app.use(middleware1);


var user = {
    name : [],
    latest_user_added : ""
}

function getUser(req, res) {
    res.send(`Users : ${names}`);
}



function createUser(req, res) {
    if(typeof req.body.name === 'string' || req.body.name instanceof String) {
        user.name.push(req.body.name)
        user.latest_user_added = req.body.name;
        res.send(user);
    } else {
        res.status(411).send("Name can't be integer");
    }
}

function deleteElementByName(arr, nameToDelete) {
    return arr.filter(name => name !== nameToDelete);
}
function deleteUser(req, res) {
    names = deleteElementByName(names, req.query.name)
    res.send(`User ${req.query.name} deleated, so updated list is : ${names}`);
}

app.post('/user', createUser)
app.get('/user', getUser)
app.delete('/user', deleteUser)

function givePage(req, res) {
    res.sendFile(__dirname+"/index.html")
}
app.get('/', givePage)

function started() {
    console.log(`Example code listening on port ${port}`)
}

app.listen(port, started)