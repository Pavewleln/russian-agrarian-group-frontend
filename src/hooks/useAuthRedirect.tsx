import { useEffect } from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "./useAuth";

export const useAuthRedirect = () => {
    const navigate = useNavigate()
    const { user } = useAuth();
    useEffect(() => {
        if (user) {
            navigate("/");
        } else if (user) {
            navigate("/");
        }
    }, [user]);
};
