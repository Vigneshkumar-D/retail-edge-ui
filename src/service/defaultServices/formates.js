import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
 
dayjs.extend(utc);
 
// to convert input date of Antd into utc formate
export const UTCFormate = (date) => {
  return date ? dayjs(date).utc().format() : null;
};
 
// to disable dates before the given date
export const EndDateLimitDisabled = (startDate) => {
  return (current) => {
    return current && startDate && current < dayjs(startDate).endOf("day");
  };
};
 
export const DateTimeFormat = (date)=>{
  return date ? dayjs(date).format("MMM DD, YYYY h:mm A") : null ;
}
 
export const DateFormat = (date)=>{
  return date ? dayjs(date).format("MMM DD, YYYY") : null ;
}
 
export const IndianDateTimeFormate = (date)=>{
  return date ? dayjs(date).format("DD-MM-YYYY ,  h:mm A") : null ;
}