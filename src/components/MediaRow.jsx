import {Link, useNavigate} from 'react-router';
import PropTypes from 'prop-types';
import {useUserContext} from '../hooks/contextHooks';
import {useMedia} from '../hooks/apihooks';

const MediaRow = ({item}) => {
  const {user} = useUserContext();
 const {deleteMedia, modifyMedia} = useMedia();
  const navigate = useNavigate();
const handleModify = async () => {
  try {
    console.log('Modify media:', item.media_id);

    const title = window.prompt('New title:', item.title);
    if (title === null) return;

    const description = window.prompt(
      'New description:',
      item.description,
    );
    if (description === null) return;

    const token = localStorage.getItem('token');

    await modifyMedia(
      item.media_id,
      {title, description},
      token,
    );

    navigate(0);
  } catch (error) {
    console.error(error);
  }
};

  const handleDelete = async () => {
    try {
      console.log('Delete media:', item.media_id);

      const token = localStorage.getItem('token');
      await deleteMedia(item.media_id, token);

      navigate(0);
    } catch (error) {
      console.error(error);
    }
  };

  const isOwner = user && user.user_id === item.user_id;
const isAdmin = user && user.level_name === 'Admin';
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800">
      <td className="p-3">
        <img
          className="h-20 w-24 rounded object-cover"
          src={item.thumbnail}
          alt={item.title}
        />
      </td>

      <td className="p-3">{item.username}</td>
      <td className="p-3 font-medium">{item.title}</td>
      <td className="p-3">{item.description}</td>
      <td className="p-3">
        {new Date(item.created_at).toLocaleString('fi-FI')}
      </td>
      <td className="p-3">{item.filesize}</td>
      <td className="p-3">{item.media_type}</td>

      <td className="p-3">
        <div className="flex gap-2">
          <Link
            className="rounded bg-purple-600 px-3 py-2 text-white hover:bg-purple-700"
            to="/single"
            state={{item}}
          >
            Show
          </Link>

          {(isOwner || isAdmin) && (
            <>
              <button
                className="rounded bg-purple-600 px-3 py-2 text-white hover:bg-purple-700"
                type="button"
                onClick={handleModify}
              >
                Modify
              </button>

              <button
                className="rounded bg-red-600 px-3 py-2 text-white hover:bg-red-700"
                type="button"
                onClick={handleDelete}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

MediaRow.propTypes = {
  item: PropTypes.shape({
    media_id: PropTypes.number.isRequired,
    user_id: PropTypes.number.isRequired,
    filename: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    filesize: PropTypes.number.isRequired,
    media_type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    username: PropTypes.string,
  }).isRequired,
};

export default MediaRow;