import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const AdminDashboard = () => {
  const { toast } = useToast();
  const { token, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [applications, setApplications] = useState<any[]>([]);
  const [clubId, setClubId] = useState("");
  
  const [clubData, setClubData] = useState({
    id: "",
    club_name: "",
    no_of_members: 0,
    about_us: "",
    requirements: "",
    member_benefits: "",
    meeting_mode: "",
    location: "",
    interests_and_skills: "",
    recent_activities: "",
    leadership_team: "",
    upcoming_events: ""
  });

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const handleCreateClub = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        id: generateUUID(),
        club_name: clubData.club_name,
        no_of_members: clubData.no_of_members ? Number(clubData.no_of_members) : undefined,
        about_us: clubData.about_us || undefined,
        requirements: clubData.requirements ? clubData.requirements.split(',').map(s => s.trim()) : undefined,
        member_benefits: clubData.member_benefits ? clubData.member_benefits.split(',').map(s => s.trim()) : undefined,
        meeting_mode: clubData.meeting_mode || undefined,
        location: clubData.location || undefined,
        interests_and_skills: clubData.interests_and_skills ? clubData.interests_and_skills.split(',').map(s => s.trim()) : undefined,
        recent_activities: clubData.recent_activities ? JSON.parse(clubData.recent_activities) : undefined,
        leadership_team: clubData.leadership_team ? JSON.parse(clubData.leadership_team) : undefined,
        upcoming_events: clubData.upcoming_events ? JSON.parse(clubData.upcoming_events) : undefined
      };

      const response = await fetch("http://localhost:5000/v1/club/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Success",
          description: data.message || "Club created successfully"
        });
        setClubData({
          id: "",
          club_name: "",
          no_of_members: 0,
          about_us: "",
          requirements: "",
          member_benefits: "",
          meeting_mode: "",
          location: "",
          interests_and_skills: "",
          recent_activities: "",
          leadership_team: "",
          upcoming_events: ""
        });
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to create club",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect to server",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetApplications = async () => {
    if (!clubId) {
      toast({
        title: "Error",
        description: "Please enter a club ID",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/v1/application/getall/club", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ club_id: clubId })
      });

      const data = await response.json();

      if (response.ok) {
        setApplications(data.applications || []);
        toast({
          title: "Success",
          description: "Applications loaded successfully"
        });
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to fetch applications",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect to server",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline">Logout</Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="create-club" className="space-y-4">
          <TabsList>
            <TabsTrigger value="create-club">Create Club</TabsTrigger>
            <TabsTrigger value="applications">View Applications</TabsTrigger>
          </TabsList>

          <TabsContent value="create-club">
            <Card>
              <CardHeader>
                <CardTitle>Create New Club</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateClub} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="club_name">Club Name *</Label>
                    <Input
                      id="club_name"
                      value={clubData.club_name}
                      onChange={(e) => setClubData({ ...clubData, club_name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="no_of_members">Number of Members</Label>
                    <Input
                      id="no_of_members"
                      type="number"
                      value={clubData.no_of_members}
                      onChange={(e) => setClubData({ ...clubData, no_of_members: Number(e.target.value) })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="about_us">About Us</Label>
                    <Textarea
                      id="about_us"
                      value={clubData.about_us}
                      onChange={(e) => setClubData({ ...clubData, about_us: e.target.value })}
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="requirements">Requirements (comma-separated)</Label>
                    <Input
                      id="requirements"
                      value={clubData.requirements}
                      onChange={(e) => setClubData({ ...clubData, requirements: e.target.value })}
                      placeholder="Requirement 1, Requirement 2"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="member_benefits">Member Benefits (comma-separated)</Label>
                    <Input
                      id="member_benefits"
                      value={clubData.member_benefits}
                      onChange={(e) => setClubData({ ...clubData, member_benefits: e.target.value })}
                      placeholder="Benefit 1, Benefit 2"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="meeting_mode">Meeting Mode</Label>
                    <Input
                      id="meeting_mode"
                      value={clubData.meeting_mode}
                      onChange={(e) => setClubData({ ...clubData, meeting_mode: e.target.value })}
                      placeholder="Online, Offline, Hybrid"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={clubData.location}
                      onChange={(e) => setClubData({ ...clubData, location: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interests_and_skills">Interests & Skills (comma-separated)</Label>
                    <Input
                      id="interests_and_skills"
                      value={clubData.interests_and_skills}
                      onChange={(e) => setClubData({ ...clubData, interests_and_skills: e.target.value })}
                      placeholder="Skill 1, Skill 2"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="recent_activities">Recent Activities (JSON array)</Label>
                    <Textarea
                      id="recent_activities"
                      value={clubData.recent_activities}
                      onChange={(e) => setClubData({ ...clubData, recent_activities: e.target.value })}
                      placeholder='[{"name":"Event","date":"2024-01-01","description":"Details"}]'
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="leadership_team">Leadership Team (JSON array)</Label>
                    <Textarea
                      id="leadership_team"
                      value={clubData.leadership_team}
                      onChange={(e) => setClubData({ ...clubData, leadership_team: e.target.value })}
                      placeholder='[{"name":"John Doe","role":"President"}]'
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="upcoming_events">Upcoming Events (JSON array)</Label>
                    <Textarea
                      id="upcoming_events"
                      value={clubData.upcoming_events}
                      onChange={(e) => setClubData({ ...clubData, upcoming_events: e.target.value })}
                      placeholder='[{"name":"Meeting","date":"2024-02-01","location":"Room 101"}]'
                      rows={3}
                    />
                  </div>

                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Creating..." : "Create Club"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>View Club Applications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter Club ID"
                    value={clubId}
                    onChange={(e) => setClubId(e.target.value)}
                  />
                  <Button onClick={handleGetApplications} disabled={isLoading}>
                    {isLoading ? "Loading..." : "Get Applications"}
                  </Button>
                </div>

                {applications.length > 0 && (
                  <div className="space-y-4 mt-6">
                    <h3 className="text-lg font-semibold">
                      Applications ({applications.length})
                    </h3>
                    {applications.map((app, index) => (
                      <Card key={index}>
                        <CardContent className="pt-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Full Name</p>
                              <p className="font-medium">{app.full_name}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Email</p>
                              <p className="font-medium">{app.email}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Phone</p>
                              <p className="font-medium">{app.phone_number}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Academic Year</p>
                              <p className="font-medium">{app.academic_year}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Field of Study</p>
                              <p className="font-medium">{app.field_of_study}</p>
                            </div>
                            {app.gpa && (
                              <div>
                                <p className="text-sm text-muted-foreground">GPA</p>
                                <p className="font-medium">{app.gpa}</p>
                              </div>
                            )}
                            <div className="col-span-2">
                              <p className="text-sm text-muted-foreground">Reason</p>
                              <p className="font-medium">{app.reason}</p>
                            </div>
                            {app.experience && (
                              <div className="col-span-2">
                                <p className="text-sm text-muted-foreground">Experience</p>
                                <p className="font-medium">{app.experience}</p>
                              </div>
                            )}
                            {app.time_commitment && (
                              <div className="col-span-2">
                                <p className="text-sm text-muted-foreground">Time Commitment</p>
                                <p className="font-medium">{app.time_commitment}</p>
                              </div>
                            )}
                            {app.goals && (
                              <div className="col-span-2">
                                <p className="text-sm text-muted-foreground">Goals</p>
                                <p className="font-medium">{app.goals}</p>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
