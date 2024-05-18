import axios from '../../axios';
import { useEffect, useState } from 'react';
import { requests } from '../../request';
import { Movie } from '../../type';

export const useProps = () => {
  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);

      // ① 取得した映像データからランダムでmovieに格納
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
    }
    fetchData();
  }, []);

  // ② descriptionの切り捨て用の関数
  const truncate = (str: string | undefined, n: number): string => {
    if (!str) {
      return '';
    }
    return str.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  return {
    movie,
    truncate,
  };
};
