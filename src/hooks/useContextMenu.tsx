import React, { useState, useEffect, useRef } from "react";

const useContextMenu = () => {
    const contextMenuRef = useRef<HTMLDivElement>(null);
    const [contextMenuVisible, setContextMenuVisible] = useState<boolean>(false);
    const [contextMenuTarget, setContextMenuTarget] = useState("");

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (
                contextMenuRef.current &&
                !contextMenuRef.current.contains(event.target)
            ) {
                setContextMenuVisible(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [contextMenuRef]);

    const handleContextMenu = (e: React.MouseEvent<HTMLButtonElement>, _id: string) => {
        e.preventDefault();
        setContextMenuTarget(_id);
        setContextMenuVisible(true);
        contextMenuRef.current?.focus();
        contextMenuRef.current?.setAttribute("tabindex", "0");
    };

    const handleContextMenuClose = () => {
        setContextMenuVisible(false);
        setContextMenuTarget("");
    };

    return {
        contextMenuRef,
        contextMenuVisible,
        contextMenuTarget,
        handleContextMenu,
        handleContextMenuClose,
    };
};

export default useContextMenu;