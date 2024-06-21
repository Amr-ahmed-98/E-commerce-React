import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../../Components/Loader/Loader';
import { Helmet } from 'react-helmet';
const Brands = () => {
  const [brands, setBrands] = useState(null);
  // Fetch brands from API
  const fetchBrands = async () => {
    try {
      const { data } = await axios.get(
        'https://ecommerce.routemisr.com/api/v1/brands'
      );
      setBrands(data);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);
  return (
    <>
    <Helmet>
      <title>Brands | E-Commerce App</title>
    </Helmet>
      <div className='container'>
        <div className='grid grid-cols-1 gap-5 md:grid-cols-4 '>
          {brands ? (
            brands.data.map((brand) => (
              <div
                key={brand._id}
                className='flex flex-col items-center shadow-md    h-full cursor-pointer hover:scale-105 hover:transition-transform'
              >
                <img src={brand.image} alt='barnd image' />
                <h2>{brand.name}</h2>
              </div>
            ))
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </>
  );
};

export default Brands;
