import axios from "axios";
import { useEffect, useState } from "react";
import { api } from "../../store/api";
import classes from "./Report.module.scss"; // Подключение модульного SCSS

const Report = () => {
  const [reportType, setReportType] = useState([]);
  const [selectedReport, setSelectedReport] = useState("");

  useEffect(() => {
    axios
      .get(`${api}/book/report/all`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setReportType(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных:", error);
      });
  }, []);

  const rep = reportType.map((item) => (
    <option key={item.id} value={item.id}>
      {item.name}
    </option>
  ));

  async function getReport(event) {
    event.preventDefault();

    try {
      const res = await axios.get(`${api}/book/report/${selectedReport}`, {
        responseType: "blob",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `report_${selectedReport}`);
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Ошибка при скачивании файла:", error);
    }
  }

  const postData = async () => {
    try {
      const url = `${api}/book/report/create`;

      const response = await axios.post(
        url,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log("Ответ сервера:", response.data);
      // здесь вы можете обработать ответ сервера или выполнить другие действия
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
      // здесь обрабатывайте ошибки, если они возникли
    }
  };

  return (
    <section className={classes.main}>
      <form method="get" onSubmit={getReport} className={classes.Report}>
        <div className={classes.label}>
          <label htmlFor="reports">Отчеты</label>
          <div>
            <select onChange={(e) => setSelectedReport(e.target.value)}>
              {rep}
            </select>

            <button type="submit">Скачать</button>
          </div>
        </div>
      </form>

      <div className={classes.right}>
        <button onClick={postData}>Создать</button>
      </div>
    </section>
  );
};

export default Report;
