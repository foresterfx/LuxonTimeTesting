import { DateTime } from "luxon";

function convertToUTC(date, time, timezone) {
  console.log("**********************\nStart\n**********************");

  var stISO = DateTime.utc().toISO();
  var stHour = DateTime.fromISO(stISO, { zone: "utc" });
  var ltISO = DateTime.fromISO(stISO, { zone: `${timezone}` });

  console.log(
    `***** Current Server Time *****\nISO: ${stISO}\n24HR: ${stHour.toFormat(
      "HH:mm"
    )}\n12HR: ${stHour.toFormat("h:mma ZZZZ")}`
  );
  console.log(
    `***** Current Local Time *****\nISO: ${ltISO}\n24HR: ${ltISO.toFormat(
      "HH:mm"
    )}\n12HR: ${ltISO.toFormat("h:mma ZZZZ")}`
  );

  var serverTime = DateTime.fromISO(`${date}T${time}`, { zone: `utc` });
  var localTime = DateTime.fromISO(`${date}T${time}`, { zone: `${timezone}` });
  // console.log("Local Time: ", localTime.toFormat("HH:mm"));
  // console.log("Server Time: ", serverTime.toFormat("HH:mm"));
  var difference = localTime.diff(serverTime, "minutes");
  console.log("Minutes Diff: ", difference.minutes);

  serverTime = serverTime.plus({ minutes: difference.minutes });

  console.log(
    `***** Scheduled Server Time *****\nISO: ${serverTime}\n24HR: ${serverTime.toFormat(
      "HH:mm"
    )}\n12HR: ${serverTime.toFormat("h:mma ZZZZ")}`
  );
  console.log(
    `***** Scheduled Local Time *****\nISO: ${localTime}\n24HR: ${localTime.toFormat(
      "HH:mm"
    )}\n12HR: ${localTime.toFormat("h:mma ZZZZ")}`
  );

  console.log("**********************\nEnd\n**********************");
  return serverTime.toFormat("HH:mm");
}
/*********************************************************************
 * We must account for the day changing if UTC time == 00:00 (midnight)
 * The above function could simply return serverTime, then you format
 * it however you want it to look upon receiving the return value.
 *********************************************************************/
function convertToUTCDate(date, time, timezone) {
  var serverTime = DateTime.fromISO(`${date}T${time}`, { zone: `utc` });
  var localTime = DateTime.fromISO(`${date}T${time}`, { zone: `${timezone}` });

  var difference = localTime.diff(serverTime, "minutes");

  serverTime = serverTime.plus({ minutes: difference.minutes });

  return serverTime.toFormat("yyyy-LL-dd");
}

var date = "2023-01-12";
var time = "10:50";
var tz = "America/Chicago";

var localToServerTime = convertToUTC(date, time, tz);
console.log(`New Server Time: ${localToServerTime}`);
var localToServerDate = convertToUTCDate(date, time, tz);
console.log(`New Server Day: ${localToServerDate}`);

// let dt = DateTime.fromISO("2019-09-05T15:42:23.123");

// // dt = dt.startOf("day");
// // dt = dt.plus();

// console.log(dt.toISO({ includeOffset: false }));
// console.log(dt.toSQLTime());
// console.log(dt.toISOTime());
// console.log(dt.toLocaleString(DateTime.TIME_24_WITH_SHORT_OFFSET));
// console.log(dt.toLocaleString(DateTime.TIME_SIMPLE));
// console.log(dt.toLocaleString(DateTime.TIME_24_SIMPLE));
// console.log(
//   dt.toLocaleString({
//     ...DateTime.DATETIME_SHORT,
//     timeZoneName: "short"
//   })
// );

// console.log(
//   DateTime.utc(1970, 1, 1).toLocaleString({ weekday: "long", locale: "fr" })
// );

// console.log(DateTime.local(2019, 10, 25, 12).offset)
// console.log(DateTime.local(2019, 10, 27, 2).offsetNameLong)
// console.log(DateTime.fromISO("2016-05-25T09:08:34.123-05:00").offsetNameLong)
// console.log(DateTime.fromISO("2016-05-25T09:08:34.123-05:00").toLocaleString(DateTime.TIME_24_SIMPLE))
// console.log(DateTime.fromISO("").toLocaleString(DateTime.TIME_24_SIMPLE))

// console.log(
//   DateTime.fromISO("2019-10-25T15:00", { zone: "utc" })
//     .toLocal()
//     .toLocaleString(DateTime.DATETIME_FULL)
// );

// console.log(
//   DateTime.fromISO("2019-10-27T16:00", { zone: "utc" })
//     .toLocal()
//     .toLocaleString(DateTime.DATETIME_FULL)
// );
