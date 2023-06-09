import React, {FC} from "react";

interface IAddTab {
    setShowCreateTabModal: (showTabModal: boolean) => void;
}

export const AddTab: FC<IAddTab> = ({setShowCreateTabModal}) => {
    return (
        <button
            className="px-3 py-1 ml-2 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:shadow-outline-green"
            onClick={() => setShowCreateTabModal(true)}
        >
            +
        </button>
    )
}