export function formatHyphenDelimiters(id: string): string {
  // Replace all whitespaces with hyphens
  let newId = id.replace(/\s/g, "-");
  return newId;
}

export function formatNoSpaces(id: string | null): string {
  // Replace all whitespaces
  if (id) {
    let newId = id.replace(/\s/g, "");
    return newId;
  }
  return "";
}

export function getTime(): number {
  const d = new Date();
  const time = d.getTime();
  return time;
}
