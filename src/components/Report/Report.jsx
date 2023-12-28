import axios from "axios";
import { useEffect, useState } from "react";
import { api } from "../../store/api";
import { header } from "../../store/header";

const Report = () => {
  const [reportType, setReportType] = useState([]);
  const [selectedReport, setSelectedReport] = useState(""); // Стейт для выбранного отчета
  const [downlodReport, setDownloadReport] = useState("");

  useEffect(() => {
    axios
      .get(`${api}/book/report/all`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setReportType(response.data.files);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных:", error);
      });
  }, []);

  console.log(reportType);

  const rep = reportType.map((item, index) => {
    return (
      <option key={index} value={item}>
        {item}
      </option>
    );
  });

  async function getReport(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение отправки формы

    try {
      const res = await axios.get(`${api}/book/report/${selectedReport}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setDownloadReport(res.data);
    } catch (e) {
      console.log(e.message);
    }
  }
  const handleDownload = () => {
    window.open(downlodReport, "_blank");
    console.log("click");
  };

  return (
    <>
      <form method="get" onSubmit={getReport}>
        <label htmlFor="reports">отчеты </label>
        <select onChange={(e) => setSelectedReport(e.target.value)}>
          {rep}
        </select>
        <button type="submit">скачать</button>
      </form>

      <p>
            {downlodReport}
      </p>

      {/* <button onClick={handleDownload}>Скачать электронную книгу</button> */}
    </>
  );
};

export default Report;
