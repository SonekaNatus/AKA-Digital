import { useEffect } from 'react';
import { siteConfig } from '../config/site.js';

function upsertMeta(key, value, attribute = 'name') {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', value);
}

/**
 * Atualiza título, descrição e metadados Open Graph por página (SEO básico).
 */
export default function useDocumentMeta({ title, description }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
    document.title = fullTitle;
    upsertMeta('og:title', fullTitle, 'property');

    if (description) {
      upsertMeta('description', description);
      upsertMeta('og:description', description, 'property');
    }
  }, [title, description]);
}
