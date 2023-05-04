import { createContext } from "react";
import { useReducer, useContext } from "react";

const notifReducer = (state, action) => {
    switch (action.type) {
        case "NOTIF":
            return action.payload;
        case "CLEAR":
            return null;
        default:
            return state;
    }
}

const NotifContext = createContext();

export const NotifContextProvider = (prop) => {
    const [notif, notifDispatch] = useReducer(notifReducer, null);

    return (
        <NotifContext.Provider value={[notif, notifDispatch]}>
            {prop.children}
        </NotifContext.Provider>
    )
}

export const useNotifValue = () => {
    const notifValueAndDispatch = useContext(NotifContext);
    return notifValueAndDispatch[0];
}

export const useNotifDispatch = () => {
    const notifValueAndDispatch = useContext(NotifContext);
    return notifValueAndDispatch[1];
}   

export const useNotification = () => {
    const notifDispatch = useNotifDispatch();
    return (payload) => {
        const DEFAULT_TIME_OUT = 5 * 1000;
        notifDispatch({type: "NOTIF", payload});
        setTimeout(() => {
            notifDispatch({type: "CLEAR"})
        }, DEFAULT_TIME_OUT);
    }
}

export default NotifContext;