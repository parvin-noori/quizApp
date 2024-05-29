import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Heading,
  SimpleGrid,
  VStack,
  Progress,
  Text,
  Button,
  theme,
  Box,
  background,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { data } from "../../assets/data.js";
import { useState } from "react";
import Lottie from "react-lottie";
import animationData from "../../lotties/Animation - 1716981978695.json";

export default function () {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);

  const option_array = [option1, option2, option3, option4];

  const checkAns = (e, ans) => {
    const correctColor = theme.colors.green[100];
    const wrongColor = theme.colors.red[100];
    if (!lock) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        e.target.style.borderColor = e.target.style.background = correctColor;
        setScore((prev) => prev + 1);
      } else {
        const correctOption = option_array[question.ans - 1].current;
        e.target.classList.add("wrong");
        e.target.style.borderColor = e.target.style.background = wrongColor;
        correctOption.classList.add("correct");
        correctOption.style.borderColor = correctOption.style.background =
          correctColor;
      }
      setLock(true);
    }
  };

  const next = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(index + 1);
      setQuestion(data[index]);
      setLock(false);
      option_array.map((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
        option.current.style.background = "white";
        option.current.style.borderColor = theme.colors.blue[100];
        return null;
      });
    }
  };

  function calculateProgress() {
    return (index / data.length) * 100;
  }

  const ItemStyle = {
    border: "2px",
    borderColor: "blue.100",
    p: "7",
    borderRadius: "10px",
    cursor: "pointer",
    textAlign: "center",
    background: "white",
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    renderedSetting: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <VStack align="stretch" spacing={4} mt="20px">
      <Heading as="h1" fontSize="3xl" textAlign="center">
        quiz app
      </Heading>
      <Card
        mt="20px"
        color="blue.500"
        position="relative"
        _before={{
          content: '""',
          bgImage: "url('./imgs/alternating-arrowhead.svg')",
          width: "100%",
          height: "100%",
          top: 0,
          position: "absolute",
          bottom: 0,
          opacity: "0.5",
          zIndex: 0,
          right: 0,
          left: 0,
        }}
      >
        {result ? (
          <CardBody>
            <VStack zIndex="1" pb="30px">
              <Lottie options={defaultOptions} height="300px" width="300px" />
              <Text fontWeight="bold" fontSize="3xl" zIndex="1">
                you scored {score} out of {data.length}
              </Text>
            </VStack>
          </CardBody>
        ) : (
          <>
            <CardHeader>
              <Box
                sx={{ ...ItemStyle, padding: "50px", overflow: "hidden" }}
                position="relative"
              >
                <Progress
                  colorScheme="blue"
                  size="xs"
                  value={calculateProgress()}
                  position="absolute"
                  right="0"
                  left="0"
                  top="0"
                />
                <Heading as="h2" fontSize="2xl">
                  {question.question}
                </Heading>
              </Box>
            </CardHeader>
            <CardBody zIndex="1">
              <SimpleGrid spacing={5} columns={{ base: 1, lg: 2 }}>
                <Box
                  sx={ItemStyle}
                  onClick={(e) => checkAns(e, 1)}
                  ref={option1}
                >
                  {question.option1}
                </Box>
                <Box
                  sx={ItemStyle}
                  onClick={(e) => checkAns(e, 2)}
                  ref={option2}
                >
                  {question.option2}
                </Box>
                <Box
                  sx={ItemStyle}
                  onClick={(e) => checkAns(e, 3)}
                  ref={option3}
                >
                  {question.option3}
                </Box>
                <Box
                  sx={ItemStyle}
                  onClick={(e) => checkAns(e, 4)}
                  ref={option4}
                >
                  {question.option4}
                </Box>
              </SimpleGrid>
            </CardBody>
            <CardFooter justifyContent="center" zIndex="1">
              <VStack>
                <Button
                  onClick={next}
                  colorScheme="blue"
                  p="25px 50px"
                  mb="10px"
                  isDisabled={!lock}
                >
                  next
                </Button>
                <Text color="gray">
                  {index + 1} of {data.length} questions
                </Text>
              </VStack>
            </CardFooter>
          </>
        )}
      </Card>
    </VStack>
  );
}
