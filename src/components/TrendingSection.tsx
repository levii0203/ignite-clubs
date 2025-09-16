import { TrendingUp, Users, Calendar, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const trendingStats = [
  {
    title: "Most Active",
    clubs: [
      { name: "Debate Society", growth: "+45%", members: 280 },
      { name: "Photography Club", growth: "+38%", members: 156 },
      { name: "Gaming Guild", growth: "+32%", members: 420 },
    ]
  },
  {
    title: "Fastest Growing",
    clubs: [
      { name: "Sustainability Club", growth: "+120%", members: 95 },
      { name: "Crypto & Web3", growth: "+89%", members: 167 },
      { name: "Mental Health Advocates", growth: "+76%", members: 203 },
    ]
  }
];

const upcomingEvents = [
  {
    title: "Tech Career Fair",
    date: "Nov 15, 2024",
    location: "Student Union",
    attendees: 340,
    category: "Career"
  },
  {
    title: "Art Exhibition Opening",
    date: "Nov 18, 2024", 
    location: "Gallery Hall",
    attendees: 150,
    category: "Arts"
  },
  {
    title: "Startup Pitch Night",
    date: "Nov 22, 2024",
    location: "Business Center",
    attendees: 220,
    category: "Business"
  }
];

const TrendingSection = () => {
  return (
    <section className="py-20 px-4 bg-card/20">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-heading mb-4 flex items-center justify-center">
            <TrendingUp className="mr-3 h-8 w-8 text-primary" />
            Trending Now
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what's hot in the club community and upcoming events you don't want to miss
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Trending Stats */}
          {trendingStats.map((section, sectionIndex) => (
            <Card key={section.title} className="club-card animate-scale-in" style={{ animationDelay: `${sectionIndex * 0.2}s` }}>
              <CardHeader>
                <CardTitle className="text-xl text-primary">{section.title}</CardTitle>
                <CardDescription>This month's standout performers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {section.clubs.map((club, index) => (
                  <div key={club.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div>
                      <p className="font-medium text-foreground">{club.name}</p>
                      <p className="text-sm text-muted-foreground flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {club.members} members
                      </p>
                    </div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary font-semibold">
                      {club.growth}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}

          {/* Upcoming Events */}
          <Card className="club-card animate-scale-in" style={{ animationDelay: "0.4s" }}>
            <CardHeader>
              <CardTitle className="text-xl text-primary flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Upcoming Events
              </CardTitle>
              <CardDescription>Don't miss these exciting opportunities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.title} className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">{event.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {event.category}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p className="flex items-center">
                      <Calendar className="h-3 w-3 mr-2" />
                      {event.date}
                    </p>
                    <p className="flex items-center">
                      <MapPin className="h-3 w-3 mr-2" />
                      {event.location}
                    </p>
                    <p className="flex items-center">
                      <Users className="h-3 w-3 mr-2" />
                      {event.attendees} attending
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;