import {ICreateOrderResponse, IOrder} from "../../../services/order/order.interface";
import {FC, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {SubmitHandler, useForm, useFormState} from "react-hook-form";
import {TextField} from "../Forms/TextField";
import {defaultValidation} from "../../../utils/validation";
import {ButtonForm} from "../Forms/ButtonForm";
import {TabsLocalStorageNames} from "../../../services/tabs/tabs.interface";

interface IPopup {
    orders: IOrder[];
    addOrder: (data: ICreateOrderResponse) => Promise<void>;
    showModal: boolean;
    setShowModal: (showModal: boolean) => void;
    selectedTab: string
}

export const CreateOrderPopup: FC<IPopup> = ({showModal, setShowModal, orders, addOrder, selectedTab}) => {
    const closeModal = () => {
        setShowModal(false)
        reset({
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
        });
    }
    const [isLoading, setIsLoading] = useState<boolean>(false)
    // настройка
    const {
        handleSubmit,
        control,
        reset,
        formState: {isValid}
    } = useForm<ICreateOrderResponse>({
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
        if(localStorage.getItem(TabsLocalStorageNames.SELECTEDTABID)) {
            reset({
                tabID: localStorage.getItem(TabsLocalStorageNames.SELECTEDTABID) || undefined
            })
        }
    }, [localStorage.getItem(TabsLocalStorageNames.SELECTEDTABID)])

    const onSubmit: SubmitHandler<ICreateOrderResponse> = async orderData => {
        try {
            setIsLoading(true)
            await addOrder(orderData)
            reset({
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
            });
            setIsLoading(false)
            setShowModal(false)
        } catch (err) {
            toast.error("Ошибка. Попробуйте позже");
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