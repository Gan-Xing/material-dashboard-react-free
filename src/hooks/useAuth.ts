// useAuth.ts
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// 这是你获取 access token 的函数，你需要在其他地方实现它
// 它应该返回一个字符串（代表 access token）或者 undefined（如果没有 access token）
const getAccessToken = async (): Promise<string | undefined> => {
  // 实现逻辑
  return Promise.resolve("token");
};

const whiteList = [
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

  useEffect(() => {
    const checkAuth = async (): Promise<void> => {
      const accessToken = await getAccessToken();
      const hasAccessToken = Boolean(accessToken);
      if (hasAccessToken) {
        if (location.pathname === "/authentication/sign-in") {
          navigate("/dashboard", { replace: true });
        } else {
          // 根据你的应用情况，可能需要获取一些额外的信息
          // 例如：字典、用户信息、权限等
          // await getDicts();
          // await getUserInfo();
          // await getPermissions();
          setIsAuth(true);
        }
      } else {
        if (!whiteList.includes(location.pathname)) {
          navigate(`/authentication/sign-in=${location.pathname}`, { replace: true });
        }
      }
    };

    checkAuth();
  }, [location, navigate]);

  return isAuth;
}
