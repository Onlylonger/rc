import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./layout/app/App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Home } from "./pages/home/Home.tsx";
import { Projects } from "./pages/projects/Projects.tsx";
import { Blogs } from "./pages/blogs/Blogs.tsx";
import { Introduction } from "./pages/introduction/Introduction.tsx";
import { BlogDetail } from "./pages/blog-detail/BlogDetail.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "projects",
        Component: Projects,
      },
      {
        path: "blogs",
        Component: Blogs,
      },
      {
        path: "blogs/:id",
        Component: BlogDetail,
      },
      {
        path: "introduction",
        Component: Introduction,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
