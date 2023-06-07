import {FC} from "react";

interface IDeleteTabsPopup {
    setIsDropdownOpen: (isDropdownOpen: boolean) => void;
    TabID: string;
    removeTab: (_id: string) => void;
}

export const DeleteTabPopup: FC<IDeleteTabsPopup> = ({setIsDropdownOpen, TabID, removeTab}) => {
    const handleRemoveTab = async () => {
        await removeTab(TabID)
        setIsDropdownOpen(false)
    }
    return (
        <div id="alert-additional-content-2"
             onClick={(e) => e.stopPropagation()}
             className="z-50 cursor-auto transition-all fixed w-68 h-40 left-7 bottom-7 p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
             role="alert">
            <div className="flex items-center">
                <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"></path>
                </svg>
                <span className="sr-only">Info</span>
                <h3 className="text-lg font-medium">Удалить вкладку</h3>
            </div>
            <div className="mt-2 mb-4 text-sm">
                <p>Вы точно хотите удалить вкладку?</p>
                <p>Восстановить ее будет невозможно!</p>
            </div>
            <div className="flex">
                <button type="button"
                        className="text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        onClick={(e) => {
                            e.stopPropagation()
                            handleRemoveTab()
                        }}
                >
                    Удалить
                </button>
                <button type="button"
                        className="text-red-800 bg-transparent border border-red-800 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-red-600 dark:border-red-600 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800"
                        data-dismiss-target="#alert-additional-content-2" aria-label="Close"
                        onClick={(e) => {
                            e.stopPropagation()
                            setIsDropdownOpen(false)
                        }}
                >
                    Назад
                </button>
            </div>
        </div>
    )
}