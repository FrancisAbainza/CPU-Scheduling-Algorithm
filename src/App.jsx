import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from "./pages/Root.jsx"
import Home from "./pages/Home.jsx"
import Fcfs from './pages/Fcfs.jsx';
import Priority from './pages/Priority.jsx';
import Srtf from './pages/Srtf.jsx';


function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/fcfs",
          element: <Fcfs />,
        },
        {
          path: "/priority",
          element: <Priority />,
        },
        {
          path: "/srtf",
          element: <Srtf />,
        },
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default App
