// Next.js 应用配置
import '../styles/globals.css';
import { Web3Provider } from '../components/Web3Provider';
import { AppProvider } from '../context/AppContext';

function MyApp({ Component, pageProps }) {
  return (
    <Web3Provider>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </Web3Provider>
  );
}

export default MyApp;