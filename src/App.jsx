import { ThemeProvider, useTheme } from './context/ThemeContext';
import { ChakraProvider } from '@chakra-ui/react'
import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  const { theme } = useTheme();

  const themeCondition = `${theme === 'light' ? 'theme' : 'theme-dark'}`;
  return (
    <div className={themeCondition}>
      <Header />
      <Main />
    </div>
  );
}

function Root() {
  return(
    <ChakraProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ChakraProvider>
  )
}

export default Root;