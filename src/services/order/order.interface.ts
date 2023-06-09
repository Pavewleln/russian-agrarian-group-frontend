// Base order interface
export interface IOrderBase {
    // ДАТА ПОЛУЧЕНИЯ ЗАЯВКИ
    dateReceived: string;
    // МЕНЕДЖЕР
    manager: string;
    // ОРГАНИЗАЦИЯ
    organization: string;
    // ЗАГРУЗКА
    loadingAddress: string;
    // ВЫГРУЗКА
    unloadingAddress: string;
    // ДАТА ЗАГРУЗКИ
    loadingDate: string;
    // ДАТА ВЫГРУЗКИ
    unloadingDate: string;
    // ГРУЗООТПРАВИТЕЛЬ
    sender: string;
    // ГРУЗОПОЛУЧАТЕЛЬ
    recipient: string;
    // НОМЕНКЛАТУРА ГРУЗА
    cargo: string;
}

// Order
export interface IOrder extends IOrderBase {
    // № ЗАЯВКИ
    _id: string;
    // ПЕРЕВОЗ
    transport: string;
    // ВОДИТЕЛЬ
    driver: string;
    // НОМЕР ТС
    vehicleNumber: string;
    // СТОИМОСТЬ ФРАХТА
    freightCost: number;
    // ДАТА ПОЛУЧЕНИЯ ДОКУМЕНТОВ
    documentReceivedDate: string;
    // НАЗВАНИЕ ВКЛАДКИ
    tabID: string;
    // СТАТУС ЗАПИСИ
    status: boolean;
}

// Create order
export interface ICreateOrderResponseStatusAdmin extends IOrderBase {
    // ПЕРЕВОЗ
    transport: string;
    // ВОДИТЕЛЬ
    driver: string;
    // НОМЕР ТС
    vehicleNumber: string;
    // СТОИМОСТЬ ФРАХТА
    freightCost: number;
    // ДАТА ПОЛУЧЕНИЯ ДОКУМЕНТОВ
    documentReceivedDate: string;
    // НАЗВАНИЕ ВКЛАДКИ
    tabID: string;
}

export interface ICreateOrderResponseStatusUser extends IOrderBase {
    // НАЗВАНИЕ ВКЛАДКИ
    tabID: string;
}

// Edit order
export interface IEditOrderResponseStatusAdmin extends IOrderBase {
    // ПЕРЕВОЗ
    transport: string;
    // ВОДИТЕЛЬ
    driver: string;
    // НОМЕР ТС
    vehicleNumber: string;
    // СТОИМОСТЬ ФРАХТА
    freightCost: number;
    // ДАТА ПОЛУЧЕНИЯ ДОКУМЕНТОВ
    documentReceivedDate: string;
}

export interface IEditOrderResponseStatusUser extends IOrderBase {
    // НОМЕНКЛАТУРА ГРУЗА
    cargo: string;
}