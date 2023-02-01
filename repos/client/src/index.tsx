import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ChakraProvider } from '@chakra-ui/react';
import { ReactFlowProvider } from 'reactflow';
import { Provider } from 'react-redux';
import { applyMiddleware } from 'redux';

import 'react-toastify/dist/ReactToastify.css';
import 'reactflow/dist/style.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <ReactFlowProvider>
        <BrowserRouter>
          {/* <Provider store={store} /> */}
          <App />
        </BrowserRouter>
      </ReactFlowProvider>
    </ChakraProvider>
    <ToastContainer />
  </React.StrictMode>,
);
