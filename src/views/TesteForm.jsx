import { useState } from 'react';
import { useForm } from "react-hook-form";

function TesteForm() {
    const {
        register: registerUser,
        handleSubmit: handleSubmitUser,
        watch: watchUser,
        getValues: getValuesUser,
        trigger: triggerUser,
        reset: resetUser,
        clearErrors: resetUserValidation,
        formState: {  isValid: formUserValid, errors: formUserErrors },
    } = useForm()

    const onSubmit = (data) => console.log(data)

    console.log(watchUser())

    const executeSort = async () => {
        const isValidForm = await triggerUser();
        const formData = getValuesUser(); // Obtém todos os valores do formulário
        console.log('Form data from executeSort:', formData);
        console.log('isValid', formUserValid);
        console.log('isValid', formUserErrors);
        console.log('isValidForm', isValidForm);
    }

    const resetForm = () => {
        resetUser(); // Reseta os valores dos campos do formulário
        resetUserValidation(); // Reseta os erros de validação
    }

    return (
        <div>
            <form name="form1" onSubmit={handleSubmitUser(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}
                <input defaultValue="test" {...registerUser("example")} />

                {/* include validation with required or other standard HTML validation rules */}
                <input {...registerUser("address.cep", {required: true})} />
                {/* errors will return when field validation fails  */}
                {formUserErrors.exampleRequired && <span>This field is required</span>}

                <input type="submit"/>
            </form>

            <button onClick={() => executeSort()}>teste</button>
            <button onClick={() => resetForm()}>reset</button>
        </div>
    );
}

export default TesteForm;
