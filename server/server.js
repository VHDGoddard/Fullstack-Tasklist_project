const express = require("express");
const app = express();
const PORT = 8080;
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let lembretes = {}

app.get("/api/get_lembretes", (req, res) => {
    res.status(200).json(lembretes);
});

app.post("/api/save_lembrete", (req, res) => {
    const {lembrete, data} = req.body;
    
    const id =  Math.random().toString(36).substr(2, 9);

    if(!lembrete || !data){
        return res.status(400).send({error: "Texto e data não encontrados"})
    }

    if(!lembretes[data]){
        lembretes[data]=[];
    };

    lembretes[data] = [{lembrete, id}, ...lembretes[data]];

    console.log(lembretes);
    res.status(200).json(lembretes);
})

app.delete("/api/delete_lembrete/:id", (req, res) => {
    const { id } = req.params;

    for (const data in lembretes) {
        lembretes[data] = lembretes[data].filter(lembrete => lembrete.id !== id);

        if (lembretes[data].length === 0) {
            delete lembretes[data];
        }
    }

    res.status(200).json({ message: "Lembrete excluído com sucesso." });
});

app.listen(PORT, () => console.log(`server iniciado na porta ${PORT}`));

