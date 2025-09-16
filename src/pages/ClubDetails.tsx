import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Users, MapPin, Calendar, Clock, Heart, Share2, ExternalLink, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import techClub from "@/assets/club-tech.jpg";

// Mock club data - in a real app, this would come from an API
const getClubData = (id: string) => ({
  id: 1,
  name: "Tech Innovators Club",
  description: "Building the future with code, AI, and innovation. Join us for hackathons, workshops, and networking events with industry professionals. We're a community of passionate developers, designers, and entrepreneurs working together to create meaningful technology solutions.",
  fullDescription: "The Tech Innovators Club is more than just a programming group - we're a thriving community of future tech leaders. Since our founding in 2019, we've grown to become one of the most active and impactful student organizations on campus.\n\nOur mission is to bridge the gap between academic learning and real-world application. We regularly host coding bootcamps, organize hackathons, invite industry speakers, and provide mentorship opportunities. Members gain hands-on experience with cutting-edge technologies while building a professional network that lasts beyond graduation.\n\nWhether you're a complete beginner or an experienced developer, there's a place for you in our community. We believe in learning together, supporting each other, and building technology that makes a positive impact.",
  members: 340,
  category: "Technology",
  location: "Engineering Building, Room 205",
  type: "Academic",
  mode: "Hybrid",
  image: techClub,
  tags: ["Programming", "AI", "Startups", "Hackathons", "Web Development", "Mobile Apps"],
  featured: true,
  recruiting: true,
  founded: "2019",
  meetingTimes: "Wednesdays 6:00 PM - 8:00 PM",
  website: "https://techinnovators.club",
  email: "contact@techinnovators.club",
  requirements: [
    "Open to all skill levels",
    "Commitment to attend weekly meetings",
    "Willingness to collaborate and learn",
    "Laptop required for hands-on activities"
  ],
  benefits: [
    "Access to industry mentors",
    "Exclusive internship opportunities", 
    "Free access to premium development tools",
    "Networking events with tech companies",
    "Project collaboration opportunities",
    "Resume and interview preparation"
  ],
  leadership: [
    { name: "Sarah Chen", role: "President", initials: "SC" },
    { name: "Marcus Rodriguez", role: "VP Engineering", initials: "MR" },
    { name: "Emma Thompson", role: "VP Events", initials: "ET" },
    { name: "David Kim", role: "Treasurer", initials: "DK" }
  ],
  recentActivities: [
    { title: "AI Workshop Series", date: "Nov 5, 2024", description: "Three-part workshop on machine learning fundamentals" },
    { title: "Fall Hackathon", date: "Oct 15-16, 2024", description: "48-hour coding challenge with $5000 in prizes" },
    { title: "Google Tech Talk", date: "Oct 8, 2024", description: "Senior engineers discussed career paths in tech" },
    { title: "New Member Orientation", date: "Sep 20, 2024", description: "Welcome event for incoming members" }
  ],
  upcomingEvents: [
    { title: "React Workshop", date: "Nov 20, 2024", time: "6:00 PM", location: "Engineering 205" },
    { title: "Industry Mixer", date: "Dec 5, 2024", time: "7:00 PM", location: "Student Center Ballroom" },
    { title: "Final Project Showcase", date: "Dec 15, 2024", time: "5:00 PM", location: "Engineering Auditorium" }
  ]
});

