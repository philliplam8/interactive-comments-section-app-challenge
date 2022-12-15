export function formatHyphenDelimiters(id: string): string {
  // Replace all whitespaces with hyphens
  let newId = id.replace(/\s/g, "-");
  return newId;
}

export function formatNoSpaces(id: string | null): string {
  // Replace all whitespaces
  if (id) {
    let newId = id.replace(/\s/g, "");
    return newId.toLocaleLowerCase();
  }
  return "";
}

export function getTime(): number {
  const d = new Date();
  const time = d.getTime();
  return time;
}

//TODO
export function stringifyTime(time: number): string {
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const year = day * 365;
  const UNIT_YEAR = "year";
  const UNIT_MONTH = "month";
  const UNIT_DAY = "day";
  const UNIT_HOUR = "hour";
  const UNIT_MINUTE = "minute";

  const difference = time - getTime();
  let formattedTime = "";
  let unit = "";
  if (difference / minute > 0) {
    formattedTime = Math.round(difference).toString();
    unit = UNIT_MINUTE;
    if (difference / minute > 1) {
      unit = unit.concat("s");
    }
  } else {
    formattedTime = "less than 1";
    unit = UNIT_MINUTE;
  }

  return `${formattedTime} ${unit} ago`;
}
