import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight, Users, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturedClubs from "@/components/FeaturedClubs";
import TrendingSection from "@/components/TrendingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <FeaturedClubs />
      <TrendingSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Index;