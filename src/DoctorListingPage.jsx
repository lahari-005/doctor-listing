import React, { useEffect, useState } from "react";
import { fetchDoctors } from "./utils/api";
import DoctorCard from "./components/DoctorCard";

const DoctorListingPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("All");
  const [sortOption, setSortOption] = useState("none");

  useEffect(() => {
    fetchDoctors()
      .then((data) => {
        // Map the API doctors and inject "specialization" and "location" fields
        const mappedDoctors = data.map((doc) => ({
          ...doc,
          specialization: doc.specialities?.[0]?.name || "General", // handle if no specialities
          location: doc.clinic?.address?.city || "Unknown",          // handle if no clinic/location
          experience: parseInt(doc.experience) || 0,                 // parse experience if needed
        }));

        setDoctors(mappedDoctors);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch doctors", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2>Loading doctors...</h2>;
  }

  // Get unique specializations for dropdown
  const specializations = ["All", ...new Set(doctors.map((doc) => doc.specialization))];

  // Filter doctors
  let filteredDoctors = doctors.filter((doc) => {
    const matchesName = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization =
      selectedSpecialization === "All" || doc.specialization === selectedSpecialization;
    return matchesName && matchesSpecialization;
  });

  // Sort doctors based on selected sort option
  if (sortOption === "nameAsc") {
    filteredDoctors.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === "nameDesc") {
    filteredDoctors.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortOption === "expAsc") {
    filteredDoctors.sort((a, b) => a.experience - b.experience);
  } else if (sortOption === "expDesc") {
    filteredDoctors.sort((a, b) => b.experience - a.experience);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Doctor Listing Page</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "8px", marginRight: "10px", width: "200px" }}
      />

      {/* Specialization Filter */}
      <select
        value={selectedSpecialization}
        onChange={(e) => setSelectedSpecialization(e.target.value)}
        style={{ padding: "8px", marginRight: "10px" }}
      >
        {specializations.map((spec, idx) => (
          <option key={idx} value={spec}>
            {spec}
          </option>
        ))}
      </select>

      {/* Sort Dropdown */}
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        style={{ padding: "8px" }}
      >
        <option value="none">Sort By</option>
        <option value="nameAsc">Name (A-Z)</option>
        <option value="nameDesc">Name (Z-A)</option>
        <option value="expAsc">Experience (Low to High)</option>
        <option value="expDesc">Experience (High to Low)</option>
      </select>

      <p style={{ marginTop: "20px" }}>Total Doctors: {filteredDoctors.length}</p>

      {filteredDoctors.length > 0 ? (
        filteredDoctors.map((doc, idx) => (
          <DoctorCard key={idx} doctor={doc} />
        ))
      ) : (
        <p>No doctors found.</p>
      )}
    </div>
  );
};

export default DoctorListingPage;
