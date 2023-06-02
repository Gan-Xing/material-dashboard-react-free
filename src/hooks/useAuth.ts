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

  const [searchParams] = useSearchParams();
  const isSetUser = useUserStore((state) => state.isSetUser);
  const setUserInfoAction = useUserStore((state) => state.setUserInfoAction);
  const generateRoutes = useRouteStore((state) => state.generateRoutes);
  const hasCheckedAuth = useRouteStore((state) => state.hasCheckedAuth);
  const setHasCheckedAuth = useRouteStore((state) => state.setHasCheckedAuth);

  useEffect(() => {
    const fetchAccessToken = async (): Promise<void> => {
      const token = await getAccessToken();
      setIsAuth(Boolean(token));
    };
    fetchAccessToken();
  }, []);

  useEffect(() => {
    const checkAuth = async (): Promise<void> => {
      if (!hasCheckedAuth && getAccessToken()) {
        setHasCheckedAuth(true);
        if (!isSetUser) {
          await setUserInfoAction();
          await generateRoutes();
        }
        const redirect = searchParams.get("redirect");
        if (redirect !== null) {
          navigate(decodeURIComponent(redirect), { replace: true });
        } else {
          navigate("/dashboard", { replace: true });
        }
      } else if (!getAccessToken()) {
        if (!whiteList.includes(location.pathname)) {
          navigate(`/authentication/sign-in?redirect=${location.pathname}`, { replace: true });
        }
      }
    };
    checkAuth();
  }, [location, navigate, searchParams, isSetUser, hasCheckedAuth, setHasCheckedAuth]);

  return isAuth;
}
