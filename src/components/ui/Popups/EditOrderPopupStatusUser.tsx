import {useAuth} from "../../../hooks/useAuth";
import {FC, useState} from "react";
import {SubmitHandler, useForm, useFormState} from "react-hook-form";
import {IEditOrderResponseStatusUser, IOrder} from "../../../services/order/order.interface";
import {toast} from "react-toastify";
import {TextField} from "../Forms/TextField";
import {defaultValidation} from "../../../utils/validation";
import {ButtonForm} from "../Forms/ButtonForm";
import {IPopup} from "./popup.interface";

interface IEditOrderPopupStatusUser extends IPopup {
    editOrder: (data: IEditOrderResponseStatusUser, statusUser: boolean, _id: string) => Promise<void>;
    order: IOrder
}

export const EditOrderPopupStatusUser: FC<IEditOrderPopupStatusUser> = ({
                                                                            showModal,
                                                                            setShowModal,
                                                                            editOrder,
                                                                            order
                                                                        }) => {
    const {user} = useAuth()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    // настройка
    const {
        handleSubmit,
        control,
        formState: {isValid}
    } = useForm<IEditOrderResponseStatusUser>({
        defaultValues: {
            dateReceived: order.dateReceived,
            manager: order.manager,
            organization: order.organization,
            loadingAddress: order.loadingAddress,
            unloadingAddress: order.unloadingAddress,
            loadingDate: order.loadingDate,
            unloadingDate: order.unloadingDate,
            sender: order.sender,
            recipient: order.recipient,
            cargo: order.cargo,
        },
        mode: "onChange"
    });
    const {errors} = useFormState({
        control
    });

    const onSubmit: SubmitHandler<IEditOrderResponseStatusUser> = async orderData => {
        try {
            setIsLoading(true)
            if (user) {
                await editOrder(orderData, user.isAdmin, order._id)
            } else {
                toast.error("Ошибка получения данных о пользователе")
            }
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
                    onClick={() => setShowModal(false)}
                ></div>
                <div className="flex items-center min-h-screen px-4 py-8">
                    <div
                        className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg dark:bg-gray-700">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                            Изменить запись
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