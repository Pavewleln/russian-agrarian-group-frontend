import {DeleteTabPopup} from "../../Popups/DeleteTabPopup";
import React, {FC} from "react";
import {ITab} from "../../../../services/tabs/tabs.interface";

interface ITabsPanel {
    tab: ITab;
    selectedTab: string;
    handleTabClick: (_id: string) => void;
    setShowCreateOrderModal: (showOrderModal: boolean) => void;
    setShowCreateTabModal: (showTabModal: boolean) => void;
    removeTab: (_id: string) => Promise<void>;
    setIsDropdownOpen: (showModal: boolean) => void;
    isDropdownOpen: boolean;
}

export const Tab: FC<ITabsPanel> = ({
                                        tab,
                                        handleTabClick,
                                        selectedTab,
                                        setIsDropdownOpen,
                                        removeTab,
                                        isDropdownOpen
                                    }) => {
    return (
        <div className="relative" onClick={() => handleTabClick(tab._id)}>
            <span id="badge-dismiss-green"
                  className={`cursor-pointer inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-green-800 bg-green-100 rounded dark:bg-green-900 dark:text-green-300 ${
                      selectedTab === tab._id ? "bg-green-300" : ""}`}
            >
            {tab.title}
                <button type="button"
                        className="inline-flex items-center p-0.5 ml-2 text-sm text-green-400 bg-transparent rounded-sm hover:bg-green-200 hover:text-green-900 dark:hover:bg-green-800 dark:hover:text-green-300"
                        data-dismiss-target="#badge-dismiss-green" aria-label="Remove">
              <svg aria-hidden="true" className="w-3.5 h-3.5" fill="currentColor"
                   viewBox="0 0 20 20"
                   onClick={(e) => {
                       e.stopPropagation();
                       setIsDropdownOpen(true);
                   }}
                   xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"/>
              </svg>
              <span className="sr-only">Remove badge</span>
            </button>
                {isDropdownOpen &&
                    <DeleteTabPopup
                        TabID={tab._id}
                        removeTab={removeTab}
                        setShowModal={setIsDropdownOpen}
                        showModal={isDropdownOpen}
                    />
                }
            </span>
        </div>
    )
}