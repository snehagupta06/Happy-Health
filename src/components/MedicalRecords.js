import React from "react";

const records = [
  { date: "2024-01-20", diagnosis: "Fever", prescription: "Paracetamol" },
  { date: "2024-03-10", diagnosis: "Cold", prescription: "Cetrizine" },
];

const MedicalRecords = () => {
  return (
    <div>
      <h2>Medical Records</h2>
      <table style={{ margin: "0 auto", borderCollapse: "collapse", width: "80%" }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Diagnosis</th>
            <th>Prescription</th>
          </tr>
        </thead>
        <tbody>
          {records.map((rec, idx) => (
            <tr key={idx}>
              <td>{rec.date}</td>
              <td>{rec.diagnosis}</td>
              <td>{rec.prescription}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicalRecords;
