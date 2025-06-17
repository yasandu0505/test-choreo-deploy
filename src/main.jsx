import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'


// const apiUrl = window?.config?.choreoApiUrl || "http://localhost:8081";

// console.log("Backend API URL:", apiUrl);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
