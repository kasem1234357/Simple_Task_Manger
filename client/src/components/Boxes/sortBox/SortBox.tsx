
function SortBox({setSortMethod,methods}) {
  return (
    <div className='sortBox'>
      <h3> SortBox</h3>
      <select name="" id="" onChange={(e)=>setSortMethod(e.target.value)}>
      <option value="">regular</option>
        {methods.map(method =>(
           <option value={method}>{method}</option>
           
        ))}
        
      </select>
      </div>
  )
}

export default SortBox