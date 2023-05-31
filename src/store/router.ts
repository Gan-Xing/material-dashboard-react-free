import { create } from "zustand";
import { cloneDeep } from "lodash-es";
import { getAsyncRoutes } from "api/login";
import { CACHE_KEY, useCache } from "hooks/web/useCache";
import { generateRoute, transformRoutes } from "utils/routerHelper";
import routes from "router/routes";
import { MUIRoutes, RouteStore } from "types/router";

const { wsCache } = useCache();

const allRoutes: MUIRoutes[] = routes;

const useRouteStore = create<RouteStore>((set) => ({
  routes: allRoutes,
  //   addRouters: [],
  menuTabRouters: [],
  setRoutes: (newRoutes: MUIRoutes[]) => set({ routes: newRoutes }),
  // getRouters: () => get().routes,
  // getAddRouters: () => flatMultiLevelRoutes(cloneDeep(get().addRouters)),
  // getMenuTabRouters: () => get().menuTabRouters,
  generateRoutes: async () => {
    let res;
    if (wsCache.get(CACHE_KEY.ROLE_ROUTERS)) {
      res = wsCache.get(CACHE_KEY.ROLE_ROUTERS);
    } else {
      res = await getAsyncRoutes();
      wsCache.set(CACHE_KEY.ROLE_ROUTERS, res);
    }
    const routerMap = generateRoute(res);
    // ...use transformRoutes with your AppRouteRecordRaw routes array
    const newRoutes = transformRoutes(routerMap);
    
    set({
      routes: cloneDeep(allRoutes).concat(newRoutes),
    });
  },
  setMenuTabRouters: (routers) =>
    set((state) => ({
      ...state,
      menuTabRouters: routers,
    })),
}));

export default useRouteStore;
