import './App.css';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Switch from "./components/Switch";

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
      <Switch />
      <h1
        style={{
          color: theme === 'light' ? 'black' : 'white',
          margin: 0,
        }}
      >
        hola
      </h1>
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
