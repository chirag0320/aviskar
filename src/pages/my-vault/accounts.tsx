import React, { useState } from "react"
import { Box, Button, Container } from "@mui/material"
import { PageTitle } from "@/components/common/Utils"
import Seo from "@/components/common/Seo"
import useAPIoneTime from "@/hooks/useAPIoneTime"
import { ENDPOINTS } from "@/utils/constants"
import { useAppSelector } from "@/hooks"
import Layout from "@/components/common/Layout"
import { AddressCard } from "@/components/common/Card"

import { PlusIcon } from "../../assets/icons/index"

import AccountType from '../../components/partials/my-vault/accountType'
import Loader from "@/components/common/Loader"
import { getAccounts, getConfigDropdowns } from "@/redux/reducers/myVaultReducer"
import AddAccount from "@/components/partials/my-vault/AddAccount"
import { getStateAndCountryLists } from "@/redux/reducers/checkoutReducer"

function Accounts() {
    const loading = useAppSelector(state => state.myVault.loading)
    const accountsData = useAppSelector(state => state.myVault.accounts)
    const [accountTypeDialog, setAccountTypeDialog] = useState<boolean>(false)
    const [updateAddress, setUpdateAddress] = useState<boolean>(false)
    const [alignment, setAlignment] = React.useState('Individual');
    // console.log("🚀 ~ Accounts ~ alignment:", alignment)

    useAPIoneTime({
        service: getAccounts,
        endPoint: ENDPOINTS.getAccounts
    })
    useAPIoneTime({
        service: getConfigDropdowns,
        endPoint: ENDPOINTS.getConfigDropdown
    })
    // useAPIoneTime({ service: getStateAndCountryLists, endPoint: ENDPOINTS.getStateAndCountryLists });

    const handleAccountTypeDialog = () => {
        setAccountTypeDialog(true);
    }
    const handleCloseUpdateAddress = () => {
        setUpdateAddress(false);
    }
    const handleAccountTypeNextButton = () => {
        setUpdateAddress(true);
        setAccountTypeDialog(false);
    }
    const handleCloseAccountTypeDialog = () => {
        setAccountTypeDialog(false);
    }
    const hadleAddAccountSecondaryAction = () => {
        setUpdateAddress(false);
        setAccountTypeDialog(true);
    }

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
    };

    return (
        <>
            <Loader open={loading} />
            <Layout>
                <Seo
                    keywords={[`QMint Accounts`]}
                    title="Accounts"
                    lang="en"
                />
                <PageTitle title="Accounts" backToDashboard={true} />

                <Box className="AddressesPage">
                    <Container>
                        <Box className="AddressList">
                            <Box sx={{ textAlign: 'right' }}>
                                <Button variant="outlined" onClick={handleAccountTypeDialog} startIcon={<PlusIcon />}>Add new</Button>
                            </Box>
                            <Box className="AddressListWrapper" >
                                {accountsData?.map(account => (
                                    <AddressCard
                                        key={account.customerId}
                                        accountName={account.accountName}
                                        accountType={account.accountType}
                                        address={account.address}
                                        firstName={account.firstName}
                                        lastName={account.lastName}
                                        email={account.email}
                                        phoneNumber={account.phoneNumber}
                                        showDelete={false}
                                    />
                                ))}
                            </Box>
                        </Box>
                        <AddAccount dialogTitle="Add new account" open={updateAddress} alignment={alignment} onClose={handleCloseUpdateAddress} hadleSecondaryAction={hadleAddAccountSecondaryAction}/>
                        <AccountType dialogTitle="Select Account Type" open={accountTypeDialog} alignment={alignment} handleChange={handleChange} onClose={handleCloseAccountTypeDialog} handleAccountTypeNextButton={handleAccountTypeNextButton} />
                    </Container>
                </Box>
            </Layout>
        </>
    )
}

export default Accounts