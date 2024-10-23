import React from "react";
import { useUserContext } from "../../../contexts/UserContext";

export const Perfil = () => {
  const userId = useUserContext("soy un id");
  return <div>{userId}</div>;
};
