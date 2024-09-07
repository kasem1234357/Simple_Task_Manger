import  { useState } from 'react'
import './navbar.css'
import Logo from './logo2.jpg'
import {  NavLink } from 'react-router-dom'
import {  Menu, } from '../../icons/SvgIcons'
import { routesSchema } from '../../../utils/routesGenerator'
import { Box } from '@chakra-ui/react'
function Navbar() {
  const [close,setClose]=useState<Boolean>(false)
  
  return (
    <Box backgroundColor={"#262c46"} color={"#d7d7d7"} className={`navbar ${close?'hide--navbar':''}`}>
      <svg onClick={()=>setClose(true)} className='close--navbar--icon' width={'20px'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill='#d7d7d7'><path d="M12.4 18.2c0-.4-.1-.7-.4-.9L7.4 13c-.5-.5-.5-1.4 0-1.9L12 6.8c.3-.2.4-.6.4-.9 0-1.1-1.3-1.7-2.1-.9l-6.8 6.2c-.6.5-.6 1.4 0 1.9l6.8 6.2c.8.5 2.1-.1 2.1-1.1zM20.4 18.2c0-.4-.1-.7-.4-.9L15.4 13c-.5-.5-.5-1.4 0-1.9L20 6.8c.3-.2.4-.6.4-.9 0-1.1-1.3-1.7-2.1-.9l-6.8 6.2c-.6.5-.6 1.4 0 1.9l6.8 6.2c.8.5 2.1-.1 2.1-1.1z"></path></g></svg>
      <Menu width={'20px'} color={'#fff'} className='menu--navbar' onClick={()=>setClose(false)}/>
      <h2>Task manger</h2>
      <div className="navbar__image">
        <img src={Logo} alt="" srcSet="" />
        <h4>Mr. Kasem Alolo</h4>
      </div>
      <div className="navbar__list">
        <ul>
          {
            routesSchema("").map(route =>{
              if(route.isMainPage){
                   return  <NavLink key={route.title} className={({isActive})=>isActive ? 'list--active' : undefined} to={route.path}><span >{route.title}</span></NavLink>
              }
            })
          }
        </ul>
      </div>
      </Box>
  )
}

export default Navbar