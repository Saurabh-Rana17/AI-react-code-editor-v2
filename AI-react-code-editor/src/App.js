import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";

import LiveEditor from "./pages/Live Editor/LiveEditor";
import MainEditor from "./pages/Code Editor/MainEditor";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainEditor />,
    },
    {
      path: "/preview",
      element: <LiveEditor />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
