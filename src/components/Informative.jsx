import { message } from "antd";
import PropTypes from 'prop-types';

export default function Informative({ information = '', type = 'info', redirect = '', duration = 4 }) {
  const DURATION = duration || 4;
  const TYPES = ['info', 'error', 'success', 'warning'];

  if (typeof type !== 'string') {
    message.error('Oh no, surgió un error: el tipo de informativo no es un texto válido');
    return;
  }

  const trimmedType = type.trim();

  if (!TYPES.includes(trimmedType)) {
    message.error('Oh no, surgió un error: el tipo de informativo seleccionado no existe', DURATION);
    return;
  }

  let prevMessage = '';

  if (trimmedType === 'info') {
    prevMessage = information;
  }

  if (trimmedType === 'error') {
    prevMessage = `Oh no, surgió un error: ${information}`;
  }

  if (trimmedType === 'success') {
    prevMessage = `Transacción exitosa: ${information}`;
  }

  if (trimmedType === 'warning') {
    prevMessage = `Cuidado: ${information}`;
  }

  message[trimmedType](prevMessage, DURATION);

  if (redirect) {
    setTimeout(() => {
      window.location.href = redirect;
    }, DURATION * 1000);
  }
}

Informative.propTypes = {
  information: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['info', 'error', 'success', 'warning']).isRequired,
  redirect: PropTypes.string,
  duration: PropTypes.number
};