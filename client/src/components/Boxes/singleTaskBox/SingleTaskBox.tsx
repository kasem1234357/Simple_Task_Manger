import { Checkbox, Flex, Input } from "@chakra-ui/react";
import { TaskData, TaskType } from "../../../configs/CONSTANTS";
import { Dispatch, SetStateAction } from "react";
type props = {
    task:TaskType,
    isEditable:Boolean,
    updateTaskState:(i: number, state: boolean) =>void,
    index:number,
    cacheData:TaskData,
    setCacheData:Dispatch<SetStateAction<TaskData>>,
}
function SingleTaskBox(props:props) {
    const {cacheData,task,isEditable,updateTaskState,index,setCacheData} = props
  return (
    <Flex
    alignItems="center"
    p={3}
    bg="rgba(58, 68, 94, 0.6)"
    borderRadius="md"
    borderLeftWidth="5px"
    borderLeftColor={cacheData.progressColor}
  >
    <Checkbox
      isChecked={task.complicated}
      isReadOnly={!isEditable}
      onChange={() => updateTaskState(index, task.complicated)}
      mr={3}
    />
    <Input
      variant="unstyled"
      flex="1"
      defaultValue={task.text}
      isReadOnly={!isEditable}
      onChange={(e) =>
        setCacheData((prev) => {
          const updatedTasks = [...prev.tasks];
          updatedTasks[index].text = e.target.value;
          return { ...prev, tasks: updatedTasks };
        })
      }
    />
  </Flex>
  )
}

export default SingleTaskBox