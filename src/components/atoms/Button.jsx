import React from "react";

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
        baseStyle.backgroundColor = "#181D23"; // Fondo oscuro
        baseStyle.color = "#F2B624"; // Texto amarillo
        baseStyle.border = "none";
        break;
      case "secondary":
        baseStyle.backgroundColor = "#F2B624"; // Fondo amarillo
        baseStyle.color = "#181D23"; // Texto oscuro
        baseStyle.border = "none";
        break;
      case "alternative":
        baseStyle.backgroundColor = "#18AEBF"; // Fondo cian
        baseStyle.color = "#FFFFFF"; // Texto blanco
        baseStyle.border = "none";
        break;
      case "outline":
        baseStyle.backgroundColor = "transparent";
        baseStyle.color = "#181D23"; // Texto oscuro
        baseStyle.border = "1px solid #181D23"; // Borde oscuro
        break;
      default:
        baseStyle.backgroundColor = "#181D23"; // Default: Primary
        baseStyle.color = "#F2B624";
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
