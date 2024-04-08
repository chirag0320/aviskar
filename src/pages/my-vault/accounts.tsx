import React, { useState } from "react"
import { Box, Button, Container, Stack, Typography } from "@mui/material"
import { PageTitle } from "@/components/common/Utils"
import Seo from "@/components/common/Seo"
import useAPIoneTime from "@/hooks/useAPIoneTime"
import { ENDPOINTS } from "@/utils/constants"
import { getTopicDetails } from "@/redux/reducers/topicReducer"
import { useAppSelector } from "@/hooks"
import Layout from "@/components/common/Layout"
import { AddressCard } from "@/components/common/Card"

import UpdateAddress from "@/components/partials/checkout/UpdateAddress"
import { PlusIcon } from "../../assets/icons/index"

import AccountType from '../../components/partials/my-vault/accountType'
import Loader from "@/components/common/Loader"
import { getAccounts } from "@/redux/reducers/myVaultReducer"

function Accounts() {
    const loading = useAppSelector(state => state.myVault.loading)
    const accountsData = useAppSelector(state => state.myVault.accounts)
    const [accountTypeDialog, setAccountTypeDialog] = useState<boolean>(false)
    const [updateAddress, setUpdateAddress] = useState<boolean>(false)

    useAPIoneTime({
        service: getAccounts,
        endPoint: ENDPOINTS.getAccounts
    })

    const handleAccountTypeDialog = () => {
        setAccountTypeDialog(true);
    }
    const handleCloseAccountTypeDialog = () => {
        setAccountTypeDialog(false);
    }

    const handleUpdateAddress = () => {
        setUpdateAddress(true);
    }
    const handleCloseUpdateAddress = () => {
        setUpdateAddress(false);
    }

    return (
        <>
            <Loader open={loading} />
            <Layout>
                <Seo
                    keywords={[`QMint Accounts`]}
                    title="Address"
                    lang="en"
                />
                <PageTitle title="Accounts" backToDashboard={true} />

                <Box className="AddressesPage">
                    <Container>
                        <Box className="AddressList">
                            <Box sx={{ textAlign: 'right' }}>
                                <Button variant="outlined" onClick={handleAccountTypeDialog} startIcon={<PlusIcon />}>Add new</Button>
                            </Box>
                            {accountsData?.map(account => (
                                <Box className="AddressListWrapper" key={account.customerId}>
                                    <AddressCard
                                        accountName={account.accountName}
                                        accountType={account.accountType}
                                        address={account.address}
                                        firstName={account.firstName}
                                        lastName={account.lastName}
                                        email={account.email}
                                        phoneNumber={account.phoneNumber}
                                        showDelete={() => { }}
                                    />
                                </Box>
                            ))}
                        </Box>
                        <UpdateAddress dialogTitle="Add new address" open={updateAddress} onClose={handleCloseUpdateAddress} />
                        <AccountType dialogTitle="Add new Account" open={accountTypeDialog} onClose={handleCloseAccountTypeDialog} handleUpdateAddress={handleUpdateAddress} />
                    </Container>
                </Box>
            </Layout>
        </>
    )
}

export default Accounts