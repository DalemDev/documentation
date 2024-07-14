import { Divider, Skeleton, Tabs } from 'antd';
import markdownit from 'markdown-it';
import { useEffect, useMemo, useState } from 'react';
import Card from './components/Card';
import Informative from './components/Informative';
import { capitalizeWords, STYLES_CONTAINER_CARDS } from './constants';
import './css/app.css';
import { useDispatch, useSelector } from 'react-redux';
import { addDocuments } from './redux/reducers/documentSlice'
import { FileOutlined, FolderOutlined, LinuxOutlined } from '@ant-design/icons';

function App() {
  const markdowns = useSelector(state => state.documents.value);
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(true);

  const markdownDocumentacionesFormated = useMemo(() => {
    return (markdowns?.documentaciones || []).map((markdown, index) => (
      <Card
        key={index}
        title={markdown?.name}
        identificator='documentaciones'
      />
    ));
  }, [markdowns]);

  const markdownSoportesFormated = useMemo(() => {
    return (markdowns?.soportes || []).map((markdown, index) => (
      <Card
        key={index}
        title={markdown?.name}
        identificator='soportes'
      />
    ));
  }, [markdowns]);

  const markdownRecursosFormated = useMemo(() => {
    return (markdowns?.recursos || []).map((markdown, index) => (
      <Card
        key={index}
        title={markdown?.name}
        identificator='recursos'
      />
    ));
  }, [markdowns]);

  const items = useMemo(() => ([
    {
      label: (
        <span><FileOutlined /> Documentaciones</span>
      ),
      key: 'documentaciones',
      children: (
        <div style={STYLES_CONTAINER_CARDS}>
          {markdownDocumentacionesFormated}
        </div>
      )
    },
    {
      label: (
        <span><FolderOutlined /> Soportes</span>
      ),
      key: 'soportes',
      children: (
        <div style={STYLES_CONTAINER_CARDS}>
          {markdownSoportesFormated}
        </div>
      )
    },
    {
      label: (
        <span><LinuxOutlined /> Recursos Y Herramientas</span>
      ),
      key: 'recursos',
      children: (
        <div style={STYLES_CONTAINER_CARDS}>
          {markdownRecursosFormated}
        </div>
      )
    }
  ]
  ), [markdownDocumentacionesFormated, markdownSoportesFormated, markdownRecursosFormated]);

  useEffect(() => {
    const loadMarkdownsFiles = async () => {
      try {
        const md = markdownit();

        const filesDocumentaciones = import.meta.glob(`/src/assets/documents/documentaciones/*.md`);

        const markdownPromisesDocumentaciones = Object.keys(filesDocumentaciones).map(async (filename) => {
          const response = await fetch(filename);

          if (!response.ok) {
            throw new Error(`Error al cargar el archivo ${filename}: ${response.status}`)
          }

          const markdown = await response.text();
          const html = md.render(markdown);

          const separated = filename.split('/');
          const name = capitalizeWords(separated[separated.length - 1].replace('_', ' ').replace('.md', ''));

          return { name, content: html };
        })

        const markdownContentsDocumentaciones = await Promise.all(markdownPromisesDocumentaciones);

        const filesSoportes = import.meta.glob(`/src/assets/documents/soportes/*.md`);

        const markdownPromisesSoportes = Object.keys(filesSoportes).map(async (filename) => {
          const response = await fetch(filename);

          if (!response.ok) {
            throw new Error(`Error al cargar el archivo ${filename}: ${response.status}`)
          }

          const markdown = await response.text();
          const html = md.render(markdown);

          const separated = filename.split('/');
          const name = capitalizeWords(separated[separated.length - 1].replace('_', ' ').replace('.md', ''));

          return { name, content: html };
        })

        const markdownContentsSoportes = await Promise.all(markdownPromisesSoportes);


        const filesRecursos = import.meta.glob(`/src/assets/documents/recursos/*.md`);

        const markdownPromisesRecursos = Object.keys(filesRecursos).map(async (filename) => {
          const response = await fetch(filename);

          if (!response.ok) {
            throw new Error(`Error al cargar el archivo ${filename}: ${response.status}`)
          }

          const markdown = await response.text();
          const html = md.render(markdown);

          const separated = filename.split('/');
          const name = capitalizeWords(separated[separated.length - 1].replace('_', ' ').replace('.md', ''));

          return { name, content: html };
        })

        const markdownContentsRecursos = await Promise.all(markdownPromisesRecursos);

        const informacion = {
          documentaciones: markdownContentsDocumentaciones,
          soportes: markdownContentsSoportes,
          recursos: markdownContentsRecursos
        };

        dispatch(addDocuments(informacion));
      } catch (error) {
        Informative({
          information: error || error?.message,
          type: 'error'
        })
      } finally {
        setIsFetching(false);
      }
    };

    loadMarkdownsFiles();
  }, [dispatch]);

  return (
    <div className='container'>
      <h1 className='titulo'>Documentaciones - Sistemas Ferretti ❤️</h1>

      <p className='parrafo'>Hola Ferretti Coders,</p>

      <p className='parrafo'>En esta página encontrarán diferentes documentaciones que servirán como guía durante sus desarrollos. Estas documentaciones están diseñadas para facilitar su trabajo y proporcionarles las herramientas necesarias para enfrentar cualquier desafío.</p>

      <p className='parrafo'>Pueden agregar nuevas documentaciones que consideren útiles para el equipo. Si encuentran información valiosa que pueda beneficiar a todos, no duden en compartirla aquí. Esta página es un recurso vivo que crecerá y evolucionará con sus aportes.</p>

      <p className='parrafo'>Siéntanse libres de leer y consultar estas documentaciones para mejorar sus conocimientos y habilidades. Juntos, podemos crear un entorno de desarrollo más eficiente y colaborativo.</p>

      <p className='parrafo'>¡Felices codificaciones y éxitos en sus desarrollos!</p>

      <Divider />

      {isFetching ? (
        <Skeleton active={true} />
      ) : (
        <Tabs items={items} />
      )}
    </div>
  )
}

export default App
