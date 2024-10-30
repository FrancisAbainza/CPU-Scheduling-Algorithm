import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from "./pages/Root.jsx"
import Home from "./pages/Home.jsx"
import Priority from './pages/Priority.jsx';

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
          path: "/priority",
          element: <Priority />,
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default App
