import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Protected({ children }) {
  const isAuthentic = useSelector((state) => state.user.isAuthentic);

  const navigate = useNavigate();

  if (!isAuthentic) {
    navigate("/register");
  } else {
    return children;
  }
}

export default Protected;