const ClubDetails = () => {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  
  const club = getClubData(id || "1");

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-20">
        {/* Header */}
        <div className="bg-gradient-hero border-b border-border">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-6">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="text-foreground/80 hover:text-foreground">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Browse
                </Button>
              </Link>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              {/* Club Image */}
              <div className="relative">
                <img 
                  src={club.image} 
                  alt={club.name}
                  className="w-48 h-48 rounded-lg object-cover shadow-glow"
                />
                {club.featured && (
                  <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground">
                    Featured
                  </Badge>
                )}
              </div>

              {/* Club Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-hero mb-2">{club.name}</h1>
                    <div className="flex items-center space-x-6 text-foreground/80 mb-3">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        {club.members} members
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {club.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        {club.meetingTimes}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mb-4">
                      <Badge variant="outline" className="border-primary text-primary">
                        {club.category}
                      </Badge>
                      <Badge variant="outline">
                        {club.mode}
                      </Badge>
                      {club.recruiting && (
                        <Badge className="bg-primary text-primary-foreground animate-glow-pulse">
                          Actively Recruiting
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setIsLiked(!isLiked)}
                      className={isLiked ? "text-primary border-primary" : ""}
                    >
                      <Heart className={`h-4 w-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
                      {isLiked ? "Liked" : "Like"}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>

                <p className="text-foreground/90 text-lg mb-6 max-w-3xl">
                  {club.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to={`/apply/${club.id}`}>
                    <Button size="lg" className="btn-primary animate-glow-pulse px-8">
                      Apply to Join
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit Website
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="activities">Activities</TabsTrigger>
                  <TabsTrigger value="members">Members</TabsTrigger>
                  <TabsTrigger value="events">Events</TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="space-y-6 mt-6">
                  <Card className="club-card">
                    <CardHeader>
                      <CardTitle>About Us</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                        {club.fullDescription}
                      </p>
                      
                      <Separator />
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3">Requirements</h4>
                          <ul className="space-y-2">
                            {club.requirements.map((req, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-muted-foreground">{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-3">Member Benefits</h4>
                          <ul className="space-y-2">
                            {club.benefits.map((benefit, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-muted-foreground">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="activities" className="space-y-6 mt-6">
                  <Card className="club-card">
                    <CardHeader>
                      <CardTitle>Recent Activities</CardTitle>
                      <CardDescription>What we've been up to lately</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {club.recentActivities.map((activity, index) => (
                        <div key={index} className="border-l-2 border-primary pl-4 pb-4">
                          <h4 className="font-semibold text-foreground">{activity.title}</h4>
                          <p className="text-sm text-primary font-medium">{activity.date}</p>
                          <p className="text-muted-foreground mt-1">{activity.description}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="members" className="space-y-6 mt-6">
                  <Card className="club-card">
                    <CardHeader>
                      <CardTitle>Leadership Team</CardTitle>
                      <CardDescription>Meet our club officers</CardDescription>
                    </CardHeader>
                    <CardContent className="grid sm:grid-cols-2 gap-4">
                      {club.leadership.map((leader, index) => (
                        <div key={index} className="flex items-center space-x-3 p-4 rounded-lg bg-muted/30">
                          <Avatar className="h-12 w-12 bg-primary/10 border border-primary/20">
                            <AvatarFallback className="text-primary font-semibold">
                              {leader.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-foreground">{leader.name}</p>
                            <p className="text-sm text-muted-foreground">{leader.role}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="events" className="space-y-6 mt-6">
                  <Card className="club-card">
                    <CardHeader>
                      <CardTitle>Upcoming Events</CardTitle>
                      <CardDescription>Don't miss these exciting activities</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {club.upcomingEvents.map((event, index) => (
                        <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
                          <div>
                            <h4 className="font-semibold text-foreground">{event.title}</h4>
                            <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {event.date}
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {event.time}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {event.location}
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            RSVP
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="club-card">
                <CardHeader>
                  <CardTitle className="text-lg">Ready to Join?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link to={`/apply/${club.id}`}>
                    <Button className="w-full btn-primary">
                      Apply Now
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full">
                    Contact Leadership
                  </Button>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Questions? Email us at{" "}
                      <a href={`mailto:${club.email}`} className="text-primary hover:text-primary-glow">
                        {club.email}
                      </a>
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Club Stats */}
              <Card className="club-card">
                <CardHeader>
                  <CardTitle className="text-lg">Club Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Founded</span>
                    <span className="font-medium">{club.founded}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Members</span>
                    <span className="font-medium">{club.members}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Meeting Mode</span>
                    <Badge variant="outline">{club.mode}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <Badge className="bg-primary text-primary-foreground">
                      {club.recruiting ? "Recruiting" : "Closed"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card className="club-card">
                <CardHeader>
                  <CardTitle className="text-lg">Interests & Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {club.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-muted hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubDetails;