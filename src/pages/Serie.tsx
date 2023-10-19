import React from 'react';
import { useParams } from 'react-router-dom';
import Comment from '../components/Comment'; 

const SeriePage: React.FC = () => {
  const { serieId } = useParams<{ serieId: string | undefined }>();
  const seriesIdToUse = serieId || '';
  
  return (
    <div className="container">
      <h1>Série</h1>
      <Comment serieId={seriesIdToUse} />
    </div>
  );
};

export default SeriePage;
