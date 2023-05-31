import React from "react";
import Icon from "@mui/material/Icon";

type CustomIconProps = {
  fontSize?: "inherit" | "small" | "large" | "medium";
  color?: "inherit" | "primary" | "secondary" | "action" | "error" | "disabled";
  className?: string;
  style?: React.CSSProperties;
  content: string | React.ReactElement;
};

export const CustomIcon: React.FC<CustomIconProps> = ({
  fontSize = "medium",
  color = "inherit",
  className,
  style,
  content,
}) => (
  <Icon fontSize={fontSize} color={color} className={className} style={style}>
    {content}
  </Icon>
);

export default CustomIcon;
