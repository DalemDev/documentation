import { EyeOutlined } from "@ant-design/icons";
import { Card as CardAntd, Modal } from "antd";
import Meta from "antd/lib/card/Meta";
import PropTypes from 'prop-types';
import Cover from '../assets/images/post-cover.jpg';
import { STYLES_CARD } from "./constants";
import { useState } from "react";
import { useSelector } from "react-redux";


export default function Card({ title = '', url_image = '', identificator = 'documentaciones' }) {
  const [modal, setModal] = useState(false);
  const [post, setPost] = useState('');
  const markdowns = useSelector(state => state.documents.value)[identificator];

  const verPost = () => {
    const post = (markdowns || []).find((item) => item?.name === title).content || '';

    setPost(post);
    setModal(true);
  };

  return (
    <>
      <Modal width={800} open={modal} onCancel={() => setModal(false)} footer={null}>
        {post && (
          <div dangerouslySetInnerHTML={{ __html: post }} />
        )}
      </Modal>
      <CardAntd
        style={STYLES_CARD}
        cover={
          <img
            alt="cover"
            src={url_image && url_image !== '' ? url_image : Cover}
          />
        }
        actions={[
          <EyeOutlined key='see' onClick={verPost} />
        ]}
      >
        <Meta
          title={title}
        />
      </CardAntd>
    </>
  )
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  url_image: PropTypes.string,
  identificator: PropTypes.string.isRequired
};
