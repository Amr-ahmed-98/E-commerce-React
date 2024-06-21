import axios from 'axios';
import { useFormik } from 'formik';
import { useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

import * as yup from 'yup';
import { AuthContext } from '../../Context/AuthContext';

const Login = () => {
  const {setToken}  = useContext(AuthContext)
  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object({
      email: yup.string().required('email is required').email(),
      password: yup
        .string()
        .required('password is required')
        .min(8, 'password must be at least 8 characters'),
    }),
    onSubmit: async (values) => {
      try {
        const {data} = await axios.post(
          'https://ecommerce.routemisr.com/api/v1/auth/signin',
          values
        );
        
        toast.success(`${data.message}`);
        toast.loading('wait until you get into site');
        setToken(data.token)
        console.log(data.token)
        setTimeout(() => {
          toast.dismiss();
          navigate('/');
        }, 2000);
      } catch (error) {
        toast.loading('wait until you get into site');
        setTimeout(() => {
          toast.dismiss();
          toast.error(`${error.data.message}`);
        }, 2000);
      }
    },
  });
  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className='container my-5'>
        <p className='text-2xl mb-3'>Login Now :</p>
        <form onSubmit={formik.handleSubmit} autoComplete='off'>
          <div className='flex flex-col'>
            <label htmlFor='email'>Email:</label>
            <input
              name='email'
              id='email'
              type='email'
              className='border h-10 outline-none ps-3 rounded-md'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className='form-alert '>{formik.errors.email}</div>
            ) : null}
          </div>
          <div className='flex flex-col'>
            <label htmlFor='password'>Password:</label>
            <input
              name='password'
              id='password'
              type='password'
              className='border h-10 outline-none ps-3 rounded-md'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className='form-alert '>{formik.errors.password}</div>
            ) : null}
          </div>
          <div className='my-2'>
            <Link to={'/ForgetPassword'} className='text-main'> Forget Password ? </Link>
          </div>
          <div className='flex w-full justify-end'>
            <button className='btn w-24 h-10 mt-5' type='submit'>
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
