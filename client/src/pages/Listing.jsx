import React from 'react'
import { useEffect ,useState} from 'react'
import { useNavigate, useParams } from "react-router-dom";
import {Swiper , SwiperSlide} from "swiper/react";
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle';
export default function Listing() {
    const params = useParams();
    SwiperCore.use(Navigation);
    const [listing , setListing] = useState(null);
    const [loading , setLoading] = useState(true);
    const [error , setError] = useState(false);
    useEffect(()=>{
        const fetchListing = async ()=>{
            try {
                setLoading(true);
                const listingId = params.listingId;
                const res = await fetch(`/api/listing/get/${listingId}`);
                const data = await res.json();
                if(data.success === false){
                    setError(true);
                    setLoading(false);
                }
                setListing(data);
                setError(false);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(true);
            }
        }
    fetchListing();
  },[params.listingId])
  console.log(loading);
  return (
    <main>
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full border-t-4 border-green-700 border-opacity-85 h-20 w-20"></div>
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center h-screen">
          <h1 className=" text-2xl">Somthing went Wrong!!</h1>
        </div>
      )}
        {listing && !loading && !error &&(
            <>
            <Swiper navigation>
                {listing.imageUrls.map((url)=>(
                    <SwiperSlide key={url}>
                        <img src={url} alt={listing.name} />
                        <div className="h--[550px]" style={{background:`url(${url}) center no-repeat`, backgroundSize:'cover'}}>

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            </>
        )}
    </main>
  );
}
