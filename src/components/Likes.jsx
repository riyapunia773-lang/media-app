import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useLike} from '../hooks/apihooks';
import {useUserContext} from '../hooks/contextHooks';

const Likes = ({mediaId}) => {
  const {user} = useUserContext();
  const {postLike, deleteLike, getLikeCountByMediaId, getLikeByUser} =
    useLike();

  const [likeCount, setLikeCount] = useState(0);
  const [userLike, setUserLike] = useState(null);

  const getLikes = async () => {
    try {
      const countResult = await getLikeCountByMediaId(mediaId);
      setLikeCount(countResult.count);

      const token = localStorage.getItem('token');

      if (user && token) {
        const userLikes = await getLikeByUser(token);
        const foundLike = userLikes.find(
          (like) => like.media_id === mediaId,
        );
        setUserLike(foundLike || null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLikes();
  }, [mediaId, user]);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem('token');

      if (userLike) {
        await deleteLike(userLike.like_id, token);
      } else {
        await postLike(mediaId, token);
      }

      await getLikes();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="my-4 flex items-center justify-center gap-3">
      <button
        className="rounded bg-purple-600 px-3 py-2 text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
        type="button"
        onClick={handleLike}
        disabled={!user}
      >
        {userLike ? 'Unlike' : 'Like'}
      </button>

      <span>{likeCount} likes</span>
    </div>
  );
};

Likes.propTypes = {
  mediaId: PropTypes.number.isRequired,
};

export default Likes;