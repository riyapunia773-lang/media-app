import MediaRow from '../components/MediaRow';
import {useMedia} from '../hooks/apihooks';

const Home = () => {
  const {mediaArray} = useMedia();

  return (
    <>
      <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        My Media
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="p-3">Thumbnail</th>
              <th className="p-3">Username</th>
              <th className="p-3">Title</th>
              <th className="p-3">Description</th>
              <th className="p-3">Created</th>
              <th className="p-3">Size</th>
              <th className="p-3">Type</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {mediaArray.map((item) => (
              <MediaRow key={item.media_id} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;