import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Switch from "@mui/material/Switch";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Images
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoAsana from "assets/images/small-logos/logo-asana.svg";

// Material Dashboard 2 PRO React components
import { useMaterialUIController } from "context";

function Accounts() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const [slack2FA, setSlack2FA] = useState(true);
  const [spotify2FA, setSpotify2FA] = useState(true);
  const [atlassian2FA, setAtlassian2FA] = useState(true);
  const [asana2FA, setAsana2FA] = useState(false);
  const [checkboxes, setCheckboxes] = useState([true, false, true, false, true, false]);

  const handleSetSlack2FA = () => setSlack2FA(!slack2FA);
  const handleSetSpotify2FA = () => setSpotify2FA(!spotify2FA);
  const handleSetAtlassian2FA = () => setAtlassian2FA(!atlassian2FA);
  const handleSetAsana2FA = () => setAsana2FA(!asana2FA);
  const checkboxDescriptions = [
    "Editor",
    "Author",
    "Contributor",
    "Subscriber",
    "Customer",
    "Shop manager",
  ];

  return (
    <Card id="accounts">
      <MDBox p={3} lineHeight={1}>
        <MDBox mb={1}>
          <MDTypography variant="h5">General Setting</MDTypography>
        </MDBox>
        <MDTypography variant="button" color="text">
          Here you can setup and manage your integration settings.
        </MDTypography>
      </MDBox>
      <MDBox pt={2} pb={3} px={3}>
        {/* <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <MDBox display="flex" alignItems="center">
            <MDAvatar src={logoSlack} alt="Slack logo" variant="rounded" />
            <MDBox ml={2}>
              <MDTypography variant="h5" fontWeight="medium">
                Slack
              </MDTypography>
              <MDBox display="flex" alignItems="flex-end">
                <MDTypography variant="button" color="text">
                  Show less
                </MDTypography>
                <MDTypography variant="button" color="text" sx={{ lineHeight: 0 }}>
                  <Icon fontSize="small">expand_less</Icon>
                </MDTypography>
              </MDBox>
            </MDBox>
          </MDBox>
          <MDBox
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            width={{ xs: "100%", sm: "auto" }}
            mt={{ xs: 1, sm: 0 }}
          >
            <MDBox lineHeight={0} mx={2}>
              <MDTypography variant="button" color="text">
                {slack2FA ? "Enabled" : "Disabled"}
              </MDTypography>
            </MDBox>
            <MDBox mr={1}>
              <Switch checked={slack2FA} onChange={handleSetSlack2FA} />
            </MDBox>
          </MDBox>
        </MDBox>
        <MDBox ml={2} pl={6} pt={2} lineHeight={1}>
          <MDTypography variant="button" color="text">
            You haven&apos;t added your Slack yet or you aren&apos;t authorized. Please add our
            Slack Bot to your account by clicking on here. When you&apos;ve added the bot, send your
            verification code that you have received.
          </MDTypography>
          <MDBox
            bgColor={darkMode ? "grey-900" : "grey-100"}
            borderRadius="lg"
            display="flex"
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            flexDirection={{ xs: "column", sm: "row" }}
            my={3}
            py={1}
            pl={{ xs: 1, sm: 2 }}
            pr={1}
          >
            <MDTypography variant="button" fontWeight="medium" color="text">
              Verification Code
            </MDTypography>
            <MDBox width={{ xs: "100%", sm: "25%", md: "15%" }} mt={{ xs: 1, sm: 0 }}>
              <Tooltip title="Copy" placement="top">
                <MDInput size="small" value="1172913" />
              </Tooltip>
            </MDBox>
          </MDBox>
          <MDBox
            bgColor={darkMode ? "grey-900" : "grey-100"}
            borderRadius="lg"
            display="flex"
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            flexDirection={{ xs: "column", sm: "row" }}
            my={3}
            py={1}
            pl={{ xs: 1, sm: 2 }}
            pr={1}
          >
            <MDTypography variant="button" fontWeight="medium" color="text">
              Connected account
            </MDTypography>
            <MDBox
              display="flex"
              alignItems={{ xs: "flex-start", sm: "center" }}
              flexDirection={{ xs: "column", sm: "row" }}
            >
              <MDBox mr={2} mb={{ xs: 1, sm: 0 }} lineHeight={0}>
                <MDTypography variant="button" fontWeight="medium">
                  hello@creative-tim.com
                </MDTypography>
              </MDBox>
              <MDButton variant="gradient" color="dark" size="small">
                delete
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
        <Divider /> */}
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <MDBox display="flex" alignItems="center">
            {/* <MDAvatar src={logoSpotify} alt="Slack logo" variant="rounded" /> */}
            <MDBox ml={2} lineHeight={0}>
              <MDTypography variant="h5" fontWeight="medium">
                用户模版权限
              </MDTypography>
              <MDTypography variant="button" color="text">
                您只能查看您创建的模版(管理员可以查看所有模版)
              </MDTypography>
            </MDBox>
          </MDBox>
          <MDBox
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            width={{ xs: "100%", sm: "auto" }}
            mt={{ xs: 1, sm: 0 }}
          >
            <MDBox lineHeight={0} mx={2}>
              <MDTypography variant="button" color="text">
                {spotify2FA ? "Enabled" : "Disabled"}
              </MDTypography>
            </MDBox>
            <MDBox mr={1}>
              <Checkbox checked={spotify2FA} onChange={handleSetSpotify2FA} />
            </MDBox>
          </MDBox>
        </MDBox>
        <Divider />
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <MDBox display="flex" alignItems="center">
            {/* <MDAvatar src={logoAtlassian} alt="Slack logo" variant="rounded" /> */}
            <MDBox ml={2} lineHeight={0}>
              <MDTypography variant="h5" fontWeight="medium">
                页面权限
              </MDTypography>
              <MDTypography variant="button" color="text">
                选择可以访问 Moredeal Ai Writer 页面的用户角色。
              </MDTypography>
            </MDBox>
          </MDBox>
          {/* <MDBox
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            width={{ xs: "100%", sm: "auto" }}
            mt={{ xs: 1, sm: 0 }}
          >
            <MDBox lineHeight={0} mx={2}>
              <MDTypography variant="button" color="text">
                {atlassian2FA ? "Enabled" : "Disabled"}
              </MDTypography>
            </MDBox>
            <MDBox mr={1}>
              <Checkbox checked={atlassian2FA} onChange={handleSetAtlassian2FA} />
            </MDBox>
          </MDBox> */}
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            flexDirection={{ xs: "column", sm: "row" }}
            flexWrap="wrap"
          >
            {checkboxes.map((checkbox, index) => (
              <MDBox
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                width={{ xs: "100%", sm: "50%" }}
                mb={1}
                key={index}
              >
                <MDBox lineHeight={0} mx={2}>
                  <MDTypography variant="button" color="text">
                    {checkboxDescriptions[index]}: {checkbox ? "Enabled" : "Disabled"}
                  </MDTypography>
                </MDBox>
                <MDBox mr={1}>
                  <Checkbox
                    checked={checkbox}
                    onChange={() => {
                      const newCheckboxes = [...checkboxes];
                      newCheckboxes[index] = !newCheckboxes[index];
                      setCheckboxes(newCheckboxes);
                    }}
                  />
                </MDBox>
              </MDBox>
            ))}
          </MDBox>
        </MDBox>
        <Divider />
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <MDBox display="flex" alignItems="center">
            {/* <MDAvatar src={logoAsana} alt="Slack logo" variant="rounded" /> */}
            <MDBox ml={2} lineHeight={0}>
              <MDTypography variant="h5" fontWeight="medium">
                AI编辑器
              </MDTypography>
              <MDTypography variant="button" color="text">
                启用AI编辑器,您可以使用我们提供的AI编辑工具来简化文章写作。
              </MDTypography>
            </MDBox>
          </MDBox>
          <MDBox
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            width={{ xs: "100%", sm: "auto" }}
            mt={{ xs: 1, sm: 0 }}
          >
            <MDBox lineHeight={0} mx={2}>
              <MDTypography variant="button" color="text">
                {asana2FA ? "Enabled" : "Disabled"}
              </MDTypography>
            </MDBox>
            <MDBox mr={1}>
              <Switch checked={asana2FA} onChange={handleSetAsana2FA} />
            </MDBox>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default Accounts;
