import React, {FC} from "react";

interface ITabsPanel {
    selectedTab: string;
    handleTabClick: (_id: string) => void;
}

export const ArchiveTab: FC<ITabsPanel> = ({
                                               handleTabClick,
                                               selectedTab
                                           }) => {
    const tab = {
        _id: "archive",
        title: "Архив"
    }
    return (
        <div className="relative" onClick={() => handleTabClick(tab._id)}>
            <span id="badge-dismiss-gray"
                  className={`cursor-pointer inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-gray-800 bg-gray-100 rounded dark:bg-gray-900 dark:text-gray-300 ${
                      selectedTab === tab._id ? "bg-gray-300" : ""}`}
            >
            {tab.title}
            </span>
        </div>
    )
}