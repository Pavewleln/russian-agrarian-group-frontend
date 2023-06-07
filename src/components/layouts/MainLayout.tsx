import { ILayout } from "./layout.types";
import { Header } from "../ui/Header";
import { FC } from "react";

// Обертка для определенных страниц
export const MainLayout: FC<ILayout> = ({ children }) => {
    return (
        <>
            <Header />
            <main className={"min-h-screen p-2"}>{children}</main>
        </>
    );
};
