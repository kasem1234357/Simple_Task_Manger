import React, {
  Suspense,
  useLayoutEffect,
  useState,
  useEffect,
  useRef,
} from "react";
import { useNavigate } from "react-router-dom";
import { Add, Board } from "../components/icons/SvgIcons";
import TaskCard from "../components/Tasks/TaskCard";
import "./tasks.css";
import axiosConfig from "../configs/axiosConfig";
import { motion } from "framer-motion";
import { config_animateY } from "../configs/motionConfig";
import FilterBox from "../components/Boxes/filtrerBox/FilterBox";
import SortBox from "../components/Boxes/sortBox/SortBox";
import {
  Box,
  Flex,
  Grid,
  
  List,
  ListItem,
} from "@chakra-ui/react";
import { sortFn } from "../utils/sortFn";
import useOutsideClick from "../hooks/useOutsideClick";
import { TaskProp } from "../types/types";

const currentDate = new Date().toLocaleDateString("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

function Tasks() {
  const navigate = useNavigate();
  const [tasksData, setTasksData] = useState<TaskProp[]>([]);
  const [filterData, setFilterData] = useState<TaskProp[]>([]);
  const [viewType, setViewType] = useState<string>("board");
  const [sortMethod, setSortMethod] = useState<string>("");
  const [filterModel, setFilterModel] = useState<boolean>(false);
  const [sortModel, setSortModel] = useState<boolean>(false);
  const [draggableEl, setDraggableEl] = useState<{
    id: string;
    number: number;
  } | null>(null);
  const [dropType, setDropType] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const filterBoxRef = useRef<HTMLLIElement | null>(null);
  const sortBoxRef = useRef<HTMLLIElement | null>(null);

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosConfig.get("/api/tasks");
        setTasksData(data.data);
      } catch (err) {
        console.error(err);
        setError(true);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setFilterData(tasksData);
  }, [tasksData, sortMethod]);

  const filter = (method: keyof TaskProp, filterText: string) => {
    const filtered = tasksData.filter((task) =>
      task[method].includes(filterText)
    );
    setFilterData(filtered);
  };

  const dropEvent = () => {
    if (!draggableEl) return;

    setFilterData((prev) => {
      const updatedTasks = [...prev];
      updatedTasks[draggableEl.number].state = dropType;
      return updatedTasks;
    });

    axiosConfig
      .put(`api/tasks/update/${draggableEl.id}`, {
        ...filterData[draggableEl.number],
        state: dropType,
      })
      .then(() => navigate("/"))
      .catch((error) => console.error(error));
  };

  const handleAddNewTask = (state: string) => {
    navigate(`task/${tasksData.length + 1}`, {
      state: { dataInfo: null, type: "New", state },
    });
  };

  const renderTaskColumn = (title: string, state: string) => {
    const filteredTasks = filterData
      .sort((a, b) => sortFn(a, b, sortMethod))
      .filter((task) => task.state === state);

    return (
      <div className="boardBox">
        <div className="boardBox__header flex">
          <h4>
            {title} <span>({filteredTasks.length})</span>
          </h4>
          <div className="flex" onClick={() => handleAddNewTask(state)}>
            <Add width="25px" color="#3a445e" /> <span>Add new task</span>
          </div>
        </div>
        <div className="boardBox__main">
          <div className={`${viewType}-view`}>
            <div className="boardBox__box flex">
              {filteredTasks.map((task, index) => (
                <TaskCard
                  key={task.id}
                  taskId={task.id}
                  {...task}
                  number={index + 1}
                  setDraggableEl={setDraggableEl}
                  dropEvent={dropEvent}
                  setDropType={setDropType}
                />
              ))}
            </div>
            <div className="dragArea" onDragOver={() => setDropType(state)}>
              Drag your task here
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (error) return <h2>Something went wrong</h2>;

  useOutsideClick(filterBoxRef, () => setFilterModel(false));
  useOutsideClick(sortBoxRef, () => setSortModel(false));

  return (
    <Suspense
      fallback={
        <div className="loading_auth">
          <span className="loader_auth"></span>
        </div>
      }
    >
      <motion.div {...config_animateY} className="Task">
        <Flex
          w="100%"
          pb="30px"
          justifyContent="space-between"
          alignItems="center"
          color={"#d7d7d7"}
        >
          <h3>Welcome Back 🖐</h3>
          <Box>
            <span>{currentDate}</span>
          </Box>
        </Flex>
        <Grid gridTemplateRows={"auto 1fr"} h="100%">
          <Flex
            justifyContent={"space-between"}
            w={"100%"}
            borderBottom={"2px solid var(--item__bg2)"}
            alignItems={"center"}
          >
            <Box>
              <List display={"flex"} listStyleType={"none"}>
                {["board", "list"].map((type) => (
                  <ListItem
                    display={"flex"}
                    padding={"10px 15px 10px 15px"}
                    position={"relative"}
                    key={type}
                    className={viewType === type ? "active" : ""}
                    onClick={() => setViewType(type)}
                    style={{ cursor: "pointer" }}
                  >
                    <Board width="25px" />{" "}
                    {type.charAt(0).toUpperCase() + type.slice(1)} View
                  </ListItem>
                ))}
                <ListItem
                  display={"flex"}
                  padding={"10px 15px 10px 15px"}
                  position={"relative"}
                  ref={filterBoxRef}
                  cursor={'pointer'}
                >
                  {filterModel && (
                    <FilterBox
                      filter={filter}
                      methods={["title", "tag", "priority"]}
                    />
                  )}
                  <span
                    onClick={() => {
                      setSortModel(false);
                      setFilterModel(!filterModel);
                    }}
                  >
                    Filter
                  </span>
                </ListItem>
                <ListItem
                  display={"flex"}
                  cursor={'pointer'}
                  padding={"10px 15px 10px 15px"}
                  position={"relative"}
                  ref={sortBoxRef}
                >
                  {sortModel && (
                    <SortBox
                      setSortMethod={setSortMethod}
                      methods={["title", "tag", "priority"]}
                    />
                  )}
                  <span
                    onClick={() => {
                      setFilterModel(false);
                      setSortModel(!sortModel);
                    }}
                  >
                    Sort
                  </span>
                </ListItem>
              </List>
            </Box>
          </Flex>
          <div className={`task__mainBox__Board ${viewType}-view flex`}>
            {renderTaskColumn("To do", "To do")}
            {renderTaskColumn("In progress", "in progress")}
            {renderTaskColumn("Done", "done")}
          </div>
        </Grid>
      </motion.div>
    </Suspense>
  );
}

export default Tasks;
