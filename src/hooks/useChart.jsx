import { useTranslation } from "react-i18next";

export const useChart = (type, backendData) => {
  const { i, i18n } = useTranslation();
  const lang = i18n.language;

  let data = [];
  if (type === "todo") {
    data = [
      { name: lang === "en" ? "Monday" : lang === "ar" ? "الاثنین" : "دووشەممە", todos: 2 },
      { name: lang === "en" ? "Thursday" : lang === "ar" ? "الثلاثاء" : "سێ شەممە", todos: 2 },
      { name: lang === "en" ? "Wednesday" : lang === "ar" ? "الأربعاء" : "چوارشەممە", todos: 2 },
      { name: lang === "en" ? "Tuesday" : lang === "ar" ? "الخمیس" : "پێنج شەممە", todos: 2 },
      { name: lang === "en" ? "Friday" : lang === "ar" ? "الجمعة" : "هەینی", todos: 2 },
      { name: lang === "en" ? "Saturday" : lang === "ar" ? "السبت" : "شەممە", todos: 2 },
      { name: lang === "en" ? "Sunday" : lang === "ar" ? "الأحد" : "یەکشەممە", todos: 2 },
    ];
  } else if (type === "plan") {
    data = [
      { name: lang === "en" ? "Monday" : lang === "ar" ? "الاثنین" : "دووشەممە", plans: 2 },
      { name: lang === "en" ? "Thursday" : lang === "ar" ? "الثلاثاء" : "سێ شەممە", plans: 2 },
      { name: lang === "en" ? "Wednesday" : lang === "ar" ? "الأربعاء" : "چوارشەممە", todos: 2 },
      { name: lang === "en" ? "Tuesday" : lang === "ar" ? "الخمیس" : "پێنج شەممە", plans: 2 },
      { name: lang === "en" ? "Friday" : lang === "ar" ? "الجمعة" : "هەینی", plans: 2 },
      { name: lang === "en" ? "Saturday" : lang === "ar" ? "السبت" : "شەممە", plans: 2 },
      { name: lang === "en" ? "Sunday" : lang === "ar" ? "الأحد" : "یەکشەممە", plans: 2 },
    ];
  }

  return data;
};

export default useChart;
