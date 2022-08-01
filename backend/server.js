require('dotenv').config()

const express= require('express')
const mongoose= require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

//start up the express app
const app = express()

//middleware
app.use(express.json())

app.use((req, res, next) =>{
	console.log(req.path, req.method)
	next() 
})

//react to request using route handler
app.use('/api/workouts',workoutRoutes)
app.use('/api/user', userRoutes)

//connect to db
mongoose.connect(process.env.MONG_URI)
.then( ()=>{
	//listen for request
	app.listen(process.env.PORT, () => {
	console.log("connected to db & listening on PORT 4000")
}) 
}).catch((error) => {
	console.log(error)
})

