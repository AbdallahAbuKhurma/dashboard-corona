import { useRoutes } from "react-router-dom";
import TopMenu from "../layouts/TopMenu";
import Page1 from "../pages/Page1";
import Page2 from "../pages/Page2";

function Router() {
  const routes = [
    {
      path: "/",
      element: <TopMenu />,
      children: [
        {
          path: "/",
          element: <Page1 />,
        },
        {
          path: "/charts",
          element: <Page2 />,
        },
      ],
    },
  ];

  return useRoutes(routes);
}

export default Router;
