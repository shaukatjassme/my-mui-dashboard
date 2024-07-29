// pages/_app.js
import { ThemeProvider } from '@mui/material/styles';
import theme from "../lib/theme";
import Layout from '../components/Layout';
import '../styles/globals.css'; 

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
