// certificates.js

const certContainer = document.getElementById('certificates-container');

// Array of certificates with thumbnail images
const certificates = [
  { 
    name: "Software Engineering Certificate", 
    issuedBy: "NPTEL", 
    year: 2024, 
    file: "certificates/Software Engineering Certificate.pdf",
    thumbnail: "certificates/Software Engineering Certificate.png"
  },
  { 
    name: "Block Chain Builder Certificate", 
    issuedBy: "FIIT INDIA", 
    year: 2024, 
    file: "certificates/Blockchain certificate.pdf",
    thumbnail: "certificates/Blockchain certificate.png"
  },
  { 
    name: "Python Internship Certificate", 
    issuedBy: "VichaarLab pvt. Ltd.", 
    year: 2025, 
    file: "certificates/Rajib Internship Certificate.pdf",
    thumbnail: "certificates/Rajib Internship Certificate.png"
  },
];

// Render certificates
certificates.forEach(cert => {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <h3><i class="fa-solid fa-certificate"></i> ${cert.name}</h3>
    <p>Issued By: ${cert.issuedBy}</p>
    <p>Year: ${cert.year}</p>
    <a href="${cert.file}" target="_blank">
      <img src="${cert.thumbnail}" alt="${cert.name} Certificate">
    </a>
  `;
  certContainer.appendChild(card);
});
