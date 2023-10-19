import React, { useState, useEffect, ChangeEvent } from 'react';
import { collection, addDoc } from 'firebase/firestore/lite';
import { firestore } from '../App';
import { getDocs } from 'firebase/firestore/lite';
import '../assets/Comment.scss';

interface Comment {
  id: string;
  rating: number;
  comment: string;
}

interface CommentProps {
  serieId: string;
}

const Comment: React.FC<CommentProps> = ({ serieId }) => {
  const [rating, setRating] = useState<number>(1);
  const [comment, setComment] = useState<string>('');
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const getComments = async () => {
      const commentRef = collection(firestore, 'series', serieId, 'comments');
      const commentSnapshot = await getDocs(commentRef);

      const commentList: Comment[] = commentSnapshot.docs.map((doc) => doc.data() as Comment);
      setComments(commentList);
    };

    getComments();
  }, [serieId]);

  const handleRatingChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setRating(parseInt(event.target.value));
  };

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleSubmitComment = async () => {
    if (comment.trim() === '') {
      return;
    }

    const commentData = {
      rating,
      comment,
    };

    try {
      const docRef = await addDoc(collection(firestore, 'series', serieId, 'comments'), commentData);
      setComments([...comments, { id: docRef.id, ...commentData }]);
      setRating(1);
      setComment('');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du commentaire : ', error);
    }
  };

  return (
    <div>
      <div id="commentaire">
        <p>Commentaires</p>
      </div>
      <div>
        <div className="comment-input-container">
          <textarea value={comment} onChange={handleCommentChange} rows={4} cols={25} className="comment-input" />
        </div>
        <div className="select-container">
          <select value={rating} onChange={handleRatingChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      </div>
      <div>
        {comments.map((c, index) => (
          <div key={index}>
            <p>
              <span className="star-rating">{c.rating}</span>
              Commentaire : {c.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
