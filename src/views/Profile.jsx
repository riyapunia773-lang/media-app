import {useEffect, useState} from 'react';
import {useUser} from '../hooks/apihooks';

const Profile = () => {
  const [user, setUser] = useState(null);
  const {getUserByToken} = useUser();

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = localStorage.getItem('token');

        if (token) {
          const userData = await getUserByToken(token);
         
        setUser(userData.user);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getUser();
  }, []);

  return (
    <>
      <h2>Profile</h2>

      {user ? (
        <>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </>
      ) : (
        <p>No user logged in.</p>
      )}
    </>
  );
};

export default Profile;