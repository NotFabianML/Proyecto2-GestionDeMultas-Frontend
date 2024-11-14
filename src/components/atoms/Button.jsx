import React from "react";
import { colors } from "../../styles/theme";

const Button = ({
  variant = "primary",
  size = "medium",
  text,
  onClick,
  ...props
}) => {
  const getButtonStyle = (variant, size) => {
    let baseStyle = {
      textDecoration: "none",
      padding: "12px 30px",
      borderRadius: "50px",
      fontWeight: "bold",
      cursor: "pointer",
      display: "inline-block",
      transition: "transform 0.3s ease, filter 0.3s ease",
      outline: "none",
      border: "none",
    };

    switch (variant) {
      case "primary":
        baseStyle.backgroundColor = colors.primary;
        baseStyle.color = colors.secondary;
        baseStyle.border = "none";
        break;
      case "secondary":
        baseStyle.backgroundColor = colors.secondary;
        baseStyle.color = colors.primary;
        baseStyle.border = "none";
        break;
      case "alternative":
        baseStyle.backgroundColor = colors.alternative;
        baseStyle.color = "#FFFFFF";
        baseStyle.border = "none";
        break;
      case "outline":
        baseStyle.backgroundColor = "transparent";
        baseStyle.color = colors.primary; // Texto oscuro
        baseStyle.border = `1px solid ${colors.primary}`;
        break;
      case "lightGrey":
        baseStyle.backgroundColor = colors.background;
        baseStyle.color = colors.text; // Color de texto oscuro
        baseStyle.border = "none";
        break;
      case "danger":
        baseStyle.backgroundColor = "#e74c3c"; // Fondo rojo para advertencia
        baseStyle.color = "#FFFFFF"; // Texto blanco
        baseStyle.border = "none";
        break;
      default:
        baseStyle.backgroundColor = colors.primary;
        baseStyle.color = colors.secondary;
        baseStyle.border = "none";
    }

    switch (size) {
      case "small":
        baseStyle.fontSize = "12px";
        baseStyle.padding = "8px 20px";
        break;
      case "medium":
        baseStyle.fontSize = "16px";
        baseStyle.padding = "12px 30px";
        break;
      case "large":
        baseStyle.fontSize = "20px";
        baseStyle.padding = "16px 40px";
        break;
      default:
        baseStyle.fontSize = "16px";
    }

    return baseStyle;
  };

  const handleMouseOver = (e) => {
    e.target.style.transform = "scale(1.01)";
    e.target.style.filter = "brightness(1.2)";
  };

  const handleMouseOut = (e) => {
    e.target.style.transform = "scale(1)";
    e.target.style.filter = "brightness(1)";
  };

  return (
    <button
      style={getButtonStyle(variant, size)}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={onClick}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
