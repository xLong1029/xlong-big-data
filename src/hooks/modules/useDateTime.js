/*
 * 模块 : 时间模块
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2022-08-11
 * 版本 : version 1.0
 */
import { ref } from "vue";
import calendar from "@/utils/calendar";

export default function() {
  const currentTime = ref(null);
  const currentDate = ref(null);
  const currentWeek = ref(null);
  const currentLunarDate = ref(null);
  const dateTimeTimer = ref(null);

  /**
   * 配置当前日期和时间
   */
  const getCurrentDateTime = () => {
    const dateTime = new Date();
    const {
      lunarYearCn,
      zodiacYear,
      lunarMonthCn,
      lunarDayCn,
      weekday,
      gregorianYear,
      gregorianMonth,
      gregorianDay,
      hours,
      minutes,
      seconds
    } = calendar.data(dateTime);

    currentTime.value = `${hours}:${minutes}:${seconds}`;
    currentDate.value = `${gregorianYear}年${gregorianMonth}月${gregorianDay}日`;
    currentWeek.value = weekday;
    currentLunarDate.value = `${lunarYearCn}${zodiacYear}年${lunarMonthCn}${lunarDayCn}`;

    return {
      lunarYearCn,
      zodiacYear,
      lunarMonthCn,
      lunarDayCn,
      weekday,
      gregorianYear,
      gregorianMonth,
      gregorianDay,
      hours,
      minutes,
      seconds
    };
  };

  /**
   * 日期时间格式化
   *
   * @param {Date} dateTime
   * @returns
   */
  const getDateTimeFormat = dateTime => {
    return `${dateTime.getFullYear()}-${(dateTime.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${dateTime
      .getDate()
      .toString()
      .padStart(2, "0")} ${dateTime
      .getHours()
      .toString()
      .padStart(2, "0")}`;
  };

  return {
    currentTime,
    currentDate,
    currentWeek,
    currentLunarDate,
    dateTimeTimer,
    getDateTimeFormat,
    getCurrentDateTime
  };
}

