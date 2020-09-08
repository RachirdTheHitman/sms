//to count msgs sent by date
export default function msgCount(messages) {
  let count = {};

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

  messages.forEach((element) => {
    let splitStr = element.dateTime.split(/[\s-]+/);
    let key = parseInt(splitStr[2]) + '.' + months[parseInt(splitStr[1]) - 1];

    if (key in count) {
      count[key] += 1;
    } else {
      count[key] = 1;
    }
  });

  return count;
}
