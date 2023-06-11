import React, {FC, useState} from "react";
import {ITab} from "../../../../services/tabs/tabs.interface";
import {Tab} from "./Tab";
import {AddTab} from "./AddTab";
import {OrderPanel} from "./OrderPanel";

interface IHomeCatalogFiles {
    tabs: ITab[];
    selectedTab: string;
    handleTabClick: (_id: string) => void;
    setShowCreateOrderModal: (showOrderModal: boolean) => void;
    setShowCreateTabModal: (showTabModal: boolean) => void;
    removeTab: (_id: string) => Promise<void>;
    setSearch: (search: string) => void;
    search: string;
    fetchOrders: () => void;
}

export const HomeCatalogTabs: FC<IHomeCatalogFiles> = ({
                                                           tabs,
                                                           setShowCreateOrderModal,
                                                           setShowCreateTabModal,
                                                           selectedTab,
                                                           handleTabClick,
                                                           removeTab,
                                                           search,
                                                           setSearch,
                                                           fetchOrders
                                                       }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    return (
        <>

            <OrderPanel
                search={search}
                fetchOrders={fetchOrders}
                setSearch={setSearch}
                setShowCreateOrderModal={setShowCreateOrderModal}
                tabs={tabs}
            />
            <div className={"flex items-center pb-4 overflow-x-auto"}>
                <div className="flex items-center">
                    {/* Добавление вкладки */}
                    <AddTab
                        setShowCreateTabModal={setShowCreateTabModal}
                    />
                    {/*Каталог вкладок*/}
                    <div className="flex ml-1">
                        {tabs.map((tab) => (
                            <Tab
                                key={tab._id}
                                tab={tab}
                                removeTab={removeTab}
                                handleTabClick={handleTabClick}
                                isDropdownOpen={isDropdownOpen}
                                selectedTab={selectedTab}
                                setIsDropdownOpen={setIsDropdownOpen}
                                setShowCreateOrderModal={setShowCreateOrderModal}
                                setShowCreateTabModal={setShowCreateTabModal}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}