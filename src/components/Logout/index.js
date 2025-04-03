import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("admin");

    console.log("User logged out successfully");

    // ✅ Force re-render after logout
    window.location.reload();

    navigate("/");
  }, [navigate]);

  return <p>Logging out...</p>;
};

export default Logout;
