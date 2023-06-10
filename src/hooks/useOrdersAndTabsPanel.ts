import React, {useEffect, useState} from "react";
import {
    ICreateOrderResponseStatusAdmin,
    ICreateOrderResponseStatusUser,
    IEditOrderResponseStatusAdmin,
    IEditOrderResponseStatusUser,
    IOrder
} from "../services/order/order.interface";
import {OrdersService} from "../services/order/order.service";
import {ITab, TabsLocalStorageNames} from "../services/tabs/tabs.interface";
import {TabsService} from "../services/tabs/tabs.service";
import {toast} from "react-toastify";
import {errorCatch} from "../api/api.helper";

interface IUseOrdersAndTabsPanel {
    isLoading: boolean;

    orders: IOrder[];
    addOrder: (data: ICreateOrderResponseStatusAdmin | ICreateOrderResponseStatusUser, statusUser: boolean) => Promise<void>;
    editOrder: (data: IEditOrderResponseStatusAdmin | IEditOrderResponseStatusUser, statusUser: boolean, _id: string) => Promise<void>;
    removeOrder: () => Promise<void>;

    selectAll: boolean;
    selectedRows: string[];
    handleRowSelect: (e: React.ChangeEvent<HTMLInputElement>, orderId: string) => void;
    handleSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;

    tabs: ITab[];
    addTab: (title: string) => Promise<void>;
    removeTab: (_id: string) => Promise<void>;

    selectedTab: string;
    handleTabClick: (_id: string) => void;
}

export const useOrdersAndTabsPanel = (): IUseOrdersAndTabsPanel => {
    // Логика выделения и удаления записей
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [selectAll, setSelectAll] = useState<boolean>(false);

    // Логика загрузки
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Логика сохранения пришедших данных
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [tabs, setTabs] = useState<ITab[]>([]);
    const [selectedTab, setSelectedTab] = useState<string>(
        localStorage.getItem(TabsLocalStorageNames.SELECTEDTABID) || ""
    );

    // Получение данных
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

    // Orders and Tabs
    useEffect(() => {
        fetchOrders();
        fetchTabs();
    }, []);

    // Order
    const addOrder = async (order: ICreateOrderResponseStatusAdmin | ICreateOrderResponseStatusUser, statusUser: boolean) => {
        try {
            const {data} = await OrdersService.create(order, statusUser);
            setOrders([...orders, data]);
        } catch (err) {
            toast.error(errorCatch(err));
        }
    };
    const editOrder = async (order: IEditOrderResponseStatusAdmin | IEditOrderResponseStatusUser, statusUser: boolean, _id: string) => {
        try {
            const {data} = await OrdersService.edit(order, statusUser, _id);
            const updatedOrders = orders.map((item) => (item._id === data._id ? data : item));
            setOrders(updatedOrders);
        } catch (err) {
            toast.error(errorCatch(err));
        }
    };

    const removeOrder = async () => {
        try {
            await Promise.all(selectedRows.map((_id) => OrdersService.delete(_id)));
            const updatedOrders = orders.map((order) =>
                selectedRows.includes(order._id) ? {...order, status: !order.status} : order
            );
            setOrders(updatedOrders);
            setSelectedRows([]);
            setSelectAll(false)
        } catch (err) {
            toast.error(errorCatch(err));
        }
    };

    const handleRowSelect = (e: React.ChangeEvent<HTMLInputElement>, orderId: string) => {
        if (e.target.checked) {
            setSelectedRows([...selectedRows, orderId]);
        } else {
            setSelectedRows(selectedRows.filter(id => id !== orderId));
        }
    }

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedRows(orders.map(order => order._id));
        } else {
            setSelectedRows([]);
        }
        setSelectAll(e.target.checked);
    }

    // Tab
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
        await fetchOrders();
    };

    const findTabTitleById = (tabs: ITab[], id: string): string => {
        const tab = tabs.find((tab) => tab._id === id);
        return tab ? tab._id : "";
    };

    return {
        isLoading,
        orders,
        tabs,
        addTab,
        removeTab,
        removeOrder,
        addOrder,
        selectedTab,
        handleTabClick,
        selectedRows,
        handleRowSelect,
        handleSelectAll,
        selectAll,
        editOrder
    };
};