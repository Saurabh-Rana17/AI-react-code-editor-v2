import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Landing from "./components/Landing";
import Test from "./Test";
import LiveEditor from "./components/LiveEditor";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/preview",
      element: <LiveEditor />,
    },
    {
      path: "/test",
      element: <Test />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
