import { setToasterState } from "@/redux/reducers/homepageReducer";
import { useAppDispatch } from ".";

const useShowToaster = () => {
    const dispatch = useAppDispatch();

    const showToaster = ({ message, buttonText = '', redirectButtonUrl = '' }: { message: string, buttonText?: string, redirectButtonUrl?: string }): void => {
        dispatch(setToasterState({
            openToaster: true,
            toasterMessage: message,
            buttonText,
            redirectButtonUrl
        }));
    }

    return { showToaster }
}

export default useShowToaster