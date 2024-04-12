import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-4xl font-bold mb-4">404 - Page Not Found</h2>
      <p className="text-lg mb-8">The page you are looking for does not exist.</p>
      <Link
        to="/login"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Go Back
      </Link>
    </div>
  );
}

export default NotFound;
