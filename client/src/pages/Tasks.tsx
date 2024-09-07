import  { Suspense, useLayoutEffect, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Add, Board } from "../components/icons/SvgIcons";
import TaskCard from "../components/Tasks/TaskCard";
import "./tasks.css";
import axiosConfig from '../configs/axiosConfig';
import { motion } from "framer-motion";
import { config_animateY } from "../configs/motionConfig";
import FilterBox from "../components/Boxes/filtrerBox/FilterBox";
import SortBox from "../components/Boxes/sortBox/SortBox";
import {  Flex } from "@chakra-ui/react";
import { sortFn } from "../utils/sortFn";
import { TaskProp } from "../configs/CONSTANTS";
import useOutsideClick from "../hooks/useOutsideClick";
const currentDate = new Date().toLocaleDateString("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

function Tasks() {
  const navigate = useNavigate();
  const [tasksData, setTasks] = useState<TaskProp[]>([]);
  const [filterData, setFilterData] = useState<TaskProp[]>([]);
  const [viewType, setViewType] = useState<string>('board');

  const [error, setError] = useState<boolean>(false);
  const [sortMethod, setSortMethod] = useState<string>("");
  const [filterModel, setFilterModel] = useState<boolean>(false);
  const [sortModel, setSortModel] = useState<boolean>(false);
  const [draggableEl, setDraggableEl] = useState<{ id: string; number: number } | null>(null);
  const [dropType, setDropType] = useState<string>("");
  const filerBoxRef = useRef<HTMLLIElement | null>(null)
  const sortBoxRef = useRef<HTMLLIElement | null>(null)
  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosConfig.get('/api/tasks');
        setTasks(res.data.data);
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
    const data = tasksData.filter((task) => task[method].includes(filterText));
    setFilterData(data);
  };
  const dropEvent = () => {
    console.log('test')
    if (!draggableEl) return;
    setFilterData((prev) => {
      const updated = [...prev];
      updated[draggableEl.number].state = dropType;
      return updated;
    });
    try {
      axiosConfig.put(`api/tasks/update/${draggableEl.id}`, {
        ...filterData[draggableEl.number],
        state: dropType,
      }).then(() => navigate("/"));
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddNewTask = (state: string) => {
    navigate(`task/${tasksData.length + 1}`, {
      state: { dataInfo: null, type: "New", state },
    });
  };

  const renderTaskColumn = (title: string, state: string) => {
    const filteredTasks = filterData
      .sort((a,b)=>sortFn(a,b,sortMethod))
      .filter((task) => task.state === state);

    return (
      <div className="boardBox">
        <div className="boardBox__header flex">
          <h4>
            {title} <span>({filteredTasks.length})</span>
          </h4>
          <div className="flex" onClick={() => handleAddNewTask(state)}>
            <Add width="25px" color={"#3a445e"} /> <span>Add new task</span>
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
            <div
              className="dragArea"
              onDragOver={() => setDropType(state)}
            >
              drag your task here
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (error) return <h2>Something went wrong</h2>;
  useOutsideClick(filerBoxRef,()=>setFilterModel(false))
  useOutsideClick(sortBoxRef,()=>setSortModel(false))
  return (
    <Suspense fallback={<div className="loading_auth"><span className="loader_auth"></span></div>}>
      <motion.div {...config_animateY} className="Task">
        <Flex w={"100%"} pb={"30px"} justifyContent="space-between" alignItems={'center'} className="task__navbar">
          <h3>Welcome Back 🖐</h3>
          <div className="task__navbar__content">
            <span>{currentDate}</span>
          </div>
        </Flex>
        <div className="task__mainBox">
          <div className="task__mainBox__controls flex">
            <div className="view--controls primary--dark--text">
              <ul>
                {['board', 'list'].map((type) => (
                  <li
                    key={type}
                    className={viewType === type ? 'active' : ''}
                    onClick={() => setViewType(type)}
                    style={{ cursor: 'pointer' }}
                  >
                    <Board width="25px" /> {type.charAt(0).toUpperCase() + type.slice(1)} View
                  </li>
                  
 
                ))}
                 <li ref={filerBoxRef}>
                  {filterModel && (
                    <FilterBox filter={filter} methods={["title", "tag","priority"]} />
                  )}

                  <span
                    onClick={() => {
                      setSortModel(false);
                      setFilterModel(!filterModel);
                    }}
                  >
                    Filter
                  </span>
                </li>
                <li ref={sortBoxRef}>
                  {sortModel && (
                    <SortBox
                      setSortMethod={setSortMethod}
                      methods={["title", "tag",'priority']}
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
                </li>
                
              </ul>
            </div>
            <div className="view--settings primary--dark--text">
              <ul>
                <li className="colored--btn">New Template</li>
              </ul>
            </div>
          </div>
          <div className={`task__mainBox__Board ${viewType}-view flex`}>
            {renderTaskColumn("To do", "To do")}
            {renderTaskColumn("In progress", "in progress")}
            {renderTaskColumn("Done", "done")}
          </div>
        </div>
      </motion.div>
    </Suspense>
  );
}

export default Tasks;
