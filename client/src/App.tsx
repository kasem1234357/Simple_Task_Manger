
import Feed from './components/layout/Feed/Feed'
import Navbar from './components/layout/Navbar/Navbar'
import { Box } from '@chakra-ui/react'

function App() {

  return (
    <>
     <Box backgroundColor={"#171C30"} color={"#d7d7d7"} display={"flex"} > 
          <Navbar/>
          <Feed/>
        
    </Box>
    </>
  )
}

export default App
