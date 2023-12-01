import './App.css';
import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Index";
import NewCollection from './Pages/NewCollection/Index';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/image",
    element: <NewCollection/>
  },
]);
function App() {
  return (
    <RouterProvider router={router} />
    
  );
}

export default App;
