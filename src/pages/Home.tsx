import {MainLayout} from "../components/layouts/MainLayout";
import {LoaderImage} from "../components/ui/LoaderImage";
import {useOrdersAndTabsPanel} from "../hooks/useOrdersAndTabsPanel";
import React, {useState} from "react";
import {CreateTabPopup} from "../components/ui/Popups/CreateTabPopup";
import {CreateOrderPopup} from "../components/ui/Popups/CreateOrderPopup";
import useContextMenu from "../hooks/useContextMenu";

export const Home = () => {
    // Хуки
    const {
        handleContextMenuClose,
        contextMenuTarget,
        contextMenuVisible,
        contextMenuRef,
        handleContextMenu
    } = useContextMenu()

    const {
        orders,
        isLoading,
        tabs,
        addTab,
        removeTab,
        removeOrder,
        addOrder,
        selectedTab,
        handleTabClick
    } = useOrdersAndTabsPanel()

    // Модальные окна
    const [showTabModal, setShowCreateTabModal] = useState<boolean>(false);
    const [showOrderModal, setShowCreateOrderModal] = useState<boolean>(false);

    const handleContextMenuDelete = async () => {
        await removeTab(contextMenuTarget);
        handleContextMenuClose();
    };

    return (
        <>
            <MainLayout>
                {!isLoading
                    ? <div className="p-3">
                        {tabs.length != 0 &&
                            <button
                                onClick={() => setShowCreateOrderModal(true)}
                                className={
                                    "m-2 text-green-700 border-green-700 hover:bg-green-800 focus:ring-green-300 dark:border-green-500 dark:hover:bg-green-500 dark:focus:ring-green-800 hover:text-white border focus:ring-4 focus:outline-none font-medium rounded-lg px-3 py-2 text-xs font-medium text-center dark:text-primary-500 dark:hover:text-white text-center mr-2 mb-2 disabled:cursor-not-allowed disabled:border-primary-100 disabled:text-primary-100"
                                }
                            >
                                Добавить запись
                            </button>
                        }
                        {/*Каталог файлов*/}
                        <div className={"flex items-center pb-4"}>
                            <div className="flex items-center">
                                {/* Добавление кнопки */}
                                <button
                                    className="px-4 py-2 ml-2 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:shadow-outline-primary"
                                    onClick={() => setShowCreateTabModal(true)}
                                >
                                    +
                                </button>
                                <div className="flex ml-1">
                                    {tabs.map(({_id, title}) => (
                                        <div key={_id} className="relative">
                                            <button
                                                className={`mx-1 px-4 py-2 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:shadow-outline-primary ${
                                                    selectedTab === _id ? "bg-primary-500 text-white" : ""
                                                }`}
                                                onContextMenu={(e) => handleContextMenu(e, _id)}
                                                onClick={() => handleTabClick(_id)}
                                            >
                                                {title}
                                            </button>
                                            {_id === contextMenuTarget && contextMenuVisible && (
                                                <div
                                                    ref={contextMenuRef}
                                                    className="absolute top-12 right-0 w-40 bg-white border border-gray-300 shadow rounded-lg p-2 z-10"
                                                    onBlur={handleContextMenuClose}
                                                >
                                                    <button className="w-full py-1 hover:bg-gray-100"
                                                            onClick={handleContextMenuDelete}>
                                                        Удалить
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/*Таблица*/}
                        {tabs.length === 0
                            ? <h1 className={"text-center"}>Создайте новую вкладку</h1>
                            : orders.length
                                ? <div className={"relative overflow-x-auto"}>
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead
                                            className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="p-2">
                                                <div className="flex items-center">
                                                    <input id="checkbox-all-search" type="checkbox"
                                                           className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                                    <label htmlFor="checkbox-all-search"
                                                           className="sr-only">checkbox</label>
                                                </div>
                                            </th>
                                            <th scope="col" className="px-3 py-2 text-center">
                                                № заявки
                                            </th>
                                            <th scope="col" className="px-3 py-3 text-center">
                                                Дата получения заявки
                                            </th>
                                            <th scope="col" className="px-3 py-2 text-center">
                                                Менеджер
                                            </th>
                                            <th scope="col" className="px-3 py-2 text-center">
                                                Организация
                                            </th>
                                            <th scope="col" className="px-3 py-2 text-center">
                                                Загрузка
                                            </th>
                                            <th scope="col" className="px-3 py-2 text-center">
                                                Выгрузка
                                            </th>
                                            <th scope="col" className="px-3 py-2 text-center">
                                                Дата загрузки
                                            </th>
                                            <th scope="col" className="px-3 py-2 text-center">
                                                Дата выгрузки
                                            </th>
                                            <th scope="col" className="px-3 py-2 text-center">
                                                Грузоотправитель
                                            </th>
                                            <th scope="col" className="px-3 py-2 text-center">
                                                Грузополучатель
                                            </th>
                                            <th scope="col" className="px-3 py-2 text-center">
                                                Номенклатура груза
                                            </th>
                                            <th scope="col" className="px-3 py-2 text-center">
                                                Перевоз
                                            </th>
                                            <th scope="col" className="px-3 py-2 text-center">
                                                Водитель
                                            </th>
                                            <th scope="col" className="px-3 py-2 text-center">
                                                Номер ТС
                                            </th>
                                            <th scope="col" className="px-3 py-2 text-center">
                                                Стоимость фрахта
                                            </th>
                                            <th scope="col" className="px-3 py-2 text-center">
                                                Дата получения документов
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {orders.map((order) => (
                                            <tr key={order._id}
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <td className="w-4 p-2">
                                                    <div className="flex items-center">
                                                        <input id="checkbox-table-search-1" type="checkbox"
                                                               className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                                        <label htmlFor="checkbox-table-search-1"
                                                               className="sr-only">checkbox</label>
                                                    </div>
                                                </td>
                                                <th scope="row"
                                                    className="py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                                                    {order._id}
                                                </th>
                                                <td className="px-3 py-2 text-center">
                                                    {new Date(order.dateReceived).toLocaleDateString()}
                                                </td>
                                                <td className="px-3 py-2 text-center">
                                                    {order.manager}
                                                </td>
                                                <td className="px-3 py-2 text-center">
                                                    {order.organization}
                                                </td>
                                                <td className="px-3 py-2 text-center">
                                                    {order.loadingAddress}
                                                </td>
                                                <td className="px-3 py-2 text-center">
                                                    {order.unloadingAddress}
                                                </td>
                                                <td className="px-3 py-2 text-center">
                                                    {new Date(order.loadingDate).toLocaleDateString()}
                                                </td>
                                                <td className="px-3 py-2 text-center">
                                                    {new Date(order.unloadingDate).toLocaleDateString()}
                                                </td>
                                                <td className="px-3 py-2 text-center">
                                                    {order.sender}
                                                </td>
                                                <td className="px-3 py-2 text-center">
                                                    {order.recipient}
                                                </td>
                                                <td className="px-3 py-2 text-center">
                                                    {order.cargo}
                                                </td>
                                                <td className="px-3 py-2 text-center">
                                                    {order.transport}
                                                </td>
                                                <td className="px-3 py-2 text-center">
                                                    {order.driver}
                                                </td>
                                                <td className="px-3 py-2 text-center">
                                                    {order.vehicleNumber}
                                                </td>
                                                <td className="px-3 py-2 text-center">
                                                    {order.freightCost} руб/без ндс ит тонну
                                                </td>
                                                <td className="px-3 py-2 text-center">
                                                    {new Date(order.documentReceivedDate).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                                : <h1 className={"text-center"}>Добавьте запись</h1>
                        }
                    </div>
                    : <div className={"flex items-center justify-center mt-52"}>
                        <LoaderImage/>
                    </div>
                }
            </MainLayout>

            {/*CreateTabPopup*/}
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