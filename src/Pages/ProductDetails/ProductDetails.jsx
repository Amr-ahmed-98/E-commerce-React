import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../Components/Loader/Loader';
import ImageGallery from 'react-image-gallery';
import { AuthContext } from '../../Context/AuthContext';
import { CartContext } from '../../Context/CartContext';

const ProductDetails = () => {
  const [images, setImages] = useState([]);
  const [product, setProduct] = useState(null);
  const {token} = useContext(AuthContext)
  const {AddToCart} = useContext(CartContext)
  console.log(product);
  const { id } = useParams();
  const getSpecificProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      setProduct(data);
      const imgList = data.data.images.map((img) => ({
        original: img,
        thumbnail: img,
      }));
      setImages(imgList);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSpecificProduct();
  }, []);
  if (!product) {
    return <Loader />;
  }

  return (
    <>
      <div className='grid grid-cols-12 gap-20 mt-20'>
        <div className='col-span-5'>
          <ImageGallery
            items={images}
            showNav={false}
            showPlayButton={false}
            showFullscreenButton={false}
            autoPlay={true}
          />
        </div>
        <div className='col-span-7 w-full h-full flex items-center '>
          <div className='flex flex-col justify-center items-center text-black'>
            <p>{product.data.title}</p>
            <p>{product.data.description}</p>
            <p>{product.data.category.name}</p>
            <div className='flex w-full self-start justify-between px-10 '>
            <p>{product.data.price} LE</p>
            <p>{product.data.ratingsAverage} <i className="fa-solid fa-star text-rateing"></i></p>
            </div>
            <button className='btn w-28 h-10' onClick={()=>{
              AddToCart(token,product.data.id)
            }}>Add To Cart</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
