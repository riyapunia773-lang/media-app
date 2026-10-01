import PropTypes from 'prop-types';
const SingleView = (props) => {
  const {item, setSelectedItem} = props;

  return (
    <dialog open={item !== null}>
      <h2>{item?.title}</h2>
      <p>{item?.description}</p>
      {item?.media_type.startsWith('image') ? (
  <img src={item.filename} alt={item.title} />
) : (
  <video controls>
    <source src={item?.filename} type={item?.media_type} />
  </video>
)}
      <button onClick={() => setSelectedItem(null)}>Close</button>
    </dialog>
  );
};
SingleView.propTypes = {
  item: PropTypes.shape({
    filename: PropTypes.string.isRequired,
    media_type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  setSelectedItem: PropTypes.func.isRequired,
};
export default SingleView;