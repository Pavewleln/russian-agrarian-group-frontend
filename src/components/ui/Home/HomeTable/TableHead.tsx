import React, {FC} from "react";

interface ITableHead {
    selectAll: boolean;
    handleSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TableHead: FC<ITableHead> = ({selectAll, handleSelectAll}) => {
    return (
        <thead
            className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
            <th scope="col" className="p-2">
                <div className="flex items-center">
                    <input id="checkbox-all-search" type="checkbox"
                           className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                           checked={selectAll} onChange={handleSelectAll}/>
                    <label htmlFor="checkbox-all-search"
                           className="sr-only">checkbox</label>
                </div>
            </th>
            <th scope="col" className="px-3 py-2 text-center">
                № заявки
            </th>
            <th scope="col" className="px-3 py-3 text-center">
                Дата получения заявки
            </th>
            <th scope="col" className="px-3 py-2 text-center">
                Менеджер
            </th>
            <th scope="col" className="px-3 py-2 text-center">
                Организация
            </th>
            <th scope="col" className="px-3 py-2 text-center">
                Загрузка
            </th>
            <th scope="col" className="px-3 py-2 text-center">
                Выгрузка
            </th>
            <th scope="col" className="px-3 py-2 text-center">
                Дата загрузки
            </th>
            <th scope="col" className="px-3 py-2 text-center">
                Дата выгрузки
            </th>
            <th scope="col" className="px-3 py-2 text-center">
                Грузоотправитель
            </th>
            <th scope="col" className="px-3 py-2 text-center">
                Грузополучатель
            </th>
            <th scope="col" className="px-3 py-2 text-center">
                Номенклатура груза
            </th>
            <th scope="col" className="px-3 py-2 text-center">
                Перевоз
            </th>
            <th scope="col" className="px-3 py-2 text-center">
                Водитель
            </th>
            <th scope="col" className="px-3 py-2 text-center">
                Номер ТС
            </th>
            <th scope="col" className="px-3 py-2 text-center">
                Стоимость фрахта
            </th>
            <th scope="col" className="px-3 py-2 text-center">
                Дата получения документов
            </th>
        </tr>
        </thead>
    )
}