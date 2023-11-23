import React from 'react';
import { Link } from 'react-router-dom';
export default function about() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        Welcome to{" "}
        <span className="text-green-500 hover:text-blue-500 ">
          <Link to={"/"}>Himanshu-estate</Link>
        </span>
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">About Us</h2>
        <p>
          At{" "}
          <span className="text-green-500 hover:text-blue-500">
            Himanshu-estate
          </span>
          , we are dedicated to transforming the real estate experience, making
          it seamless, efficient, and tailored to your needs.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Technologies Used</h2>
        <p>
          Our platform is built on a robust tech stack, combining the power of
          HTML, React, Tailwind CSS, CSS, Node.js, Express, Google
          Authentication, and JSON Web Tokens (JWT).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Key Features</h2>

        {/* User Authentication */}
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">User Authentication</h3>
          <ul className="list-disc pl-4">
            <li>
              Seamlessly sign in using your Google account for a quick and
              secure experience.
            </li>
            <li>
              Create an account using your email for a personalized and
              comprehensive user profile.
            </li>
          </ul>
        </div>

        {/* Listing Management */}
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">Listing Management</h3>
          <ul className="list-disc pl-4">
            <li>
              Create, edit, update, and delete property listings with ease.
            </li>
          </ul>
        </div>

        {/* User Interaction */}
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">User Interaction</h3>
          <ul className="list-disc pl-4">
            <li>Contact property owners after signing up or logging in.</li>
            <li>
              Maintain a personalized profile to keep track of listings and
              account details.
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Explore Listings</h2>
        <p>
          Even without authentication, users can freely explore all available
          property listings. However, to enhance the experience and engage with
          property owners, we encourage you to sign up or log in.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">
          Why Choose{" "}
          <span className="text-green-500 hover:text-blue-500">
            Himanshu-estate
          </span>
        </h2>
        <ul className="list-disc pl-4">
          <li>
            User-Friendly: Our platform is designed with simplicity in mind.
          </li>
          <li>
            Secure: We prioritize the security of your data with Google
            Authentication and JWT.
          </li>
          <li>
            Comprehensive Listing Management: Manage and find properties with
            ease.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Get Started Today!</h2>
        <p>
          Ready to embark on your real estate journey? Sign up, explore
          listings, and experience the convenience of managing and finding
          properties on <span className="text-green-500">Himanshu-estate</span>.
        </p>
        <div className="flex mt-2">
          <Link
            to="/sign-up"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
          >
            Sign Up Now
          </Link>
          <Link
            to="/search"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
          >
            Explore Listings
          </Link>
        </div>
      </section>
    </div>
  );
};
