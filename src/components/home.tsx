import React from "react";
import { Link } from "react-router-dom";
import { Car, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthForm from "@/components/auth/AuthForm";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-background/50 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1556122071-e404cb6f31c0?w=1200&q=80)",
          }}
        />

        <div className="container relative z-20 mx-auto px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div className="max-w-xl text-center sm:text-left">
            <div className="flex items-center gap-2 mb-4 sm:mb-8 justify-center sm:justify-start">
              <div className="rounded bg-primary p-2 text-primary-foreground">
                <Car size={24} />
              </div>
              <span className="text-xl font-bold">RideShare</span>
            </div>

            <h1 className="text-3xl font-extrabold sm:text-5xl text-foreground">
              Share Rides.
              <strong className="block font-extrabold text-primary">
                Save Money.
              </strong>
            </h1>

            <p className="mt-4 max-w-lg sm:text-xl/relaxed text-foreground/90">
              Connect with drivers and passengers for convenient, affordable,
              and eco-friendly travel experiences.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-center justify-center sm:justify-start">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto bg-background/80 backdrop-blur-sm"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Auth Section */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="w-full lg:w-1/2 space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">
                Join Our Community Today
              </h2>
              <p className="text-muted-foreground">
                Sign up to start sharing rides or finding transportation options
                that fit your schedule and budget.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <div className="flex items-start gap-2">
                  <div className="bg-primary/10 p-2 rounded-full mt-1">
                    <Car className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Driver Mode</h3>
                    <p className="text-sm text-muted-foreground">
                      Offer rides and earn money by driving passengers
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="bg-primary/10 p-2 rounded-full mt-1">
                    <Car className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Passenger Mode</h3>
                    <p className="text-sm text-muted-foreground">
                      Find affordable rides to your destination
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 max-w-md mx-auto">
              <AuthForm initialView="login" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Why Choose RideShare?</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Our platform makes ride sharing simple, safe, and beneficial for
              everyone involved.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <Car className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Convenient Travel</h3>
              <p className="text-muted-foreground">
                Find rides that match your schedule and route preferences with
                our easy-to-use search tools.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <Car className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Cost Savings</h3>
              <p className="text-muted-foreground">
                Share travel expenses and reduce your transportation costs
                significantly compared to traveling alone.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <Car className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Eco-Friendly</h3>
              <p className="text-muted-foreground">
                Reduce your carbon footprint by sharing rides and helping to
                decrease the number of vehicles on the road.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of users who are already enjoying the benefits of
            ride sharing. Sign up today and experience a better way to travel.
          </p>
          <Link to="/register">
            <Button size="lg">
              Create Your Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="rounded bg-primary p-2 text-primary-foreground">
                <Car size={20} />
              </div>
              <span className="text-lg font-bold">RideShare</span>
            </div>
            <div className="flex gap-6">
              <Link
                to="/about"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </Link>
              <Link
                to="/privacy"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy
              </Link>
              <Link
                to="/terms"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} RideShare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
