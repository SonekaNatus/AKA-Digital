import { z } from 'zod';

export const SERVICE_IDS = [
  'criacao-sites',
  'gestao-trafego',
  'manutencao-mensal',
  'pacote-personalizado',
  'outro',
];

const onlyDigits = (value) => value.replace(/\D/g, '');

export const contactSchema = z.object({
  name: z
    .string({ required_error: 'Informe seu nome.' })
    .trim()
    .min(2, 'Informe seu nome completo.')
    .max(120, 'Nome muito longo.'),
  company: z.string().trim().max(120, 'Nome da empresa muito longo.').optional().default(''),
  email: z
    .string({ required_error: 'Informe seu e-mail.' })
    .trim()
    .toLowerCase()
    .email('Informe um e-mail válido.')
    .max(160, 'E-mail muito longo.'),
  whatsapp: z
    .string({ required_error: 'Informe seu WhatsApp.' })
    .trim()
    .transform(onlyDigits)
    .pipe(
      z
        .string()
        .min(10, 'Informe um WhatsApp com DDD.')
        .max(13, 'Número muito longo.'),
    ),
  service: z.enum(SERVICE_IDS, {
    errorMap: () => ({ message: 'Selecione um serviço válido.' }),
  }),
  description: z
    .string({ required_error: 'Descreva seu projeto.' })
    .trim()
    .min(10, 'Descreva seu projeto com pelo menos 10 caracteres.')
    .max(2000, 'Descrição muito longa (máximo de 2000 caracteres).'),
  // Campo "honeypot": preenchido apenas por robôs.
  website: z.string().optional().default(''),
});
