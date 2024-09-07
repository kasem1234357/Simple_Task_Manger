import { Button, Flex, Input, Text, VStack } from "@chakra-ui/react";
import { Add } from "../icons/SvgIcons";
import SingleTaskBox from "../Boxes/singleTaskBox/SingleTaskBox";
import TagBox from "../Boxes/tagBox/TagBox";
import { Dispatch, SetStateAction } from "react";
import { TaskData, TaskType } from "../../types/types";

type props = {
    isEditable:Boolean,
    cacheData:TaskData,
    setCacheData:Dispatch<SetStateAction<TaskData>>,
      addTask:()=>void,
       handleDescInput:()=>void,
        tasks:TaskType[], 
        updateTaskState:(index: number, state: boolean)=>void,
         deleteTask:()=>void,
         descRef:HTMLParagraphElement | null
}
function TaskContent(props:props) {
    const  { isEditable, cacheData, setCacheData, addTask, handleDescInput, tasks, updateTaskState, deleteTask,descRef }= props
    return (
      <>
        <Input
          variant="unstyled"
          fontSize="3xl"
          readOnly={!isEditable}
          defaultValue={cacheData.title}
          onInput={(e:any) =>
            setCacheData((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
          color="white"
          mb={4}
        />
        <Text
          as="div"
          contentEditable={isEditable}
          ref={descRef}
          onInput={handleDescInput}
          suppressContentEditableWarning
          fontSize="md"
          color="gray.400"
          mb={4}
        >
          {cacheData.desc?.join("\n") || ""}
        </Text>
        <VStack align="stretch" spacing={3}>
          <Button variant="link" color="white" onClick={addTask}>
            <Add width="30px" color="#d7d7d7" /> Add new Task
          </Button>
          {tasks.map((task, index) => (
            <SingleTaskBox
              key={index}
              cacheData={cacheData}
              index={index}
              isEditable={isEditable}
              setCacheData={setCacheData}
              task={task}
              updateTaskState={updateTaskState}
            />
          ))}
        </VStack>
        <Flex justifyContent="space-between" alignItems="center" mt={4}>
          <TagBox cacheData={cacheData} setCacheData={setCacheData} isEditable={isEditable} />
          <Button colorScheme="red" onClick={deleteTask}>
            Delete
          </Button>
        </Flex>
      </>
    );
  }
  export default TaskContent