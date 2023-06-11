import React, {FC} from "react";
import {ITab} from "../../../../services/tabs/tabs.interface";

interface IAddOrder {
    tabs: ITab[];
    setShowCreateOrderModal: (showOrderModal: boolean) => void;
    setSearch: (search: string) => void;
    search: string;
    fetchOrders: () => void;
}

export const OrderPanel: FC<IAddOrder> = ({tabs, setShowCreateOrderModal, search, setSearch, fetchOrders}) => {

    return (
        <div className={"flex items-center"}>
            <button
                onClick={() => setShowCreateOrderModal(true)}
                className={
                    "m-2 text-green-700 border-green-700 hover:bg-green-800 focus:ring-green-300 hover:text-white border focus:ring-4 focus:outline-none font-medium rounded-lg px-3 py-2 text-xs font-medium text-center dark:text-green-500 dark:hover:text-white text-center mr-2 mb-2 disabled:cursor-not-allowed disabled:border-green-100 disabled:text-green-100"
                }
            >
                Добавить запись
            </button>
            <input
                type={"date"}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2 max-w-xs"
                placeholder={"Поиск"}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className={"flex items-center"}>
                <button
                    className={"m-2 text-green-700 border-green-700 hover:bg-green-800 focus:ring-green-300 hover:text-white border focus:ring-4 focus:outline-none font-medium rounded-lg px-3 py-2 text-xs font-medium text-center dark:text-green-500 dark:hover:text-white text-center mr-2 mb-2 disabled:cursor-not-allowed disabled:border-green-100 disabled:text-green-100"}
                    onClick={fetchOrders}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
                    </svg>
                </button>
                {search &&
                    <button type="button"
                            onClick={() => setSearch("")}
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="defaultModal">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"></path>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                }
            </div>
        </div>)
}