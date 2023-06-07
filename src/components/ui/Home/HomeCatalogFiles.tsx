import React, {FC, useState} from "react";
import {ITab} from "../../../services/tabs/tabs.interface";
import {DeleteTabPopup} from "../Popups/DeleteTabPopup";

interface IHomeCatalogFiles {
    tabs: ITab[];
    selectedTab: string;
    handleTabClick: (_id: string) => void;
    setShowCreateOrderModal: (showOrderModal: boolean) => void;
    setShowCreateTabModal: (showTabModal: boolean) => void;
    removeTab: (_id: string) => Promise<void>;
}

export const HomeCatalogFiles: FC<IHomeCatalogFiles> = ({
                                                            tabs,
                                                            setShowCreateOrderModal,
                                                            setShowCreateTabModal,
                                                            selectedTab,
                                                            handleTabClick,
                                                            removeTab
                                                        }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    return (
        <>
            {tabs.length != 0 &&
                <button
                    onClick={() => setShowCreateOrderModal(true)}
                    className={
                        "m-2 text-green-700 border-green-700 hover:bg-green-800 focus:ring-green-300 dark:border-green-500 dark:hover:bg-green-500 dark:focus:ring-green-800 hover:text-white border focus:ring-4 focus:outline-none font-medium rounded-lg px-3 py-2 text-xs font-medium text-center dark:text-green-500 dark:hover:text-white text-center mr-2 mb-2 disabled:cursor-not-allowed disabled:border-green-100 disabled:text-green-100"
                    }
                >
                    Добавить запись
                </button>
            }
            {/*Каталог файлов*/}
            <div className={"flex items-center pb-4 overflow-x-auto"}>
                <div className="flex items-center">
                    {/* Добавление кнопки */}
                    <button
                        className="px-3 py-1 ml-2 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:shadow-outline-green"
                        onClick={() => setShowCreateTabModal(true)}
                    >
                        +
                    </button>
                    <div className="flex ml-1">
                        {tabs.map(({_id, title}) => (
                            <div key={_id} className="relative" onClick={() => handleTabClick(_id)}>
                                <span id="badge-dismiss-green"
                                      className={`cursor-pointer inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-green-800 bg-green-100 rounded dark:bg-green-900 dark:text-green-300 ${
                                          selectedTab === _id ? "bg-green-300" : ""}`}
                                >
                                {title}
                                    <button type="button"
                                            className="inline-flex items-center p-0.5 ml-2 text-sm text-green-400 bg-transparent rounded-sm hover:bg-green-200 hover:text-green-900 dark:hover:bg-green-800 dark:hover:text-green-300"
                                            data-dismiss-target="#badge-dismiss-green" aria-label="Remove">
                                  <svg aria-hidden="true" className="w-3.5 h-3.5" fill="currentColor"
                                       viewBox="0 0 20 20"
                                       onClick={(e) => {
                                           e.stopPropagation();
                                           setIsDropdownOpen(true);
                                       }}
                                       xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd"
                                                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                                                clipRule="evenodd"></path></svg>
                                  <span className="sr-only">Remove badge</span>
                                </button>
                                    {isDropdownOpen &&
                                        <DeleteTabPopup TabID={_id} removeTab={removeTab} setIsDropdownOpen={setIsDropdownOpen}/>
                                    }
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}