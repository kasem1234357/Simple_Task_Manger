const API = require('../classes/Api');
let tasks = []
const asyncErrorHandler = require('../wrapper_functions/asyncErrorHandler');
const getAllTasks =asyncErrorHandler(async(req,res,next)=>{
        const api = new API(req,res)
        api.dataHandler('fetch',tasks)

   })
const getTask = asyncErrorHandler(async(req,res,next)=>{
  const api = new API(req,res)
        const task = tasks.find(task => task.id === req.params.id)
        api.dataHandler('fetch',task)
   })
const updateTask = asyncErrorHandler(async(req,res,next)=>{
      const api = new API(req,res)
      const taskIndex = tasks.findIndex(task => task.id === req.params.id)     
      tasks[taskIndex]={...tasks[taskIndex],...req.body}
      api.dataHandler('update')   
   })
const createTask = asyncErrorHandler(async(req,res,next)=>{
  
  const api = new API(req,res)
  const token =  `${Date.now()}`
      const newTask ={...req.body,id:token}
     tasks.push(newTask)
     api.dataHandler('create',newTask)
   })
const deleteTask = asyncErrorHandler(async(req,res,next)=>{
    const api = new API(req,res)
     tasks = tasks.filter(task => task.id !== req.params.id)
      api.dataHandler('delete')
 })
module.exports = {
    getAllTasks,getTask,updateTask,deleteTask,createTask
}