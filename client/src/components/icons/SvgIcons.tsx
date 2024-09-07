export const Delete = (props) =>{
  const {color,...otherProps} = props
 return (
 <svg {...otherProps} color={color} viewBox="0 0 32 32" enableBackground="new 0 0 32 32" id="Stock_cut" version="1.1" xmlns="http://www.w3.org/2000/svg" >
  <desc/>
  <g>
   <g>
    <line fill="none" stroke={'inherit'} strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" x1="16" x2="16" y1="0" y2="6"/><line fill="none" stroke={'inherit'} strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" x1="16" x2="16" y1="8" y2="10"/><line fill="none" stroke={'inherit'} strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" x1="12" x2="12" y1="8" y2="2"/><line fill="none" stroke={'inherit'} strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" x1="20" x2="20" y1="8" y2="2"/></g><polygon fill="none" points="25,13 7,13 9,31    23,31  " stroke={color} strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"/><line fill="none" stroke={color} strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" x1="4" x2="28" y1="13" y2="13"/><line fill="none" stroke={color} strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" x1="13" x2="13" y1="31" y2="16"/><line fill="none" stroke={color} strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" x1="19" x2="19" y1="31" y2="16"/></g></svg>)
}
export const Add = (props)=>{
  const {color,viewBox,...otherProps}=props
  return (
  <svg {...otherProps} xmlns="http://www.w3.org/2000/svg" viewBox={viewBox ||"0 0 28 28"}><g fill={color || ''}><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm4 10h-3v3.13c0 .48-.39.88-.88.88h-.25c-.48-.01-.87-.4-.87-.88V13H8c-.55 0-1-.45-1-1s.45-1 1-1h3V7.88c0-.49.39-.88.88-.88h.25c.48 0 .87.39.87.88V11h3c.55 0 1 .45 1 1s-.45 1-1 1z"></path></g></svg>
  )
  
}
export const Board = (props)=>{
  /*
   {
    color:'red,
    
   } 
   color = red
  otherProps = {
   width :24px,
    height:20px
   
  }
  {...otherProps}

  */
  const {color,...otherProps}=props
  return (
    <svg  viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg"><path fill={color || ''} d="M10 7h4v4h-4zm6 0h4v4h-4zM4 7h4v4H4zm6 6h4v4h-4zm6 0h4v4h-4zM4 13h4v4H4z"/></svg>
  )
}
export const Bulb = (props)=>{
  const {color,...otherProps}=props
  return(
    <svg {...otherProps} xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 512 512"><path d="M304 384v-24c0-29 31.54-56.43 52-76 28.84-27.57 44-64.61 44-108 0-80-63.73-144-144-144a143.6 143.6 0 00-144 144c0 41.84 15.81 81.39 44 108 20.35 19.21 52 46.7 52 76v24M224 480h64M208 432h96M256 384V256" fill={color || "none"} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/><path d="M294 240s-21.51 16-38 16-38-16-38-16" fill={color ||'none'} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/></svg>
  )
}
export const Sort = (props)=>{
  const {color,...otherProps}=props
  return (
  <svg {...otherProps} fill={color || 'none'} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	 viewBox="0 0 512 512" style={{enableBackground:"new 0 0 512 512;"}} >
<g>
	<g>
		<path d="M166.724,361.898V223.265l25.164,25.164l58.915-58.916L125.402,64.112L0,189.514l58.916,58.915l25.164-25.164v221.277
			h177.626v-82.645H166.724z M245.547,428.384H100.238V184.256l-41.322,41.322l-36.064-36.064L125.402,86.963l102.551,102.551
			l-36.064,36.064l-41.322-41.322v193.8h94.981V428.384z"/>
	</g>
</g>
<g>
	<g>
		
			<rect x="39.415" y="145.815" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -82.5219 108.5625)" width="100.741" height="16.158"/>
	</g>
</g>
<g>
	<g>
		<path d="M453.084,263.571l-25.164,25.164V67.458H250.295v82.645h94.981v138.632l-25.164-25.164l-58.916,58.916l125.402,125.402
			L512,322.486L453.084,263.571z M284.048,322.486l36.064-36.065l41.322,41.322V133.944h-94.981V83.616h145.309v244.128
			l41.322-41.322l36.064,36.064L386.598,425.038L284.048,322.486z"/>
	</g>
</g>
<g>
	<g>
		
			<rect x="371.844" y="350.021" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -129.5516 403.4356)" width="100.741" height="16.158"/>
	</g>
  </g>
</svg>
  )
}
export const AddProductIcon =(props)=>{
  const {color,...otherProps}=props
  return(
    <svg {...otherProps} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
	 viewBox="0 0 185 185"  >
<path fill={color || ''} d="M15,60.46H0V0h60.46v15H15V60.46z M170,170h-45.46v15H185v-60.46h-15V170z M124.54,15H170v45.46h15V0h-60.46V15z M15,124.54
	H0V185h60.46v-15H15V124.54z M138.906,85H100V46.093H85V85H46.094v15H85v38.907h15V100h38.906V85z"/>
</svg>
  )
}
export const Menu = (props)=>{
  const {color,...otherProps}=props
  return (
<svg {...otherProps} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill={color || ''}><circle cx="7" cy="7" r="4"></circle><circle cx="17" cy="7" r="4"></circle><circle cx="7" cy="17" r="4"></circle><circle cx="17" cy="17" r="4"></circle></g></svg>

  )
}
export const Close = (props)=>{
  const {color,...otherProps}=props
  return ( 
<svg {...otherProps} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill={color || ''}><path d="M19.5 4.5c-.8-.8-2.2-.8-3 0L12 9 7.5 4.5c-.8-.8-2.2-.8-3 0-.8.8-.8 2.2 0 3L9 12l-4.5 4.5c-.8.8-.8 2.2 0 3 .8.8 2.2.8 3 0L12 15l4.5 4.5c.8.8 2.2.8 3 0 .8-.8.8-2.2 0-3L15 12l4.5-4.5c.8-.8.8-2.2 0-3z"></path></g></svg>

  )
}
export const Drag =(props)=>{
  const {color,...otherProps}=props
  return (
    <svg {...otherProps} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill={color || ''}><path d="M22 8l-6-6c-.5.5-1 1-.5 2L8 9.5C7 9 6 9 5 10l4 4-5 5-2 3 3-2 5-5 4 4c1-1 1-2 .5-3L20 8.5c1 .5 1.5 0 2-.5z"></path></g></svg>

  )
}
