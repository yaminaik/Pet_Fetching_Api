import React from "react";

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        {/* Main Title */}
        <h1 className="mb-6 text-bold">
          About Our Pet App
        </h1>
        
        {/* Introduction */}
        <p className="mb-8">
          Welcome to our pet gallery application! We're passionate about connecting
          people with their future furry friends. Our platform makes it easy to
          browse, search, and save pictures of adorable pets looking for their
          forever homes.
        </p>
        
        {/* Features Section */}
        <div className="rounded-lg bg-white/10 p-8 shadow-lg backdrop-blur-md">
          <h1 className="mb-4">
            Features
          </h1>
          <ul className="space-y-2 text-left">
            <li>• Browse through our curated collection of pet photos</li>
            <li>• Search for specific breeds or types of pets</li>
            <li>• Sort and filter to find your perfect match</li>
            <li>• Save and download your favorite pet pictures</li>
            <li>• User-friendly interface for easy navigation</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
