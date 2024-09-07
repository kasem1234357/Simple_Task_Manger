
export const Add = (props:any)=>{
  const {color,viewBox,...otherProps}=props
  return (
  <svg {...otherProps} xmlns="http://www.w3.org/2000/svg" viewBox={viewBox ||"0 0 28 28"}><g fill={color || ''}><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm4 10h-3v3.13c0 .48-.39.88-.88.88h-.25c-.48-.01-.87-.4-.87-.88V13H8c-.55 0-1-.45-1-1s.45-1 1-1h3V7.88c0-.49.39-.88.88-.88h.25c.48 0 .87.39.87.88V11h3c.55 0 1 .45 1 1s-.45 1-1 1z"></path></g></svg>
  )
  
}
export const Board = (props:any)=>{
  const {color,...otherProps}=props
  return (
    <svg  viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg"><path fill={color || ''} d="M10 7h4v4h-4zm6 0h4v4h-4zM4 7h4v4H4zm6 6h4v4h-4zm6 0h4v4h-4zM4 13h4v4H4z"/></svg>
  )
}
export const Menu = (props:any)=>{
  const {color,...otherProps}=props
  return (
<svg {...otherProps} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill={color || ''}><circle cx="7" cy="7" r="4"></circle><circle cx="17" cy="7" r="4"></circle><circle cx="7" cy="17" r="4"></circle><circle cx="17" cy="17" r="4"></circle></g></svg>

  )
}
export const Close = (props:any)=>{
  const {color,...otherProps}=props
  return ( 
<svg {...otherProps} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill={color || ''}><path d="M19.5 4.5c-.8-.8-2.2-.8-3 0L12 9 7.5 4.5c-.8-.8-2.2-.8-3 0-.8.8-.8 2.2 0 3L9 12l-4.5 4.5c-.8.8-.8 2.2 0 3 .8.8 2.2.8 3 0L12 15l4.5 4.5c.8.8 2.2.8 3 0 .8-.8.8-2.2 0-3L15 12l4.5-4.5c.8-.8.8-2.2 0-3z"></path></g></svg>

  )
}
export const Drag =(props:any)=>{
  const {color,...otherProps}=props
  return (
    <svg {...otherProps} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill={color || ''}><path d="M22 8l-6-6c-.5.5-1 1-.5 2L8 9.5C7 9 6 9 5 10l4 4-5 5-2 3 3-2 5-5 4 4c1-1 1-2 .5-3L20 8.5c1 .5 1.5 0 2-.5z"></path></g></svg>

  )
}
