const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080;
const studentArray = require('./InitialData');
app.use(express.urlencoded());

const studentData = [...studentArray];
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here

app.get('/api/student',(req,res)=>{
    res.send(studentData);
});

app.get('/api/student/:id' ,(req,res) => {
    const iD = req.params.id;
    const specificData= studentData.find(x => x.id===Number(iD));
    if(iD === null || iD === undefined || iD > studentData.length){
        res.sendStatus(404);
    }else{
    res.send(specificData);
    //console.log(specificData);
    }
});

const isNullorUndefined = (val) => val===null || val ===undefined;

app.post('/api/student', (req,res) => {
    const newStudent = req.body;
    const {name,currentClass,division} = newStudent;
    if(isNullorUndefined(name) || isNullorUndefined(currentClass)|| isNullorUndefined(division)){
        res.sendStatus(400);
    }else{
    const ID = studentData.length+1;
    newStudent.id = ID;
    newStudent.currentClass = Number(currentClass);
    studentData.push(newStudent);
    res.send({id:ID});
    }
});

app.put('/api/student/:id' ,(req,res) => {
    const id = req.params.id;
    const update = req.body;
    const {name,currentClass,division} = update;
    const specificidx= studentData.findIndex((x) => x.id===Number(id));

    if(specificidx === -1){
        res.sendStatus(400); 
    }else {
        if(!isNullorUndefined(name)){
            studentData[specificidx].name = name;
            res.sendStatus(200);
        }else if(!isNullorUndefined(currentClass)){
            studentData[specificidx].currentClass =Number(currentClass);
            res.sendStatus(200);
        }else if(!isNullorUndefined(division)){
            studentData[specificidx].division = division;
            res.sendStatus(200);
        }
        else{
            res.sendStatus(400);
        }
    }
});


app.delete('/api/student/:id' ,(req,res)=>{
    const id = req.params.id;
    const matchedidx = studentData.findIndex((x)=> x.id === Number(id));
    if(matchedidx===-1){
        res.sendStatus(404);
    }else{
        studentData.splice(matchedidx,1);
        res.sendStatus(200);
    }
});
 

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   