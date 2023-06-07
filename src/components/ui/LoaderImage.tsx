import Logo from "../../assets/Logo.jpg"
import "./Loader.css"
export const LoaderImage = () => {
    return (
        <div role="status" className={"mx-2"}>
            <img src={Logo} alt={"Загрузка..."} className={"blinking"}/>
        </div>
    );
};
