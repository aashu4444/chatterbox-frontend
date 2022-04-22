import '../styles/globals.scss';
import '../styles/fontawesome/css/all.min.css';
import { UserState } from '../context/UserContext';

function MyApp({ Component, pageProps }) {
  return <UserState><Component {...pageProps} /></UserState>
}

export default MyApp
