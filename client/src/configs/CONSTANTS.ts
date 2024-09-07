export interface TaskType {
    text: string;
    complicated: boolean;
  }
 export interface TaskProp {
    id: string;
    title: string;
    description: string;
    state: string;
    [key: string]: any; // To handle any other dynamic properties
  }
export interface TaskData {
    _id?: string;
    title: string;
    state: string;
    tasks: TaskType[];
    progress: number;
    tag: string;
    progressColor: string;
    tagColor: string;
    desc?: string[];
    priority:string
    id?:string
  }
  
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