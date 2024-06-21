import slider1 from '../../assets/images/slider-image-1.jpeg';
import slider2 from '../../assets/images/slider-image-2.jpeg';
import slider3 from '../../assets/images/slider-image-3.jpeg';
import banner1 from '../../assets/images/grocery-banner.png';
import banner2 from '../../assets/images/grocery-banner-2.jpeg';
import Categories from '../../Components/Categories/Categories';
import Products from '../../Components/Products/Products';


const Home = () => {
  return (
    <>
      <div className='container my-5 '>
        <div className='grid grid-cols-3 '>
          <div className='col-span-2 overflow-hidden'>
            <swiper-container
              className='cursor-pointer'
              slides-per-view='1'
              loop='true'
            >
              <swiper-slide>
                <img src={slider1} alt='slider 1' className='w-full' />
              </swiper-slide>
              <swiper-slide>
                <img src={slider2} alt='slider 2' className='w-full' />
              </swiper-slide>
              <swiper-slide>
                <img src={slider3} alt='slider 3' className='w-full' />
              </swiper-slide>
            </swiper-container>
          </div>
          <div className='h-full flex flex-col overflow-hidden'>
            <img src={banner1} alt='banner' className='w-full h-full' />
            <img src={banner2} alt='banner' className='w-full h-full' />
          </div>
        </div>
        <div>
        <h2>Shop Popular Categories</h2>
          <div className='grid grid-cols-7'>
          <Categories />
          </div>
        </div>
        <div className='grid grid-cols-6 my-8 gap-5'>
          <Products/>
        </div>
      </div>
    </>
  );
};

export default Home;
