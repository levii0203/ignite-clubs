import { Link } from "react-router-dom";
import { Users, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import techClub from "@/assets/club-tech.jpg";
import artsClub from "@/assets/club-arts.jpg";
import businessClub from "@/assets/club-business.jpg";

const clubs = [
  {
    id: 1,
    name: "Tech Innovators Club",
    description: "Building the future with code, AI, and innovation. Join us for hackathons, workshops, and networking events.",
    members: 340,
    category: "Technology",
    location: "Engineering Building",
    image: techClub,
    tags: ["Programming", "AI", "Startups"]
  },
  {
    id: 2,
    name: "Creative Arts Society",
    description: "Express yourself through various art forms. From painting to digital design, unleash your creativity.",
    members: 220,
    category: "Arts & Culture",
    location: "Arts Center",
    image: artsClub,
    tags: ["Design", "Digital Art", "Gallery"]
  },
  {
    id: 3,
    name: "Business Leaders Network",
    description: "Develop leadership skills and business acumen. Connect with entrepreneurs and industry professionals.",
    members: 185,
    category: "Business",
    location: "Business School",
    image: businessClub,
    tags: ["Leadership", "Networking", "Entrepreneurship"]
  }
];

const FeaturedClubs = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-heading mb-4">Featured Clubs</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover popular clubs that are actively recruiting new members
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {clubs.map((club, index) => (
            <Card 
              key={club.id} 
              className="club-card animate-scale-in group cursor-pointer"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={club.image} 
                    alt={club.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {club.category}
                  </div>
                </div>
                <div className="p-6 pb-4">
                  <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                    {club.name}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {club.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {club.members}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {club.location}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {club.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="bg-muted px-3 py-1 rounded-full text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link to={`/club/${club.id}`}>
                  <Button className="w-full btn-primary">
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/dashboard">
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              View All Clubs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedClubs;