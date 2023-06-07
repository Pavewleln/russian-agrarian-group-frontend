import {instance} from "../../api/api.interceptors";
import {ICreateOrderResponse, IOrder} from "./order.interface";
import {TabsLocalStorageNames} from "../tabs/tabs.interface";

export const OrdersService = {
    async getAll() {
        return await instance<IOrder[]>({
            url: "orders",
            method: "GET",
            params: {
                tabID: localStorage.getItem(TabsLocalStorageNames.SELECTEDTABID) || ""
            }
        });
    },
    async create(data: ICreateOrderResponse) {
        return await instance<IOrder>({
            url: "orders",
            method: "POST",
            data
        });
    },
    async delete(_id: string) {
        return await instance<IOrder>({
            url: `orders/${_id}`,
            method: "PATCH"
        });
    }
};
