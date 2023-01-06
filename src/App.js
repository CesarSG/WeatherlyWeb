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
      <div className='container py-5'>
        <div className='row'>
          <div className='col'>
            <Switch />
          </div>
          <div className='col'>
            <h1
                style={{
                  color: theme === 'light' ? 'black' : 'white',
                  margin: 0,
                }}
              >
                hola
            </h1>
          </div>
        </div>
      </div>
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