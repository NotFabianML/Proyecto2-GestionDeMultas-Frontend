import React from "react";
import { Link } from "react-router-dom";
import { colors } from "../../styles/theme";

const ButtonLink = ({
  variant = "primary",
  size = "medium",
  text,
  to,
  ...props
}) => {
  // Estilos basados en la variante, el tamaño y el hover effect
  const getButtonStyle = (variant, size) => {
    let baseStyle = {
      textDecoration: "none",
      padding: "12px 30px",
      borderRadius: "50px",
      fontWeight: "bold",
      cursor: "pointer",
      display: "inline-block",
      transition: "transform 0.3s ease, filter 0.3s ease",
    };

    // Variantes de color
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
        baseStyle.color = colors.primary;
        baseStyle.border = `1px solid ${colors.primary}`;
        break;
      default:
        baseStyle.backgroundColor = colors.primary;
        baseStyle.color = colors.secondary;
        baseStyle.border = "none";
    }

    // Tamaños
    switch (size) {
      case "small":
        baseStyle.fontSize = "12px";
        baseStyle.padding = "8px 20px";
        break;
      case "medium":
        baseStyle.fontSize = "16px";
        baseStyle.padding = "12px 30px"; // Más padding vertical
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
    <Link
      to={to}
      style={getButtonStyle(variant, size)}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      {...props}
    >
      {text}
    </Link>
  );
};

export default ButtonLink;
