import { useState } from "react";

export const useForm = (initVal = {}) => {

    const [formState, setFormState] = useState(initVal);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });
    }

    const changeValue = (name, value) => {
        setFormState({
            ...formState,
            [name]: value
        });
    }

    const onResetInputs = () => {
        setFormState(initVal);
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetInputs,
        changeValue,
        setFormState
    }
}
