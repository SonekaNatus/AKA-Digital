import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AlertCircle, CheckCircle2, Instagram, Loader2, Mail, MessageCircle, Send } from 'lucide-react';
import Button from '../common/Button.jsx';
import Reveal from '../common/Reveal.jsx';
import { getWhatsAppLink, siteConfig } from '../../config/site.js';
import { serviceOptions } from '../../data/content.js';
import { submitContact } from '../../services/contactService.js';

const EMPTY_FORM = {
  name: '',
  company: '',
  email: '',
  whatsapp: '',
  service: '',
  description: '',
  website: '', // campo honeypot (oculto)
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(values) {
  const errors = {};
  const digits = values.whatsapp.replace(/\D/g, '');

  if (values.name.trim().length < 2) errors.name = 'Informe seu nome completo.';
  if (!EMAIL_REGEX.test(values.email.trim())) errors.email = 'Informe um e-mail válido.';
  if (digits.length < 10 || digits.length > 13) {
    errors.whatsapp = 'Informe um WhatsApp com DDD (10 a 13 dígitos).';
  }
  if (!values.service) errors.service = 'Selecione o serviço desejado.';
  if (values.description.trim().length < 10) {
    errors.description = 'Descreva seu projeto com pelo menos 10 caracteres.';
  }

  return errors;
}

function buildWhatsAppMessage(values, serviceLabel) {
  const lines = ['Olá! Vim pelo site da AKA Digital e gostaria de solicitar um orçamento.'];
  if (values.name.trim()) lines.push(`Nome: ${values.name.trim()}`);
  if (values.company.trim()) lines.push(`Empresa: ${values.company.trim()}`);
  if (values.service) lines.push(`Serviço: ${serviceLabel}`);
  if (values.description.trim()) lines.push(`Projeto: ${values.description.trim()}`);
  return lines.join('\n');
}

function Field({ label, error, as: Tag = 'input', id, ...props }) {
  const fieldId = id || props.name;
  const errorId = `${fieldId}-error`;

  return (
    <div>
      <label htmlFor={fieldId} className="mb-2 block text-sm font-medium text-zinc-300">
        {label}
      </label>
      <Tag
        id={fieldId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`w-full rounded-xl border bg-ink/60 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition focus:ring-2 focus:ring-electric/60 ${
          error ? 'border-white/60' : 'border-white/10 focus:border-electric/60'
        }`}
        {...props}
      />
      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-white">
          {error}
        </p>
      )}
    </div>
  );
}

