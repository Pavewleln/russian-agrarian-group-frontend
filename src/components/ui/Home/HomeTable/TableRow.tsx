import React, {FC, useMemo} from "react";
import {IOrder} from "../../../../services/order/order.interface";

interface ITableRowTbody {
    order: IOrder;
    idx: number;
    selectedRows: string[];
    handleRowSelect: (e: React.ChangeEvent<HTMLInputElement>, orderId: string) => void;
}

export const TableRow: FC<ITableRowTbody> = ({order, idx, selectedRows, handleRowSelect}) =>{
    return (
        <tr
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
                {order.dateReceived ? new Date(order.dateReceived).toLocaleDateString() : "-"}
            </td>
            <td className="px-3 py-2 text-center">
                {order.manager ? order.manager : "-"}
            </td>
            <td className="px-3 py-2 text-center">
                {order.organization ? order.organization : "-"}
            </td>
            <td className="px-3 py-2 text-center">
                {order.loadingAddress ? order.loadingAddress : "-"}
            </td>
            <td className="px-3 py-2 text-center">
                {order.unloadingAddress ? order.unloadingAddress : "-"}
            </td>
            <td className="px-3 py-2 text-center">
                {order.loadingDate ? new Date(order.loadingDate).toLocaleDateString() : "-"}
            </td>
            <td className="px-3 py-2 text-center">
                {order.unloadingDate ? new Date(order.unloadingDate).toLocaleDateString() : "-"}
            </td>
            <td className="px-3 py-2 text-center">
                {order.sender ? order.sender : "-"}
            </td>
            <td className="px-3 py-2 text-center">
                {order.recipient ? order.recipient : "-"}
            </td>
            <td className="px-3 py-2 text-center">
                {order.cargo ? order.cargo : "-"}
            </td>
            <td className="px-3 py-2 text-center">
                {order.transport ? order.transport : "-"}
            </td>
            <td className="px-3 py-2 text-center">
                {order.driver ? order.driver : "-"}
            </td>
            <td className="px-3 py-2 text-center">
                {order.vehicleNumber ? order.vehicleNumber : "-"}
            </td>
            <td className="px-3 py-2 text-center">
                {order.freightCost ? order.freightCost + " руб/без ндс ит тонну" : "-"}
            </td>
            <td className="px-3 py-2 text-center">
                {order.documentReceivedDate ? new Date(order.documentReceivedDate).toLocaleDateString() : "-"}
            </td>
        </tr>
    )
}