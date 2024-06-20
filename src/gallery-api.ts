import axios from 'axios';

const ACCESS_KEY: string = 'EEwFh9PLOE4h5R5ZYGt2PkWkhv30pvchWuZPzg3V1jU';
axios.defaults.baseURL = 'https://api.unsplash.com/';

export type Image = {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
  user: {
    profile_image: {
      small: string;
    };
    name: string;
    instagram_username: string;
  };
  likes: number;
  created_at: string;
};

interface IResponse {
  imagesCollection: Image[];
  totalPages: number;
}

export const fetchImagesWithTopic = async (
  query: string,
  page: number
): Promise<IResponse> => {
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

  const resultObject: IResponse = {
    imagesCollection: response.data.results,
    totalPages: response.data.total_pages,
  };

  return resultObject;
};
