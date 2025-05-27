"use client";

import { Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface CustomButtonProps {
  title: string;
  onClick: () => void;
  icon?: React.ReactNode;
  type?: "primary" | "default" | "dashed" | "text";
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  hoverIcon?: React.ReactNode;
  bgColor?: string;
  color?: string;
  borderColor?: string;
  hoverBgColor?: string;
  hoverColor?: string;
  hoverBorderColor?: string;
  mode?: "light" | "dark";
  size?: "small" | "middle" | "large";
  shape?: "circle" | "round";
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onClick,
  icon,
  type = "primary",
  loading = false,
  disabled = false,
  className = "",
  width = "auto",
  height = 40,
  borderRadius = 8,
  hoverIcon,
  mode = "dark",
  size = "middle",
  shape = "round",
  bgColor = "#700C18",
  color = "#FFFFFF",
  borderColor = "#700C18",
  hoverBgColor = "#FFFFFF",
  hoverColor = "#700C18",
  hoverBorderColor = "#700C18",
}) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      loading={loading ? { icon: <LoadingOutlined spin /> } : false}
      className={`custom-btn flex items-center justify-center px-4 font-medium transition-all duration-300 ease-in-out ${className} `}
      style={
        {
          width,
          height,
          borderRadius,
          backgroundColor:
            bgColor ||
            (mode === "dark"
              ? "#700c18"
              : mode === "light"
                ? "#FFFFFF"
                : "#700c18"),
          borderColor:
            borderColor ||
            (mode === "dark"
              ? undefined
              : mode === "light"
                ? "#700c18"
                : "#700c18"),
          opacity: disabled ? 0.6 : 1,
          color:
            color ||
            (mode === "dark"
              ? "#FFFFFF"
              : mode === "light"
                ? "#700c18"
                : "#FFFFFF"),
          // Pass CSS variables to be used in custom-btn class
          "--hover-bg-color": hoverBgColor,
          "--hover-color": hoverColor,
          "--hover-border-color": hoverBorderColor,
        } as React.CSSProperties
      }
    >
      {icon && <span className="icon-default">{icon}</span>}
      {hoverIcon && <span className="icon-hover">{hoverIcon}</span>}
      <span>{title}</span>
    </Button>
  );
};

export default CustomButton;
