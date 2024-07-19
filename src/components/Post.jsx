import { CopyOutlined } from "@ant-design/icons";
import { Button, message, Modal } from "antd";
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Post({ open = false, onCancel = () => { }, post = '' }) {

  const handleCopy = () => {
    message.success('Código copiado!');
  };

  const formatedPost = useMemo(() => {
    const parseOptions = {
      replace: (domNode) => {
        if (domNode.name === 'pre' && domNode.children[0].name === 'code') {
          const codeNode = domNode.children[0];
          const language = codeNode.attribs.class?.replace('language-', '');
          const codeContent = codeNode.children[0].data;
          return (
            <div style={{ position: 'relative' }}>
              <CopyToClipboard text={codeContent} onCopy={handleCopy}>
                <Button
                  type="primary"
                  style={{ position: 'absolute', top: 0, right: 0 }}
                >
                  <CopyOutlined />
                </Button>
              </CopyToClipboard>
              <SyntaxHighlighter language={language} style={okaidia}>
                {codeContent}
              </SyntaxHighlighter>
            </div>
          );
        }
      },
    };

    return parse(post, parseOptions);
  }, [post]);

  return (
    <Modal
      width={1000}
      open={open}
      onCancel={onCancel}
      footer={null}
    >
      {post && (
        <div>
          {formatedPost}
        </div>
      )}
    </Modal>
  );
}

Post.propTypes = {
  open: PropTypes.bool,
  onCancel: PropTypes.func,
  post: PropTypes.string
}
