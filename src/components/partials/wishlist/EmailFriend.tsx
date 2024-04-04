
import React from "react"
import { Button, Stack } from "@mui/material"
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// Componenets
import StyledDialog from "@/components/common/StyledDialog"
import RenderFields from '@/components/common/RenderFields';

interface EmailFriend {
  open: boolean
  onClose: () => void
}

interface Inputs {
  FriendsEmail: string,
  YourEmail: string,
  Message: string,
}

const schema = yup.object().shape({
  FriendsEmail: yup.string().email().required("This is a required field."),
  YourEmail: yup.string().email().required("This is a required field."),
  Message: yup.string(),
});

function EmailFriend(props: EmailFriend) {
  const { open, onClose } = props

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: any) => {
    onClose()
  }

  return (
    <StyledDialog
      id="EmailFriend"
      open={open}
      dialogTitle="Email your watchlist to a friend"
      onClose={onClose}
      maxWidth="sm"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack className="AllFields">
          <RenderFields
            register={register}
            error={errors.FriendsEmail}
            name="FriendsEmail"
            label="Friend's email:"
            placeholder="Enter friend's email:"
            control={control}
            variant='outlined'
            margin='none'
            required
          />
          <RenderFields
            register={register}
            error={errors.YourEmail}
            name="YourEmail"
            label="Your email address"
            placeholder="Enter your email address"
            control={control}
            variant='outlined'
            margin='none'
            required
          />
          <RenderFields
            register={register}
            error={errors.Message}
            name="Message"
            label="Personal message"
            placeholder="Enter personal message"
            control={control}
            variant='outlined'
            margin='none'
          />
        </Stack>
        <Stack className="ActionWrapper">
          <Button size="large" variant="outlined" onClick={onClose}>Close</Button>
          <Button type="submit" size="large" variant="contained">Send email</Button>
        </Stack>
      </form>
    </StyledDialog>
  )
}

export default EmailFriend