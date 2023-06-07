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
                    ? "bg-green-100 hover:bg-green-300 cursor-not-allowed dark:bg-green-300 dark:hover:bg-green-200"
                    : "bg-green-600 hover:bg-green-500"
            }
                 w-full text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 flex items-center justify-center transition-all`}
            type="submit"
            disabled={!isValid}
        >
            <span className={"mx-2"}>{label}</span>
            {isLoading && <Loader />}
        </button>
    );
};
