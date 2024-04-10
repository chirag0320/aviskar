import React from 'react'
import { Box, FormControl, Select, RadioGroup, FormControlLabel, FormLabel, Radio, FormHelperText, Checkbox, FormGroup, Switch, TextField, IconButton, InputAdornment } from '@mui/material'
import { Controller } from 'react-hook-form'
import classNames from 'classnames'

// Hooks
import { useToggle } from '../../hooks'

// Type
import type { MenuProps, FormControlLabelProps } from '@mui/material'
import type { RenderFieldType, FieldOption } from '../../types/renderFields'
import type { UseFormRegister, FieldError } from 'react-hook-form/dist/types'

// Assets
import {
  EyeOnIcon,
  EyeOffIcon,
} from '../../assets/icons/index'

interface RenderFieldProps {
  type?: RenderFieldType
  error?: FieldError | boolean
  register: UseFormRegister<any>
  placeholder?: string
  label?: string
  variant?: 'standard' | 'outlined' | 'filled'
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
  value?: string
  onChange?: (value: any) => void
  id?: string
  className?: string
  name: string
  defaultValue?: string
  options?: FieldOption[]
  multiline?: boolean
  readOnly?: boolean
  rows?: number
  control?: any
  autoComplete?: string
  disabled?: boolean,
  getValues?: any,
  margin?: 'dense' | 'normal' | 'none'
  row?: boolean
  fullWidth?: boolean
  icon?: React.ReactNode
  checkedIcon?: React.ReactNode
  endAdornment?: React.JSX.Element
  onBlur?: () => void
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
  MenuProps?: Partial<MenuProps>
  children?: any
  labelPlacement?: FormControlLabelProps['labelPlacement'],
  setValue?: any,
  required?: boolean,
  alreadySelectedFilters?: string[]
}

