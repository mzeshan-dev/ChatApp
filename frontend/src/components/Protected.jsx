import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Protected({ children }) {
  const isAuthentic = useSelector((state) => state.user.isAuthentic);
  console.log(isAuthentic, "isauth");
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthentic) {
      navigate("/register");
    } else {
      return children;
    }
  }, [isAuthentic]);
}

export default Protected;
