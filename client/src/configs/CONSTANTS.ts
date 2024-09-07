import { TaskData } from "../types/types";

  
  export const DEFAULT_DATA: TaskData = {
    title: "",
    state: "",
    tasks: [],
    progress: 0,
    desc:[''] ,
    tag: "general",
    progressColor: "#00d4fa",
    tagColor: "#d9234b",
    priority:"Medium"
  };
 export const COLORS = ["#d9234b", "#9c6644", "#8338ec", "#3a5a40", "#277da1"];