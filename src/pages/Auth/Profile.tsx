import { useEffect, useState } from "react"
import { MainLayout } from "../../components/layouts/MainLayout"
import { LoaderImage } from "../../components/ui/LoaderImage"
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";

const Profile = () => {
    const {profile} = useActions();
    const {isLoading, user} = useAppSelector(state => state.user)
    useEffect(() => {
        profile()
    }, [])
    return (
        <MainLayout>
                {!isLoading
                ?
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Профиль</h2>
                    <p className="text-lg mb-2"><span className="font-medium">Имя:</span> {user?.name}</p>
                    <p className="text-lg mb-2"><span className="font-medium">Фамилия:</span> {user?.surname}</p>
                    <p className="text-lg mb-2"><span className="font-medium">Email:</span> {user?.email}</p>
                </div>
                : 
                <div className={"flex items-center justify-center mt-52"}>
                    <LoaderImage/>
                </div>}
        </MainLayout>
    )
}

export default Profile