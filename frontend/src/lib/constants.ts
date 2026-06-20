export const CROP_TYPES = [
  { value: "rice", label: "Rice (Oryza sativa)" },
  { value: "corn", label: "Corn / Maize" },
  { value: "tea", label: "Tea" },
  { value: "coconut", label: "Coconut" },
  { value: "banana", label: "Banana" },
  { value: "cassava", label: "Cassava" },
  { value: "pepper", label: "Pepper" },
  { value: "chilli", label: "Chilli" },
  { value: "tomato", label: "Tomato" },
  { value: "potato", label: "Potato" },
] as const;

export const REGIONS = [
  { value: "Colombo", label: "Colombo" },
  { value: "Kandy", label: "Kandy" },
  { value: "Galle", label: "Galle" },
  { value: "Matara", label: "Matara" },
  { value: "Jaffna", label: "Jaffna" },
  { value: "Trincomalee", label: "Trincomalee" },
  { value: "Batticaloa", label: "Batticaloa" },
  { value: "Anuradhapura", label: "Anuradhapura" },
  { value: "Polonnaruwa", label: "Polonnaruwa" },
  { value: "Kurunegala", label: "Kurunegala" },
  { value: "Ratnapura", label: "Ratnapura" },
  { value: "Badulla", label: "Badulla" },
  { value: "Nuwara Eliya", label: "Nuwara Eliya" },
] as const;

export type CropType = (typeof CROP_TYPES)[number]["value"];
export type Region = (typeof REGIONS)[number]["value"];
