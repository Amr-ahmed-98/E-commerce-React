import axios from 'axios';
import { useFormik } from 'formik';
import { useContext } from 'react';
import * as yup from 'yup';
import { AuthContext } from '../../Context/AuthContext';
import { CartContext } from '../../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const PayOnline = () => {
  const {loggedCart,setCartState} = useContext(CartContext)
  const {token} = useContext(AuthContext)
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: '',
    },
    validationSchema: yup.object({
      details: yup.string().required('details is required').min(10, 'details must be at least 10 characters'),
      phone: yup
        .string()
        .required('phone is required')
        .matches(
          /^(011|010|015)\d{8}$/,
          'phone must start with 011,010,015 and be 11 digits'
        ),
      city: yup.string().required('city is required'),
    }),
    onSubmit: async(values) => {
      try{
        const inputData = {
          shippingAddress:{
            details:values.details,
            phone:values.phone,
            city:values.city
          }
        }
        const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${loggedCart.data._id}?url=http://localhost:5173`, {inputData},{
          headers: {
            token
          }
        })
        setCartState(true)
        window.location.href = data.session.url
      }catch(error){
        console.log(error)
      }
    },
  });
 

  return (
   <>
   <Helmet>
    <title>Pay Online</title>
   </Helmet>
    <form onSubmit={formik.handleSubmit} autoComplete='off'>
      <div className='container flex flex-col '>
        <div className='my-3 mx-20'>
          <label htmlFor='details'>details:</label>
          <textarea
            type='text'
            name='details'
            id='details'
            className='border h-10 outline-none ps-3 rounded-md w-full'
            onChange={formik.handleChange}
            value={formik.values.details}
            onBlur={formik.handleBlur}
          />
          {formik.errors.details && formik.touched.details ? (
            <p className='form-alert'>{formik.errors.details}</p>
          ) : null}
        </div>
        <div className='my-3 mx-20'>
          <label htmlFor='phone'>phone:</label>
          <input
            type='text'
            name='phone'
            id='phone'
            className='border h-10 outline-none ps-3 rounded-md  w-full'
            onChange={formik.handleChange}
            value={formik.values.phone}
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && formik.touched.phone ? (
            <p className='form-alert'>{formik.errors.phone}</p>
          ) : null}
        </div>
        <div className='my-3 mx-20'>
          <label htmlFor='city'>city:</label>
          <input
            type='text'
            name='city'
            id='city'
            className='border h-10 outline-none ps-3 rounded-md  w-full'
            onChange={formik.handleChange}
            value={formik.values.city}
            onBlur={formik.handleBlur}
          />
          {formik.errors.city && formik.touched.city ? (
            <p className='form-alert'>{formik.errors.city}</p>
          ) : null}
          <div>
            <button className='btn my-5 p-1' type='submit'>
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
   </>
  );
};

export default PayOnline;





