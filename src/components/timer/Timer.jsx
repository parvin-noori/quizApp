import { TimeIcon } from "@chakra-ui/icons";
import { Text } from "@chakra-ui/react";
import React from "react";

export default function Timer() {
  function formatTime() {
    return `00:00`;
  }
  return (
    <Text textAlign="center" mt="50px" color="red.600">
      <TimeIcon me={2} />
      {formatTime()}
    </Text>
  );
}
