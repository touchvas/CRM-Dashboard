export const contacts = [
  {
    id: "c1",
    name: "Amina Hassan",
    email: "amina@gmail.com",
    country: "Kenya",
    status: "customer",
    total_spend: 82000,
    created_at: "2025-11-12",
    last_contacted: "2026-01-10"
  },
  {
    id: "c2",
    name: "Brian Otieno",
    email: "brian@yahoo.com",
    country: "Kenya",
    status: "lead",
    total_spend: 0,
    created_at: "2026-01-05",
    last_contacted: null
  },
  {
    id: "c3",
    name: "Sarah Kimani",
    email: "sarah@company.com",
    country: "Kenya",
    status: "prospect",
    total_spend: 12000,
    created_at: "2025-12-01",
    last_contacted: "2025-12-20"
  },
  {
    id: "c4",
    name: "James Mwangi",
    email: "james@gmail.com",
    country: "Uganda",
    status: "customer",
    total_spend: 54000,
    created_at: "2024-09-18",
    last_contacted: "2026-01-18"
  },
  {
    id: "c5",
    name: "Lucy Wanjiru",
    email: "lucy@startup.io",
    country: "Kenya",
    status: "customer",
    total_spend: 310000,
    created_at: "2023-06-10",
    last_contacted: "2026-01-02"
  },
  {
    id: "c6",
    name: "Daniel Okello",
    email: "daniel@hotmail.com",
    country: "Tanzania",
    status: "lead",
    total_spend: 0,
    created_at: "2026-01-15",
    last_contacted: null
  }
];

export const ContactFilterSchema = {
  name: {
    type: "string",
    operators: ["contains", "equals"]
  },
  email: {
    type: "string",
    operators: ["contains"]
  },
  country: {
    type: "string",
    operators: ["equals", "not_equals"],
    values: ["Kenya", "Uganda", "Tanzania"]
  },
  status: {
    type: "number",
    operators: ["equals"],
    values: ["0", "1", "2"]
  },
  total_spend: {
    type: "number",
    operators: ["gte", "lte"]
  },
  created_at: {
    type: "date",
    operators: ["before", "after"]
  },
  last_contacted: {
    type: "date",
    operators: ["before", "after", "is_null"]
  }
};
