import {useEffect, useState} from 'react';
import fetchData from '../utils/fetchData';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const getMedia = async () => {
    try {
      const json = await fetchData(
        import.meta.env.VITE_MEDIA_API + '/media',
      );

      const newArray = await Promise.all(
        json.map(async (item) => {
          const user = await fetchData(
            import.meta.env.VITE_AUTH_API + '/users/' + item.user_id,
          );

          return {...item, username: user.username};
        }),
      );

      setMediaArray(newArray);
    } catch (error) {
      console.error(error);
    }
  };

  const postMedia = async (file, inputs, token) => {
    const mediaData = {
      title: inputs.title,
      description: inputs.description,
      filename: file.filename,
      media_type: file.media_type,
      filesize: file.filesize,
    };

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(mediaData),
    };

    const result = await fetchData(
      import.meta.env.VITE_MEDIA_API + '/media',
      fetchOptions,
    );

    return result;
  };

  const deleteMedia = async (mediaId, token) => {
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const result = await fetchData(
      import.meta.env.VITE_MEDIA_API + '/media/' + mediaId,
      fetchOptions,
    );

    return result;
  };

  const modifyMedia = async (mediaId, inputs, token) => {
    const fetchOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: inputs.title,
        description: inputs.description,
      }),
    };

    const result = await fetchData(
      import.meta.env.VITE_MEDIA_API + '/media/' + mediaId,
      fetchOptions,
    );

    return result;
  };

  useEffect(() => {
    getMedia();
  }, []);

  return {
    mediaArray,
    postMedia,
    deleteMedia,
    modifyMedia,
  };
};

const useAuthentication = () => {
  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };

    const loginResult = await fetchData(
      import.meta.env.VITE_AUTH_API + '/auth/login',
      fetchOptions,
    );

    return loginResult;
  };

  return {postLogin};
};

const useUser = () => {
  const postUser = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };

    const user = await fetchData(
      import.meta.env.VITE_AUTH_API + '/users',
      fetchOptions,
    );

    return user;
  };

  const getUserByToken = async (token) => {
    const fetchOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const user = await fetchData(
      import.meta.env.VITE_AUTH_API + '/users/token',
      fetchOptions,
    );

    return user;
  };

  return {getUserByToken, postUser};
};
const useLike = () => {
  const postLike = async (mediaId, token) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        media_id: mediaId,
      }),
    };

    return await fetchData(
      import.meta.env.VITE_MEDIA_API + '/likes',
      fetchOptions,
    );
  };

  const deleteLike = async (likeId, token) => {
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return await fetchData(
      import.meta.env.VITE_MEDIA_API + '/likes/' + likeId,
      fetchOptions,
    );
  };

  const getLikeCountByMediaId = async (mediaId) => {
    return await fetchData(
      import.meta.env.VITE_MEDIA_API + '/likes/count/' + mediaId,
    );
  };

  const getLikeByUser = async (token) => {
    const fetchOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return await fetchData(
      import.meta.env.VITE_MEDIA_API + '/likes/byuser',
      fetchOptions,
    );
  };

  return {
    postLike,
    deleteLike,
    getLikeCountByMediaId,
    getLikeByUser,
  };
};
const useFile = () => {
  const postFile = async (file, token) => {
    const formData = new FormData();
    formData.append('file', file);

    const fetchOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    const fileData = await fetchData(
      import.meta.env.VITE_UPLOAD_SERVER + '/upload',
      fetchOptions,
    );

    return fileData;
  };

  return {postFile};
};

export {useMedia, useAuthentication, useUser, useFile, useLike};