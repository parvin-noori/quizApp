import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Heading,
  List,
  ListItem,
  VStack,
  Text,
  Button,
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
    if (!lock) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        e.target.style.borderColor = "green";
        setScore((prev) => prev + 1);
        // e.target.style.background = "green";
        setLock(true);
      } else {
        e.target.classList.add("wrong");
        e.target.style.borderColor = "red";
        // e.target.style.background = "red";
        setLock(true);
        option_array[question.ans - 1].current.classList.add("correct");
        option_array[question.ans - 1].current.style.borderColor = "green";
        // option_array[question.ans - 1].current.style.background = "green";
      }
    }
  };

  const next = () => {
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
      option.current.style.borderColor = "gray";
      return null;
    });
  };

  const ItemStyle = {
    border: "1px",
    borderColor: "gray.200",
    p: "7",
    borderRadius: "10px",
    cursor: "pointer",
  };
  return (
    <Container>
      <VStack align="stretch" spacing={4} mt="40px">
        <Heading as="h1" fontSize="3xl" textAlign="center">
          quiz app
        </Heading>
        <Card mt="20px">
          {result ? (
            <CardBody>you scored {score} out of {data.length}</CardBody>
          ) : (
            <>
              <CardHeader>
                <Heading as="h2" fontSize="2xl">
                  {index + 1}. {question.question}
                </Heading>
              </CardHeader>
              <CardBody>
                <List spacing={5}>
                  <ListItem
                    sx={ItemStyle}
                    onClick={(e) => checkAns(e, 1)}
                    ref={option1}
                  >
                    {question.option1}
                  </ListItem>
                  <ListItem
                    sx={ItemStyle}
                    onClick={(e) => checkAns(e, 2)}
                    ref={option2}
                  >
                    {question.option2}
                  </ListItem>
                  <ListItem
                    sx={ItemStyle}
                    onClick={(e) => checkAns(e, 3)}
                    ref={option3}
                  >
                    {question.option3}
                  </ListItem>
                  <ListItem
                    sx={ItemStyle}
                    onClick={(e) => checkAns(e, 4)}
                    ref={option4}
                  >
                    {question.option4}
                  </ListItem>
                </List>
              </CardBody>
              <CardFooter justifyContent="center">
                <VStack>
                  <Button
                    onClick={next}
                    colorScheme="red"
                    p="25px 50px"
                    mb="10px"
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
    </Container>
  );
}
