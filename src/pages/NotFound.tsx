import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Page Not Found | V. Shanmukha";
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between p-6 md:p-12 relative overflow-hidden select-none">
      
      {/* Editorial top line */}
      <header className="w-full flex justify-between items-center text-[10px] font-mono tracking-widest text-muted-foreground uppercase border-b-[0.5px] border-border pb-4">
        <span>Vutikuri Shanmukha</span>
        <span>Error 404</span>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center max-w-xl mx-auto my-12">
        <div className="mb-6 inline-flex p-3 rounded-full border-[0.5px] border-border bg-card">
          <HelpCircle className="h-6 w-6 text-primary" />
        </div>

        <h1 className="font-serif-display text-5xl md:text-6xl font-normal tracking-tight text-foreground mb-4">
          Page Not Found
        </h1>

        <p className="text-sm font-technical-mono mb-4 text-primary font-semibold">
          Requested Path: {location.pathname}
        </p>

        <p className="text-muted-foreground text-sm leading-relaxed mb-8">
          The editorial index or case study you requested could not be located. If you typed the URL directly, please verify the path spelling or return to the main dashboard.
        </p>

        <Button size="sm" className="rounded-full h-9 px-6 text-[10px] font-mono uppercase tracking-wider" asChild>
          <Link to="/">
            <ArrowLeft className="h-3.5 w-3.5 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
      </main>

      {/* Editorial footer line */}
      <footer className="w-full text-center text-[9px] font-mono tracking-widest text-muted-foreground uppercase border-t-[0.5px] border-border pt-4">
        <span>© {new Date().getFullYear()} Vutikuri Shanmukha • All Rights Reserved</span>
      </footer>
    </div>
  );
};

export default NotFound;
