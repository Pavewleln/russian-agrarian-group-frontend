import React, {FC} from "react";
import {
    IEditOrderResponseStatusAdmin,
    IEditOrderResponseStatusUser,
    IOrder
} from "../../../../services/order/order.interface";
import {ITab} from "../../../../services/tabs/tabs.interface";
import {useAuth} from "../../../../hooks/useAuth";
import {TableRow} from "./TableRow";
import {TableHead} from "./TableHead";

interface IHomeTable {
    orders: IOrder[];

    selectAll: boolean;
    selectedRows: string[];
    handleRowSelect: (e: React.ChangeEvent<HTMLInputElement>, orderId: string) => void;
    handleSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
    editOrder: (data: IEditOrderResponseStatusAdmin | IEditOrderResponseStatusUser, statusUser: boolean, _id: string) => Promise<void>;

    tabs: ITab[];
}

export const HomeTable: FC<IHomeTable> = ({
                                              tabs,
                                              orders,
                                              selectAll,
                                              handleSelectAll,
                                              selectedRows,
                                              handleRowSelect,
                                              editOrder
                                          }) => {
    return tabs.length === 0 ? (
        <h1 className={"text-center"}>Создайте новую вкладку</h1>
    ) : (
        orders.length
            ? <div className={"relative overflow-x-auto"}>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <TableHead
                        selectAll={selectAll}
                        handleSelectAll={handleSelectAll}
                    />
                    <tbody>
                    {orders.map((order, idx) => (
                        <TableRow
                            editOrder={editOrder}
                            key={order._id}
                            order={order}
                            selectedRows={selectedRows}
                            idx={idx}
                            handleRowSelect={handleRowSelect}
                        />
                    ))}
                    </tbody>
                </table>
            </div>
            : <h1 className={"text-center"}>Добавьте запись</h1>
    )
}