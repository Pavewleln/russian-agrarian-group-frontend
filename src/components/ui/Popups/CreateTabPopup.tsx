import {FC, FormEvent, FormEventHandler, useState} from "react";
import {ButtonForm} from "../Forms/ButtonForm";
import {ITab} from "../../../services/tabs/tabs.interface";
import {toast} from "react-toastify";
import {errorCatch} from "../../../api/api.helper";

interface IPopup {
    tabs: ITab[];
    addTab: (title: string) => Promise<void>;
    showModal: boolean;
    setShowModal: (showModal: boolean) => void;
}

export const CreateTabPopup: FC<IPopup> = ({showModal, setShowModal, tabs, addTab}) => {
    const [newTabTitle, setNewTabTitle] = useState("");

    const handleAddTab = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (newTabTitle.trim() === "") {
            toast.error("Переданы не все элементы");
            return;
        }
        try {
            await addTab(newTabTitle);
            setNewTabTitle("");
            setShowModal(false)
        } catch (err) {
            toast.error(errorCatch(err));
        }
    };
    return showModal ? (
        <>
            <div className="fixed inset-0 z-30 overflow-y-auto">
                <div
                    className="fixed inset-0 w-full h-full bg-black opacity-40"
                    onClick={() => setShowModal(false)}
                ></div>
                <div className="flex items-center min-h-screen px-4 py-8">
                    <div
                        className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg dark:bg-gray-700">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                            Добавить вкладку
                        </h1>
                        <form
                            onSubmit={(e) => handleAddTab(e)}
                            className="space-y-4 md:space-y-6"
                        >
                            {/*Имя*/}
                            <input
                                type={"text"}
                                value={newTabTitle}
                                onChange={(e) => setNewTabTitle(e.target.value)}
                                className="mt-5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder={""}
                            />
                            <ButtonForm
                                label={"Добавить"}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </>
    ) : null;
};
