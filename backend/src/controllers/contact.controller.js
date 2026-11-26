import { contactSchema } from '../validators/contact.schema.js';
import { contactService } from '../services/contact.service.js';
import { AppError } from '../utils/AppError.js';

export async function createContact(req, res, next) {
  try {
    const parsed = contactSchema.safeParse(req.body ?? {});

    if (!parsed.success) {
      const errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path.join('.') || 'form';
        if (!errors[key]) errors[key] = issue.message;
      }
      throw new AppError(400, 'Verifique os campos informados.', errors);
    }

    const result = await contactService.register(parsed.data);

    res.status(201).json({
      success: true,
      message: 'Recebemos sua solicitação! Nossa equipe entrará em contato em breve.',
      id: result.id,
    });
  } catch (error) {
    next(error);
  }
}
