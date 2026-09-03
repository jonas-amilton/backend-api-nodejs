import sql from '../db'

sql`
  CREATE TABLE IF NOT EXISTS videos (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    duration INTEGER NOT NULL
  );
`
  .then(() => {
    console.log('Tabela videos criada com sucesso!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Erro ao criar tabela:', error)
    process.exit(1)
  })
