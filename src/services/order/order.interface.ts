export interface IOrder {
    // № ЗАЯВКИ
    _id: string;
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

export interface ICreateOrderResponseStatusAdmin {
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
export interface ICreateOrderResponseStatusUser {
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
    // НАЗВАНИЕ ВКЛАДКИ
    tabID: string;
}
