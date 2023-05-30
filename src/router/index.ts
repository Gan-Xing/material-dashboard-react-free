import { useRouterStore, Route, RouteStore } from "store/router";

const resetWhiteNameList = ["Sign In"];

export function resetRouter() {
  const { routes, setRoutes } = useRouterStore.getState() as RouteStore;

  const newRoutes = routes.map((route: Route) => {
    if (!resetWhiteNameList.includes(route.name)) {
      return { ...route, hiden: true };
    }
    return route;
  });

  setRoutes(newRoutes);
}
