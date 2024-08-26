import { useState, useEffect } from "react";
import Document from "../components/Document";
import FormWrapper from "../components/FormWrapper";
import Image from "../components/Image";
import Multiselect from "multiselect-react-dropdown";
import Input from "../components/Input";
import Location from "../components/Location";
import Select from "../components/Select";
import { useDispatch, useSelector } from "react-redux";
import FormLayout from "../layouts/FormLayout";
import MainLayout from "../layouts/MainLayout";
import JoditEditor from "jodit-react";
import { getAllAuthors } from "../redux/slice/authorSlice";
import { createBook } from "../redux/slice/bookSlice";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../redux/slice/categorySlice";

function OperationBook() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [book, setBook] = useState({
    title: "",
    author: "",
    description: "",
    content: "",
    cover: "",
    categories: [],
    isPremium: false,
  });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const onSelect = (selectedList) => {
    // Update the selected classes
    // const selectedIds =
    // setSelectedClasses(selectedIds);
    setSelectedCategories(selectedList);
    console.log(selectedList);
    // console.log(selectedItem)
 
    // Update the data state with the selected classes
    setBook((prevState) => ({
      ...prevState,
      categories: selectedList.map((item) => item.value),
    }));  
    console.log(book)
  };
  const onRemove = (selectedList) => {
    // Update the selected classes
    // console.log(selectedList);
    setSelectedCategories(selectedList);
    // console.log("Je m'applique");
    // console.log(removedItem)

    // Update the data state by removing the class
    setBook((prevState) => ({
      ...prevState,
      categories: selectedList.map((item) => item.value),
    }));
  };
  useEffect(() => {
    dispatch(getAllAuthors());
    dispatch(getAllCategories());
  }, [dispatch]);
  const { authors } = useSelector((state) => state.authorReducer);
  const { categories } = useSelector((state) => state.categoryReducer);
  const categoriesOptions = categories?.map((categorieObj) => ({
    value: categorieObj._id, // You can use the _id as the value
    label: categorieObj.name, // Use the name as the label
  }));

  const handleChange = (event) => {
    setBook({
      ...book,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", book.title);
    formData.append("author", book.author);
    formData.append("description", book.description);
    formData.append("content", book.content);
    formData.append("cover", book.cover);
    book.categories.forEach((categoryId, index) => {
      formData.append(`categories[${index}]`, categoryId);
    });
    formData.append("isPremium", book.isPremium);
    console.log(formData.get("categories[0]"));
    console.log(book);
    dispatch(createBook(formData)).then((result) => {
      console.log(result);
      if (
        result.payload &&
        result.payload.data &&
        result.payload.data.book &&
        result.payload.data.status == "success"
      ) {
        // Redirection vers la page des auteurs si l'ajout est réussi
        navigate("/books");
      } else {
        return;
        // Gérer les erreurs d'ajout d'auteur ici si nécessaire
      }
    });
  };
  return (
    <MainLayout
      title="Livre"
      subtitle={<Location category="Livre" active="Ajout" />}
    >
      <FormLayout title="Ajouter un livre" onSubmit={handleSubmit}>
        <FormWrapper label="Titre">
          <Input
            type="text"
            placeholder={"Entrez le nom du livre"}
            onChange={handleChange}
            name="title"
            max={1000}
          />
        </FormWrapper>
        <FormWrapper label="Auteur">
          <Select name="author" onChange={handleChange}>
            <option value>--------------------</option>
            {authors.map((author) => (
              <option key={author._id} value={author._id}>
                {author.fullName}
              </option>
            ))}
          </Select>
        </FormWrapper>
        <FormWrapper label="Categories">
          <Multiselect
            options={categoriesOptions}
            selectedValues={selectedCategories}
            onSelect={onSelect}
            onRemove={onRemove}
            displayValue="label"
          />
        </FormWrapper>

        <FormWrapper label="Description">
          <JoditEditor
            value={book.description}
            onChange={(e) => setBook({ ...book, description: e })}
          />
        </FormWrapper>
        <FormWrapper label="Document (epub, pdf)">
          <Document name="content" element={book} setElement={setBook} />
        </FormWrapper>
        <FormWrapper label="Photo de couverture">
          <Image name="cover" element={book} setElement={setBook} />
        </FormWrapper>

        <FormWrapper label="Type (Gratuit ou Premium)">
          <label className="switch">
            <input
              type="checkbox"
              checked={book.isPremium}
              id="button"
              className="checkbox"
              onChange={() => setBook({ ...book, isPremium: !book.isPremium })}
            />
            <span className="slider"></span>
          </label>
        </FormWrapper>
        <button className="btn btn--primary">Ajouter</button>
      </FormLayout>
    </MainLayout>
  );
}

export default OperationBook;
