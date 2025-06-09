const conexao = require('../db/conexao')

exports.criarTarefa = (req, res) => {
    const { titulo, descricao} = req.body

    conexao.query(
        'INSERT INTO tarefas (titulo, descricao) VALUES (?,?)',
        [
            titulo,
            descricao
        ],
        () => {
            if (!titulo|| typeof(titulo) != 'string' || titulo.trim() == '') {
                return res.status(400).send("Titulo é obrigatório para o cadastro da tarefa!")
             }

             if (!descricao|| typeof(descricao) != 'string' || descricao.trim() == '') {
                return res.status(400).send("Gostariamos que descrevesse sua tarefa.")
             }

            res.status(201).send('Tarefa cadastrada com sucesso!')
    })
}

exports.listarTarefa = (req, res) => {
    conexao.query('SELECT * FROM  tarefas', (err, results) => {
        if (err) {
            res.status(500).send('Erro ao buscas Tarefas')
        }

        res.status(200).send(results)
    })
}
exports.filtrarTarefa = (req, res) => {
    const {status} = req.query
    conexao.query('SELECT * FROM  tarefas where status = ?',[status], (err, results) => {
        if (err) {
            res.status(500).send('Erro ao buscas Tarefas')
        }

        res.status(200).send(results)
    })
}

exports.atualizarTarefa = (req, res) => { 
    const { id } = req.params;
    const {titulo, descricao, status} = req.body;
    const query = 'UPDATE tarefas SET titulo = ?, descricao = ?, status = ? WHERE id = ?';
    const dataAtual = new Date();
    const querydata = 'UPDATE tarefas SET data_conclusao = ? WHERE status = ?'
    const datanull = 'UPDATE tarefas SET data_conclusao = ? WHERE status = ?'



if (!titulo || typeof(titulo) != 'string' || titulo.trim() == '') {
    return res.status(400).send("Titulo é obrigatório para atualizar!")
 }

 if (!descricao|| typeof(descricao) != 'string' || descricao.trim() == '') {
    return res.status(400).send("Gostariamos que descrevesse sua atualização da tarefa.")
 }

 if (!status|| typeof(status) != 'string' || status.trim() == '') {
    return res.status(400).send("Necessitamos que nos diga o status atual de sua tarefa.")
 }



 conexao.query(query, [titulo, descricao, status, id], (err, results) => {

    if (status == "concluida") {
        conexao.query(querydata, [dataAtual, status], (err, results) => {
            if (err) {
                return res.status(500).send('Erro ao atualizar');
              }
              
              if (results.affectedRows === 0) {
                return res.status(404).send('Tarefa não encontrada');
              } 
        })
    }

    if (status == "em progresso" || status == "pendente") {
        conexao.query(datanull, [null, status], (err, results) => {
            if (err) {
                return res.status(500).send('Erro ao atualizar');
              }
              
              if (results.affectedRows === 0) {
                return res.status(404).send('Tarefa não encontrada');
              }
        })
    }

if (err) {
  return res.status(500).send('Erro ao atualizar');
}

if (results.affectedRows === 0) {
  return res.status(404).send('Tarefa não encontrada');
}
 
  res.send('Tarefa atualizado com sucesso');
});
}

exports.deletarTarefa = (req, res) => {
    const { id } = req.params;

  conexao.query('DELETE FROM tarefas WHERE id = ?', [id], (err, results) => {
    if (err) {
        return res.status(500).send('Erro ao deletar');
    }
    if (results.affectedRows === 0) {
        return res.status(404).send('Tarefa não encontrada!');
    }

    res.status(200).send('Tarefa deletada com sucesso');
  });
}

    

   
   
