import { Input } from '@/components/Input'
import { InputCallback } from '@/components/InputCallback'
import { InputMask } from '@/components/InputMask'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const DEFAULT_MESSAGE_RULE = "Campo obrigatório."

function isCpfOrCnpj(value: string) {
    const digitos = value.replace(/\D/g, '')
    return digitos.length === 11 || digitos.length === 14
}

const regras = z.object({
        nome: z.string().min(1, DEFAULT_MESSAGE_RULE),
        email: z.email(DEFAULT_MESSAGE_RULE),
        cpfcnpj: z.string()
            .min(1, DEFAULT_MESSAGE_RULE)
            .max(18, "Limite de 18 caracteres")
            .refine(isCpfOrCnpj, "Informe um CPF ou CNPJ válido."),
        sexo: z.string().min(1, DEFAULT_MESSAGE_RULE).max(1, "Limite de 1 caracteres."),
        cep: z.string().min(1, DEFAULT_MESSAGE_RULE)
            .max(9, "Cep inválido."),
        rua: z.string().min(1, DEFAULT_MESSAGE_RULE),
        bairro: z.string().min(1, DEFAULT_MESSAGE_RULE),
        cidade: z.string().min(1, DEFAULT_MESSAGE_RULE),
        estado: z.string().min(1, DEFAULT_MESSAGE_RULE),
        numero: z.string().min(1, DEFAULT_MESSAGE_RULE),
        complemento: z.string().min(1, DEFAULT_MESSAGE_RULE),
    })

    export type FormType = z.infer<typeof regras>

export default function CadastrarClientes() {
    const [showModal, setShowModal] = useState(false)
    const {
        handleSubmit,
        register,
        formState: { errors },
        setError,
        watch,
        setValue
    } = useForm<FormType>({
        resolver: zodResolver(regras),
        // defaultValues: {
        //     nome: "Daniel Ventura",
        //     email: "danielvalmeida91@gmail.com",
        //     cpfcnpj: "12345678900",
        //     sexo: "M",
        //     cep: "36770066",
        //     rua: "Rua Joaquim Peixoto Ramos",
        //     bairro: "Centro",
        //     cidade: "Cataguases",
        //     estado: "MG",
        //     numero: "12",
        //     complemento: "201"
        // }
    })
    console.log('errors', errors)
    async function onSubmit(data: FormType){
        const response = await fetch('/api/create/clientes', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        const json = await response.json()
        console.log('response', json)
    }
    // console.log('Error', errors)

    async function buscaCep(){
        const cep = watch('cep')
        if(cep.length !== 9) {
            setError('cep', { message: 'Cep inválido.'})
            return 
        }
        try {
            const busca = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
            const response = await busca.json()
            if(response?.erro){
                return
            }
            setValue('bairro', response.bairro ?? '')
            setValue('cidade', response.localidade ?? '')
            setValue('estado', response.uf ?? '')
            setValue('rua', response.logradouro ?? '')
        } catch (error) {
            console.error('error', error)
        }
    }


    return(
        <>
            <h1 className='text-center'>Cadastrar Cliente</h1>
            <div className='w-full flex items-center justify-center px-10'>
                <form onSubmit={handleSubmit(onSubmit)} noValidate className='grid grid-cols-12 space-y-6 space-x-2'>
                    <InputMask 
                        errors={errors}
                        label='CPF/CNPJ'
                        masks='cpfcnpj'
                        name='cpfcnpj'
                        register={register}
                        required
                        size={3}
                        placeholder='Digite o seu CPF ou CNPJ'
                    />
                    <Input 
                        errors={errors}
                        label='Nome'
                        name='nome'
                        register={register}
                        required
                        size={9}
                    />
                    <Input 
                        errors={errors}
                        label='Email'
                        name='email'
                        register={register}
                        required
                        size={9}
                    />
                    <Input 
                        errors={errors}
                        label='Sexo'
                        name='sexo'
                        register={register}
                        required
                        size={3}
                    />
                    <InputCallback
                        errors={errors}
                        label='Cep'
                        name='cep'
                        register={register}
                        required
                        size={3}
                        masks='cep'
                        funcaoParaSerMostrada={buscaCep}
                        placeholder='Digite o CEP'
                    />
                    <Input 
                        errors={errors}
                        label='Rua'
                        name='rua'
                        register={register}
                        required
                        size={9}
                    />
                    <Input 
                        errors={errors}
                        label='Número'
                        name='numero'
                        register={register}
                        required
                        size={4}
                    />
                    <Input 
                        errors={errors}
                        label='Complemento'
                        name='complemento'
                        register={register}
                        required
                        size={8}
                    />
                    <Input 
                        errors={errors}
                        label='Bairro'
                        name='bairro'
                        register={register}
                        required
                        size={5}
                    />
                    <Input 
                        errors={errors}
                        label='Cidade'
                        name='cidade'
                        register={register}
                        required
                        size={5}
                    />
                    <Input 
                        errors={errors}
                        label='Estado'
                        name='estado'
                        register={register}
                        required
                        size={2}
                    />
                    <div className="col-span-12">
                        <div className="flex items-center justify-end pr-2">
                            <button className='mt-10 border px-4 py-2 rounded-md cursor-pointer hover:bg-zinc-300 hover:text-zinc-900'>Enviar</button>
                        </div>
                    </div>
                </form>
            </div>
            {/* Desenvolver o Modal de Finalização do Cadastro, que deve conter as seguintes etapas:
                1. Criar um estado para controlar a visibilidade do modal (showModal).
                2. Criar uma função para abrir o modal (openModal) e outra para fechar o modal (closeModal).
                3. Criar um componente Modal que receba as funções de abrir e fechar, além de uma mensagem de confirmação.
                4. No onSubmit, ao finalizar o envio das informações, abrir o modal de confirmação com uma mensagem de sucesso ou erro, dependendo do resultado da requisição.
            */}
            { true && <div className='bg-red-500/10 w-full h-screen z-30 fixed top-0 left-0 flex items-center justify-center'>MOSTRA MODAL</div> }
        </>
    )
}