import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/*
 * No Vercel o sistema de arquivos é somente leitura (exceto /tmp, que é apagado).
 * Nesse ambiente os pedidos não são gravados em arquivo e chegam pelo e-mail.
 * Para armazenamento permanente, conecte um banco de dados neste arquivo.
 */
const IS_SERVERLESS = Boolean(process.env.VERCEL);

const DATA_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../data');
const DATA_FILE = path.join(DATA_DIR, 'leads.json');

let queue = Promise.resolve();

async function readAll() {
  if (IS_SERVERLESS) return [];
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

async function save(lead) {
  if (IS_SERVERLESS) {
    console.warn(`Pedido ${lead.id} não foi gravado em arquivo (ambiente Vercel). Verifique o e-mail.`);
    return lead;
  }

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