import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Perfil from "./routes/Perfil.jsx";
import Login from "./routes/Login.jsx";
import Historico from "./routes/Historico.jsx";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/QueQueBilda",
        element: <Login />,
      },
      {
        path: "/QueQueBilda/perfil",
        element: <Perfil />,
      },
      {
        path: "/QueQueBilda/perfil/historico",
        element: <Historico />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
