

import Tasks from "../pages/Tasks"
import Task from "../pages/Task"

const routes = [
    {
        path:'/',
        role:['all'],
        title:"Task",
        isMainPage:true,
        element:Tasks
    },
    {
        path:'/task/:taskId',
        role:['all'],
        title:"task item",
        isMainPage:false,
        element:Task
    },
 


]
export const routesSchema = (role:string)=>{
    if(role === 'super_admin') return routes
    const safeRoutes = routes.filter(route =>route.role.includes(role) || route.role.includes('all'))
    return safeRoutes
} 