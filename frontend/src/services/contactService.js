const API_BASE = import.meta.env.VITE_API_URL || '';

/**
 * Envia o formulário de contato para o backend.
 * Lança um Error com a propriedade "details" (erros por campo) quando a API recusa os dados.
 */
export async function submitContact(payload) {
  let response;

  try {
    response = await fetch(`${API_BASE}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error(
      'Não foi possível conectar ao servidor. Tente novamente ou fale conosco pelo WhatsApp.',
    );
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(
      data.message || 'Não foi possível enviar sua solicitação. Tente novamente.',
    );
    error.details = data.errors;
    throw error;
  }

  return data;
}
