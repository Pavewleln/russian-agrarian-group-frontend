import { Loader } from "../Loader";
import { FC } from "react";

interface IButtonForm {
    isValid?: boolean;
    label: string;
    isLoading?: boolean;
    submit?: () => void;
}

// Кастомный button
export const ButtonForm: FC<IButtonForm> = ({
                                                isValid = true,
                                                label,
                                                isLoading = false,
                                                submit
                                            }: IButtonForm) => {
    return (
        <button
            onClick={submit}
            className={`${
                !isValid
                    ? "bg-primary-100 hover:bg-primary-300 cursor-not-allowed dark:bg-primary-300 dark:hover:bg-primary-200"
                    : "bg-primary-600 hover:bg-primary-500"
            }
                 w-full text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex items-center justify-center transition-all`}
            type="submit"
            disabled={!isValid}
        >
            <span className={"mx-2"}>{label}</span>
            {isLoading && <Loader />}
        </button>
    );
};
