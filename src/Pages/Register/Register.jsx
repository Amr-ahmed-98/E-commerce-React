import axios from 'axios';
import { useFormik } from 'formik';
import { useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import * as yup from 'yup';
import { AuthContext } from '../../Context/AuthContext';
import { Helmet } from 'react-helmet';

const Register = () => {
  const {setToken} = useContext(AuthContext)
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .required('name is required')
        .min(3, 'name must be at least 3 characters')
        .matches(
          /^(?:[A-Z][a-z]*\s?)+$/,
          'each word must start with uppercase'
        ),
      email: yup.string().required('email is required').email(),
      password: yup
        .string()
        .required('password is required')
        .min(8, 'password must be at least 8 characters'),
      rePassword: yup
        .string()
        .required('rePassword is required')
        .oneOf([yup.ref('password')], 'passwords must match'),
      phone: yup
        .string()
        .required('phone is required')
        .matches(
          /^(011|010|015)\d{8}$/,
          'phone must start with 011,010,015 and be 11 digits'
        ),
    }),
    onSubmit: async (values) => {
      try {
        const {data} = await axios.post(
          'https://ecommerce.routemisr.com/api/v1/auth/signup',
          values
        );
        toast.success(`${data.message}`);
        toast.loading('wait until you get into site');
        setToken(data.token)
        setTimeout(() => {
          toast.dismiss();
          navigate('/');
        }, 2000);
      } catch (error) {
        toast.loading('something wrong');
        setTimeout(() => {
          toast.dismiss();
          toast.error(`${error}`);
        }, 2000);
      }
    },
  });
  return (
    <>
    <Helmet>
      <title>Register | E-Commerce App</title>
    </Helmet>
      <div>
        <Toaster />
      </div>
      <div className='container my-5'>
        <p className='text-2xl mb-3'>Register Now :</p>
        <form onSubmit={formik.handleSubmit} autoComplete='off'>
          <div className='flex flex-col'>
            <label htmlFor='name'>Name:</label>
            <input
              name='name'
              id='name'
              type='text'
              className='border h-10 outline-none ps-3 rounded-md'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className='form-alert '>{formik.errors.name}</div>
            ) : null}
          </div>
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
          <div className='flex flex-col'>
            <label htmlFor='rePassword'>rePassword:</label>
            <input
              name='rePassword'
              id='rePassword'
              type='password'
              className='border h-10 outline-none ps-3 rounded-md'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.rePassword}
            />
            {formik.touched.rePassword && formik.errors.rePassword ? (
              <div className='form-alert '>{formik.errors.rePassword}</div>
            ) : null}
          </div>
          <div className='flex flex-col'>
            <label htmlFor='phone'>Phone:</label>
            <input
              name='phone'
              id='phone'
              type='tel'
              className='border h-10 outline-none ps-3 rounded-md'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className='form-alert '>{formik.errors.phone}</div>
            ) : null}
          </div>
          <div className='flex w-full justify-end'>
            <button className='btn w-24 h-10 mt-5' type='submit'>
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
