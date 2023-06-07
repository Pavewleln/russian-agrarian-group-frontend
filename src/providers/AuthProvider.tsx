import { FC, PropsWithChildren, useEffect } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useActions } from "../hooks/useActions";
import { getAccessToken, getRefreshToken } from "../services/auth/auth.helper";

// Компонент, который проверяет различные права пользователя при нахождении на той или иной странице
const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const { user } = useAuth();
    const { checkAuth, logout } = useActions();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = getAccessToken();
        if (accessToken) checkAuth();
    }, []);

    useEffect(() => {
        const refreshToken = getRefreshToken();
        if (!refreshToken && user) {
            logout();
            navigate("/auth/signIn");
            toast.error("Нет доступа");
        } else if (
            !refreshToken &&
            location.pathname !== "/auth/signIn" &&
            location.pathname !== "/auth/signUp"
        ) {
            navigate("/auth/signIn");
        }
    }, [location]);

    return <>{children}</>;
};

export default AuthProvider;