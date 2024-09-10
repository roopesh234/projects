import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface LogoutProps {
    setIsLogin: (value: number) => void;
}

const Logout: React.FC<LogoutProps> = ({ setIsLogin }) => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("login");
        localStorage.removeItem("loginid");
        setIsLogin(0);
        navigate("/");  // Redirect to home after logout
    }, [setIsLogin, navigate]);

    return null;  // Returning null since navigation will take care of rendering the appropriate component
};

export default Logout;
