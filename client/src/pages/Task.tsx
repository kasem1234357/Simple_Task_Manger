import { Suspense,  useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Add, Close } from "../components/icons/SvgIcons";
import axiosConfig from "../configs/axiosConfig";
import { config_scale } from "../configs/motionConfig";
import { DEFAULT_DATA, TaskType, TaskData } from "../configs/CONSTANTS";
import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import TagBox from "../components/Boxes/tagBox/TagBox";
import SingleTaskBox from "../components/Boxes/singleTaskBox/SingleTaskBox";
function Task() {
  const navigate = useNavigate();
  const location = useLocation();
  const { dataInfo, type: initialType } = location.state || {};
  const [type, setType] = useState<string>(initialType);
  const [cacheData, setCacheData] = useState<TaskData>(
    dataInfo || { ...DEFAULT_DATA, state: location?.state?.state }
  );
  const [isEditable, setIsEditable] = useState<Boolean>(true);
  const [tasks, setTasks] = useState<TaskType[]>(cacheData.tasks || []);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const updateTaskState = (i: number, state: boolean) => {
    setCacheData((prev) => {
      const updatedTasks = [...prev.tasks];
      updatedTasks[i].complicated = !state;
      const progress = state ? prev.progress - 1 : prev.progress + 1;
      return { ...prev, tasks: updatedTasks, progress };
    });
  };
  const addTask = () => {
    if (isEditable) {
      const newTask: TaskType = { text: "", complicated: false };
      setTasks((current) => [...current, newTask]);
      setCacheData((prev) => ({ ...prev, tasks: [...prev.tasks, newTask] }));
    }
  };
  const handleDescInput = () => {
    const text = descRef.current?.innerText.split("\n") || [""];
    setCacheData((current) => ({ ...current, desc: text }));
  };
  const deleteTask = async () => {
    try {
      await axiosConfig.delete(`/api/tasks/${cacheData.id}`);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  const saveTask = async () => {
    console.log("done");
    const progressRatio = cacheData.progress / tasks.length;
    const state =
      progressRatio === 1
        ? "done"
        : progressRatio > 0
        ? "in progress"
        : "To do";
    setCacheData((prev) => ({ ...prev, state }));
    try {
      if (type === "New") {
        const response = await axiosConfig.post(`/api/tasks/`, cacheData);
        console.log("test");
        setCacheData(response.data.data);
        setType("update");
      } else {
        await axiosConfig.put(
          `/api/tasks/update/${cacheData.id || dataInfo.id}`,
          cacheData
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    try {
      console.log(type);
      if (type !== "New") {
        saveTask();
      }
    } catch (error) {
      console.log(error);
    }
  }, [
    cacheData.state,
    cacheData.progress,
    cacheData.tasks,
    cacheData.tag,
    type,
    tasks,
  ]);

  useEffect(() => {
    if (cacheData) {
      cacheData.state === "done" && setIsEditable(false);
    }
  }, []);
  return (
    <Suspense
      fallback={
        <Box className="loading_auth">
          <span className="loader_auth"></span>
        </Box>
      }
    >
      <motion.div
        {...config_scale}
        style={{ padding: "20px", background: "#1a202c", borderRadius: "8px" }}
      >
        <Flex
          justifyContent="space-between"
          alignItems="center"
          pb={4}
          mb={2}
          borderBottom="5px solid #3a445ed7"
        >
          <Flex gap={3}>
            <Select
              bg="#171C30"
              color="white"
              value={cacheData.state}
              onChange={(e) =>
                isEditable &&
                setCacheData((prev) => ({ ...prev, state: e.target.value }))
              }
            >
              {["To do", "in progress"].map((state) => (
                <option
                  key={state}
                  value={state}
                  style={{ backgroundColor: "#171C30" }}
                >
                  {state}
                </option>
              ))}
            </Select>
            <Select
              bg="#171C30"
              color="white"
              value={cacheData.priority}
              onChange={(e) =>
                isEditable &&
                setCacheData((prev) => ({ ...prev, priority: e.target.value }))
              }
            >
              {["High", "Medium", "Low"].map((state) => (
                <option
                  key={state}
                  value={state}
                  style={{ backgroundColor: "#171C30" }}
                >
                  {state}
                </option>
              ))}
            </Select>
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              bg={cacheData.tagColor}
              p={1}
              borderRadius="md"
              color="white"
            >
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

        <Input
          variant="unstyled"
          fontSize="3xl"
          ref={titleRef}
          readOnly={!isEditable}
          defaultValue={cacheData.title}
          onInput={(e) =>
            setCacheData((prev) => ({
              ...prev,
              title: (e.target as HTMLInputElement).value,
            }))
          }
          color="white"
          mb={4}
        />
        <Text
          as="div"
          contentEditable={!isEditable}
          ref={descRef}
          onInput={handleDescInput}
          suppressContentEditableWarning
          fontSize="md"
          color="gray.400"
          mb={4}
        >
          {cacheData.desc?.join("\n") || "unknown"}
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
          <TagBox
            cacheData={cacheData}
            setCacheData={setCacheData}
            isEditable={isEditable}
          />
          <Button colorScheme="red" onClick={deleteTask}>
            Delete
          </Button>
        </Flex>
      </motion.div>
    </Suspense>
  );
}

export default Task;
