import React from 'react';
import {ChakraProvider} from '@chakra-ui/react'

import ReactDOM from 'react-dom/client';
import App from './App';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ChakraProvider>
    <App />
    </ChakraProvider>
);


