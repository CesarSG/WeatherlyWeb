import './App.css';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Switch from "./components/Switch";


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  const { theme } = useTheme();

  return (
    <div
      style={{
        backgroundColor: theme === 'light' ? 'white' : 'black',
        flex: 1,
        height: "100vh",
      }}
    >

    <Container>
      <Row className='py-5'>
        <Col>
          <Switch />
        </Col>
        <Col>
          <h1
            style={{
              color: theme === 'light' ? 'black' : 'white',
              margin: 0,
            }}
          >
            hola
          </h1>
        </Col>
      </Row>
    </Container>

      
    </div>
  );
}

function Root() {
  return(
    <ThemeProvider>
      <App />
    </ThemeProvider>
    
  )
}

export default Root;