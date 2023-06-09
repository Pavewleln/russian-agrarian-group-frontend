import React, {FC} from "react";
import {ITab} from "../../../../services/tabs/tabs.interface";

interface IAddOrder {
    tabs: ITab[];
    setShowCreateOrderModal: (showOrderModal: boolean) => void;
}

export const AddOrder: FC<IAddOrder> = ({tabs, setShowCreateOrderModal}) => {
    return tabs.length != 0 ? (
        <button
            onClick={() => setShowCreateOrderModal(true)}
            className={
                "m-2 text-green-700 border-green-700 hover:bg-green-800 focus:ring-green-300 dark:border-green-500 dark:hover:bg-green-500 dark:focus:ring-green-800 hover:text-white border focus:ring-4 focus:outline-none font-medium rounded-lg px-3 py-2 text-xs font-medium text-center dark:text-green-500 dark:hover:text-white text-center mr-2 mb-2 disabled:cursor-not-allowed disabled:border-green-100 disabled:text-green-100"
            }
        >
            Добавить запись
        </button>
    ) : null
}