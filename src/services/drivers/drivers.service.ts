import {IDriver} from "./drivers.interface";
import {instance} from "../../api/api.interceptors";

export const DriversService = {
    async getAll() {
        return await instance<IDriver[]>({
            url: "drivers",
            method: "GET"
        });
    }
};
