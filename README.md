# Easyjur Termo Search 
**API REST para busca de documentos jurídicos por termo na ementa**  

---

## **Objetivo**  
Desenvolver uma API que permite buscar documentos jurídicos em um índice ElasticSearch, retornando os 10 documentos mais relevantes cujas ementas contenham o termo pesquisado, ordenados por data de julgamento (do mais recente para o mais antigo).

---

## **Funcionalidades**  
- Busca por termo livre nas ementas dos documentos  
- Ordenação automática por data de julgamento (decrescente)  
- Limitação a 10 resultados por consulta  
- Retorno padronizado com campos essenciais:
  - ID do documento
  - Relator
  - Ementa completa
  - Data do julgamento
  - Link para o inteiro teor

---

## **Instalação**  
1. Clone o repositório:  
```bash  
git clone https://github.com/seu-usuario/nome-repositorio.git  
cd nome-repositorio  
```  

2. Instale as dependências:  
```bash  
npm install  
```  

3. Configure o ambiente (crie um arquivo `.env`):  
```env  
URL="sua_url_elasticsearch"  
TOKEN="seu_token_api"  
INDEX="nome_do_indice"  
PORT=3000  
```  

4. Inicie o servidor:  
```bash  
npm start  
```  

---

## **Como Usar**  
Envie uma requisição GET com o parâmetro `termo`:  
```  
http://localhost:3000/search?termo=palavra_chave  
```  

### Exemplo de resposta:  
```json  
{
  "resultados": [
    {
      "id": "ABC123",
      "relator": "Ministro Fulano",
      "ementa": "Texto completo da ementa contendo o termo pesquisado...",
      "data_julgamento": "2024-03-15",
      "link_inteiro_teor": "https://exemplo.com/documento/123"
    },
    ...
  ]
}
```  

---

## **Tecnologias Utilizadas**  
- **Elasticsearch**: Armazenamento e busca de documentos  
- **Express.js**: Framework para construção da API  
- **Elasticsearch Client**: Integração com o cluster Elastic  
- **dotenv**: Gerenciamento de variáveis de ambiente  

---

## **Disclaimer**  
⚠️ **Importante**:
- Este projeto é para fins demonstrativos.
- Requer configuração prévia de um índice ElasticSearch com campos específicos  
- A relevância dos resultados depende da configuração do mapeamento no Elastic  
- As credenciais de acesso devem ser protegidas (não incluir no versionamento)  
- Adapte o campo `ementa` conforme a estrutura real dos documentos no seu índice
