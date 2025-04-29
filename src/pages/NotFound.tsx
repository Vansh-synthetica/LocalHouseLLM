
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-richBlack flex items-center justify-center p-4">
      <div className="glass border border-white/10 p-8 max-w-md w-full text-center">
        <div className="mb-6 w-16 h-16 mx-auto rounded-xl bg-gradient-to-tr from-cyberBlue to-neonMint flex items-center justify-center text-richBlack font-bold text-xl">
          404
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-secondaryText mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <Link to="/">
          <Button className="w-full bg-cyberBlue text-black hover:bg-cyberBlue/90">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
