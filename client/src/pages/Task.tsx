import { Suspense, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {  useLocation, useNavigate } from "react-router-dom";

import axiosConfig from "../configs/axiosConfig";
import { config_scale } from "../configs/motionConfig";
import { DEFAULT_DATA } from "../configs/CONSTANTS";
import {Box} from "@chakra-ui/react";

import Header from "../components/Tasks/Header";
import TaskContent from "../components/Tasks/TaskContent";
import { TaskData, TaskType } from "../types/types";

function Task() {
  const navigate = useNavigate();
  const location = useLocation();
  const { dataInfo, type: initialType } = location.state || {};
  
  const [type, setType] = useState<string>(initialType);
  const [cacheData, setCacheData] = useState<TaskData>(dataInfo || { ...DEFAULT_DATA, state: location?.state?.state });
  const [isEditable, setIsEditable] = useState<boolean>(true);
  const [tasks, setTasks] = useState<TaskType[]>(cacheData.tasks || []);
  const descRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (cacheData.state === "done") {
      setIsEditable(false);
    }
  }, [cacheData]);

  useEffect(() => {
    if (type !== "New") {
      saveTask();
    }
  }, [cacheData.state, cacheData.progress, cacheData.tasks, cacheData.tag, type, tasks]);

  const updateTaskState = (index: number, state: boolean) => {
    setCacheData((prev) => {
      const updatedTasks = [...prev.tasks];
      updatedTasks[index].complicated = !state;
      const progress = state ? prev.progress - 1 : prev.progress + 1;
      return { ...prev, tasks: updatedTasks, progress };
    });
  };

  const addTask = () => {
    if (!isEditable) return;
    const newTask: TaskType = { text: "", complicated: false };
    setTasks((current) => [...current, newTask]);
    setCacheData((prev) => ({ ...prev, tasks: [...prev.tasks, newTask] }));
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
      console.error("Error deleting task:", error);
    }
  };

  const saveTask = async () => {
    const progressRatio = cacheData.progress / tasks.length;
    const state = progressRatio === 1 ? "done" : progressRatio > 0 ? "in progress" : "To do";
    setCacheData((prev) => ({ ...prev, state }));

    try {
      if (type === "New") {
        const response = await axiosConfig.post(`/api/tasks/`, cacheData);
        setCacheData(response.data.data);
        setType("update");
      } else {
        await axiosConfig.put(`/api/tasks/update/${cacheData.id || dataInfo.id}`, cacheData);
      }
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  return (
    <Suspense
      fallback={
        <Box className="loading_auth">
          <span className="loader_auth"></span>
        </Box>
      }
    >
      <motion.div {...config_scale} style={{ padding: "20px", background: "#1a202c", borderRadius: "8px" }}>
        <Header
          isEditable={isEditable}
          cacheData={cacheData}
          setCacheData={setCacheData}
          saveTask={saveTask}
        />
        <TaskContent
          isEditable={isEditable}
          cacheData={cacheData}
          setCacheData={setCacheData}
          addTask={addTask}
          handleDescInput={handleDescInput}
          tasks={tasks}
          descRef={descRef}
          updateTaskState={updateTaskState}
          deleteTask={deleteTask}
        />
      </motion.div>
    </Suspense>
  );
}





export default Task;
