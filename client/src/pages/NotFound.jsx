import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="pt-28 pb-20 min-h-[70vh] flex flex-col items-center justify-center bg-darkbg">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary/20 mb-4 font-serif">404</h1>
        <h2 className="text-4xl font-bold mb-6 text-primary">Page Not Found</h2>
        <p className="text-lg text-lighttext/70 mb-10 max-w-md mx-auto">
          We couldn't find the page you were looking for. It might have been moved or doesn't exist.
        </p>
        <Link to="/" className="btn-primary">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
