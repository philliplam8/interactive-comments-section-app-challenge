export default function formatId(id: string): string {
  // Replace all whitespaces wth hyphens
  let newId = id.replace(/\s/g, "-");
  return newId;
}
