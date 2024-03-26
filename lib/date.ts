import { DateTime } from "luxon";

export class ParseDate {
  date: Date;
  zone: string;

  constructor(date: Date, zone: string) {
    this.date = date;
    this.zone = zone;
  }

  toLocaleString({ withDateTime = false }: { withDateTime?: boolean }) {
    if (withDateTime) {
      return DateTime.fromJSDate(this.date, {
        zone: this.zone,
      }).toLocaleString(DateTime.DATETIME_MED);
    } else {
      return DateTime.fromJSDate(this.date, {
        zone: this.zone,
      }).toLocaleString();
    }
  }
}
