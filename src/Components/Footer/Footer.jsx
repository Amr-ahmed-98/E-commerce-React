import amzonPay from '../../assets/images/amazon-pay.png'
import americanExpress from '../../assets/images/American-Express-Color.png'
import masterCard from '../../assets/images/mastercard.webp'
import payPal from '../../assets/images/paypal.png'
import appleStore from '../../assets/images/get-apple-store.png'
import googlePlay from '../../assets/images/get-google-play.png'
const Footer = () => {
  return (
    <div className="bg-slate-100 absolute start-0 end-0 top-[100%] mt-10">
        <div className="container py-10">
            <div>
                <p className="text-lg">Get the FreshCart app</p>
                <p>we will send you a link open it on your phone to dawnload the app</p>
            </div>
            <div className="pt-4 flex gap-5 mb-5"> 
                <input type="text" placeholder="Email...." className="ms-5 h-10 rounded flex-grow ps-2 outline-none" />
                <button className="btn w-48 h-10">Share App Link</button>
            </div>
            <hr className="border-slate-300" />
                <div className='lg:flex'>
                    <div className='py-5 flex gap-4 items-center flex-grow'>
                        <span>Payment Partners</span>
                        <div className='flex gap-5'>
                            <img src={amzonPay} alt="amazon pay" className='w-[80px] object-contain' />
                            <img src={americanExpress} alt="american express " className='w-[80px] object-contain' />
                            <img src={masterCard} alt="master card" className='w-[80px] object-contain' />
                            <img src={payPal} alt="paypal" className='w-[80px] object-contain' />
                        </div>
                    </div>
                    <div className='flex gap-3 items-center'>
                        <span>Get deliveries with FreshCart</span>
                        <div className='flex gap-2'>
                            <img src={appleStore} alt="apple store" className='w-[80px]' />
                            <img src={googlePlay} alt="google play" className='w-[80px]' />
                        </div>
                    </div>
                </div>
            <hr className="border-slate-300" />
        </div>
    </div>
  )
}

export default Footer