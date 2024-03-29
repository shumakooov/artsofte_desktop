export interface User {
  username: string,
  password: string,
  rememberme: boolean,
  timezone: number,
}

export interface Device {
  id: number,
  name: string,
  os: string,
  diagonal: number,
  department: { id: number, name: string },
  image: string,
  type: string,
  resolution: string
}

export interface Profile {
  id: number,
  firstname: string,
  secondname: string,
  connectLink: string,
  username: string,
  status: string,
  image: string
}

export interface Record {
  deviceid: number,
  date: string,
  timeto: string,
  timefrom: string,
}

export interface BookedDevice {
  device: { id: number, name: string, imgPath: string },
  date: string,
  timeFrom: string,
  timeTo: string,
  booked: boolean
  id: number
}

export interface Filter {
  types: [{ id: number, name: string }],
  systems: [{ id: number, name: string }],
  departments: [{ id: number, name: string }],
  tags: [{ id: number, name: string }],
  maxLen: number
}

export interface IsAuth {
  authorize: boolean
}

export interface RecordsHistory {
  date: string,
  records: [
    {
      userName: string,
      timeFrom: string,
      timeTo: string
    }
  ]
}

export interface FilterSearch {
  type: number | null,
  os: number | null,
  department: number | null,
  tags: [number] | null,
  minlen: number | null,
  maxlen: number | null,
  sortType: string | null
}

export interface Tag{
  id: number,
  name: string
}

export interface ReturnDevice {
  recordId: number,
  departmentId: number
}

export interface CalendarRecord {
  id: number,
  title: string,
  start: string,
  end: string,
  booked: boolean,
  deviceId: number
}

export interface ChangeRecord {
  bookingId?: string | number,
  start: string,
  end?: string
}

export interface Tag {
  id: number,
  name: string
}

export interface Report {
  Reason: string,
  Description: string
}
