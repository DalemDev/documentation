import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import store from './redux/store/store.js';


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
