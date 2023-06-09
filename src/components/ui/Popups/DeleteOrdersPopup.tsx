import {FC} from "react";

interface IDeleteOrdersPopup {
    selectedRows: string[],
    handleDeleteSelected: () => void
}

export const DeleteOrdersPopup: FC<IDeleteOrdersPopup> = ({selectedRows, handleDeleteSelected}) => {
    return selectedRows.length > 0 ? (
        <div id="alert-additional-content-3"
             className="transition-all fixed w-68 h-32 left-7 bottom-7 p-4 mb-4 text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
             role="alert">
            <div className="flex items-center">
                <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"></path>
                </svg>
                <h3 className="text-lg font-medium">Хотите изменить статус записи?</h3>
            </div>
            <div className="mt-2 mb-4 text-sm">
                Вы отметили записей: <b>{selectedRows.length}</b>
            </div>
            <div className="flex">
                <button type="button"
                        onClick={handleDeleteSelected}
                        className="text-white bg-green-800 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    Изменить статус записи
                </button>
            </div>
        </div>
    ) : null
}