let express = require('express');
const rateLimit = require('express-rate-limit');
let app = express();
const cors=require("cors");
const path = require('path');
const corsOptions ={
   origin:'*',
   credentials:true,
   optionSuccessStatus:200,
}
app.use(express.json())
app.use(cors(corsOptions))

// const limiter = rateLimit({
//     windowMs: 1000, // 1 second
//     max: 2, // 10 requests per second
//     message: 'Too many requests, please try again later.',
//   });

// app.use(limiter);
const limiter_get = rateLimit({
    windowMs: 1000,
    max: 50,
    message: 'Too many requests',
  });

const limiter_put = rateLimit({
    windowMs: 1000,
    max: 30,
    message: 'Too many requests',
  });

const limiter_post = rateLimit({
    windowMs: 1000,
    max: 20,
    message: 'Too many requests',
  });

const limiter_delete = rateLimit({
    windowMs: 1000,
    max: 40,
    message: 'Too many requests',
  });



class Civil{

    constructor(FirstName,LastName,ID,Age,Mobile){
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.ID = ID;
        this.Age = Age;
        this.Mobile = Mobile;
    }
    getFirstName(){
        return this.FirstName;
    }
    setFirstName(FirstName){
        FirstName = this.FirstName;
    }
    getLastName(){
        return this.LastName;
    }
    setLastName(LastName){
        LastName = this.LastName;
    }
    getID(){
        return this.ID;
    }
    setID(ID){
        ID = this.ID;
    }
    getAge(){
        return this.Age;
    }
    setAge(Age){
        Age = this.Age;
    }
    getMobile(){
        return this.Mobile;
    }
    setMobile(Mobile){
        Mobile = this.Mobile;
    }

}

var civils = [];
var civils_array = [];
const fs = require('fs')
function getData(){
try {
  const data = fs.readFileSync('data.txt', 'utf8')
  civils = data;
} catch (err) {
  console.error(err)
}
civils_array = []
civils = JSON.parse(civils);
for(var i=0;i<civils.length;i++){
    civils_array.push(
        new Civil(civils[i].FirstName,civils[i].LastName,civils[i].ID,civils[i].Age,civils[i].Mobile)
    );
}
}
app.get('/get/:id',limiter_get,(req,res) => {

    if(req.params.id == 'all'){
    getData();
    res.send(JSON.stringify(civils_array))
    }
    else{
    getData();
    element = civils_array.find(element => element.ID === req.params.id);
    if(element == null){
        res.sendStatus(404)
    }
    res.send(element);
    }

});
app.post('/add/',limiter_post,(req,res) => {
    temp_civil = new Civil(
        req.body.FirstName,
        req.body.LastName,
        req.body.ID,
        req.body.Age,
        req.body.Mobile,
    )
    var user_exist = 0;
    new_civil = JSON.parse(fs.readFileSync('data.txt', 'utf8'))
    for(var i=0;i<new_civil.length;i++){
        if(new_civil[i].ID === req.body.ID){
            user_exist = 1;
            break;
        }
    }
    if(!user_exist){
        if (req.body.FirstName == null || req.body.FirstName == ""){
            res.status(400)
            res.send('Missing First Name')
        }
        else if (req.body.LastName == null || req.body.LastName == ""){
            res.status(400)
            res.send('Missing Last Name')
        }
        else if (req.body.ID == null || req.body.ID == ""){
            res.status(400)
            res.send('Missing ID')
        }
        else if (req.body.Age == null || req.body.Age == ""){
            res.status(400)
            res.send('Missing Age')
        }
        else if (req.body.Mobile == null || req.body.Mobile == ""){
            res.status(400)
            res.send('Missing Mobile')
        }
        else {
        new_civil.push(temp_civil);
        fs.writeFileSync('data.txt',JSON.stringify(new_civil));
        res.status(201)
        res.send(temp_civil);
        }
    }
    else{
       res.status(404)
       res.send('Civil Already Exists')
    }


});

app.put('/edit/',limiter_put,(req,res) => {
    temp_civil = new Civil(
        req.body.FirstName,
        req.body.LastName,
        req.body.ID,
        req.body.Age,
        req.body.Mobile,
    )
    var user_exist = 0;
    edit_civil = JSON.parse(fs.readFileSync('data.txt', 'utf8'))
    for(var i=0;i<edit_civil.length;i++){
        if(edit_civil[i].ID === req.body.ID){
            edit_civil[i] = temp_civil;
            user_exist = 1;
            break;
        }
    }
    if(user_exist){
        if (req.body.FirstName == null || req.body.FirstName == ""){
            res.status(400)
            res.send('Missing First Name')
        }
        else if (req.body.LastName == null || req.body.LastName == ""){
            res.status(400)
            res.send('Missing Last Name')
        }
        else if (req.body.ID == null || req.body.ID == ""){
            res.status(400)
            res.send('Missing ID')
        }
        else if (req.body.Age == null || req.body.Age == ""){
            res.status(400)
            res.send('Missing Age')
        }
        else if (req.body.Mobile == null || req.body.Mobile == ""){
            res.status(400)
            res.send('Missing Mobile')
        }
        else {
        fs.writeFileSync('data.txt',JSON.stringify(edit_civil));
        res.send(edit_civil);
        }
    }
    else{
       res.send('Civil Does Not Exist')
    }
});
app.delete('/delete/:id',limiter_delete,(req,res) => {
    getData();
    element = civils_array.find(element => element.ID === req.params.id);
    if(element == null){
        res.sendStatus(404)
    }
    else{
        element = civils_array.find( (element) => element.ID === req.params.id);
        civils_array.splice(civils_array.indexOf(element),1);
        fs.writeFileSync('data.txt',JSON.stringify(civils_array));
        res.status(204)
        res.send('Civil has been deleted')
}
});

app.get('/getAll', (req,res) => {
    getData();
    res.send(JSON.stringify(civils_array))
})
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
