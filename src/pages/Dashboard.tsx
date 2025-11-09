import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Search, Filter, MapPin, Users, Calendar, Heart, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import Navigation from "@/components/Navigation";
import techClub from "@/assets/club-tech.jpg";
import artsClub from "@/assets/club-arts.jpg";
import businessClub from "@/assets/club-business.jpg";
import { useToast } from "@/hooks/use-toast";

interface Club {
  id: string;
  club_name: string;
  no_of_members: number;
  about_us: string;
  meeting_mode: string;
  location: string;
  interests_and_skills: string[];
  requirements?: string[];
  member_benefits?: string[];
  recent_activities?: any[];
  leadership_team?: any[];
  upcoming_events?: any[];
  created_at: string;
  updated_at: string;
}

const categories = ["All", "Technology", "Arts & Culture", "Business", "Environmental", "Cultural"];
const types = ["Academic", "Creative", "Professional", "Service", "Social"];
const modes = ["In-Person", "Online", "Hybrid"];

const Dashboard = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedModes, setSelectedModes] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);

  // Map club images based on club name or interests
  const getClubImage = (club: Club) => {
    const name = club.club_name.toLowerCase();
    const interests = club.interests_and_skills.map(i => i.toLowerCase()).join(" ");
    
    if (name.includes("tech") || name.includes("innovator") || interests.includes("javascript") || interests.includes("ai")) {
      return techClub;
    } else if (name.includes("art") || name.includes("creative") || interests.includes("design") || interests.includes("music")) {
      return artsClub;
    } else {
      return businessClub;
    }
  };

  // Map API club to UI club format
  const mapClub = (apiClub: Club) => ({
    id: apiClub.id,
    name: apiClub.club_name,
    description: apiClub.about_us,
    members: apiClub.no_of_members,
    category: apiClub.interests_and_skills[0] || "General",
    location: apiClub.location,
    type: "Academic",
    mode: apiClub.meeting_mode,
    image: getClubImage(apiClub),
    tags: apiClub.interests_and_skills.slice(0, 4),
    featured: apiClub.no_of_members > 100,
    recruiting: true
  });

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch user data and clubs
    const fetchData = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch("http://localhost:5000/v1/users/me", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUserData(userData);
        }

        // Fetch clubs
        const clubsResponse = await fetch("http://localhost:5000/v1/club/get/all");
        const clubsData = await clubsResponse.json();
        
        if (clubsData.clubs) {
          setClubs(clubsData.clubs);
        }
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to fetch data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, navigate, toast]);

  const mappedClubs = clubs.map(mapClub);

  const filteredClubs = mappedClubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         club.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         club.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || club.category === selectedCategory;
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(club.type);
    const matchesMode = selectedModes.length === 0 || selectedModes.includes(club.mode);

    return matchesSearch && matchesCategory && matchesType && matchesMode;
  });

  const featuredClubs = mappedClubs.filter(club => club.featured);
  const upcomingEvents = [
    { title: "Tech Talk: AI in Healthcare", date: "Nov 15", club: "Tech Innovators Club" },
    { title: "Art Gallery Opening", date: "Nov 18", club: "Creative Arts Society" },
    { title: "Networking Mixer", date: "Nov 22", club: "Business Leaders Network" }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-20">
        <div className="flex">
          {/* Sidebar Filters */}
          <aside className="w-80 min-h-screen bg-card border-r border-border p-6 sticky top-20">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-4 flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </h3>
                
                <div className="space-y-4">
                  {/* Categories */}
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-3">Category</h4>
                    <div className="space-y-2">
                      {categories.map(category => (
                        <Button
                          key={category}
                          variant={selectedCategory === category ? "default" : "ghost"}
                          className={`w-full justify-start ${selectedCategory === category ? 'btn-primary' : 'hover:bg-muted'}`}
                          onClick={() => setSelectedCategory(category)}
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Type */}
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-3">Type</h4>
                    <div className="space-y-2">
                      {types.map(type => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox 
                            id={type}
                            checked={selectedTypes.includes(type)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedTypes([...selectedTypes, type]);
                              } else {
                                setSelectedTypes(selectedTypes.filter(t => t !== type));
                              }
                            }}
                          />
                          <label htmlFor={type} className="text-sm text-foreground cursor-pointer">
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Mode */}
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-3">Meeting Mode</h4>
                    <div className="space-y-2">
                      {modes.map(mode => (
                        <div key={mode} className="flex items-center space-x-2">
                          <Checkbox 
                            id={mode}
                            checked={selectedModes.includes(mode)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedModes([...selectedModes, mode]);
                              } else {
                                setSelectedModes(selectedModes.filter(m => m !== mode));
                              }
                            }}
                          />
                          <label htmlFor={mode} className="text-sm text-foreground cursor-pointer">
                            {mode}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="p-6">
              {/* Search Header */}
              <div className="mb-8">
                <h1 className="text-heading mb-4">Discover Clubs</h1>
                <div className="relative max-w-lg">
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search clubs, organizations, activities..."
                    className="glow-input pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              {/* Results */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">
                    {loading ? "Loading clubs..." : `${filteredClubs.length} clubs found`}
                  </p>
                </div>

                <div className="grid gap-6">
                  {loading ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">Loading clubs...</p>
                    </div>
                  ) : filteredClubs.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No clubs found matching your criteria</p>
                    </div>
                  ) : (
                    filteredClubs.map((club) => (
                    <Card key={club.id} className="club-card hover:cursor-pointer">
                      <CardContent className="p-0">
                        <div className="flex">
                          {/* Club Image */}
                          <div className="w-48 h-32 relative overflow-hidden rounded-l-lg">
                            <img 
                              src={club.image} 
                              alt={club.name}
                              className="w-full h-full object-cover"
                            />
                            {club.featured && (
                              <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                                Featured
                              </div>
                            )}
                          </div>

                          {/* Club Details */}
                          <div className="flex-1 p-6">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="text-xl font-semibold text-foreground hover:text-primary transition-colors mb-1">
                                  {club.name}
                                </h3>
                                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                                  <div className="flex items-center">
                                    <Users className="h-3 w-3 mr-1" />
                                    {club.members} members
                                  </div>
                                  <div className="flex items-center">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    {club.location}
                                  </div>
                                  <Badge variant="outline" className="text-xs">
                                    {club.mode}
                                  </Badge>
                                </div>
                              </div>
                              {club.recruiting && (
                                <Badge className="bg-primary text-primary-foreground">
                                  Recruiting
                                </Badge>
                              )}
                            </div>
                            
                            <p className="text-muted-foreground mb-4 line-clamp-2">
                              {club.description}
                            </p>

                            <div className="flex items-center justify-between">
                              <div className="flex flex-wrap gap-2">
                                {club.tags.slice(0, 3).map((tag) => (
                                  <span 
                                    key={tag}
                                    className="bg-muted px-2 py-1 rounded text-xs text-muted-foreground"
                                  >
                                    {tag}
                                  </span>
                                ))}
                                {club.tags.length > 3 && (
                                  <span className="text-xs text-muted-foreground">
                                    +{club.tags.length - 3} more
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="sm">
                                  <Heart className="h-4 w-4" />
                                </Button>
                                <Link to={`/club/${club.id}`}>
                                  <Button className="btn-primary">
                                    View Details <ChevronRight className="ml-1 h-4 w-4" />
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    ))
                  )}
                </div>
              </div>
            </div>
          </main>

          {/* Right Panel */}
          <aside className="w-80 min-h-screen bg-card border-l border-border p-6 sticky top-20">
            <div className="space-y-6">
              {/* Featured Clubs */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">Featured Clubs</h3>
                <div className="space-y-3">
                  {featuredClubs.slice(0, 3).map(club => (
                    <Link key={club.id} to={`/club/${club.id}`}>
                      <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                        <img 
                          src={club.image} 
                          alt={club.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-foreground truncate">{club.name}</p>
                          <p className="text-xs text-muted-foreground">{club.members} members</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Upcoming Events */}
              <div>
                <h3 className="font-semibold text-foreground mb-4 flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Upcoming Events
                </h3>
                <div className="space-y-3">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="p-3 rounded-lg bg-muted/30">
                      <p className="font-medium text-sm text-foreground">{event.title}</p>
                      <p className="text-xs text-muted-foreground">{event.club}</p>
                      <p className="text-xs text-primary font-medium mt-1">{event.date}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Suggested for You */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">Suggested for You</h3>
                <div className="text-center py-6">
                  <p className="text-sm text-muted-foreground mb-3">
                    Sign in to get personalized club recommendations
                  </p>
                  <Link to="/signup">
                    <Button size="sm" className="btn-primary">
                      Sign Up Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;