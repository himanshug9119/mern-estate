import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    message: '',
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const mailToLink = `mailto:guptasitapur489+realEstate@gmail.com?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(formData.message)}`;
    window.location.href = mailToLink;
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-2xl font-bold mb-4">Contact Details</h2>
          <ul className="list-none mb-0 text-xl">
            <li className="mb-3">
              <strong>Name:</strong> Himanshu Gupta
            </li>
            <li className="mb-3">
              <strong>Email:</strong> <a href="mailto:guptasitapur489+realEstate@gmail.com">guptasitapur489+realEstate@gmail.com</a>
            </li>
            <li className="mb-3">
              <strong>Contact Number:</strong> +91 9918330323
            </li>
            <li className="mb-3">
              <strong>Address:</strong> Ahmedabad, India
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-1">
                Name:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="w-full py-2 px-4 border-gray-300 rounded"
                required
                onChange={handleChange}
                placeholder='Enter your name'
              />
            </div>
            <div className="mb-4">
              <label htmlFor="subject" className="block mb-1">
                Subject:
              </label>
              <input
                type="text"
                name="subject"
                id="subject"
                className="w-full py-2 px-4 border-gray-300 rounded"
                required
                onChange={handleChange}
                placeholder='Enter subject'
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block mb-1">
                Message:
              </label>
              <textarea
                name="message"
                id="message"
                className="w-full py-2 px-4 border-gray-300 rounded"
                rows="4"
                required
                onChange={handleChange}
                placeholder='Enter your message'
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;