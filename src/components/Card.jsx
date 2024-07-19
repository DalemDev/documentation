import { EyeOutlined } from "@ant-design/icons";
import { Card as CardAntd } from "antd";
import PropTypes from 'prop-types';
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import CoverPost from '../assets/images/post-cover.jpg';
import CoverRecurso from '../assets/images/recurso-cover.webp';
import CoverSoporte from '../assets/images/soporte-cover.png';
import { STYLES_CARD } from "./constants";
import Post from "./Post";


export default function Card({ title = '', url_image = '', identificator = '' }) {
  const [modal, setModal] = useState(false);
  const [post, setPost] = useState('');
  const markdowns = useSelector(state => state.documents.value)[identificator];

  const verPost = () => {
    const post = (markdowns || []).find((item) => item?.name === title).content || '';

    setPost(post);
    setModal(true);
  };

  const ImagePost = useMemo(() => {
    if (url_image) {
      return <img alt="cover" src={url_image} />
    }

    if (identificator === 'soportes') {
      return <img alt="cover" src={CoverSoporte} />
    }

    if (identificator === 'recursos') {
      return <img alt="cover" src={CoverRecurso} />
    }

    return <img alt="cover" src={CoverPost} />
  }, [url_image, identificator]);

  return (
    <>
      <Post
        open={modal}
        onCancel={() => setModal(false)}
        post={post}
      />
      <CardAntd
        style={STYLES_CARD}
        cover={
          ImagePost
        }
        actions={[
          <EyeOutlined key='see' onClick={verPost} />
        ]}
      >
        <span style={{ fontWeight: 'bold' }}>{title}</span>
      </CardAntd>
    </>
  )
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  url_image: PropTypes.string,
  identificator: PropTypes.string.isRequired
};
