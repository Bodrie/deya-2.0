import { useEffect } from "react";
import { refreshDatabase } from "../firebase";
import {
  job,
  sendAt,
  time,
  timeout,
  CronCommand,
  CronJob,
  CronJobParameters,
  CronTime,
} from "cron";

const useRefreshDB = () => {
  refreshDatabase()
  // const cron = job(
  //   "*/2 * * * *",                            // The cron pattern
  //   function onTick() {                       // What to do when the pattern is hit
  //     // refreshDatabase();
  //   },
  //   function onComplete() {                   // On completion of the cron with cron.stop()
  //     console.log("onComplete of the cron");
  //   },
  //   true,                                     // Do we activate the cron or we are going to do it by ourself with job.start()
  //   "Europe/Sofia",                           // timezone
  //   null,                                     // context for `this`
  //   false,                                    // do we want to run the onTick action on init
  //   undefined,                                // utcOffset
  //   undefined                                 // unrefTimeout
  // );

  // console.log(cron);
  



  // var job = new CronJob(
  //   "25 17 * * * *",
  //   function () {
  //     console.log("asd");
  //   },
  //   null,
  //   true,
  //   "America/Los_Angeles"
  // );
  // Use this if the 4th param is default value(false)
  // job.stop()
};

export default useRefreshDB;
