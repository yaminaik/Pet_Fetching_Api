import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, SortAsc, SortDesc, Download, CheckSquare, XSquare } from "lucide-react";

interface Pet {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

const fetchPets = async (): Promise<Pet[]> => {
  const response = await fetch("https://eulerity-hackathon.appspot.com/pets");
  if (!response.ok) {
    throw new Error("Failed to fetch pets");
  }
  const data = await response.json();
  return data.map((pet: any) => ({
    id: pet.title,
    title: pet.title,
    description: pet.description,
    imageUrl: pet.url,
    createdAt: pet.created,
  }));
};

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedPets, setSelectedPets] = useState<string[]>([]);

  const { data: pets, isLoading, isError, error } = useQuery<Pet[], Error>({
    queryKey: ["pets"],
    queryFn: fetchPets,
  });

  // Function to toggle selection
  const togglePetSelection = (petId: string) => {
    setSelectedPets((prev) =>
      prev.includes(petId) ? prev.filter((id) => id !== petId) : [...prev, petId]
    );
  };

  // Function to select all pets
  const selectAll = () => {
    if (pets) {
      setSelectedPets(pets.map((pet) => pet.id));
    }
  };

  // Function to clear selection
  const clearSelection = () => {
    setSelectedPets([]);
  };

  // Function to download selected pet images
  const handleDownloadSelected = () => {
    const selectedImages = pets?.filter((pet) => selectedPets.includes(pet.id));

    selectedImages?.forEach((pet) => {
      fetch(pet.imageUrl)
        .then((response) => response.blob())
        .then((blob) => {
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = `${pet.title}.jpg`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((err) => console.error("Error downloading the image:", err));
    });
  };

  // Filter & Sort Pets
  const filteredAndSortedPets = pets
    ?.filter(
      (pet) =>
        pet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortDirection === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    );

  return (
    <div className="p-8">
      <div className="container mx-auto space-y-8">
        {/* Search & Controls */}
        <div className="w-full bg-white p-4 rounded-xl shadow-md">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary h-5 w-5" />
              <input
                type="text"
                placeholder="Search pets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border-2 border-primary text-primary bg-white focus:border-dark outline-none shadow-md"
              />
            </div>

            {/* Sort & Action Buttons */}
            <div className="flex flex-wrap gap-3 justify-end">
              {/* Sort Button */}
              <button
                onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-primary text-primary bg-white hover:bg-primary hover:text-white transition-all shadow-md"
              >
                {sortDirection === "asc" ? <SortAsc className="h-5 w-5" /> : <SortDesc className="h-5 w-5" />}
                Sort {sortDirection === "asc" ? "Z-A" : "A-Z"}
              </button>

              {/* Select All Button (Now in Pink) */}
              <button
                onClick={selectAll}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-primary bg-white text-primary hover:bg-primary hover:text-white transition-all shadow-md"
              >
                <CheckSquare className="h-5 w-5" /> Select All
              </button>

              {/* Clear Selection Button */}
              <button
                onClick={clearSelection}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-primary bg-white text-primary hover:bg-primary hover:text-white transition-all shadow-md"
              >
                <XSquare className="h-5 w-5" /> Clear
              </button>

              {/* Download Button */}
              <button
                onClick={handleDownloadSelected}
                disabled={selectedPets.length === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all shadow-md ${
                  selectedPets.length === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-primary text-white hover:bg-dark"
                }`}
              >
                <Download className="h-5 w-5" /> Download ({selectedPets.length})
              </button>
            </div>
          </div>
        </div>

        {/* Loading & Error States */}
        {isLoading && <h1 className="text-center">Loading pets...</h1>}
        {isError && <h1 className="text-center text-red-500">Error: {error.message}</h1>}

        {/* Pets Grid */}
        {!isLoading && !isError && pets && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedPets?.map((pet) => (
                <div
                key={pet.id}
                onClick={() => togglePetSelection(pet.id)}
                className="group cursor-pointer transition-all duration-300 transform hover:scale-105"
                >
                <div
                    className={`relative bg-white rounded-xl shadow-md overflow-hidden min-h-[420px] flex flex-col transition-all ${
                    selectedPets.includes(pet.id) ? "border-2 border-darkest" : "border border-white"
                    }`}
                >
                    {/* Image Container */}
                    <div className="w-full h-64 overflow-hidden">
                    <img src={pet.imageUrl} alt={pet.title} className="object-cover w-full h-full" />
                    </div>

                    {/* Card Content */}
                    <div className="p-4 flex-grow">
                    <h2 className="text-lg font-bold text-darkest">{pet.title}</h2>
                    <p className="text-dark mb-2">{pet.description}</p>
                    <p className="text-sm text-dark/60">Added on {new Date(pet.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
                </div>
            ))}
            </div>


        )}
      </div>
    </div>
  );
};

export default Home;
