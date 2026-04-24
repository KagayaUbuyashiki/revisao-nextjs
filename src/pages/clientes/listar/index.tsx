import { formataEndereco } from "@/utils"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"

interface IDadosClientes {
    nome: string,
    email: string,
    cpfcnpj: string,
    sexo: string,
    cep: string,
    rua: string,
    bairro: string,
    cidade: string,
    estado: string,
    numero: string,
    complemento: string,
}
interface IClientes {
    data: IDadosClientes[] | []
}

export const getServerSideProps = (async () => {
  const response = await fetch('http://localhost:3000/api/list/cliente')
  const data:IClientes = await response.json()
  return { props: { data } }
}) satisfies GetServerSideProps<{ data: IClientes }>

export default function ListarClientes({
    data
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return(
        <>
            <h1 className="text-4xl text-center">Nossos clientes !</h1>
            <div className="mx-auto mt-8 max-w-4xl rounded-xl border boder-zinc-300 p-4">
                <div className="overflow-x-auto">
                    <table className="table-auto min-w-3xl w-full">
                    <thead>
                        <tr className="border-b border-zinc-400 grid grid-cols-12">
                            <th className="col-span-2 text-start text-xl">Documento</th>
                            <th className="col-span-3 text-start text-xl">Nome</th>
                            <th className="col-span-1 text-center text-xl pr-4">Sexo</th>
                            <th className="col-span-6 text-start text-xl">Endereço</th>
                        </tr>
                    </thead>
                    <tbody>
                        { data?.data?.length > 0 ? (
                            <>
                                {data.data.map((cliente) => (
                                    <tr className="grid grid-cols-12 even:bg-zinc-600/30" key={cliente.cpfcnpj}>
                                        <td className="col-span-2 text-start text-sm">{cliente.cpfcnpj}</td>
                                        <td className="col-span-3 text-start text-sm">{cliente.nome}</td>
                                        <td className="col-span-1 text-center text-sm pr-4">{cliente.sexo}</td>
                                        <td className="col-span-6 text-start text-sm">{formataEndereco({
                                            bairro: cliente.bairro,
                                            cidade: cliente.cidade,
                                            rua: cliente.rua,
                                            numero: cliente.numero,
                                            complemento: cliente.complemento,
                                            estado: cliente.estado
                                        })}</td>
                                    </tr>
                                ))}
                            </>
                        ) : (
                            <tr className="grid grid-cols-12">
                                <td className="col-span-12 text-center text-base p-4">Não há clientes cadastrados.</td>
                            </tr>
                        ) }
                    </tbody>
                    <tfoot>
                        <tr className="border-t border-zinc-300">
                            <td className="col-span-12 text-end py-2 font-bold pr-10">Usuários cadastrados: {data.data.length}</td>
                        </tr>
                    </tfoot>
                    </table>
                </div>
            </div>
        </>
    )
}