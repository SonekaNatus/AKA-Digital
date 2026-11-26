import { Component } from 'react';

/* Evita que uma falha no 3D derrube a página. Exibe o fallback no lugar. */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.warn('Cena 3D indisponível, usando fallback:', error);
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
