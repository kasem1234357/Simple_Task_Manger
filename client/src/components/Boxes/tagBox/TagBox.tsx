import { Box, Button, Flex, Input } from "@chakra-ui/react"
import { Add } from "../../icons/SvgIcons"
import { Dispatch, SetStateAction, useRef, useState } from "react"
import { COLORS, TaskData } from "../../../configs/CONSTANTS"
import useOutsideClick from "../../../hooks/useOutsideClick"
type props ={
    cacheData:TaskData,
    setCacheData:Dispatch<SetStateAction<TaskData>>,
    isEditable:Boolean,
}
function TagBox(props:props) {
    const [showColors, setShowColors] = useState<boolean>(false);
    const [showTagBox, setShowTagBox] = useState<boolean>(false);
    const {cacheData,setCacheData,isEditable}= props
    const targetRef = useRef<HTMLDivElement | null>(null)
    const handleClickOutside = () => setShowTagBox(false);
    useOutsideClick(targetRef, handleClickOutside);
  return (
    <Box ref={targetRef} position="relative">
            <Button
              variant="solid"
              colorScheme="blue"
              onClick={() => setShowTagBox(!showTagBox)}
              size="sm"
            >
              Add Tag <Add width={"30px"} color={"#d7d7d7"} />
            </Button>
            {showTagBox && (
              <Flex
                position="absolute"
                left="120px"
                top="-10px"
                p={2}
                bg="#37405a"
                boxShadow="xl"
                rounded="md"
                zIndex="1"
              >
                <Input
                  value={cacheData.tag}
                  readOnly={!isEditable}
                  onChange={(e) => setCacheData((prev: any) => ({ ...prev, tag: e.target.value }))}
                  size="sm"
                
                  width="120px"
                  variant="flushed"
                  color="white"
                />
                <Box
                  onClick={() => setShowColors(!showColors)}
                  w="25px"
                  h="25px"
                  bg={cacheData.tagColor}
                  borderRadius="full"
                  cursor="pointer"
                  ml={2}
                />
                {showColors &&
                  COLORS.filter((color) => color !== cacheData.tagColor).map((colorHex, index) => (
                    <Box
                      key={index}
                      bg={colorHex}
                      w="25px"
                      h="25px"
                      borderRadius="full"
                      position="absolute"
                      right={`${-(index + 1) * 30}px`}
                      top="8px"
                      cursor="pointer"
                      onClick={() => setCacheData((prev: any) => ({ ...prev, tagColor: colorHex }))}
                    />
                  ))}
              </Flex>
            )}
          </Box>
  )
}

export default TagBox