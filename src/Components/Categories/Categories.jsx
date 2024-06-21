import axios from 'axios';
import Loader from '../Loader/Loader';
import { useQuery } from '@tanstack/react-query';


const Categories = () => {  
  const {isPending,data} = useQuery({
    queryKey:['category'],
    queryFn:async()=>{
      return await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    },
    staleTime:60 * 1000,
    gcTime:30*1000
  })

  if (isPending) {
    return <Loader />;
  }

    return (
      <div className='col-span-7 gap-5'>
         <swiper-container
              className='cursor-pointer'
              slides-per-view='7'
              loop='true'
            >
          {data.data.data.map((item) => (
          <swiper-slide key={item._id}>
                  <img src={item.image} alt='Category img' className='w-full h-full'  />
                  <h2>{item.name}</h2>
          </swiper-slide>
          ))}
          </swiper-container>
        </div>
    );
  };

export default Categories;
