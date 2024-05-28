import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Heading,
  List,
  ListItem,
  SimpleGrid,
  VStack,
  Text,
  Flex,
  Button,
  theme,
  Box,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { data } from "../../assets/data.js";
import { useState } from "react";

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
        // option.current.style.borderColor = "gray";
        option.current.style.background = "transparent";
        option.current.style.borderColor = theme.colors.red[50];
        return null;
      });
    }
  };

  const ItemStyle = {
    border: "2px",
    borderColor: "red.50",
    p: "7",
    borderRadius: "10px",
    cursor: "pointer",
  };
  return (
    <VStack align="stretch" spacing={4} mt="40px">
      <Heading as="h1" fontSize="3xl" textAlign="center">
        quiz app
      </Heading>
      <Card mt="20px">
        {result ? (
          <CardBody>
            you scored {score} out of {data.length}
          </CardBody>
        ) : (
          <>
            <CardHeader>
              <Heading as="h2" fontSize="2xl">
                {index + 1}. {question.question}
              </Heading>
            </CardHeader>
            <CardBody>
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
            <CardFooter justifyContent="center">
              <VStack>
                <Button
                  onClick={next}
                  colorScheme="red"
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
