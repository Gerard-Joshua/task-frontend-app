import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createGlobalStyle, styled } from "styled-components";
import TaskList from "./components/TaskList";

const GlobalStyle = createGlobalStyle`
  :root {
    --light-grey: #EFF5F5;
  }
`;

const Container = styled.div`
  background-color: var(--light-grey);
  height: 100vh;
`;

function App() {
  return (
    <Router>
      <Container>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<TaskList />} exact />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
