import { setToasterState } from "@/redux/reducers/homepageReducer";
import { useAppDispatch } from ".";

const useShowToaster = () => {
    const dispatch = useAppDispatch();

    const showToaster = ({ message, buttonText = '', redirectButtonUrl = '', severity = 'info' }: { message: string, buttonText?: string, redirectButtonUrl?: string, severity?: 'info' | 'error' | 'success' | 'warning' }): void => {
        dispatch(setToasterState({
            openToaster: true,
            toasterMessage: message,
            buttonText,
            redirectButtonUrl,
            severity
        }));
    }

    return { showToaster }
}

export default useShowToaster