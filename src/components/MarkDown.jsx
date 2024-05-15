import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import remarkGfm from 'remark-gfm';

const MarkDown = ({ texto = "" }) => {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {texto}
    </ReactMarkdown>
  )
}

MarkDown.propTypes = {
  texto: PropTypes.string.isRequired
};

export default MarkDown