
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import {BrowserRouter as Router,} from 
'react-router-dom'
createRoot(document.getElementById('root')!).render(
  <Router>
  <ChakraProvider>
       <App />
  </ChakraProvider>
  </Router>
    
  )
