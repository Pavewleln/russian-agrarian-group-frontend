import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/outline";
import {Disclosure, Menu, Transition} from "@headlessui/react";
import {LogoutPopup} from "./Popups/LogoutPopup";
import {FC, Fragment, useState} from "react";
import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";
import {classNames} from "../../utils/classNames";

// Для темы
enum Theme {
    LIGHT = "light",
    DARK = "dark"
}

// Навигация
const navigation = [{name: "Главная", href: "/", current: true}];

export const Header: FC = () => {
    const {user} = useAuth();

    // Модальное окно logout
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    return (
        <div className={"relative"}>
            <Disclosure as="nav" className="bg-gray-800">
                {({open}: { open: any }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                            <div className="relative flex h-16 items-center justify-between">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    {/*Кнопка мобильного меню*/}
                                    <Disclosure.Button
                                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="sr-only">
                                            Open main menu
                                        </span>
                                        {open ? (
                                            <XMarkIcon
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <Bars3Icon
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div
                                    className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                    {/*Навигация 1070px*/}
                                    <div className="hidden sm:ml-3 sm:block">
                                        <div className="flex space-x-2">
                                            {navigation.map(item => (
                                                <Link
                                                    key={item.name}
                                                    to={item.href}
                                                    // className={classNames(
                                                    //     pathname === item.href
                                                    //         ? "bg-gray-900 text-white"
                                                    //         : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                                    //     "px-3 py-2 rounded-md text-sm font-medium"
                                                    // )}
                                                    className={"text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"}
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    {/*Дропдаун профиля*/}
                                    <Menu
                                        as="div"
                                        className="relative ml-3 z-10"
                                    >
                                        <Menu.Button
                                            className="cursor-pointer flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <label
                                                className="cursor-pointer relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                                        <span className="font-medium text-gray-600 dark:text-gray-300">
                                                            {user?.name.slice(
                                                                0,
                                                                1
                                                            )}
                                                            {user?.surname.slice(
                                                                0,
                                                                1
                                                            )}
                                                        </span>
                                            </label>
                                        </Menu.Button>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items
                                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                {/*<Menu.Item>*/}
                                                {/*    <Link*/}
                                                {/*        to={"/auth/profile"}*/}
                                                {/*        className={*/}
                                                {/*            "block px-4 py-2 text-sm text-gray-700"*/}
                                                {/*        }*/}
                                                {/*    >*/}
                                                {/*        Профиль*/}
                                                {/*    </Link>*/}
                                                {/*</Menu.Item>*/}
                                                <Menu.Item>
                                                    <>
                                                    <Link
                                                        to={"/auth/profile"}
                                                        className={
                                                            "block px-4 py-2 text-sm text-gray-700 h-full max-h-full w-full flex justify-left"
                                                        }
                                                    >
                                                        Профиль
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            setShowLogoutModal(
                                                                true
                                                            )
                                                        }
                                                        className={
                                                            "block px-4 py-2 text-sm text-gray-700 h-full max-h-full w-full flex justify-left"
                                                        }
                                                    >
                                                        Выйти
                                                    </button>
                                                    </>
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                        </div>
                        {/*Мобильное меню*/}
                        <Disclosure.Panel className="sm:hidden">
                            <div className="space-y-1 px-2 pt-2 pb-3">
                                {navigation.map(item => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={classNames(
                                            item.current
                                                ? " text-white"
                                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                            "block px-3 py-2 rounded-md text-base font-medium"
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>

            {/*Logout*/}
            <LogoutPopup
                showModal={showLogoutModal}
                setShowModal={setShowLogoutModal}
            />
        </div>
    );
};
