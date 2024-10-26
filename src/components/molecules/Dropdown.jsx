import React, { useState } from "react";

const Dropdown = ({
  options = [],
  variant = "primary",
  size = "medium",
  placeholder = "Selecciona una opción",
  onChange,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [search, setSearch] = useState("");

  const getDropdownStyle = (variant, size) => {
    let baseStyle = {
      width: "100%",
      padding: "10px",
      borderRadius: "8px",
      fontWeight: "bold",
      cursor: "pointer",
      border: "1px solid #ccc",
      display: "inline-block",
      transition: "all 0.3s ease",
    };

    switch (variant) {
      case "primary":
        baseStyle.backgroundColor = "#f0f0f0";
        baseStyle.color = "#181D23";
        break;
      case "secondary":
        baseStyle.backgroundColor = "#F2B624";
        baseStyle.color = "#181D23";
        break;
      case "alternative":
        baseStyle.backgroundColor = "#18AEBF";
        baseStyle.color = "#FFFFFF";
        break;
      default:
        baseStyle.backgroundColor = "#f0f0f0";
        baseStyle.color = "#181D23";
    }

    switch (size) {
      case "small":
        baseStyle.fontSize = "12px";
        baseStyle.padding = "8px";
        break;
      case "large":
        baseStyle.fontSize = "18px";
        baseStyle.padding = "14px";
        break;
      default:
        baseStyle.fontSize = "16px";
    }

    return baseStyle;
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange && onChange(option);
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ position: "relative" }} {...props}>  {/* Posicionamos el contenedor de dropdown */}
      <div style={getDropdownStyle(variant, size)} onClick={toggleDropdown}>
        {selectedOption ? selectedOption.label : placeholder}
      </div>
      {isOpen && (
        <div style={{
          position: "absolute",
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          borderRadius: "8px",
          marginTop: "5px",
          width: "100%",
          maxHeight: "200px", // Altura máxima para evitar que se salga del contenedor
          overflowY: "auto",  // Scroll si hay demasiadas opciones
          zIndex: "1"
        }}>
          <input
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              border: "none",
              borderBottom: "1px solid #ccc"
            }}
          />
          <div>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleOptionClick(option)}
                  style={{
                    padding: "10px",
                    cursor: "pointer",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  {option.label}
                </div>
              ))
            ) : (
              <div style={{ padding: "10px", color: "#999" }}>Sin resultados</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
