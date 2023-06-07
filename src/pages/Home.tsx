import {MainLayout} from "../components/layouts/MainLayout";
import {LoaderImage} from "../components/ui/LoaderImage";
import {useOrdersAndTabsPanel} from "../hooks/useOrdersAndTabsPanel";
import React, {useState} from "react";
import {CreateTabPopup} from "../components/ui/Popups/CreateTabPopup";
import {CreateOrderPopup} from "../components/ui/Popups/CreateOrderPopup";
import {DeleteOrdersPopup} from "../components/ui/Popups/DeleteOrdersPopup";
import {HomeTable} from "../components/ui/Home/HomeTable";
import {HomeCatalogFiles} from "../components/ui/Home/HomeCatalogFiles";

export const Home = () => {
    const {
        orders,
        isLoading,
        tabs,
        addTab,
        removeTab,
        removeOrder,
        addOrder,
        selectedTab,
        handleTabClick,
        selectedRows,
        selectAll,
        handleRowSelect,
        handleSelectAll
    } = useOrdersAndTabsPanel()

    // Модальные окна
    const [showTabModal, setShowCreateTabModal] = useState<boolean>(false);
    const [showOrderModal, setShowCreateOrderModal] = useState<boolean>(false);

    return (
        <>
            <MainLayout>
                <div className="p-3">
                    <HomeCatalogFiles
                        removeTab={removeTab}
                        tabs={tabs}
                        selectedTab={selectedTab}
                        handleTabClick={handleTabClick}
                        setShowCreateTabModal={setShowCreateTabModal}
                        setShowCreateOrderModal={setShowCreateOrderModal}
                    />
                    {!isLoading
                        ?
                        <HomeTable
                            tabs={tabs}
                            orders={orders}
                            selectAll={selectAll}
                            selectedRows={selectedRows}
                            handleRowSelect={handleRowSelect}
                            handleSelectAll={handleSelectAll}
                        />
                        : <div className={"flex items-center justify-center mt-52"}>
                            <LoaderImage/>
                        </div>
                    }
                </div>
            </MainLayout>

            {/*Popups*/}
            <DeleteOrdersPopup
                selectedRows={selectedRows}
                handleDeleteSelected={removeOrder}
            />
            <CreateTabPopup
                addTab={addTab}
                tabs={tabs}
                showModal={showTabModal}
                setShowModal={setShowCreateTabModal}
            />
            <CreateOrderPopup
                selectedTab={selectedTab}
                addOrder={addOrder}
                orders={orders}
                setShowModal={setShowCreateOrderModal}
                showModal={showOrderModal}
            />
        </>
    )
}