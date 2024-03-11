export interface Reason {
    id: number,
    reason: string,
    defaultDuration: number,
    isSameDayBooking: boolean,
    colorCode: string
}

export interface ContactUsFormDetails {
    ReasonId: number,
    Name: string,
    Email: string,
    PhoneNumber: string,
    Enquiry: string
}


export interface ConfigDetails {
    id: number,
    name: string,
    value: string | null,
    storedId: number
}
