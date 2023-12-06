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

  async function fetchCategories() {
    const res = await axios.get(api + "/list/category", header);
    const catArray = res.data.map((item) => ({
      label: item.title,
      value: item.id,
    }));
    setCategories(catArray);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value, 10));
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
    formData.append("image", image); // Append the file directly
    formData.append("quantity", quantity);
    formData.append("category", category);
    formData.append("author", author);

    try {
      const res = await axios.post(`${api}/create/book/`, formData, header);
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
      <Select
        placeholder="Категории"
        options={categories}
        onChange={(e) => setCategory(e.value)}
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

      <Button action={null}>Создать книгу</Button>
    </form>
  );
}
