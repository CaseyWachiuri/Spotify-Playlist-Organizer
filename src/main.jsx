import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import FailedLogin from "./pages/FailedLogin";
import ErrorPage from "./pages/Error";
import Callback from "./pages/Callback";
//import PlaylistSelect from "./pages/PlaylistSelect";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/failedLogin',
    element: <FailedLogin />,
  },
  /*{
    path: '/callback',
    element: <Callback />
  },
  /*{
    path: '/selectplaylist',
    element: <PlaylistSelect />
  },
  {
  // Display Playlist Tracks
    path: '',
    element: < />
  }*/
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
