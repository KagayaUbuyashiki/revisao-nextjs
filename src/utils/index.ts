interface IEndereco {
    rua: string,
    numero: string,
    complemento: string,
    bairro: string,
    cidade: string,
    estado: string,
}

// crie as anotações de tipo para esta função
/** * Formata um endereço completo a partir dos seus componentes individuais.
 * @param {IEndereco} endereco - Um objeto contendo os componentes do endereço.
 * @param {string} endereco.rua - O nome da rua.
 * @param {string} endereco.numero - O número do endereço.
 * @param {string} endereco.complemento - O complemento do endereço (opcional).
 * @param {string} endereco.bairro - O bairro do endereço.
 * @param {string} endereco.cidade - A cidade do endereço.
 * @param {string} endereco.estado - O estado do endereço.
 * @return {string} O endereço formatado no formato "Rua, Número - Complemento, Bairro - Cidade/Estado".
 * @throws {Error} Lança um erro se algum dos componentes obrigatórios do endereço estiver faltando ou for inválido.
 * @example
 * const endereco = {
 *   rua: "Floriano Peixoto",
 *   numero: "220",
 *   complemento: "Ap 301",
 *   bairro: "Centro",
 *   cidade: "Cataguases",
 *   estado: "MG"
 * };
 * const enderecoFormatado = formataEndereco(endereco);
 * console.log(enderecoFormatado); // "Floriano Peixoto, 220 - Ap 301, Centro - Cataguases/MG"
 */
export function formataEndereco({
    rua,
    numero,
    complemento,
    bairro,
    cidade,
    estado
}: IEndereco): string{
    return `${rua}, ${numero} - ${complemento}, ${bairro} - ${cidade}/${estado}`
}

export const masksDefault = {
    cpfcnpj: ["###.###.###-##", "##.###.###/####-##"],
    telefone: "(##) ####-####",
    celular: "(##) #####-####",
    cep: "#####-###"
}

export type TMasksDefault = keyof typeof masksDefault