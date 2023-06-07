import {useEffect, useState} from "react";
import {ICreateOrderResponse, IOrder} from "../services/order/order.interface";
import {OrdersService} from "../services/order/order.service";
import {ITab, TabsLocalStorageNames} from "../services/tabs/tabs.interface";
import {TabsService} from "../services/tabs/tabs.service";
import {toast} from "react-toastify";
import {errorCatch} from "../api/api.helper";

interface IUseOrdersAndTabsPanel {
    isLoading: boolean;

    orders: IOrder[];
    addOrder: (data: ICreateOrderResponse) => Promise<void>;
    removeOrder: (_id: string) => Promise<void>;

    tabs: ITab[];
    addTab: (title: string) => Promise<void>;
    removeTab: (_id: string) => Promise<void>;

    selectedTab: string,
    handleTabClick: (_id: string) => void;
}

export const useOrdersAndTabsPanel = (): IUseOrdersAndTabsPanel => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [tabs, setTabs] = useState<ITab[]>([]);
    const [selectedTab, setSelectedTab] = useState<string>(
        localStorage.getItem(TabsLocalStorageNames.SELECTEDTABID) || ""
    );
    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            const {data} = await OrdersService.getAll();
            setOrders(data);
        } catch (err) {
            toast.error(errorCatch(err));
        } finally {
            setIsLoading(false);
        }
    };
    const fetchTabs = async () => {
        try {
            const {data} = await TabsService.getAll();
            setTabs(data);
        } catch (err) {
            toast.error(errorCatch(err));
        } finally {
        }
    };
    // Orders
    useEffect(() => {
        fetchOrders();
        fetchTabs();
    }, []);

    const addOrder = async (order: ICreateOrderResponse) => {
        try {
            const {data} = await OrdersService.create(order);
            setOrders([...orders, data]);
        } catch (err) {
            toast.error(errorCatch(err));
        }
    };

    const removeOrder = async (_id: string) => {
        try {
            await TabsService.delete(_id);
            setOrders(orders.filter((order) => order._id !== _id));
        } catch (err) {
            toast.error(errorCatch(err));
        }
    };

    const addTab = async (title: string) => {
        try {
            const {data} = await TabsService.create({title});
            setTabs([...tabs, {_id: data._id, title: data.title}]);
            localStorage.setItem(TabsLocalStorageNames.SELECTEDTABID, data._id);
            setSelectedTab(data._id);
            // ЗАГРУЗКА НОВЫХ ЗАПИСЕЙ НА ОСНОВЕ ВЫБРАННОЙ ВКЛАДКИ
            await fetchOrders();
        } catch (err) {
            toast.error(errorCatch(err));
        }
    };

    const removeTab = async (_id: string) => {
        try {
            await TabsService.delete(_id);

            const newTabs = tabs.filter((tab) => tab._id !== _id);
            setTabs(newTabs);

            let newSelectedTab = selectedTab;

            if (selectedTab === findTabTitleById(tabs, _id)) {
                const selectedIndex = tabs.findIndex((tab) => tab._id === _id);

                if (newTabs.length > 0) {
                    newSelectedTab = newTabs[selectedIndex % newTabs.length]._id;
                } else {
                    newSelectedTab = "";
                }

                setSelectedTab(newSelectedTab);
                localStorage.setItem(TabsLocalStorageNames.SELECTEDTABID, newSelectedTab);

                // ЗАГРУЗКА НОВЫХ ЗАПИСЕЙ НА ОСНОВЕ ВЫБРАННОЙ ВКЛАДКИ
                await fetchOrders();
            }
        } catch (err) {
            toast.error(errorCatch(err));
        }
    };

    // localStorage Tabs
    useEffect(() => {
        let defaultSelectedTab = "";
        if (
            !localStorage.getItem(TabsLocalStorageNames.SELECTEDTABID) ||
            localStorage.getItem(TabsLocalStorageNames.SELECTEDTABID) === "null" ||
            localStorage.getItem(TabsLocalStorageNames.SELECTEDTABID) === "undefined"
        ) {
            defaultSelectedTab = tabs.length > 0 ? tabs[0]._id : "";
            localStorage.setItem(TabsLocalStorageNames.SELECTEDTABID, defaultSelectedTab);
            setSelectedTab(defaultSelectedTab);
        } else {
            defaultSelectedTab = localStorage.getItem(TabsLocalStorageNames.SELECTEDTABID) || "";
            setSelectedTab(defaultSelectedTab);
        }
    }, [tabs]);

    const handleTabClick = async (_id: string) => {
        localStorage.setItem(TabsLocalStorageNames.SELECTEDTABID, _id);
        setSelectedTab(_id);
        // ЗАГРУЗКА НОВЫХ ЗАПИСЕЙ НА ОСНОВЕ ВЫБРАННОЙ ВКЛАДКИ
        await fetchOrders();
    };

    const findTabTitleById = (tabs: ITab[], id: string): string => {
        const tab = tabs.find((tab) => tab._id === id);
        return tab ? tab._id : "";
    };

    return {isLoading, orders, tabs, addTab, removeTab, removeOrder, addOrder, selectedTab, handleTabClick};
};