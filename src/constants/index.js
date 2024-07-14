export const STYLES_CONTAINER_CARDS = {
  display: 'flex',
  gap: '10px',
  alignItems: 'center'
};

export const capitalizeWords = (str = '') => {
  if (typeof str !== 'string') return '';
  return str.replace(/\b\w/g, char => char.toUpperCase());
};