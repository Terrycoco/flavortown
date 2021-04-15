import {useState} from 'react';

const useFetch = (url, initialValue) => {
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async function () {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);
  return { loading, data };
};

export default useFetch;