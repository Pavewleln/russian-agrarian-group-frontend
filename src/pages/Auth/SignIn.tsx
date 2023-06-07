import {useActions} from "../../hooks/useActions";
import {useAuth} from "../../hooks/useAuth";
import {SubmitHandler, useForm, useFormState} from "react-hook-form";
import {ISignInResponse} from "../../store/user/user.interface";
import {toast} from "react-toastify";
import {AuthLayout} from "../../components/layouts/AuthLayout";
import {emailValidation, passwordValidation} from "../../utils/validation";
import {Link} from "react-router-dom";
import {TextField} from "../../components/ui/Forms/TextField";
import {ButtonForm} from "../../components/ui/Forms/ButtonForm";
import {useAuthRedirect} from "../../hooks/useAuthRedirect";

const SignIn = () => {
    const { login } = useActions();
    const { isLoading } = useAuth();

    // редирект если человек уже авторизован(данные о человеке уже есть)
    useAuthRedirect();

    // настройка
    const {
        handleSubmit,
        control,
        formState: { isValid }
    } = useForm<ISignInResponse>({
        defaultValues: {
            email: "",
            password: ""
        },
        mode: "onChange"
    });
    const { errors } = useFormState({
        control
    });
    const onSubmit: SubmitHandler<ISignInResponse> = async loginData => {
        try {
            await login(loginData);
        } catch (err) {
            toast.error("Ошибка. Попробуйте позже");
        }
    };
    return (
        <AuthLayout>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                Войти
            </h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 md:space-y-6"
            >
                {/*Номер телефона*/}
                <TextField
                    error={errors.email}
                    control={control}
                    name={"email"}
                    type={"email"}
                    validation={emailValidation}
                    label={"Почта"}
                    placeholder={"@"}
                    id={"email"}
                />
                {/*Пароль*/}
                <TextField
                    control={control}
                    error={errors.password}
                    name={"password"}
                    type={"password"}
                    validation={passwordValidation}
                    label={"Пароль"}
                    placeholder={"******"}
                    id={"password"}
                />
                <ButtonForm
                    isLoading={isLoading}
                    isValid={isValid}
                    label={"Войти"}
                />
                <Link
                    to={"/auth/signUp"}
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 text-center flex justify-center"
                >
                    Еще нет аккаунта ?
                </Link>
            </form>
        </AuthLayout>
    );
};
export default SignIn;
