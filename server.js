//ask loen about this
const { ObjectId } = require('mongodb')

require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient


let db, collection;

const url = process.env.MONGO_URL;
const dbName = "workoutlog";

app.listen(3001, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('workouts').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {workouts: result})
  })
})

app.post('/workouts', (req, res) => {
  db.collection('workouts').insertOne({date: new Date().toLocaleDateString(), workout: req.body.workout, 
    pounds: req.body.pounds,
    sets: req.body.sets, reps:req.body.reps }, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

// app.put('/messages', (req, res) => {
//   db.collection('messages')
//   .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
//     $set: {
//       thumbUp:req.body.thumbUp + 1
//     }
//   }, {
//     sort: {_id: -1},
//     upsert: true
//   }, (err, result) => {
//     if (err) return res.send(err)
//     res.send(result)
//   })
// })

// app.put('/down', (req, res) => {
//   db.collection('messages')
//   .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
//     $set: {
//       thumbDown:req.body.thumbDown + 1
//     }
//   }, {
//     sort: {_id: -1},
//     upsert: true
//   }, (err, result) => {
//     if (err) return res.send(err)
//     res.send(result)
//   })
// })


app.put('/sets', (req, res) => {
  db.collection('workouts')
  .findOneAndUpdate({_id: ObjectId(req.body.id)}, {
    $set: {
      sets: (Number(req.body.sets) + req.body.change).toString()
    }
  }, {
    sort: {_id: -1},
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

// app.put('/reps', (req, res) => {
//   db.collection('workouts')
//   .findOneAndUpdate({workout: req.body.workout, sets: req.body.sets, reps: req.body.reps}, {
//     $set: {
//       reps: (Number(req.body.reps) + req.body.change).toString()
//     }
//   }, {
//     sort: {_id: -1},
//   }, (err, result) => {
//     if (err) return res.send(err)
//     res.send(result)
//   })
// })



app.delete('/delete', (req, res) => {
  console.log(req.body)
  db.collection('workouts').findOneAndDelete({_id: ObjectId(req.body.id)}
  , (err, result) => {
    if (err) return res.send(500, err)
    res.send('Workout deleted!')
  })
})
