import axios from 'axios';

const ACCESS_KEY = 'EEwFh9PLOE4h5R5ZYGt2PkWkhv30pvchWuZPzg3V1jU';
axios.defaults.baseURL = 'https://api.unsplash.com/';

export const fetchImagesWithTopic = async (query, page) => {
  const response = await axios.get('search/photos', {
    params: {
      query,
      page,
      per_page: 12,
    },
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
      'Accept-Version': 'v1',
    },
  });

  const resultObject = {
    imagesCollection: response.data.results,
    totalPages: response.data.total_pages,
  };

  return resultObject;
};
