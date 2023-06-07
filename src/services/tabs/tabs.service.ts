import {instance} from "../../api/api.interceptors";
import {ICreateTab, ITab} from "./tabs.interface";

export const TabsService = {
    async getAll() {
        return await instance<ITab[]>({
            url: "tabs",
            method: "GET"
        });
    },
    async create(data: ICreateTab) {
        return await instance<ITab>({
            url: "tabs",
            method: "POST",
            data
        });
    },
    async delete(id: string) {
        return await instance<ITab>({
            url: `tabs/${id}`,
            method: "DELETE"
        });
    }
}