import {useActions} from "../../hooks/useActions";
import {useAuth} from "../../hooks/useAuth";
import {SubmitHandler, useForm, useFormState} from "react-hook-form";
import {ISignUpResponse} from "../../store/user/user.interface";
import {toast} from "react-toastify";
import {AuthLayout} from "../../components/layouts/AuthLayout";
import {TextField} from "../../components/ui/Forms/TextField";
import {emailValidation, nameValidation, passwordValidation, surnameValidation} from "../../utils/validation";
import {ButtonForm} from "../../components/ui/Forms/ButtonForm";
import {Link} from "react-router-dom";
import {useAuthRedirect} from "../../hooks/useAuthRedirect";

const SignUp = () => {
    const { register } = useActions();
    const { isLoading } = useAuth();

    // редирект если человек уже авторизован(данные о человеке уже есть)
    useAuthRedirect();

    // настройка
    const {
        handleSubmit,
        control,
        formState: { isValid }
    } = useForm<ISignUpResponse>({
        defaultValues: {
            name: "",
            surname: "",
            email: "",
            password: ""
        },
        mode: "onChange"
    });
    const { errors } = useFormState({
        control
    });

    const onSubmit: SubmitHandler<ISignUpResponse> = async registerData => {
        try {
            await register(registerData);
        } catch (err) {
            toast.error("Ошибка. Попробуйте позже");
        }
    };
    return (
        <AuthLayout>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                Зарегистрироваться
            </h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 md:space-y-6"
            >
                {/*Имя*/}
                <TextField
                    name={"name"}
                    type={"text"}
                    control={control}
                    validation={nameValidation}
                    label={"Имя"}
                    placeholder={"Иван"}
                    error={errors.name}
                    id={"name"}
                />
                {/*Фамилия*/}
                <TextField
                    name={"surname"}
                    type={"text"}
                    control={control}
                    validation={surnameValidation}
                    label={"Фамилия"}
                    placeholder={"Иванов"}
                    error={errors.surname}
                    id={"surname"}
                />
                {/*Почта*/}
                <TextField
                    name={"email"}
                    type={"email"}
                    control={control}
                    validation={emailValidation}
                    label={"Почта"}
                    placeholder={"@"}
                    error={errors.email}
                    id={"email"}
                />
                {/*Пароль*/}
                <TextField
                    name={"password"}
                    type={"password"}
                    control={control}
                    validation={passwordValidation}
                    label={"Пароль"}
                    placeholder={"******"}
                    error={errors.password}
                    id={"password"}
                />
                <ButtonForm
                    isLoading={isLoading}
                    isValid={isValid}
                    label={"Зарегистрироваться"}
                />
                <Link
                    to={"/auth/signIn"}
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 text-center flex justify-center"
                >
                    Уже есть аккаунт?
                </Link>
            </form>
        </AuthLayout>
    );
};
export default SignUp;
