import { FormType } from "@/pages/clientes/criar"
import { masksDefault, TMasksDefault } from "@/utils"
import { ChangeEvent } from "react"
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
    funcaoParaSerMostrada: () => void
    masks: string | string[] | TMasksDefault
    placeholder?: string
}

function isDefaultMaskKey(mask: string): mask is TMasksDefault {
    return mask in masksDefault
}

function getDigitsLimit(mask: string) {
    return (mask.match(/#/g) ?? []).length
}

function applyMask(value: string, mask: string) {
    const digits = value.replace(/\D/g, '').slice(0, getDigitsLimit(mask))
    let digitIndex = 0
    let formattedValue = ''

    for (const character of mask) {
        if (character === '#') {
            if (digitIndex >= digits.length) break
            formattedValue += digits[digitIndex]
            digitIndex += 1
            continue
        }

        if (digitIndex >= digits.length) break
        formattedValue += character
    }

    return formattedValue
}

function resolveMask(value: string, availableMasks: string[]) {
    const digitsLength = value.replace(/\D/g, '').length
    return availableMasks.find((mask) => digitsLength <= getDigitsLimit(mask)) ?? availableMasks[availableMasks.length - 1]
}

export function InputCallback({
    errors,
    label,
    name,
    register,
    required,
    size,
    funcaoParaSerMostrada,
    masks,
    placeholder = 'Digite aqui.'
}: TInput<FormType>) {
    const registration = register(name)
    const availableMasks = Array.isArray(masks)
        ? masks
        : isDefaultMaskKey(masks)
            ? Array.isArray(masksDefault[masks])
                ? masksDefault[masks]
                : [masksDefault[masks]]
            : [masks]
    const maxLength = Math.max(...availableMasks.map((mask) => mask.length))

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const mask = resolveMask(e.target.value, availableMasks)
        e.target.value = applyMask(e.target.value, mask)
        registration.onChange(e)
    }

    return(
        <div className={`col-span-12 sm:col-span-6 ${sizeClassMap[size]} relative flex flex-col`}>
            <label>{label}{required && (<span className='text-red-500'>*</span>)}: </label>
            <input {...register(name)} maxLength={maxLength} onBlur={funcaoParaSerMostrada} onChange={handleChange} className='border rounded-md px-2 py-1 text-zinc-100' placeholder={placeholder}/>
            <span className='absolute top-16 text-xs text-red-500'>{errors[name]?.message}</span>
        </div>
    )
}