import { Button, Flex } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { Close } from "../icons/SvgIcons";
import TaskSelect from "./TaskSelect";
import { Dispatch, SetStateAction } from "react";
import { TaskData } from "../../types/types";

type props ={
    isEditable:Boolean,
    cacheData:TaskData,
    setCacheData:Dispatch<SetStateAction<TaskData>>,
       saveTask:()=>void
}
function Header(props:props) {
    const { isEditable, cacheData, setCacheData, saveTask }=props 
    return (
      <Flex justifyContent="space-between" alignItems="center" pb={4} mb={2} borderBottom="5px solid #3a445ed7">
        <Flex gap={3}>
          <TaskSelect
            label="State"
            value={cacheData.state}
            onChange={(value: any) => isEditable && setCacheData((prev: any) => ({ ...prev, state: value }))}
            options={["To do", "in progress"]}
          />
          <TaskSelect
            label="Priority"
            value={cacheData.priority}
            onChange={(value: any) => isEditable && setCacheData((prev: any) => ({ ...prev, priority: value }))}
            options={["High", "Medium", "Low"]}
          />
          <Flex justifyContent="center" alignItems="center" bg={cacheData.tagColor} p={1} borderRadius="md" color="white">
            {cacheData.tag}
          </Flex>
        </Flex>
        <Flex gap={3}>
          <Button colorScheme="blue" onClick={saveTask}>
            Save
          </Button>
          <NavLink to="/" className="task--close">
            <Close width="25px" color="#d7d7d7" />
          </NavLink>
        </Flex>
      </Flex>
    );
  }
  export default Header