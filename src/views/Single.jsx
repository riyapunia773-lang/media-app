import {useLocation, useNavigate} from 'react-router';
import Likes from '../components/Likes';

const Single = () => {
  const {state} = useLocation();
  const navigate = useNavigate();
  const item = state?.item;

  if (!item) {
    return <p>No media item selected.</p>;
  }

  return (
    <div>
      <h2>{item.title}</h2>
      <p>{item.description}</p>
      <p>Owner: {item.username}</p>

      {item.media_type.startsWith('image') ? (
        <img src={item.filename} alt={item.title} />
      ) : (
        <video controls>
          <source src={item.filename} type={item.media_type} />
        </video>
      )}

      <Likes mediaId={item.media_id} />

      <button onClick={() => navigate(-1)}>Go back</button>
    </div>
  );
};

export default Single;