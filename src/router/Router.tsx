import { Suspense } from "react";
import { Outlet, RouteObject, useRoutes } from "react-router-dom";
import Spinner from "src/@core/components/spinner";
import UserLayout from "src/layouts/UserLayout";

import Home from "src/pages";
import Error404 from "src/pages/404";

export function Routes() {
  const routes: RouteObject[] = [
    {
      path: "/",
      element: (
        <UserLayout>
          <Outlet />
        </UserLayout>
      ),
      children: [
        { path: "/", element: <Home /> },
        {
          path: "*",
          element: <Error404 />,
        },
      ],
    },
    {
      path: "/auth",
      element: (
        <>
          <Outlet />
        </>
      ),
      children: [
        {
          path: "*",
          element: <Error404 />,
        },
      ],
    },
  ];

  const element = useRoutes(routes);

  return <Suspense fallback={<Spinner />}>{element}</Suspense>;
}
