import React, {FC} from "react";
import {IOrder} from "../../../services/order/order.interface";
import {ITab} from "../../../services/tabs/tabs.interface";

interface IHomeTable {
    orders: IOrder[];

    selectAll: boolean;
    selectedRows: string[];
    handleRowSelect: (e: React.ChangeEvent<HTMLInputElement>, orderId: string) => void;
    handleSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;

    tabs: ITab[];
}

export const HomeTable: FC<IHomeTable> = ({
                                              tabs,
                                              orders,
                                              selectAll,
                                              handleSelectAll,
                                              selectedRows,
                                              handleRowSelect
                                          }) => {
    return tabs.length === 0 ? (
        <h1 className={"text-center"}>Создайте новую вкладку</h1>
    ) : (
        orders.length
            ? <div className={"relative overflow-x-auto"}>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead
                        className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="p-2">
                            <div className="flex items-center">
                                <input id="checkbox-all-search" type="checkbox"
                                       className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                       checked={selectAll} onChange={handleSelectAll}/>
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
                    {orders.map((order, idx) => (
                        <tr key={order._id}
                            className={`border-b hover:bg-gray-50 ${!order.status ? 'opacity-50 bg-red-100' : 'bg-green-100'}`}
                        >
                            <td className="w-4 p-2">
                                <div className="flex items-center">
                                    <input id="checkbox-table-search-1" type="checkbox"
                                           className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                           checked={selectedRows.includes(order._id)}
                                           onChange={(e) => handleRowSelect(e, order._id)}
                                    />
                                    <label htmlFor="checkbox-table-search-1"
                                           className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"></label>
                                </div>
                            </td>
                            <th scope="row"
                                className="py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                                {idx + 1}
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
    )
}