export interface AddressComponents {
    country: string;
    state: string;
    address: string;
}

export function parseAddressComponents(data: any): AddressComponents {
    const terms = data.description.split(',');

    let country = '';
    let state = '';
    let address = '';

    if (terms.length === 1) {
        country = terms[0];
    } else if (terms.length >= 2) {
        state = terms[terms.length - 2];
        country = terms[terms.length - 1];

        for (let i = 0; i < terms.length - 2; i++) {
            address += terms[i];
            if (i < terms.length - 3) {
                address += ', ';
            }
        }
    }

    return {
        country,
        state,
        address
    };
}
