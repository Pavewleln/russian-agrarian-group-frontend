import { useEffect } from "react";
import {useActions} from "../../hooks/useActions";
import {Loader} from "../../components/ui/Loader";
import {useNavigate} from "react-router-dom";
import {LoaderImage} from "../../components/ui/LoaderImage";

const Logout = () => {
    const navigate = useNavigate()
    const { logout } = useActions();
    useEffect(() => {
        logout();
        setTimeout(async () => {
            await navigate("/auth/signIn");
        }, 1000);
    }, []);
    return (
        <div className={"h-screen flex items-center justify-center"}>
            <LoaderImage />
        </div>
    );
};
export default Logout;
