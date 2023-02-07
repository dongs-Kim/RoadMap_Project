import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ChakraProvider } from '@chakra-ui/react';
import { ReactFlowProvider } from 'reactflow';
import { Provider } from 'react-redux';
import { store } from './store/store';

import 'react-toastify/dist/ReactToastify.css';
import 'reactflow/dist/style.css';
import '@reactflow/node-resizer/dist/style.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <ReactFlowProvider>
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>
      </ReactFlowProvider>
    </ChakraProvider>
    <ToastContainer />
  </React.StrictMode>,
);
