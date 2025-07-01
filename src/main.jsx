import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import App from './App.jsx'
import Explorer from '../pages/explorer/page.jsx'
import Workshop from '../pages/workshop/page.jsx'
import { ThemeProvider } from "@material-tailwind/react";
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/explorer" element={<Explorer />} />
      <Route path="/workshop" element={<Workshop />} />
    </Routes>
  </BrowserRouter>
)
