import FailedLogin from "./pages/FailedLogin";
import ErrorPage from "./pages/Error";
import Callback from "./pages/Callback";
import PlaylistSelect from "./pages/PlaylistSelect";
import PlaylistView from "./pages/components/PlaylistView";
import Logout from "./pages/forcedlogout";
import App from './App.jsx'

export const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/failedLogin',
    element: <FailedLogin />,
  },
  {
    path: '/callback',
    element: <Callback />
  },
  {
    path: '/selectplaylist',
    element: <PlaylistSelect />
  },
  {
    path:'/playlist/:playlistId',
    element: <PlaylistView />
  },
  {
    path: '/logout',
    element: <Logout />
  },
]
