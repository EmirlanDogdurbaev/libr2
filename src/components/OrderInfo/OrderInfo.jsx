import { useEffect, useState } from "react";
import { api } from "../../store/api";
import { header } from "../../store/header";
import axios from "axios";
import { useParams } from "react-router-dom";

const OrderInfo = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  const [inventNumber, setInventNumber] = useState(0);

  useEffect(() => {
    axios
      .get(`${api}/order/${id}`, header)
      .then((response) => {
        setData(response.data);
        setData2(response.data.books[0]);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных:", error);
      });
  }, [id]);

  console.log(data2);

  const orderUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("inventory_number", inventNumber);
    try {
      const res = await axios.post(`${api}/order/${id}`, formData, header);
    } catch (e) {
      console.log(e.message);
    }
  };

  const InventNumberChange = (e) => {
    setInventNumber(parseInt(e.target.value, 10));
  };

  return (
    <div>
      <div>
        <h1>{data.created_time}</h1>
        <p></p>
      </div>
      <form method="post" onSubmit={orderUpdate}>
        <label htmlFor="invent-number">Инвентарный номер</label>
        <input
          type="number"
          id="invent-number"
          value={inventNumber}
          onChange={InventNumberChange}
        />

        <Button action={null}>Создать книгу</Button>
      </form>
    </div>
  );
};

export default OrderInfo;
