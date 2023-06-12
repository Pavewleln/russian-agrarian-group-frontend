import {ICreateOrderResponseStatusAdmin} from "../../../services/order/order.interface";
import {FC, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {SubmitHandler, useForm, useFormState} from "react-hook-form";
import {TextField} from "../Forms/TextField";
import {defaultValidation} from "../../../utils/validation";
import {ButtonForm} from "../Forms/ButtonForm";
import {TabsLocalStorageNames} from "../../../services/tabs/tabs.interface";
import {useAuth} from "../../../hooks/useAuth";
import {IPopup} from "./popup.interface";
import {SelectField} from "../Forms/SelectField";
import {useFetchDrivers} from "../../../hooks/useFetchDrivers";

interface ICreateOrderPopupStatusAdmin extends IPopup {
    addOrder: (data: ICreateOrderResponseStatusAdmin, statusUser: boolean) => Promise<void>;
}

export const CreateOrderPopupStatusAdmin: FC<ICreateOrderPopupStatusAdmin> = ({showModal, setShowModal, addOrder}) => {
    const {
        drivers
    } = useFetchDrivers()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isMyDriver, setIsMyDriver] = useState<boolean>(false)
    const {user} = useAuth()
    const toggleSetIsMyDriver = () => {
        setIsMyDriver(!isMyDriver)
        setValue("driver", "")
    }
    const closeModal = () => {
        setShowModal(false)
        reset({
            freightCost: 0
        });
    }
    // настройка
    const {
        handleSubmit,
        control,
        setValue,
        reset,
        formState: {isValid}
    } = useForm<ICreateOrderResponseStatusAdmin>({
        defaultValues: {
            dateReceived: "",
            manager: "",
            organization: "",
            loadingAddress: "",
            unloadingAddress: "",
            loadingDate: "",
            unloadingDate: "",
            sender: "",
            recipient: "",
            cargo: "",
            transport: "",
            driver: "",
            vehicleNumber: "",
            freightCost: 0,
            documentReceivedDate: "",
            tabID: localStorage.getItem(TabsLocalStorageNames.SELECTEDTABID) || undefined
        },
        mode: "onChange"
    });
    const {errors} = useFormState({
        control
    });
    useEffect(() => {
        if (localStorage.getItem(TabsLocalStorageNames.SELECTEDTABID)) {
            reset({
                tabID: localStorage.getItem(TabsLocalStorageNames.SELECTEDTABID) || undefined
            })
        }
    }, [localStorage.getItem(TabsLocalStorageNames.SELECTEDTABID)])

    const onSubmit: SubmitHandler<ICreateOrderResponseStatusAdmin> = async orderData => {
        try {
            setIsLoading(true)
            if (user) {
                await addOrder(orderData, user.isAdmin)
                closeModal()
            } else {
                toast.error("Ошибка получения данных о пользователе")
            }
        } catch (err) {
            toast.error("Ошибка. Попробуйте позже");
        } finally {
            setIsLoading(false)
        }
    };
    return showModal ? (
        <>
            <div className="fixed inset-0 z-30 overflow-y-auto">
                <div
                    className="fixed inset-0 w-full h-full bg-black opacity-40"
                    onClick={() => closeModal()}
                ></div>
                <div className="flex items-center min-h-screen px-4 py-8">
                    <div
                        className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg dark:bg-gray-700">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                            Добавить запись
                        </h1>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-4 md:space-y-6"
                        >
                            <TextField
                                name={"dateReceived"}
                                type={"date"}
                                control={control}
                                validation={defaultValidation}
                                label={"Дата получения заявки"}
                                placeholder={"Укажите дату получения"}
                                error={errors.dateReceived}
                                id={"dateReceived"}
                            />
                            <TextField
                                name={"manager"}
                                type={"text"}
                                control={control}
                                validation={defaultValidation}
                                label={"Менеджер"}
                                placeholder={"Введите имя менеджера"}
                                error={errors.manager}
                                id={"manager"}
                            />

                            <TextField
                                name={"organization"}
                                type={"text"}
                                control={control}
                                validation={defaultValidation}
                                label={"Организация"}
                                placeholder={"Введите название организации"}
                                error={errors.organization}
                                id={"organization"}
                            />

                            <TextField
                                name={"loadingAddress"}
                                type={"text"}
                                control={control}
                                validation={defaultValidation}
                                label={"Адрес загрузки"}
                                placeholder={"Введите адрес загрузки"}
                                error={errors.loadingAddress}
                                id={"loadingAddress"}
                            />

                            <TextField
                                name={"unloadingAddress"}
                                type={"text"}
                                control={control}
                                validation={defaultValidation}
                                label={"Адрес выгрузки"}
                                placeholder={"Введите адрес выгрузки"}
                                error={errors.unloadingAddress}
                                id={"unloadingAddress"}
                            />

                            <TextField
                                name={"loadingDate"}
                                type={"date"}
                                control={control}
                                validation={defaultValidation}
                                label={"Дата загрузки"}
                                placeholder={"Введите дату загрузки"}
                                error={errors.loadingDate}
                                id={"loadingDate"}
                            />

                            <TextField
                                name={"unloadingDate"}
                                type={"date"}
                                control={control}
                                validation={defaultValidation}
                                label={"Дата выгрузки"}
                                placeholder={"Введите дату выгрузки"}
                                error={errors.unloadingDate}
                                id={"unloadingDate"}
                            />

                            <TextField
                                name={"sender"}
                                type={"text"}
                                control={control}
                                validation={defaultValidation}
                                label={"Грузоотправитель"}
                                placeholder={"Введите имя грузоотправителя"}
                                error={errors.sender}
                                id={"sender"}
                            />

                            <TextField
                                name={"recipient"}
                                type={"text"}
                                control={control}
                                validation={defaultValidation}
                                label={"Грузополучатель"}
                                placeholder={"Введите имя грузополучателя"}
                                error={errors.recipient}
                                id={"recipient"}
                            />

                            <TextField
                                name={"cargo"}
                                type={"text"}
                                control={control}
                                validation={defaultValidation}
                                label={"Номенклатура груза"}
                                placeholder={"Введите номенклатуру груза"}
                                error={errors.cargo}
                                id={"cargo"}
                            />

                            <TextField
                                name={"transport"}
                                type={"text"}
                                control={control}
                                validation={defaultValidation}
                                label={"Перевоз"}
                                placeholder={"Введите перевоз"}
                                error={errors.transport}
                                id={"transport"}
                            />
                            {isMyDriver
                                ? <>
                                   <span
                                       className={"ml-2 text-blue-600 font-medium cursor-pointer hover:underline transition-all"}
                                       onClick={toggleSetIsMyDriver}>
                                        Водителя нет в базе
                                    </span>
                                    <SelectField
                                        id={"driver"}
                                        label={"Водитель"}
                                        name={"driver"}
                                        options={drivers}
                                        control={control}
                                        validation={defaultValidation}
                                        error={errors.driver}
                                    />
                                </>
                                : <>
                                    <span
                                        className={"ml-2 text-blue-600 font-medium cursor-pointer hover:underline transition-all"}
                                        onClick={toggleSetIsMyDriver}>
                                        Водитель есть в базе
                                    </span>
                                    <TextField
                                        name={"driver"}
                                        type={"text"}
                                        control={control}
                                        validation={defaultValidation}
                                        label={"Водитель"}
                                        placeholder={"Введите имя водителя"}
                                        error={errors.driver}
                                        id={"driver"}
                                    />
                                </>
                            }

                            <TextField
                                name={"vehicleNumber"}
                                type={"text"}
                                control={control}
                                validation={defaultValidation}
                                label={"Номер транспортного средства"}
                                placeholder={"Введите номер транспортного средства"}
                                error={errors.vehicleNumber}
                                id={"vehicleNumber"}
                            />

                            <TextField
                                name={"freightCost"}
                                type={"number"}
                                control={control}
                                validation={defaultValidation}
                                label={"Стоимость фрахта"}
                                placeholder={"Введите стоимость фрахта"}
                                error={errors.freightCost}
                                id={"freightCost"}
                            />

                            <TextField
                                name={"documentReceivedDate"}
                                type={"date"}
                                control={control}
                                validation={defaultValidation}
                                label={"Дата получения документов"}
                                placeholder={"Введите дату получения документов"}
                                error={errors.documentReceivedDate}
                                id={"documentReceivedDate"}
                            />
                            <ButtonForm
                                isLoading={isLoading}
                                isValid={isValid}
                                label={"Добавить"}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </>
    ) : null;
}