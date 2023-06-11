import {MainLayout} from "../components/layouts/MainLayout";
import {LoaderImage} from "../components/ui/LoaderImage";
import {useOrdersAndTabsPanel} from "../hooks/useOrdersAndTabsPanel";
import React, {useState} from "react";
import {CreateTabPopup} from "../components/ui/Popups/CreateTabPopup";
import {DeleteOrdersPopup} from "../components/ui/Popups/DeleteOrdersPopup";
import {useAuth} from "../hooks/useAuth";
import {CreateOrderPopupStatusUser} from "../components/ui/Popups/CreateOrderPopupStatusUser";
import {CreateOrderPopupStatusAdmin} from "../components/ui/Popups/CreateOrderPopupStatusAdmin";
import {HomeTable} from "../components/ui/Home/HomeTable/HomeTable";
import {HomeCatalogTabs} from "../components/ui/Home/HomeCatalogTabs/HomeCatalogTabs";

export const Home = () => {
    const {user} = useAuth()
    const {
        orders,
        isLoading,
        tabs,
        addTab,
        removeTab,
        addOrder,
        editOrder,
        removeOrder,
        selectedTab,
        handleTabClick,
        selectedRows,
        selectAll,
        handleRowSelect,
        handleSelectAll,
        setSearch,
        search,
        fetchOrders
    } = useOrdersAndTabsPanel()

    // Модальные окна
    const [showTabModal, setShowCreateTabModal] = useState<boolean>(false);
    const [showOrderModal, setShowCreateOrderModal] = useState<boolean>(false);

    return (
        <>
            <MainLayout>
                <div className="p-3">
                    <HomeCatalogTabs
                        removeTab={removeTab}
                        tabs={tabs}
                        selectedTab={selectedTab}
                        handleTabClick={handleTabClick}
                        setShowCreateTabModal={setShowCreateTabModal}
                        setShowCreateOrderModal={setShowCreateOrderModal}
                        setSearch={setSearch}
                        search={search}
                        fetchOrders={fetchOrders}
                    />
                    {!isLoading
                        ?
                        <HomeTable
                            editOrder={editOrder}
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
                showModal={showTabModal}
                setShowModal={setShowCreateTabModal}
            />
            {user?.isAdmin === true
                ? <CreateOrderPopupStatusAdmin
                    addOrder={addOrder}
                    setShowModal={setShowCreateOrderModal}
                    showModal={showOrderModal}
                />
                : <CreateOrderPopupStatusUser
                    addOrder={addOrder}
                    setShowModal={setShowCreateOrderModal}
                    showModal={showOrderModal}
                />
            }
        </>
    )
}