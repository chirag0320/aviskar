import * as yup from 'yup'

const commonAccountSchema = {
    FirstName: yup.string().trim().required('First name is a required field'),
    LastName: yup.string().trim().required('Last name is a required field'),
    Contact: yup.string().trim().required(),
    ContactCode: yup.string().required("Contact Code is required field"),
    Email: yup.string().email().required(),
    Address1: yup.string().trim().required("Address 1 in required field"),
    Address2: yup.string().trim(),
    City: yup.string().required().trim(),
    State: yup.string().required(),
    Country: yup.string().required(),
    Code: yup.string().required('Zip / Postal code is required').trim()
}

export const IndividualAccountFormSchema = yup.object().shape({
    ...commonAccountSchema
})

export const JointAccountFormSchema = yup.object().shape({
    ...commonAccountSchema
});

export const BussinessAccountFormSchema = yup.object().shape({
    ...commonAccountSchema,
    BusinessName: yup.string().trim().required("Bussiness Name is required field")
})

export const SuperFundAccountFormSchema = yup.object().shape({
    ...commonAccountSchema,
    SuperfundName: yup.string().trim().required("Superfund Name is required field"),
    TrusteeType : yup.string().trim().required("Trustee Type is required field"),
    TrusteeName: yup.string().trim().required("Trustee Name is required field")
})

export const TrustAccountFormSchema = yup.object().shape({
    ...commonAccountSchema,
    TrusteeName: yup.string().trim().required("Trustee Name is required field"),
    TrusteeType : yup.string().trim().required("Trustee Type is required field"),
    TrustName: yup.string().trim().required("Trust Name is required field")
})