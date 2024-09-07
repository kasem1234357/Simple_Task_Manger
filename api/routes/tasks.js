const { getTask, getAllTasks, createTask, deleteTask, updateTask } = require("../controller/Tasks");

const router = require("express").Router();


// get all tasks
router.get('/',getAllTasks )
// get single tasks 
router.get('/:id',getTask)

// add task
router.post('/',createTask )

// delete task 
router.delete('/:id',deleteTask)
// update tasks 
router.put('/update/:id',updateTask)
//







module.exports =router