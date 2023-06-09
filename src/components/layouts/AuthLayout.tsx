import { ILayout } from "./layout.types";
import { FC } from "react";
import Logo from '../../assets/Logo.jpg'
// Обертка для определенных страниц
export const AuthLayout: FC<ILayout> = ({ children }) => {
    return (
        <>
            <main className={"min-h-screen"}>
                <section className="bg-gray-50 dark:bg-gray-900">
                    <div className="flex flex-col items-center justify-center px-2 py-4 mx-auto h-screen lg:py-0">
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <img src={Logo} alt={"Русская аграрная группа"} className={"m-auto p-3"}/>
                            <div className="p-2 space-y-4 md:space-y-6 sm:p-5">
                                {children}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};