const RenderFields: React.FC<RenderFieldProps> = ({
  type,
  error,
  register = () => { },
  placeholder,
  label,
  name,
  getValues,
  variant = 'filled',
  color = 'primary',
  children,
  value,
  onChange,
  id,
  className,
  options,
  defaultValue,
  multiline,
  disabled,
  autoComplete = 'on',
  margin = 'dense',
  fullWidth = true,
  row,
  readOnly,
  setValue,
  onBlur,
  onKeyDown,
  MenuProps,
  icon,
  checkedIcon,
  endAdornment,
  control,
  labelPlacement,
  required,
  alreadySelectedFilters,
  ...otherProps
}) => {
  const [passwordVisibility, togglePasswordVisibility] = useToggle(false)

  let fieldType = null
  switch (type) {
    case 'select':
      fieldType = (
        <FormControl
          fullWidth={fullWidth}
          margin={margin}
          color={color}
          {...(error ? { error: true } : {})}
        >
          {label && <FormLabel htmlFor={name}>{label}{required && " *"}</FormLabel>}
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <Select
                inputProps={{ id: name }}
                error={!!error}
                disabled={disabled}
                defaultValue={defaultValue}
                variant={variant}
                MenuProps={MenuProps}
                displayEmpty
                sx={
                  field.value === 'none' || field.value === ''
                    ? {
                      color: "#1d21296b",
                    }
                    : {
                      color: "#1D2129",
                    }
                }
                {...register(name)}
                {...otherProps}
                value={value}
                onChange={(e) => {
                  setValue(name, e.target.value)
                  if (onChange) {
                    onChange(e.target.value)
                  }
                }
                }
              >
                {children}
              </Select>
            )}
          />
        </FormControl>
      );
      break;

    case 'radio':
      if (!options) return null
      fieldType = (
        <FormControl margin={margin} fullWidth={fullWidth}>
          {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <RadioGroup row={row} >
                {options.map((radioOption) => (
                  <FormControlLabel
                    key={radioOption.id}
                    value={radioOption.value}
                    disabled={radioOption.disabled}
                    control={
                      <Radio
                        icon={icon}
                        checkedIcon={checkedIcon}
                        disabled={disabled}
                        {...otherProps}
                        onChange={(e) => {
                          setValue(name, e.target.value)
                          if (onChange) {
                            onChange()
                          }
                        }}
                        checked={field.value === radioOption.value}
                      />
                    }
                    label={radioOption.label}
                    labelPlacement={labelPlacement}
                    {...register(name)}
                  />
                ))}
              </RadioGroup>
            )}
          />
        </FormControl>
      )
      break

    case 'checkbox':
      fieldType = (
        <FormControl margin={margin} {...(error ? { error: true } : {})}>
          {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
          <FormGroup row={row}>
            {options ? (
              options.map((checkboxOption) => (
                <FormControlLabel
                  key={checkboxOption.id}
                  control={
                    <Checkbox
                      onChange={(e) => {
                        setValue(name, {
                          ...getValues(name), // Preserve existing values
                          [checkboxOption.value]: e.target.checked // Update specific value
                        });
                        if (onChange) {
                          onChange(); // Trigger onChange if provided
                        }
                      }}
                      checked={alreadySelectedFilters?.includes(checkboxOption.value) || !!getValues(name)?.[checkboxOption.value]}
                    />
                  }
                  label={checkboxOption.label}
                  disabled={checkboxOption.disabled}
                  slotProps={{ typography: { variant: "body2" } }}
                />
              ))
            ) : (
              <FormControlLabel
                control={<Checkbox />}
                label={label}
                {...register(name)}
              />
            )}
          </FormGroup>
        </FormControl>
      );
      break;

    case 'switch':
      fieldType = (
        <FormControl margin={margin} {...(error ? { error: true } : {})}>
          <FormControlLabel
            control={
              <Switch {...register(name)} disabled={disabled} {...otherProps} />
            }
            label={label}
          />
        </FormControl>
      )
      break

    case 'password':
      fieldType = (
        <FormControl
          fullWidth={fullWidth}
          margin={margin}
          {...(error ? { error: true } : {})}
        >
          {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
          <TextField
            id={name}
            fullWidth={fullWidth}
            type={passwordVisibility ? 'text' : 'password'}
            placeholder={placeholder}
            error={!!error}
            autoComplete={autoComplete}
            variant={variant}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
                    {passwordVisibility ? (
                      <EyeOffIcon />
                    ) : (
                      <EyeOnIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...register(name)}
            {...otherProps}
          />
        </FormControl>
      )
      break

    case 'number':
      fieldType = (
        <FormControl
          fullWidth={fullWidth}
          margin={margin}
          {...(error ? { error: true } : {})}
        >
          {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
          <Controller
            name={name}
            control={control}
            defaultValue={value} // Set defaultValue instead of passing value prop
            render={({ field: { value, onChange } }) => (
              <>
                <TextField
                  id={name}
                  type="number"
                  fullWidth={fullWidth}
                  error={!!error}
                  placeholder={placeholder}
                  value={value}
                  defaultValue={defaultValue}
                  disabled={disabled}
                  autoComplete={autoComplete}
                  variant={variant}
                  InputProps={{ endAdornment }}
                  onChange={(event) => {
                    const numberRegex = /^-?\d*\.?\d*$/
                    if (!numberRegex.test(event.target.value)) {
                      return
                    }
                    onChange(event)
                  }}
                  onKeyDown={(e) => {
                    ;['e', 'E', '+', '-', '.'].includes(e.key) &&
                      e.preventDefault()
                  }}
                  {...register(name)}
                  {...otherProps}
                />
              </>
            )}
          />

        </FormControl>
      )
      break

    default:
      fieldType = (
        <FormControl
          fullWidth={fullWidth}
          margin={margin}
          {...(error ? { error: true } : {})}
        >
          {label && <FormLabel htmlFor={name}>{label}{required && " *"}</FormLabel>}
          <TextField
            id={name}
            fullWidth={fullWidth}
            error={!!error}
            placeholder={placeholder}
            multiline={multiline}
            value={value}
            autoComplete={autoComplete}
            defaultValue={defaultValue}
            disabled={disabled}
            variant={variant}
            onKeyDown={onKeyDown}
            // label={label}
            InputProps={{ readOnly, onBlur, endAdornment }}
            {...register(name)}
            {...otherProps}
          />
        </FormControl>
      )
  }

  return (
    <Box
      className={classNames(
        'InputRow',
        className,
        { DatePicker: type === 'date' },
        { Slider: type === 'slider' }
      )}
    >
      {fieldType}
      {error && typeof error === 'object' && (
        <FormHelperText className={error && 'Mui-error'}>
          {error.message}
        </FormHelperText>
      )}
    </Box>
  )
}

export default RenderFields
