import React from "react";

const FilterPanel = ({
  consultationMode,
  setConsultationMode,
  selectedSpecialties,
  setSelectedSpecialties,
  sortOption,
  setSortOption,
  allSpecialties
}) => {

  const handleSpecialtyChange = (specialty) => {
    if (selectedSpecialties.includes(specialty)) {
      setSelectedSpecialties(selectedSpecialties.filter((spec) => spec !== specialty));
    } else {
      setSelectedSpecialties([...selectedSpecialties, specialty]);
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      {/* Consultation Mode Filter */}
      <div>
        <h3 data-testid="filter-header-moc">Consultation Mode</h3>
        <label>
          <input
            type="radio"
            value="Video Consult"
            checked={consultationMode === "Video Consult"}
            onChange={(e) => setConsultationMode(e.target.value)}
            data-testid="filter-video-consult"
          />
          Video Consult
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="In Clinic"
            checked={consultationMode === "In Clinic"}
            onChange={(e) => setConsultationMode(e.target.value)}
            data-testid="filter-in-clinic"
          />
          In Clinic
        </label>
      </div>

      {/* Specialty Filter */}
      <div>
        <h3 data-testid="filter-header-speciality">Speciality</h3>
        {allSpecialties.map((spec, idx) => (
          <div key={idx}>
            <label>
              <input
                type="checkbox"
                value={spec}
                checked={selectedSpecialties.includes(spec)}
                onChange={() => handleSpecialtyChange(spec)}
                data-testid={`filter-specialty-${spec.replace(/\s|\//g, "-")}`}
              />
              {spec}
            </label>
          </div>
        ))}
      </div>

      {/* Sort Filter */}
      <div>
        <h3 data-testid="filter-header-sort">Sort</h3>
        <label>
          <input
            type="radio"
            value="fees"
            checked={sortOption === "fees"}
            onChange={(e) => setSortOption(e.target.value)}
            data-testid="sort-fees"
          />
          Fees (Low to High)
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="experience"
            checked={sortOption === "experience"}
            onChange={(e) => setSortOption(e.target.value)}
            data-testid="sort-experience"
          />
          Experience (High to Low)
        </label>
      </div>
    </div>
  );
};

export default FilterPanel;
