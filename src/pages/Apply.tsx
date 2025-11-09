import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Apply = () => {
  const { clubId } = useParams();
  const { toast } = useToast();
  const { token } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    year: "",
    major: "",
    gpa: "",
    whyJoin: "",
    experience: "",
    availability: "",
    goals: ""
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  // Mock club data
  const clubData = {
    name: "Tech Innovators Club",
    category: "Technology",
    requirements: ["2.5+ GPA", "Weekly meeting attendance", "Active participation in projects"]
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const applicationId = crypto.randomUUID();
      
      const payload = {
        id: applicationId,
        club_id: clubId,
        full_name: formData.fullName,
        email: formData.email,
        phone_number: formData.phone,
        academic_year: formData.year,
        field_of_study: formData.major,
        gpa: formData.gpa ? parseFloat(formData.gpa) : undefined,
        reason: formData.whyJoin,
        experience: formData.experience || undefined,
        time_commitment: formData.availability || undefined,
        goals: formData.goals || undefined
      };

      const response = await fetch("http://localhost:5000/v1/club/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      setIsSubmitted(true);
      toast({
        title: "Application Submitted!",
        description: "We'll review your application and get back to you within 5-7 business days.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit application",
        variant: "destructive",
      });
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen">
        <Navigation />
        
        <div className="pt-20">
          <div className="min-h-[80vh] flex items-center justify-center p-4">
            <Card className="club-card max-w-lg w-full text-center animate-scale-in">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10 text-primary" />
                </div>
                
                <h1 className="text-heading mb-4">Application Submitted!</h1>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Thank you for applying to <strong>{clubData.name}</strong>. 
                  We've received your application and will review it carefully.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-center space-x-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Application received</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                    <div className="w-4 h-4 border-2 border-muted rounded-full" />
                    <span>Under review (5-7 business days)</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                    <div className="w-4 h-4 border-2 border-muted rounded-full" />
                    <span>Decision notification</span>
                  </div>
                </div>

                <div className="bg-muted/30 rounded-lg p-4 mb-6">
                  <p className="text-sm text-muted-foreground">
                    <strong>What's next?</strong><br />
                    You'll receive an email confirmation shortly. Our leadership team will review your application and contact you with next steps.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/dashboard" className="flex-1">
                    <Button variant="outline" className="w-full">
                      Browse More Clubs
                    </Button>
                  </Link>
                  <Link to="/" className="flex-1">
                    <Button className="btn-primary w-full">
                      Back to Home
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          {/* Header */}
          <div className="mb-8">
            <Link to={`/club/${clubId}`}>
              <Button variant="ghost" size="sm" className="text-foreground/80 hover:text-foreground mb-6">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Club Details
              </Button>
            </Link>

            <div className="text-center mb-8">
              <h1 className="text-heading mb-2">Apply to {clubData.name}</h1>
              <p className="text-muted-foreground">Complete your application to join our community</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Step {currentStep} of {totalSteps}</span>
                <span>{Math.round(progress)}% complete</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="progress-bar h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              
              {/* Step Labels */}
              <div className="flex justify-between mt-4 text-xs">
                <span className={currentStep >= 1 ? "text-primary font-medium" : "text-muted-foreground"}>
                  Personal Info
                </span>
                <span className={currentStep >= 2 ? "text-primary font-medium" : "text-muted-foreground"}>
                  Academic Info
                </span>
                <span className={currentStep >= 3 ? "text-primary font-medium" : "text-muted-foreground"}>
                  Experience
                </span>
                <span className={currentStep >= 4 ? "text-primary font-medium" : "text-muted-foreground"}>
                  Final Details
                </span>
              </div>
            </div>
          </div>

          <Card className="club-card animate-slide-up">
            <CardHeader>
              <CardTitle>
                {currentStep === 1 && "Personal Information"}
                {currentStep === 2 && "Academic Background"}
                {currentStep === 3 && "Experience & Interest"}
                {currentStep === 4 && "Final Details"}
              </CardTitle>
              <CardDescription>
                {currentStep === 1 && "Let's start with your basic information"}
                {currentStep === 2 && "Tell us about your academic standing"}
                {currentStep === 3 && "Share your experience and motivation"}
                {currentStep === 4 && "Review and submit your application"}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Step 1: Personal Info */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        className="glow-input mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@university.edu"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="glow-input mt-2"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="glow-input mt-2"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Academic Info */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="year">Academic Year *</Label>
                      <Input
                        id="year"
                        placeholder="Sophomore"
                        value={formData.year}
                        onChange={(e) => setFormData({...formData, year: e.target.value})}
                        className="glow-input mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="major">Major/Field of Study *</Label>
                      <Input
                        id="major"
                        placeholder="Computer Science"
                        value={formData.major}
                        onChange={(e) => setFormData({...formData, major: e.target.value})}
                        className="glow-input mt-2"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="gpa">GPA (if comfortable sharing)</Label>
                    <Input
                      id="gpa"
                      placeholder="3.5"
                      value={formData.gpa}
                      onChange={(e) => setFormData({...formData, gpa: e.target.value})}
                      className="glow-input mt-2"
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Minimum 2.5 GPA required for this club
                    </p>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Club Requirements</h4>
                    <ul className="space-y-1">
                      {clubData.requirements.map((req, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <CheckCircle className="h-3 w-3 text-primary mr-2" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Step 3: Experience */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="whyJoin">Why do you want to join this club? *</Label>
                    <Textarea
                      id="whyJoin"
                      placeholder="Share your motivation and what you hope to gain from joining..."
                      value={formData.whyJoin}
                      onChange={(e) => setFormData({...formData, whyJoin: e.target.value})}
                      className="glow-input mt-2 min-h-[100px]"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="experience">Relevant Experience</Label>
                    <Textarea
                      id="experience"
                      placeholder="Describe any relevant skills, projects, or experiences..."
                      value={formData.experience}
                      onChange={(e) => setFormData({...formData, experience: e.target.value})}
                      className="glow-input mt-2 min-h-[100px]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="availability">Time Commitment & Availability</Label>
                    <Textarea
                      id="availability"
                      placeholder="Describe your availability for meetings, events, and activities..."
                      value={formData.availability}
                      onChange={(e) => setFormData({...formData, availability: e.target.value})}
                      className="glow-input mt-2 min-h-[80px]"
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Final Details */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="goals">Goals & Expectations</Label>
                    <Textarea
                      id="goals"
                      placeholder="What do you hope to achieve through this club?"
                      value={formData.goals}
                      onChange={(e) => setFormData({...formData, goals: e.target.value})}
                      className="glow-input mt-2 min-h-[80px]"
                    />
                  </div>

                  {/* Application Summary */}
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-3">Application Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span>{formData.fullName || "Not provided"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span>{formData.email || "Not provided"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Major:</span>
                        <span>{formData.major || "Not provided"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Academic Year:</span>
                        <span>{formData.year || "Not provided"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <Separator />

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-4">
                <Button 
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="flex items-center"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                
                {currentStep < totalSteps ? (
                  <Button 
                    className="btn-primary flex items-center"
                    onClick={handleNext}
                    disabled={
                      (currentStep === 1 && (!formData.fullName || !formData.email)) ||
                      (currentStep === 2 && (!formData.year || !formData.major)) ||
                      (currentStep === 3 && !formData.whyJoin)
                    }
                  >
                    Continue
                    <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                  </Button>
                ) : (
                  <Button 
                    className="btn-primary flex items-center animate-glow-pulse"
                    onClick={handleSubmit}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Submit Application
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Apply;