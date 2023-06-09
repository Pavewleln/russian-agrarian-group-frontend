import React, {FC} from "react";
import {IOrder} from "../../../../services/order/order.interface";
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
    const {user} = useAuth()
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