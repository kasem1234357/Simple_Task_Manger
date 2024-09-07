//====================================================//
//==========core packeges ============================//
const express = require('express')
const cors = require('cors');
//====================================================//
//=========== Routes =================================//

const tasksRoute = require("./routes/tasks");

//===================================================//
//============== meddlewares ========================//

//===================================================//
//============== other =============================//

const corsOptions = require('./config/corsConfig');


//=================================================//
//=============== app logic ======================//

const app = express()
app.use(express.json());
app.use(cors(corsOptions))

//    ROUTES    //
app.use("/api/tasks", tasksRoute);
//==============//
// handling routes not found error
app.all('*',(req,res,next)=>{
    const err = new CustomError(`Can't find ${req.originalUrl} on the server!`, 404);
    next(err)
})
// handling all types of mongoDb error and api error


module.exports = app;