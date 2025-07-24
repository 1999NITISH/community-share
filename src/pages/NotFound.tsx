import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-destructive/10 rounded-full">
              <AlertCircle className="h-16 w-16 text-destructive" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-6xl font-bold text-foreground">404</h1>
            <h2 className="text-2xl font-semibold text-foreground">Page Not Found</h2>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          <div className="space-y-3">
            <Button asChild variant="default" size="lg">
              <Link to="/" className="flex items-center space-x-2">
                <Home className="h-5 w-5" />
                <span>Return to Browse</span>
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground">
              Path: <code className="bg-muted px-2 py-1 rounded text-xs">{location.pathname}</code>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
