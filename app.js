require('dotenv').config();

const express = require('express');
const app     = express();
const port    = process.env.PORT || 3000;

const { Client } = require("@elastic/elasticsearch"); // Criando instancia do ElasticSearch
const esClient = new Client({
  node: process.env.URL,
  auth: { apiKey: process.env.TOKEN }
});

app.get('/search', async (req, res) => {
  try {
    const index = process.env.INDEX;
    const termo = req.query.termo; // Recebe o termo de pesquisa da URL

    if (!termo) {
      return res.status(400).json({ error: "O parâmetro 'termo' não informado." });
    }

    // const mapping = await esClient.search({ index });
    // const mappingTermo = await esClient.search({ index, body: { query: { match: { ementa: termo } } } })
    // const mapping = await esClient.indices.getMapping();

    const body = await esClient.search({
      index,
      body: {
        query: {
          match: {
            ementa: termo // Injeta o termo na busca
          }
        },
        sort: [
          { data_julgamento: { order: "desc" } } // Ordenação por data de julgamento
        ],
        size: 10 // Retorna apenas os 10 primeiro valores
      }
    });

    // Extraindo os documentos encontrados
    const resultados = body.hits.hits.map(doc => ({
      id      : doc._id,
      relator : doc._source.relator,
      ementa  : doc._source.ementa,
      data_julgamento  : doc._source.data_julgamento,
      link_inteiro_teor: doc._source.link_inteiro_teor
    }));

    // Retorna no console para ver quantidade de documento recuperados para realizar os testes
    console.log('resultados.length :>> ', resultados.length);

    res.json({ resultados });

  } catch (error) {
    console.error("Erro na busca:", error);
    res.status(500).json({ error: "Erro ao buscar documentos." });
  }
});

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));
