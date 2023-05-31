// useAuth.ts
import { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { getAccessToken } from "utils/auth";
import useUserStore from "store/user";
import useRouteStore from "store/router";

export const whiteList = [
  "/authentication/sign-in",
  //   "/social-login",
  //   "/auth-redirect",
  //   "/bind",
  "/authentication/sign-up",
  //   "/oauthLogin/gitee",
];

export function useAuth(): boolean {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams(); // Moved this line here
  const isSetUser = useUserStore((state) => state.isSetUser);
  const setUserInfoAction = useUserStore((state) => state.setUserInfoAction);
  const generateRoutes = useRouteStore((state) => state.generateRoutes);
  useEffect(() => {
    const checkAuth = async (): Promise<void> => {
      const accessToken = await getAccessToken();
      const hasAccessToken = Boolean(accessToken);
      if (hasAccessToken) {
        if (location.pathname === "/authentication/sign-in") {
          navigate("/dashboard", { replace: true });
        } else {
          if (!isSetUser) {
            await setUserInfoAction();
          }
          await generateRoutes();
          const redirect = searchParams.get("redirect");
          if (redirect !== null) {
            navigate(decodeURIComponent(redirect), { replace: true });
          } else {
            navigate("/dashboard", { replace: true });
          }
          setIsAuth(true);
        }
      } else {
        if (!whiteList.includes(location.pathname)) {
          if (location.pathname === "/") {
            navigate("/authentication/sign-in", { replace: true });
          } else {
            navigate(`/authentication/sign-in?redirect=${location.pathname}`, { replace: true });
          }
        }
      }
    };

    checkAuth();
  }, [location, navigate, searchParams, isSetUser]);

  return isAuth;
}
