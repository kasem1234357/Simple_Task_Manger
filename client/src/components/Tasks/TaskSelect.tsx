import { Select } from "@chakra-ui/react";
type props = {
    label:string,
     value:string,
      onChange:(value: any)=>void,
       options:string[]
}
function TaskSelect(props:props) {
    const { label, value, onChange, options }=props
    return (
      <Select bg="#171C30" color="white" value={value} onChange={(e) => onChange(e.target.value)}>g
        {options.map((option) => (
          <option key={option} value={option} style={{ backgroundColor: "#171C30" }}>
            {option}
          </option>
        ))}
      </Select>
    );
  }
  export default TaskSelect