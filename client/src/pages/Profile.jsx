import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserSuccess,
  deleteUserStart,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";
import {Link, useNavigate} from 'react-router-dom'

// firebase storage rules-
//       allow read;
//       allow write : if
//       request.resource.size < 2*124*1024 &&
//       request.resource.contentType.matches('image/.*')
export default function Profile() {
  const fileRef = useRef(null);
  const navigate = useNavigate()
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess , setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  const [userListings , setUserListings] = useState({});
  const [showListingsError, setShowListingsError] = useState(false);
  const [getUserError , setGetUserError] = useState(false);
  useEffect(() => {
    if (file) {
      handelFileUpload(file);
    }
  }, [file]);
  const handelFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setFilePerc(Math.round(progress));
    },
    (error) => {
      setFileUploadError(true);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then
      ((downloadURL) => {
        setFormData({ ...FormData, avatar: downloadURL });
      });
    }
    )
  };
  const handleChange = (e) =>{
    setFormData({...formData, [e.target.id]:e.target.value});
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setGetUserError(false);
        const res = await fetch(`/api/user/${currentUser._id}`);
        const data = await res.json();
        if (data.success == false) {
          setGetUserError(true);
          return ;
        } 
        setGetUserError(false);
        setFormData(data);
      } catch (error) {
        setGetUserError(error);
        console.log(error);
      }
    };
    fetchUserData();
  }, []);
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}` , {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(formData),
        });
        const data = await res.json();

        if(data.success ==  false){
          dispatch(updateUserFailure(data.message));
          return ;
        }
        dispatch(updateUserSuccess(data));
        setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }

  }
  const handleDeleteUser = async ()=>{
    try {
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}` , {
        method:"DELETE",
        headers:{
          "Content-Type":"application/json",
        },
        });
        const data = await res.json();
        if(data.success ==  false){
          dispatch(deleteUserFailure(data.message));
          return ;
        }
        dispatch(deleteUserSuccess(data));
        setUpdateSuccess(true);
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart())
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if(data.success == false) {
        dispatch(signOutUserFailure(data.message));
        return ;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(data.message));
    }
  };
  const handleListings = async () =>{
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if(data.success == false){
        setShowListingsError(true);
        return ;
      }
      setUserListings(data);
      console.log(data);
    } catch (error) {
      setShowListingsError(true);
    }
  }
  const handleDeleteListing = (listingId)=>{
    // console.log(listingId);
    return async ()=>{
      try {
        setShowListingsError(false);
        const res = await fetch(`/api/listing/delete/${listingId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
          const data = await res.json();
          if(data.success ==  false){
            console.log(data.message);
            return ;
          }
          handleListings();
      } catch (error) {
        console.log(error);
        setShowListingsError(true);
      }
    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="Profile Avatar"
          className="rounded
        -full h-24 w-24 object-cover cursor-pointer self-center "
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error while uploading file Image Must be less then 2MB
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 && !fileUploadError ? (
            <span className="text-green-700">Image Uploaded Successfully</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          className="border
          p-3 rounded-lg"
          defaultValue={formData && formData.username}
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className="border
          p-3 rounded-lg"
          defaultValue={formData && formData.email}
          id="email"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="password"
          className="border
         p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg 
         p-3 uppercase hover:opacity-95 disabled:opacity-85"
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <Link
          to={"/create-listing"}
          className="bg-green-700 text-white rounded-lg 
            p-3 uppercase hover:opacity-95 disabled:opacity-85 text-center"
        >
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-4">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete Account
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          {" "}
          Sign Out
        </span>
      </div>
      <p className="text-red-700 mt-3">{error ? error : ""}</p>
      <p className="text-green-700 mt-3">
        {updateSuccess ? "User is Updated Successfully" : ""}
      </p>
      {getUserError && (
        <p className="text-red-700">Getting user error - {error}</p>
      )}
      <button
        onClick={handleListings}
        className="text-green-700 w-full cursor-pointer"
      >
        Show Listings
      </button>
      {showListingsError && (
        <p className="text-red-700">Error while fetching listings</p>
      )}
      {userListings &&
        userListings.length == 0 && 
          (<p className="text-red-700">No Listings found</p>)}
      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold text-center mt-7">
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="flex border rounder-lg p-3 justify-between items-center gap-6"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  className="h-16 w-16 object-contain"
                  src={listing.imageUrls[0]}
                  alt="Listing Cover"
                />
              </Link>
              <Link
                className="flex-1 font-semibold hover:underline truncate"
                to={`/listing/${listing._id}`}
              >
                <p> {listing.name}</p>
              </Link>
              <div className="flex flex-col gap-5 items-center">
                <button
                  onClick={() => handleDeleteListing(listing._id)}
                  className="text-red-700 uppercase"
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className="text-green-700 uppercase">Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
