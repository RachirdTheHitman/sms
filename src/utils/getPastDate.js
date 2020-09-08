// to calculate the past {daysToBack} days list from today
export default function getPastDate(daysToBack) {
  let date = new Date();
  const months = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec",
  };
  const daysList = [];

  for (let i = daysToBack; i >= 0; i--) {
    let last = new Date(date.getTime() - i * 24 * 60 * 60 * 1000);
    let day = last.getDate();
    let month = last.getMonth();
    daysList.push(day + "." + months[month])
  }

  return daysList;
}
