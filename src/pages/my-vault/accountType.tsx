import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Box, Stack, Typography, Button } from '@mui/material';
import StyledDialog from "@/components/common/StyledDialog"

// Asstes
import { IndividualUserIcon, JointAccountIcon, ShowcaseIcon, TrustIcon, SuperFundIcon } from "../../assets/icons/index"

interface AccountTypeProps {
    open: boolean
    dialogTitle: string
    onClose: () => void
    handleUpdateAddress?: () => void
}

export default function AccountType(props: AccountTypeProps) {
    const { open, dialogTitle, onClose, handleUpdateAddress } = props
    const [alignment, setAlignment] = React.useState('web');

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
    };

    return (
        <>
            <StyledDialog
                id="AccountType"
                open={open}
                dialogTitle={dialogTitle}
                onClose={onClose}
            >
                <Box className="DialogBody">



                    <Typography variant='body1'>Please select account type:</Typography>
                    <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                        aria-label="Platform"
                        className='AccountTypeWrapper'
                    >
                        <ToggleButton className='AccountType' value="Individual">
                            <Stack className='AccountTypeName'>
                                <IndividualUserIcon />
                                <Typography variant='body1'>Individual</Typography>
                            </Stack>
                            <Typography variant='caption' className="description">For one person over the age of 18 . Only the account holder can act on the account. Invoices, valuation statements and vault records will be issued in a single name only</Typography>
                        </ToggleButton>
                        <ToggleButton className='AccountType' value="Joint">
                            <Stack className='AccountTypeName'>
                                <JointAccountIcon />
                                <Typography variant='body1'>Joint</Typography>
                            </Stack>
                            <Typography variant='caption' className="description">For one person over the age of 18 . Only the account holder can act on the account. Invoices, valuation statements and vault records will be issued in a single name only</Typography>
                        </ToggleButton>
                        <ToggleButton className='AccountType' value="Business">
                            <Stack className='AccountTypeName'>
                                <ShowcaseIcon />
                                <Typography variant='body1'>Business</Typography>
                            </Stack>
                            <Typography variant='caption' className="description">For one person over the age of 18 . Only the account holder can act on the account. Invoices, valuation statements and vault records will be issued in a single name only</Typography>
                        </ToggleButton>
                        <ToggleButton className='AccountType' value="SuperFundIcon">
                            <Stack className='AccountTypeName'>
                                <SuperFundIcon />
                                <Typography variant='body1'>SuperFundIcon</Typography>
                            </Stack>
                            <Typography variant='caption' className="description">For one person over the age of 18 . Only the account holder can act on the account. Invoices, valuation statements and vault records will be issued in a single name only</Typography>
                        </ToggleButton>
                        <ToggleButton className='AccountType' value="Trust">
                            <Stack className='AccountTypeName'>
                                <TrustIcon />
                                <Typography variant='body1'>Trust</Typography>
                            </Stack>
                            <Typography variant='caption' className="description">For one person over the age of 18 . Only the account holder can act on the account. Invoices, valuation statements and vault records will be issued in a single name only</Typography>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>
                <Stack className="DialogFooter">
                    <Button variant="outlined" onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="contained" onClick={handleUpdateAddress}>Next</Button>
                </Stack>
            </StyledDialog>
        </>
    );
}