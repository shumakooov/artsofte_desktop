export interface User{
  username: string;
  password: string;
}

export interface Device{
  id: number,
  name: string,
  os: string,
  diagonal: number,
  department: { id: number, name: string},
  image: string
}

export interface Profile{
  id: number,
  firstname: string,
  secondname: string,
  connectLink: string,
  // departmentId: number,
}

export interface Record {
  deviceid: number,
  date: string,
  timeto: string,
  timefrom: string,
}

export interface BookedDevice{
  device: { id: number, name: string, imgPath: string},
  date: string,
  timeFrom: string,
  timeTo: string,
  booked: boolean
  id: number
}
