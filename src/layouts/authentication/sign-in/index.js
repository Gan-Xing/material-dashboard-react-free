/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

//Ruoyi API
import * as LoginApi from "api/login";
import * as authUtil from "utils/auth";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  // email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const [loginData, setLoginData] = useState({
    isShowPassword: false,
    captchaEnable: process.env.REACT_APP_CAPTCHA_ENABLE,
    tenantEnable: process.env.REACT_APP_TENANT_ENABLE,
    loginForm: {
      tenantName: "芋道源码",
      username: "admin",
      password: "admin123",
      captchaVerification: "",
      rememberMe: false,
    },
  });
  const [loginLoading, setLoginLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //获取租户ID
  const getTenantId = async () => {
    if (loginData.tenantEnable === "true") {
      const res = await LoginApi.getTenantIdByName(loginData.loginForm.tenantName);
      authUtil.setTenantId(res);
      console.log("getTenantId", authUtil.getTenantId());
    }
  };
  const navigate = useNavigate();
  const handleLogin = async (data) => {
    setLoginLoading(true);
    try {
      await getTenantId();

      const updatedLoginForm = {
        ...loginData.loginForm,
        username: data.email,
        password: data.password,
        captchaVerification: data?.captchaVerification,
      };

      const res = await LoginApi.login(updatedLoginForm);

      if (!res) {
        return;
      }

      setLoginData((prevState) => ({
        ...prevState,
        loginForm: updatedLoginForm,
      }));

      if (loginData.loginForm.rememberMe) {
        authUtil.setLoginForm(updatedLoginForm);
      } else {
        authUtil.removeLoginForm();
      }

      authUtil.setToken(res);
      navigate("/dashboard", { replace: true });
      console.log("token", res);
    } catch {
      setLoginLoading(false);
    } finally {
      // setTimeout(() => {
      //   const loadingInstance = ElLoading.service();
      //   loadingInstance.close();
      // }, 400);
    }
  };
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <MDInput
                    {...field}
                    type="email"
                    label="Email"
                    fullWidth
                    required
                    // validate
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </MDBox>
            <MDBox mb={2}>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <MDInput
                    {...field}
                    type="password"
                    label="Password"
                    fullWidth
                    required
                    validate
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                color="info"
                fullWidth
                onClick={handleSubmit(handleLogin)}
              >
                Sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
