import { useNavigate } from "react-router-dom";
import { Drag } from "../icons/SvgIcons";
import { Badge, Box, Flex, Text } from "@chakra-ui/react";

// Define the types for TaskCard props
interface TaskCardProps {
  setDraggableEl: (el: { id: string; number: number }) => void;
  dropEvent: () => void;
  setDropType: (type: string) => void;
  taskId: string;
  progressColor: string;
  tagColor: string;
  tag: string;
  desc: string[];
  progress: number;
  tasks: { text: string; complicated: boolean }[];
  title: string;
  number: number;
  state: string;
  id: string;
  priority:'High'|"Medium"|"Low"
}

function TaskCard(props: TaskCardProps) {
  const { setDraggableEl, dropEvent, setDropType, taskId, ...data } = props;
  const {
    progressColor,
    tagColor,
    tag,
    desc,
    progress,
    tasks,
    title,
    number,
    state,
    priority
    
  } = data;
  
  const navigate = useNavigate();

  return (
    <Box
      minH="140px"
      minW="250px"
      w="100%"
      bg="var(--task__item__bg)"
      borderRadius="6px"
      color="#d7d7d7"
      p="10px"
      position={'relative'}
      cursor="pointer"
      draggable="true"
      onDragStart={(e) => {
        setDraggableEl({ id: taskId, number: number - 1 });
        setDropType(state);
      }}
      onDragEnd={() => {
        dropEvent();
      }}
    >
      <Box className="drag-icon-area">
        <Drag width="20px" color="#0db8d3" className="drag-icon" />
      </Box>
      <Box
        onClick={() =>
          navigate(`task/${number}`, { state: { dataInfo: data } })
        }
      >
        {/* Header */}
        <Flex justifyContent="space-between" direction={"column"} mb="10px">
          <Text as="h4" color="#0db8d3" fontSize="lg" fontWeight="bold">
            {title}
          </Text>
          <Text color="#7a8195" pt="5px">
            {desc[0]?.substring(0, 30)}...
          </Text>
        </Flex>

        {/* Progress Text */}
        <Flex
          w="100%"
          justifyContent="space-between"
          alignItems="center"
          py="5px"
          color="#7a8195"
        >
          <Text fontSize="sm">
            Progress {progress}/{tasks?.length}
          </Text>
        </Flex>

        {/* Progress Bar */}
        <Box
          position="relative"
          w="100%"
          h="3px"
          bg="var(--item__bg2)"
          borderRadius="10px"
        >
          <Box
            position="absolute"
            w={`${Math.floor((progress / (tasks?.length || 1)) * 100)}%`}
            h="3px"
            bg={`${progressColor}`}
            borderRadius="10px"
            top="0"
            left="0"
          />
        </Box>

        {/* Footer */}
        <Flex
          justifyContent="space-between"
          alignItems="center"
          pt="20px"
          color="#7a8195"
        >
          <Badge
            borderRadius="4px"
            p="5px 10px"
            bg={`${tagColor}`}
            color="#fff"
            fontSize="14px"
            fontWeight="bold"
          >
            {tag}
          </Badge>
          <Badge
            borderRadius="4px"
            p="5px 10px"
            bg={`${tagColor}`}
            color="#fff"
            fontSize="14px"
            fontWeight="bold"
          >
           {priority}
          </Badge>
        </Flex>
      </Box>
    </Box>
  );
}

export default TaskCard;
