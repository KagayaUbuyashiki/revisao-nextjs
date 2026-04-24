import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'pages', 'api', 'bd.json');

export default function handler(req, res){
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(jsonData);

    //verificar se existem clientes
    const clientes = parsed.clientes
    if(clientes.length === 0){
        return res.status(200).json({message: "Não existem clientes."})
    }

    return res.status(200).json({
        message: 'Ação realizada com sucesso. ',
        data: clientes
    })
    // se existir retorna os clientes dentro do objeto { message: "Ação realizada com sucesso. ", data -> receber clientes (SOMENTE)}
    // Se não existir retorna status(204) apenas sem json.
}