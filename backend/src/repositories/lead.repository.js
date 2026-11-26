/*
 * Repositório de leads.
 *
 * Implementação atual: arquivo JSON local (backend/data/leads.json),
 * adequada para desenvolvimento e volumes pequenos.
 *
 * Para produção, substitua as funções deste arquivo por um cliente de banco
 * de dados (PostgreSQL, MySQL, MongoDB, etc.), mantendo as mesmas assinaturas
 * (save / readAll). O restante da aplicação não precisa ser alterado.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DATA_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../data');
const DATA_FILE = path.join(DATA_DIR, 'leads.json');

// Fila simples para evitar escritas concorrentes no mesmo arquivo.
let queue = Promise.resolve();

async function readAll() {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

async function save(lead) {
  const run = queue.then(async () => {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const leads = await readAll();
    leads.push(lead);
    const tmpFile = `${DATA_FILE}.tmp`;
    await fs.writeFile(tmpFile, JSON.stringify(leads, null, 2), 'utf8');
    await fs.rename(tmpFile, DATA_FILE);
    return lead;
  });
  queue = run.catch(() => {});
  return run;
}

export const leadRepository = { readAll, save };
