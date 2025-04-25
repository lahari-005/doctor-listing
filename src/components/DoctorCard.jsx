import React from "react";

// Simple hash function to turn a string into a number
const stringToNumber = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 90; // 0 to 89
};

const DoctorCard = ({ doctor }) => {
  const imageId = stringToNumber(doctor.name); // consistent per doctor
  const gender = doctor.gender === "female" ? "women" : "men";

  return (
    <div style={{
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "16px",
      marginBottom: "12px",
      display: "flex",
      alignItems: "center",
      gap: "16px",
      backgroundColor: "#1e1e1e", // dark mode matching your earlier screenshots
      color: "#fff"
    }}>
      <img
        src={`https://randomuser.me/api/portraits/med/${gender}/${imageId}.jpg`}
        alt={doctor.name}
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          objectFit: "cover"
        }}
      />
      <div>
        <h3>{doctor.name}</h3>
        <p><strong>Specialization:</strong> {doctor.specialities && doctor.specialities.length > 0 ? doctor.specialities[0].name : "N/A"}</p>
        <p><strong>Experience:</strong> {doctor.experience || "N/A"}</p>
        <p><strong>Location:</strong> {doctor.clinic?.address?.city || "N/A"}</p>
      </div>
    </div>
  );
};

export default DoctorCard;
