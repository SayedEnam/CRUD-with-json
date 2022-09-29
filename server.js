const express = require('express')
const fs = require('fs')


const app = express();


app.use(express.json())



let rawdata = fs.readFileSync('data.json')
let jsondata = JSON.parse(rawdata);


// Random user from the JSON file
app.get('/user/random', (req, res)=>{
   const randomdata = jsondata[Math.floor(Math.random() * jsondata.length)];
   res.json(randomdata)
})

// Get a list random users
app.get('/user/all', (req, res)=>{
   res.json(jsondata)
})

// Get Limit User
app.get('/user/limit', (req, res)=>{
   const { limit, page } = req.query
   res.json(jsondata.slice(0, limit))
})

// Save a random user
app.post('/users', (req, res)=>{
   const userData = req.body;
    const dataInsert = jsondata.push(userData)
    const result = fs.writeFile("./data.json", JSON.stringify(jsondata), (err)=>{
      if(err){
         console.log(`${err.message}`)
      } else{
         res.send("Data Inserted") 
      }
    })
})

// Update User
 
app.patch('/user/:id', (req, res)=>{
   const { id } = req.params;
   const filter = {_id: id}
   const newData = jsondata.find(jsondata => jsondata.id === Number(id));
   newData.id = id;
   newData.name = req.body.name;
   res.send(newData)
})

// Delete User
 
app.patch('/user/:id', (req, res)=>{
   const { id } = req.params;
   const filter = {_id: id}
   const newData = jsondata.find(jsondata => jsondata.id === Number(id));
   newData.id = id;
   newData.name = req.body.name;

   res.send(newData)
})

app.delete('/user/:id', (req, res)=>{
   const { id } = req.params;
   const filter = {_id: id}
   const deleteData = jsondata.filter(jsondata=> jsondata.id !== Number(id));
   res.send(deleteData)
})

app.listen(process.env.PORT || 5000, ()=>{
   console.log('conection stablished')
})
   
