import { Link } from "react-router";
import useTitle from "../../hooks/useTitle";

const NotFound = () => {
  useTitle("404 Not Found!");
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="max-w-lg text-center bg-white shadow-lg rounded-2xl p-8 md:p-12">
        {/* Error Code */}
        <h1 className="text-7xl md:text-8xl font-extrabold text-primary mb-4">
          404
        </h1>

        {/* Message */}
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">
          Page Not Found
        </h2>

        <p className="text-gray-600 mb-8">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Action */}
        <Link to="/" className="btn btn-primary px-8">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
