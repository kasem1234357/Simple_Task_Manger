import  { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import './feed.css'
import {Box} from '@chakra-ui/react'
import { routesSchema } from '../../../utils/routesGenerator.ts';
function Feed() {
 
  return (
    <Box p={2}  className='feed'>
    <Suspense fallback={<Box className="loading_auth"> <span className="loader_auth"></span> </Box>}>
    <Routes>
      {routesSchema("").map(route=>(
        <Route key={route.title} path={route.path} element={<route.element />}/>
      ))}
    </Routes>
    </Suspense>
      </Box>
    
  )
}

export default Feed