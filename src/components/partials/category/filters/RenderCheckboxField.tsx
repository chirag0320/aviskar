import RenderFields from '@/components/common/RenderFields'
import React, { useEffect, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAppSelector } from '@/hooks'

const schema = yup.object().shape({
    Gender: yup.array().required().nullable(),
})

interface props {
    filter: string,
    options: any,
    selectedFilters: { [key: string]: string[] },
    setSelectedFilters: any,
    page: number
}

const RenderCheckboxField = React.memo(({ filter, options, setSelectedFilters, selectedFilters, page }: props) => {
    const [isPending, startTransition] = useTransition();
    const clearFilters = useAppSelector(state => state.category.clearFilters)
    const {
        register,
        getValues,
        setValue,
        reset,
        formState: { errors },
    } = useForm<{ Gender: string }>({
        resolver: yupResolver(schema),
        defaultValues: {},
    })

    useEffect(() => {
        if (clearFilters) {
            reset();
        }
    }, [clearFilters])

    const onCheckboxChange = () => {
        startTransition(() => {
            const currentSpecification: any = getValues();

            const specificationValues: string[] = [];

            for (const key in currentSpecification[filter]) {
                if (currentSpecification[filter][key]) specificationValues.push(key);
            }
            setSelectedFilters((prev: { [key: string]: string[] }) => {
                return ({
                    ...prev, [filter]: specificationValues.length === 0 ? undefined : specificationValues
                })
            })

        });
    }

    return (
        <RenderFields
            type="checkbox"
            register={register}
            name={filter}
            options={options}
            setValue={setValue}
            getValues={getValues}
            onChange={onCheckboxChange}
            margin="none"
        />
    )
});

export default RenderCheckboxField