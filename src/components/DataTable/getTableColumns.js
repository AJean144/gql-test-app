export const getTableColumns = value => [
  {
    id: "id",
    label: "Flight ID",
    minWidth: 170,
    format: value => value || "N/A"
  },
  {
    id: "duration",
    label: "Flight Duration",
    minWidth: 170
  },
  {
    id: "latitude",
    label: "Flight Latitude",
    minWidth: 170,
    format: value => value || "N/A"
  },
  {
    id: "longitude",
    label: "Flight Longitude",
    minWidth: 170,
    format: value => value || "N/A"
  },
  { id: "notes", label: "Flight Notes", minWidth: 370 },
  {
    id: "location",
    label: "Flight Location ID",
    minWidth: 170,
    format: value => (value ? value.id : "N/A")
  },
  {
    id: "location",
    label: "Flight Location Name",
    minWidth: 170,
    format: value => (value ? value.name : "N/A")
  },
  {
    id: "location",
    label: "Flight Location Notes",
    minWidth: 270,
    format: value => (value ? value.notes : "N/A")
  },
  {
    id: "aircraft",
    label: "Aircraft Manufacturer",
    minWidth: 170,
    format: value => (value ? value.manufacturer : "N/A")
  },
  {
    id: "aircraft",
    label: "Aircraft Model",
    minWidth: 170,
    format: value => (value ? value.model : "N/A")
  },
  {
    id: "aircraft",
    label: "Aircraft Name",
    minWidth: 170,
    format: value => (value ? value.name : "N/A")
  },
  {
    id: "aircraft",
    label: "Aircraft Serial Number",
    minWidth: 170,
    format: value => (value ? value.serial_number || "N/A" : "N/A")
  },
  {
    id: "batteries",
    label: "Battery Manufacturer",
    minWidth: 170,
    format: value => (value ? value.manufacturer : "N/A")
  },
  {
    id: "batteries",
    label: "Battery Name",
    minWidth: 170,
    format: value => (value ? value.name : "N/A")
  },
  {
    id: "batteries",
    label: "Battery Serial Number",
    minWidth: 170,
    format: value => (value ? value.serial_number || "N/A" : "N/A")
  }
];
