import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <section className="min-h-[70vh] flex items-center justify-center bg-background">
        <motion.div
          className="text-center max-w-lg mx-auto px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="font-display text-7xl sm:text-9xl font-bold text-primary mb-4"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            404
          </motion.h1>
          <h2 className="font-display text-xl sm:text-2xl font-semibold text-foreground mb-3">
            Page Not Found
          </h2>
          <p className="text-muted-foreground mb-8 text-sm sm:text-base">
            The page <code className="bg-muted px-2 py-0.5 rounded text-xs">{location.pathname}</code> does not exist. It may have been moved or removed.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/">
              <Button className="gap-2">
                <Home className="w-4 h-4" /> Go Home
              </Button>
            </Link>
            <Link to="/departments">
              <Button variant="outline" className="gap-2">
                <Search className="w-4 h-4" /> Browse Departments
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
};

export default NotFound;
