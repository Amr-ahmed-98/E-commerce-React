import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const ForgetPassword = () => {
  const [isSubmited, setIsSubmitted] = useState(false);
  const [isVerfied,setIsverfied] = useState(false)
  const navigte = useNavigate();

//  -------------- Email Formik -------------
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: yup.object({
      email: yup.string().email().required('email is required'),
    }),
    onSubmit: async (values) => {
      try {
          const response = await axios.post(
            'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
            {
              email: values.email,
            }
          );
          toast.success(`${response.data.message}`);
          setIsSubmitted(true);
      } catch (error) {
        console.log(error.response.data.message)
        toast.error(`${error.response.data.message}`);
        setIsSubmitted(false);
      }
    },
  });

  // ------- Code Formik ------------
  const codeFormik = useFormik({
    initialValues: {
        code: '',
      },
      validationSchema: yup.object({
        code: yup.string().required('code is required')
      }),
      onSubmit: async (values) => {
        try{
            const response = await axios.post(
                'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
                {
                  resetCode: values.code,
                }
              );
              toast.success(`${response.data.status}`);
              setIsverfied(true)
        }catch(error){
            console.log(error.response.data.message)
            toast.error(`${error.response.data.message}`);
            setIsverfied(false)
        }
      }
  })

  // ------------- Change Password Formik ---------------
  const formikVerfication = useFormik({
    initialValues:{
        email:'',
        newPassword:''
    },
    validationSchema:yup.object({
        email:yup.string().email().required('email is required'),
        newPassword:yup.string().required('password is required').min(8, 'password must be at least 8 characters'),
    }),
    onSubmit:async (values)=>{
        try{
            const response = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',{
                email:values.email,
                newPassword:values.newPassword
            })
            toast.success(response.statusText)
            setTimeout(()=>{
                navigte('/login')
            },2000)

        }catch(error){
            console.log(error.response.data.message)
            toast.error(`${error.response.data.message}`);
        }
    }
  })
  return (
    <div>
      <Toaster />
      <div className='container mt-10'>
        {!isSubmited && (
          <form onSubmit={formik.handleSubmit}>
            <div className='flex flex-col'>
              <label htmlFor='email'>Email:</label>
              <input
                name='email'
                id='email'
                type='email'
                className='border h-10 outline-none ps-3 rounded-md '
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className='form-alert '>{formik.errors.email}</div>
              ) : null}
            </div>
            <button type='submit' className='btn w-[150px] h-[50px] mt-5'>
              Send Code
            </button>
          </form>
        )}

        {isSubmited && !isVerfied &&  (
          <form onSubmit={codeFormik.handleSubmit}>
            <div className='flex flex-col'>
              <label htmlFor='code'>Verify Code</label>
              <input
                name='code'
                id='code'
                type='text'
                className='border h-10 outline-none ps-3 rounded-md '
                onChange={codeFormik.handleChange}
                onBlur={codeFormik.handleBlur}
                value={codeFormik.values.code}
              />
              {codeFormik.touched.code && codeFormik.errors.code ? (
                <div className='form-alert '>{codeFormik.errors.code}</div>
              ) : null}
            </div>
            <button type='submit' className='btn w-[150px] h-[50px] mt-5'>
              Verify
            </button>
          </form>
        )}

        {isVerfied && (
          <form onSubmit={formikVerfication.handleSubmit}>
            <div className='flex flex-col'>
              <label htmlFor='email'>Email:</label>
              <input
                name='email'
                id='email'
                type='email'
                className='border h-10 outline-none ps-3 rounded-md '
                onChange={formikVerfication.handleChange}
                onBlur={formikVerfication.handleBlur}
                value={formikVerfication.values.email}
              />
              {formikVerfication.touched.email && formikVerfication.errors.email ? (
                <div className='form-alert '>{formikVerfication.errors.email}</div>
              ) : null}
            </div>
            <div className='flex flex-col'>
              <label htmlFor='newPassword'>New Password:</label>
              <input
                name='newPassword'
                id='newPassword'
                type='password'
                className='border h-10 outline-none ps-3 rounded-md '
                onChange={formikVerfication.handleChange}
                onBlur={formikVerfication.handleBlur}
                value={formikVerfication.values.newPassword}
              />
              {formikVerfication.touched.newPassword && formikVerfication.errors.newPassword ? (
                <div className='form-alert '>{formikVerfication.errors.newPassword}</div>
              ) : null}
            </div>
            <button type='submit' className='btn w-[150px] h-[50px] mt-5'>
              Update Data
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
