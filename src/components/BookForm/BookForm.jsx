import React, { useEffect, useState } from "react";
import classes from "./BookForm.module.scss";
import axios from "axios";
import { api } from "../../store/api";
import { header } from "../../store/header";
import Select from "react-select";
import Button from "../Button/Button";

export default function BookForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState(""); // Add author state
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState("asa");

  const [number, setNumber] = useState(0); // Add author state

  const [inventNumber, setInventNumber] = useState(0);
  const [file, setFile] = useState(null);

  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [year, setYear] = useState("");

  const [price, setPrice] = useState("");
  const [time, setTime] = useState("");

  const languages = ["Кыргызский", "Русский", "Английский", "Немецкий"];

  const data = languages.map((item, index) => ({
    label: item,
    value: item,
  }));

  async function fetchCategories() {
    const res = await axios.get(api + "/category/all", header);
    const catArray = res.data.map((item) => ({
      label: item.title,
      value: item.id,
    }));
    setCategories(catArray);
  }

  async function fetchSubCategories() {
    const res = await axios.get(api + "/subcategory/all", header);
    const catArray = res.data.map((item) => ({
      label: item.title,
      value: item.id,
    }));
    setSubcategories(catArray);
  }

  const handleLanguageChange = (selectedOption) => {
    setSelectedLanguage(selectedOption.value);
  };

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleEditionYear = (e) => {
    setYear(e.target.value);
  };

  const handlePurchaseTime = (e) => {
    setTime(e.target.value);
  };

  const handlePurchasePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value, 10));
  };

  const InventNumberChange = (e) => {
    setInventNumber(parseInt(e.target.value, 10));
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(image);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("quantity", quantity);
    formData.append("category", category);
    formData.append("author", author);
    formData.append("language", selectedLanguage);
    formData.append("subcategory", subcategories);
    formData.append("file", file);
    formData.append("edition_year", year);
    formData.append("purchase_price", price);
    formData.append("purchase_time", time);
    formData.append("inventory_number", inventNumber);

    try {
      const res = await axios.post(`${api}/book/create`, formData, header);
      console.log(res.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <form
      className={classes.BookForm}
      method="post"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
    >
      <label htmlFor="title">Название</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={handleTitleChange}
      />
      <label htmlFor="description">Описание</label>
      <textarea
        id="description"
        value={description}
        onChange={handleDescriptionChange}
      />

      <label htmlFor="image">Обложка</label>
      <input
        type="file"
        id="image"
        accept="image/*"
        onChange={handleImageChange}
      />

      <label htmlFor="image">тест</label>
      <input
        type="file"
        id="image"
        accept="file/*"
        onChange={handleFileChange}
      />

      <label htmlFor="category">Категория </label>
      <Select
        placeholder="Категории"
        options={categories}
        onChange={(e) => setCategory(e.value)}
      />
      <label htmlFor="category">Под Категория </label>
      <Select
        placeholder="Под Категория"
        options={subcategories}
        onChange={(e) => setSubcategories(e.value)}
      />
      <label htmlFor="category">Язык </label>
      <Select
        placeholder="Язык"
        options={data}
        onChange={handleLanguageChange}
      />
      <label htmlFor="invent-number">Инвентарный номер</label>
      <input
        type="number"
        id="invent-number"
        value={inventNumber}
        onChange={InventNumberChange}
      />
      <label htmlFor="quantity">Количество</label>
      <input
        type="number"
        id="quantity"
        value={quantity}
        onChange={handleQuantityChange}
      />
      <label htmlFor="author">Автор</label>
      <input
        type="text"
        id="author"
        value={author}
        onChange={handleAuthorChange}
      />

      <label htmlFor="edition-year">year</label>
      <input
        type="text"
        id="author"
        value={year}
        onChange={handleEditionYear}
      />

      <label htmlFor="edition-year">time</label>
      <input
        type="text"
        id="author"
        value={time}
        onChange={handlePurchaseTime}
      />

      <label htmlFor="edition-year">price</label>
      <input
        type="text"
        id="author"
        value={price}
        onChange={handlePurchasePrice}
      />

      <Button action={null}>Создать книгу</Button>
    </form>
  );
}
