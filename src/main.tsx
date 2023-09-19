import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { StateContextProvider } from './utils/Context.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThirdwebProvider activeChain="mumbai" clientId='c456ebf7bd3567ca64d80147542da1ae'>
    <StateContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </StateContextProvider>
  </ThirdwebProvider>,
)
