export interface AddressComponents {
    country: string;
    state: string;
    address: string;
    city: string;
    address2: string;
    place_id?: string
}

export function parseAddressComponents(data: any): AddressComponents {
    console.log("🚀 ~ parseAddressComponents ~ data:", data)
    // const terms = data.description.split(',');
    // let country = '';
    // let state = '';
    // let address = '';

    // if (terms.length === 1) {
    //     country = terms[0];
    // } else if (terms.length >= 2) {
    //     state = terms[terms.length - 2];
    //     country = terms[terms.length - 1];

    //     for (let i = 0; i < terms.length - 2; i++) {
    //         address += terms[i];
    //         if (i < terms.length - 3) {
    //             address += ', ';
    //         }
    //     }
    // }
    const x = data.terms?.slice(0, - 3)
    return {
        country: data.terms?.at(-1)?.value,
        state: data.terms?.at(-2)?.value,
        city: data.terms?.at(-3)?.value,
        address: x.splice(0, 2).reduce((i: { value: any; }, j: any, index: any) => {
            return (i + "" + j.value + (x.length - 1 === index ? '' : ', '))
        }, ''),
        address2: x.reduce((i: { value: any; }, j: any, index: any) => {
            return (i + "" + j.value + (x.length - 1 === index ? '' : ', '))
        }, ''),
        place_id: data?.place_id
    };
}


export const parsePostalCode = (data: any) => {
    const addressComponents = data?.results[0]?.address_components;
    console.log("🚀 ~ parsePostalCode ~ addressComponents:", addressComponents)
    let postalCode;

    if (!addressComponents) return;

    Object.keys(addressComponents).map((key: any) => {
        if (addressComponents[key]?.types[0] === "postal_code") {
            postalCode = addressComponents[key]?.short_name;
        }
    })

    return postalCode;
}