export default function Contact() {
  const location = useLocation();
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  // Pré-seleciona o serviço quando o usuário clica em "Solicitar orçamento"
  useEffect(() => {
    if (location.state?.service) {
      setValues((current) => ({ ...current, service: location.state.service }));
      setErrors((current) => ({ ...current, service: undefined }));
    }
  }, [location.key]); // eslint-disable-line react-hooks/exhaustive-deps

  const serviceLabel = serviceOptions.find((option) => option.value === values.service)?.label || 'Não informado';

  const whatsappHref = useMemo(
    () => getWhatsAppLink(buildWhatsAppMessage(values, serviceLabel)),
    [values, serviceLabel],
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const found = validateContact(values);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      setStatus('error');
      setMessage('Revise os campos destacados e tente novamente.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const response = await submitContact(values);
      setStatus('success');
      setMessage(response.message);
      setValues(EMPTY_FORM);
    } catch (error) {
      setStatus('error');
      setMessage(error.message);
      if (error.details) setErrors(error.details);
    }
  };

  return (
    <section id="contato" className="section-y">
      <div className="container-x grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <Reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-electric">Contato</p>
          <h2 className="font-display text-3xl font-bold leading-tight text-white md:text-5xl">
            Vamos transformar sua presença digital?
          </h2>
          <p className="mt-5 text-base leading-relaxed text-zinc-400 md:text-lg">
            Conte um pouco sobre o seu negócio e sobre o que você precisa. Nossa equipe retorna com a melhor proposta para o seu momento.
          </p>

          <div className="mt-10 space-y-4">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="glass flex items-center gap-4 rounded-2xl p-5 transition hover:border-accent/50"
            >
              <span className="rounded-xl bg-accent/15 p-3 text-accent">
                <MessageCircle size={22} aria-hidden="true" />
              </span>
              <div>
                <p className="font-semibold text-white">Falar pelo WhatsApp</p>
                <p className="text-sm text-zinc-400">Inicie uma conversa direta agora</p>
              </div>
            </a>

            {siteConfig.email && (
              <a href={`mailto:${siteConfig.email}`} className="glass flex items-center gap-4 rounded-2xl p-5 transition hover:border-electric/50">
                <span className="rounded-xl bg-electric/15 p-3 text-electric">
                  <Mail size={22} aria-hidden="true" />
                </span>
                <div>
                  <p className="font-semibold text-white">Enviar e-mail</p>
                  <p className="text-sm text-zinc-400">{siteConfig.email}</p>
                </div>
              </a>
            )}

            {siteConfig.instagramUrl && (
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass flex items-center gap-4 rounded-2xl p-5 transition hover:border-neon/50"
              >
                <span className="rounded-xl bg-neon/15 p-3 text-neon">
                  <Instagram size={22} aria-hidden="true" />
                </span>
                <div>
                  <p className="font-semibold text-white">Instagram</p>
                  <p className="text-sm text-zinc-400">Acompanhe nossos conteúdos</p>
                </div>
              </a>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <form noValidate onSubmit={handleSubmit} className="glass rounded-3xl p-6 md:p-10" aria-labelledby="form-title">
            <h3 id="form-title" className="font-display text-xl font-semibold text-white">
              Solicite seu orçamento
            </h3>
            <p className="mt-1 text-sm text-zinc-500">Campos marcados com * são obrigatórios.</p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <Field
                label="Nome *"
                name="name"
                value={values.name}
                onChange={handleChange}
                error={errors.name}
                autoComplete="name"
                placeholder="Seu nome"
              />
              <Field
                label="Nome da empresa"
                name="company"
                value={values.company}
                onChange={handleChange}
                error={errors.company}
                autoComplete="organization"
                placeholder="Sua empresa"
              />
              <Field
                label="E-mail *"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                error={errors.email}
                autoComplete="email"
                placeholder="voce@empresa.com.br"
              />
              <Field
                label="WhatsApp *"
                name="whatsapp"
                type="tel"
                value={values.whatsapp}
                onChange={handleChange}
                error={errors.whatsapp}
                autoComplete="tel"
                placeholder="(11) 99999-9999"
              />

              <div className="sm:col-span-2">
                <Field
                  as="select"
                  label="Serviço desejado *"
                  name="service"
                  value={values.service}
                  onChange={handleChange}
                  error={errors.service}
                >
                  <option value="">Selecione um serviço</option>
                  {serviceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Field>
              </div>

              <div className="sm:col-span-2">
                <Field
                  as="textarea"
                  rows={5}
                  label="Descrição do projeto *"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  error={errors.description}
                  placeholder="Conte o objetivo do projeto, o público e o que você espera."
                />
              </div>
            </div>

            {/* Campo honeypot: oculto para pessoas, preenchido apenas por robôs */}
            <div className="hidden" aria-hidden="true">
              <label>
                Não preencha este campo
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.website}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div aria-live="polite" className="mt-6">
              {status === 'success' && (
                <div className="flex gap-3 rounded-2xl border border-accent/40 bg-accent/10 p-4 text-sm text-accent">
                  <CheckCircle2 className="mt-0.5 shrink-0" size={18} aria-hidden="true" />
                  <span>{message}</span>
                </div>
              )}
              {status === 'error' && (
                <div className="flex gap-3 rounded-2xl border border-white/30 bg-white/5 p-4 text-sm text-white">
                  <AlertCircle className="mt-0.5 shrink-0" size={18} aria-hidden="true" />
                  <span>{message}</span>
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button type="submit" disabled={status === 'loading'} className="flex-1">
                {status === 'loading' ? (
                  <>
                    <Loader2 className="animate-spin" size={18} aria-hidden="true" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send size={18} aria-hidden="true" />
                    Enviar solicitação
                  </>
                )}
              </Button>
              <Button href={whatsappHref} variant="outline" className="flex-1">
                <MessageCircle size={18} aria-hidden="true" />
                Iniciar no WhatsApp
              </Button>
            </div>

            <p className="mt-5 text-xs leading-relaxed text-zinc-500">
              Ao enviar, você concorda com o uso dos seus dados para contato comercial, conforme nossa{' '}
              <Link to="/politica-de-privacidade" className="underline transition hover:text-white">
                Política de privacidade
              </Link>
              .
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
