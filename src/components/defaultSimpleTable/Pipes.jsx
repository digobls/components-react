// phoneMask
export const phoneMask = (value) => {
    if (!value) {
        return '-';
    }

    const formattedNumber = value.replace(/\D/g, ''); // Remove non-digits
    const withDDD = formattedNumber.length >= 11 ? formattedNumber.slice(0, 11) : formattedNumber; // Limit to 11 digits for DDD format

    return withDDD.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3'); // Add parentheses, space, and hyphen
};

// documentMask
export const documentMask = (value) => {
    if (!value) {
        return '-';
    }

    const formattedValue = value.replace(/\D/g, ''); // Remove non-digits
    const isCPF = formattedValue.length <= 11; // Check for CPF length

    return isCPF
        ? formattedValue.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') // CPF format
        : formattedValue.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5'); // CNPJ format
};

// Read JSON
export const readJson = (value, key) => {
    try {
        if (!value || !key) {
            return '-';
        } else if (value[key]) {
            return value[key];
        } else {
            return '-';
        }
    } catch (e) {
        return '-';
    }
};

// Read Array
export const readArray = (value) => {
    try {
        if (!value) {
            return '-';
        } else if (value?.length) {
            return value.join(', ');
        } else {
            return '-';
        }
    } catch (e) {
        return '-';
    }
};