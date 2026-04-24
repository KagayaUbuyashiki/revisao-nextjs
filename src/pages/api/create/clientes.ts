import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'pages', 'api', 'bd.json');

export default function handler(req, res) {
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(jsonData);
    const clientes = parsed.clientes || [];

    if (clientes.some((cliente) => cliente.cpfcnpj === req.body.cpfcnpj)) {
        return res.status(400).json({ mensagem: 'Usuário já cadastrado com este CPF/CNPJ!' });
    }

    clientes.push(req.body)
    fs.writeFileSync(filePath, JSON.stringify({ ...parsed, clientes }, null, 2));
    return res.status(200).json({ mensagem: 'Cliente cadastrado com sucesso!', data: { nome: req.body.nome} })
}