import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {errorCatch} from "../api/api.helper";
import {IDriver} from "../services/drivers/drivers.interface";
import {DriversService} from "../services/drivers/drivers.service";
interface IUseFetchDrivers {
    drivers: IDriver[],
    fetchDrivers: () => void
}
export const useFetchDrivers = (): IUseFetchDrivers => {
    const [drivers, setDrivers] = useState<IDriver[]>([]);
    const fetchDrivers = async () => {
        try {
            const {data} = await DriversService.getAll();
            setDrivers(data);
        } catch (err) {
            toast.error(errorCatch(err));
        }
    };
    useEffect(() => {
        fetchDrivers()
    }, [])
    return {
        drivers,
        fetchDrivers
    }
}