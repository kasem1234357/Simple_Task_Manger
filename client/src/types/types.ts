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