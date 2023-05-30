import { create } from "zustand";
import routes from "router/routes";

export type Route = {
  type: string;
  name: string;
  key: string;
  icon: JSX.Element;
  route: string;
  component: React.LazyExoticComponent<React.ComponentType<any>> | JSX.Element;
  hidden?: boolean;
};

export type Routes = Route[];

export type RouteStore = {
  routes: Routes;
  setRoutes: (newRoutes: Routes) => void;
};

// 假设这是你的初始路由
const allRoutes: Routes = routes;

export const useRouterStore = create((set) => ({
  routes: allRoutes,
  setRoutes: (newRoutes: Routes) => set({ routes: newRoutes }),
}));
