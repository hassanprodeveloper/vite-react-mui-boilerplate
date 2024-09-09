import { useLocation, useNavigate, useMatch } from "react-router-dom";

type QueryParams = Record<string, any>;

type RouterObject = {
  pathname: string;
  query?: QueryParams;
};

export type RouterType = {
  push: (path: string | RouterObject, state?: any) => void;
  replace: (path: string | RouterObject, state?: any) => void;
  goBack: () => void;
  pathname: string;
  asPath: string;
  route: string;
  query: QueryParams;
};

const useRouter = () => {
  const location = useLocation(); // Get current location details (path, query)
  const navigate = useNavigate(); // Access navigation methods (push, replace, etc.)

  // Mimicking route match using useMatch with the current pathname
  const match = useMatch(location.pathname);

  // Helper function to convert query object to query string
  const buildQueryString = (query: Record<string, any>) => {
    const queryString = new URLSearchParams(query).toString();
    return queryString ? `?${queryString}` : "";
  };

  // Push a new path onto the history stack (supporting both string and object form)
  const push = (
    path: string | { pathname: string; query?: Record<string, any> },
    state?: any
  ) => {
    if (typeof path === "string") {
      navigate(path, { state });
    } else {
      const queryString = buildQueryString(path.query || {});
      navigate(`${path.pathname}${queryString}`, { state });
    }
  };

  // Replace the current path in the history stack (supporting both string and object form)
  const replace = (
    path: string | { pathname: string; query?: Record<string, any> },
    state?: any
  ) => {
    if (typeof path === "string") {
      navigate(path, { state, replace: true });
    } else {
      const queryString = buildQueryString(path.query || {});
      navigate(`${path.pathname}${queryString}`, { state, replace: true });
    }
  };

  // Go back to the previous path in the history stack
  const goBack = () => {
    navigate(-1);
  };

  // Current path without query parameters
  const pathname = location.pathname;

  // Current full path with query parameters
  const asPath = `${location.pathname}${location.search}`;

  // Get the matched route from the router
  const route = match?.pattern.path || "";

  // Parse the query string parameters
  const query = Object.fromEntries(new URLSearchParams(location.search));

  const values: RouterType = {
    push,
    replace,
    goBack,
    pathname,
    asPath,
    route,
    query,
  };

  return values;
};

export default useRouter;
