import { useState } from "react";

const useStorage = (initialValue, itemKey) => {
    const [value, setValue] = useState(() => {
        const itemValue = localStorage.getItem(itemKey);

        if (itemValue === null) {
            localStorage.setItem(itemKey, JSON.stringify(initialValue));
        }

        if (itemValue === null) {
            return initialValue;
        } else {
            return itemValue === "undefined"
                ? undefined
                : JSON.parse(itemValue);
        }
    });

    const changeValue = (payload) => {
        if (typeof payload === "function") {
            setValue(payload);
            setValue((curr) => {
                localStorage.setItem(itemKey, JSON.stringify(curr));
                return curr;
            });
        } else {
            const newState = payload;
            setValue(newState);
            localStorage.setItem(itemKey, JSON.stringify(newState));
        }
    };

    return [value, changeValue];
};

export default useStorage;
