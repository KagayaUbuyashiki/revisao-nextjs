import { FormType } from "@/pages/clientes/criar"
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

const sizeClassMap = {
    1: 'md:col-span-1',
    2: 'md:col-span-2',
    3: 'md:col-span-3',
    4: 'md:col-span-4',
    5: 'md:col-span-5',
    6: 'md:col-span-6',
    7: 'md:col-span-7',
    8: 'md:col-span-8',
    9: 'md:col-span-9',
    10: 'md:col-span-10',
    11: 'md:col-span-11',
    12: 'md:col-span-12'
} as const

type TInput<T extends FieldValues> = {
    required: boolean
    label: string
    name: keyof T
    register: UseFormRegister<T>
    errors: FieldErrors<T>
    size: keyof typeof sizeClassMap
    placeholder?: string
}

export function Input({
    errors,
    label,
    name,
    register,
    required,
    size,
    placeholder = 'Digite aqui.'
}: TInput<FormType>) {

    return(
        <div className={`col-span-12 sm:col-span-6 ${sizeClassMap[size]} relative flex flex-col`}>
            <label>{label}{required && (<span className='text-red-500'>*</span>)}: </label>
            <input {...register(name)} className='border rounded-md px-2 py-1 text-zinc-100' placeholder={placeholder}/>
            <span className='absolute top-16 text-xs text-red-500'>{errors[name]?.message}</span>
        </div>
    )
}