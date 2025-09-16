import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Computer Science Student",
    club: "Tech Innovators Club",
    rating: 5,
    content: "Joining the Tech Club through ClubConnect was the best decision I made in college. I've learned so much, made incredible connections, and even landed my dream internship!",
    initials: "SC"
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Business Major",
    club: "Business Leaders Network",
    rating: 5,
    content: "The networking opportunities here are unmatched. I've connected with industry professionals and fellow students who share my entrepreneurial passion.",
    initials: "MR"
  },
  {
    id: 3,
    name: "Emma Thompson",
    role: "Art Student",
    club: "Creative Arts Society",
    rating: 5,
    content: "I was shy and didn't know where to fit in, but ClubConnect helped me find my creative community. Now I can't imagine college without my art family!",
    initials: "ET"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-heading mb-4">What Students Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from students who found their community through ClubConnect
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id} 
              className="club-card animate-scale-in relative overflow-hidden group"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="h-12 w-12 text-primary" />
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-primary fill-current" />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-foreground/90 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12 bg-primary/10 border border-primary/20">
                    <AvatarFallback className="text-primary font-semibold">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-sm text-primary font-medium">{testimonial.club}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-6 py-3 rounded-full">
            <Star className="h-5 w-5 text-primary" />
            <span className="text-primary font-medium">Join 10,000+ satisfied students</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;