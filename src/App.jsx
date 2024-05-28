import { Container } from "@chakra-ui/react";
import Quiz from "./components/Quiz/Quiz";
import Timer from "./components/timer/Timer";

function App() {
  return (
    <Container maxW="container.lg">
      {/* <Timer /> */}
      <Quiz />
    </Container>
  );
}

export default App;
