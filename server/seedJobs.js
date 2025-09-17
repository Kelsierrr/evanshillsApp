// server/seedJobs.js
const Job = require('./models/Job'); // <-- path is from server/ root

const SAMPLE_JOBS = [
  {
    title: "Registered Nurse (NHS Acute Ward)",
    company: "NHS Trust London",
    location: "London, United Kingdom",
    category: "Healthcare",
    salaryRange: "£28,000 – £38,000/yr",
    description: "Work within NHS acute wards delivering patient-centred care. IELTS/OET required..."
  },
  {
    title: "Heavy Truck Driver (Long-Haul)",
    company: "Global Logistics LLC",
    location: "Dubai, United Arab Emirates",
    category: "Logistics",
    salaryRange: "AED 4,000 – 6,000/mo + housing",
    description: "Operate heavy goods vehicles on regional routes. Company assists with UAE driving test conversion..."
  },
  {
    title: "Caregiver / Support Worker (Residential Care)",
    company: "Maple Home Care",
    location: "Toronto, Canada",
    category: "Domestic Support",
    salaryRange: "CAD 34,000 – 42,000/yr",
    description: "Provide daily living support, medication prompts, and companionship..."
  },
  {
    title: "Warehouse Operative (Picker/Packer)",
    company: "Joburg Fulfilment Centre",
    location: "Johannesburg, South Africa",
    category: "Logistics",
    salaryRange: "ZAR 120,000 – 180,000/yr",
    description: "Handle inbound/outbound stock, scanning, and order fulfilment..."
  },
  {
    title: "Housekeeper (Private Household)",
    company: "Doha Private Family",
    location: "Doha, Qatar",
    category: "Domestic Support",
    salaryRange: "QAR 1,800 – 2,400/mo + accommodation",
    description: "General housekeeping, laundry, and light meal prep..."
  }
];

async function seedJobs() {
  const count = await Job.countDocuments();
  if (count === 0) {
    const created = await Job.insertMany(SAMPLE_JOBS);
    console.log(`Seeded ${created.length} jobs ✅`);
  } else {
    console.log(`Jobs already exist (${count}), skipping seed.`);
  }
}

module.exports = { seedJobs }; // <-- named export
// Usage: call seedJobs() after DB connection in server/index.js