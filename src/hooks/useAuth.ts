import {useAppSelector} from "./useAppSelector";

// Достаем state из user.slice.tsx

export const useAuth = () => useAppSelector(state => state.user);
