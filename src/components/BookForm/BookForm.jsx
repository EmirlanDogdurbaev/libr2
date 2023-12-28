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
  const [author, setAuthor] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState("asa");
  const [file, setFile] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [time, setTime] = useState("");
  const [showAddCategoryField, setShowAddCategoryField] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(""); // Состояние для выбранного идентификатора категории
  const [categoryValue, setCategoryValue] = useState("");
  const [subCategoryValue, setSubCategoryValue] = useState("");
  const [categoryAdd, setCategoryAdd] = useState(true);
  const [test, setTest] = useState(true);
  const handleCategoryChange = (selectedOption) => {
    setSelectedCategoryId(selectedOption.value);
  };
  const languages = ["Кыргызский", "Русский", "Английский", "Немецкий"];
  const data = languages.map((item) => ({
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

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };
  const handleSubCategoryChange = (e) => {
    setSubCategoryValue(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("quantity", quantity);
    formData.append("category", category);
    formData.append("author", author);
    formData.append("language", selectedLanguage);
    formData.append("subcategory", subcategories);
    formData.append("e_book", file);
    formData.append("edition_year", year);
    formData.append("purchase_price", price);
    formData.append("purchase_time", time);

    try {
      const res = await axios.post(`${api}/book/create`, formData, header);
      console.log(res.data);
      // Очистка полей формы после отправки
      setTitle("");
      setDescription("");
      setImage(null);
      setQuantity(0);
      setCategory("");
      setAuthor("");
      setSelectedLanguage("");
      setYear("");
      setPrice("");
      setTime("");
      setFile(null);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleSubmitCategory = async (e) => {
    e.preventDefault();
    try {
      const category = await axios.post(
        `${api}/category/create`,
        { title: categoryValue },
        header
      );
      console.log(category.data);
      setCategoryValue("");
      setShowAddCategoryField(false);
      fetchCategories(); // Обновляем список категорий после добавления новой
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitSubCategory = async (e) => {
    e.preventDefault();
    try {
      const subcategory = await axios.post(
        `${api}/subcategory/create`,
        {
          category: selectedCategoryId, // Используем идентификатор выбранной категории
          title: subCategoryValue,
        },
        header
      );
      console.log(subcategory.data);
      setSubCategoryValue("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryChange2 = (selectedOption) => {
    setCategory(selectedOption.value); // Обновление выбранной категории
  };

  // Другие функции для работы с категориями и подкатегориями
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

      <label htmlFor="image">Электронный вариант книги</label>
      <input
        type="file"
        id="image"
        accept="file/*"
        onChange={handleFileChange}
      />

      <div>
        {/* Форма для добавления категории */}
        <div>
          <div>
            {categoryAdd ? (
              <>
                <label htmlFor="category">Категория </label>
                <Select
                  placeholder="Категории"
                  options={categories}
                  onChange={handleCategoryChange2}
                />
                <button onClick={() => setCategoryAdd(false)}>
                  Добавить категорию
                </button>
              </>
            ) : (
              <div className={classes.CategoryForm}>
                <label htmlFor="categoryTitle">Название категории</label>
                <input
                  type="text"
                  id="categoryTitle"
                  value={categoryValue}
                  onChange={(e) => setCategoryValue(e.target.value)}
                />
                <button
                  onClick={handleSubmitCategory}
                  style={{ marginRight: "10px" }}
                >
                  Добавить категорию
                </button>
                <button onClick={() => setCategoryAdd(true)}>готово</button>
              </div>
            )}
          </div>
        </div>

        {/* Форма для добавления подкатегории */}
        <div>
          {test ? (
            <>
              <label htmlFor="category">Подкатегория </label>
              <Select
                placeholder="Подкатегория"
                options={subcategories}
                onChange={(e) => setSubcategories(e.value)}
              />
              <button onClick={() => setTest(false)}>
                Добавить подкатегорию
              </button>
            </>
          ) : (
            <>
              <label htmlFor="category">Категория </label>
              <Select
                placeholder="Категории"
                options={categories}
                onChange={handleCategoryChange}
              />

              <div>
                <label htmlFor="subcategoryTitle">Название подкатегории</label>
                <input
                  type="text"
                  id="subcategoryTitle"
                  value={subCategoryValue}
                  onChange={handleSubCategoryChange}
                />
                <button onClick={handleSubmitSubCategory}>
                  Добавить подкатегорию
                </button>
                <button onClick={() => setTest(true)}>готово</button>
              </div>
            </>
          )}
        </div>
      </div>

      <label htmlFor="category">Язык </label>
      <Select
        placeholder="Язык"
        options={data}
        onChange={handleLanguageChange}
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

      <label htmlFor="year">Год издания</label>
      <input
        placeholder="2004"
        type="text"
        id="author"
        value={year}
        onChange={handleEditionYear}
      />

      <label htmlFor="edition-year">Дата закупки </label>
      <input
        placeholder="2004-12-11"
        type="text"
        id="author"
        value={time}
        onChange={handlePurchaseTime}
      />

      <label htmlFor="edition-year">Закупочная цена</label>
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
