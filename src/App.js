import { ThemeProvider, useTheme } from './context/ThemeContext';
import Header from "./components/Header";
import { ChakraProvider } from '@chakra-ui/react'
import { images } from './utils';

function App() {
  const { theme } = useTheme();

  const themeCondition = `${theme === 'light' ? 'theme' : 'theme-dark'}`;
  return (
    <div
      style={{
        backgroundImage: theme === 'light' ? `url(${images.bg_day})` : `url(${images.bg_night})`,
        height: "100vh",
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'repeat'
      }}
      className={themeCondition}
    >
      <Header />
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