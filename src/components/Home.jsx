import React, { useState } from 'react';

import axios from 'axios';

function Home() {
  const [query, setQuery] = useState('');
  const [output1, setOutput1] = useState('');
  const [output2, setOutput2] = useState('');

  const PINECONE_HOST = 'https://pinecone-demo-em1xjlp.svc.aped-4627-b74a.pinecone.io/query';

  const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
  const PINECONE_API_KEY = import.meta.env.VITE_PINECONE_API_KEY;

  function embeddingsQuery(text) {
    const data = {
      input: text,
      model: 'text-embedding-ada-002',
      encoding_format: 'float',
    };

    const headersUsed = {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    };
    try {
      axios.post('https://api.openai.com/v1/embeddings', data, { headers: headersUsed })
        .then((response) => {
          const vector = response.data.data[0].embedding;
          const pineconeData = {
            namespace: 'ns1',
            vector,
            topK: 2,
            includeValues: true,
            includeMetadata: true,
          };
          const pineconeHeaders = {
            'Api-Key': PINECONE_API_KEY,
            'Content-Type': 'application/json',
          };
          axios.post(PINECONE_HOST, pineconeData, { headers: pineconeHeaders })
            .then((pineconeResponse) => {
              console.log(pineconeResponse);
              setOutput1(pineconeResponse.data.matches[0].metadata.text);
              setOutput2(pineconeResponse.data.matches[1].metadata.text);
            });
        });
    } catch {
      console.log('failed');
    }
  }

  return (
    <div className="query-container">
      <div className="input-container">
        <input value={query} onChange={(e) => { setQuery(e.target.value); }} />
        <button type="button" onClick={() => { embeddingsQuery(query); }}>Enter</button>
      </div>
      <div className="output-container">
        <h1>Output:</h1>
        <h2>Result 1:</h2>
        <p>{output1}</p>
        <h2>Result 2:</h2>
        <p>{output2}</p>
      </div>
    </div>
  );
}

export default Home;
