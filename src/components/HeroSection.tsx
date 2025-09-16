import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroBackground from "@/assets/hero-background.jpg";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Floating Accents */}
      <div className="floating-accent w-64 h-64 top-20 left-10" />
      <div className="floating-accent w-32 h-32 top-40 right-20" />
      <div className="floating-accent w-48 h-48 bottom-20 left-1/4" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in-up">
        <h1 className="text-hero mb-6">
          Find Your Perfect Club Here!
        </h1>
        
        <p className="text-xl text-foreground/80 mb-12 max-w-2xl mx-auto">
          Connect with student organizations, discover opportunities, and build your community. 
          Your next adventure starts here.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-lg mx-auto mb-8">
          <div className="flex rounded-lg overflow-hidden shadow-glow">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search clubs, organizations, activities..."
              className="flex-1 glow-input border-0 bg-card/90 backdrop-blur text-lg py-4 px-6 rounded-r-none"
            />
            <Button className="btn-primary px-8 py-4 rounded-l-none">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Link to="/dashboard">
            <Button size="lg" className="btn-primary px-8 py-4 text-lg">
              Browse All Clubs <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/signup">
            <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Join Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;