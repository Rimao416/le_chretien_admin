import ModalLayout from "../../layouts/ModalLayout";
import Input from "../Input";
import FormWrapper from "../FormWrapper";
import FormLayout from "../../layouts/FormLayout";
import Select from "../Select";
import { useSelector, useDispatch } from "react-redux";
import Multiselect from "multiselect-react-dropdown";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import CheckBox from "../checkBox";
import JoditEditor from "jodit-react";
import Image from "../Image";
import Document from "../Document";
import { updateBook } from "../../redux/slice/bookSlice";

function BookModal({ onClose, modal, data, setData, type }) {
  const navigate=useNavigate()
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { authors } = useSelector((state) => state.authorReducer);
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categoryReducer);
  const [book, setBook] = useState({
    title: "",
    author: "",
    description: "",
    content: "",
    cover: "",
    categories: [],
    isPremium: false,
    pages:0,
  });
  useEffect(() => {
    setBook({ ...data, author: data.author._id,categories: data.categories.map((category) => category._id) });
    console.log(data);
    let categoriesOptionsTemp = [];

    data.categories.map((category) => {
      // console.log(category);
      categoriesOptionsTemp.push({
        value: category._id,
        label: category.name,
      });
    });
    setSelectedCategories(categoriesOptionsTemp);
  }, [data.categories, data]);

  const onSelect = (selectedList) => {
    // Update the selected classes
    // const selectedIds =
    // setSelectedClasses(selectedIds);
    setSelectedCategories(selectedList);

    // console.log(selectedItem)

    // Update the data state with the selected classes
    setBook((prevState) => ({
      ...prevState,
      categories: selectedList.map((item) => item.value),
    }));
  };
  const onRemove = (selectedList) => {
    // Update the selected classes
    // console.log(selectedList);
    setSelectedCategories(selectedList);
    console.log(selectedList);
    // console.log("Je m'applique");
    // console.log(removedItem)

    // Update the data state by removing the class
    setBook((prevState) => ({
      ...prevState,
      categories: selectedList.map((item) => item.value),
    }));
  };
  // let categoriesOptionsTemp = [];
  // data.categories.map((category) => {
  //   console.log(category)
  //   categoriesOptionsTemp.push({

  //     value: category._id,
  //     label: category.name,
  //   });
  // });
  // setSelectedCategories(categoriesOptionsTemp);

  const categoriesOptions = categories?.map((catObj) => ({
    value: catObj._id, // You can use the _id as the value
    label: catObj.name, // Use the name as the label
  }));

  const handleChange = (event) => {
    setBook({
      ...book,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    console.log(book);
    event.preventDefault();
    const formData = new FormData();
    formData.append("id", book._id);
    formData.append("title", book.title);
    formData.append("author", book.author);
    formData.append("description", book.description);
    formData.append("pages", book.pages);

    formData.append("content", book.content);
    book.categories.forEach((categoryId, index) => {
      formData.append(`categories[${index}]`, categoryId);
    });
    formData.append("cover", book.cover);
    formData.append("isPremium", book.isPremium);

    // formData.append("categories", book.categories);
    dispatch(updateBook(formData)).then((result) => {
      console.log(result);
      if (
        result.payload &&
        result.payload.data &&
        result.payload.data.book &&
        result.payload.data.status == "success"
      ) {
        setData(result.payload.data.book);
        setBook({...result.payload.data.book,author: result.payload.data.book.author._id,categories: result.payload.data.book.categories.map((category) => category._id)});
        // Redirection vers la page des auteurs si l'ajout est réussi
        navigate("/books");
      } else {
        return;
        // Gérer les erreurs d'ajout d'auteur ici si nécessaire
      }
    });

    // onClose();
  };
  return (
    <ModalLayout title="Nouvelle période" onClose={onClose} modal={modal}>
      <FormLayout onSubmit={handleSubmit}>
        {type == "Generale" && (
          <>
            <FormWrapper label={"Titre"}>
              <Input
                name="title"
                type="text"
                valeur={data.title}
                onChange={handleChange}
              />
            </FormWrapper>
            <FormWrapper label={"Pages"}>
              <Input
                name="pages"
                type="number"
                valeur={data.pages ? data.pages : 0}
                onChange={handleChange}
              />
            </FormWrapper>
            <FormWrapper label={"Auteur"}>
              <Select name="author" onChange={handleChange}>
                <option value>--------------------</option>
                {authors.map((author) => (
                  <option key={author._id} value={author._id}>
                    {author.fullName}
                  </option>
                ))}
              </Select>
            </FormWrapper>
            <FormWrapper label="Type (Gratuit ou Premium)">
              <CheckBox
                data={book}
                // children={book.isPremium}
                onChange={() =>
                  setBook({ ...book, isPremium: !book.isPremium })
                }
              />
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
          </>
        )}
        {type == "Description" && (
          <FormWrapper label="Description">
            <JoditEditor
              value={data.description}
              onChange={(e) => setBook({ ...book, description: e })}
            />
          </FormWrapper>
        )}
        {type == "Cover" && (
          <FormWrapper label="Couverture">
            <Image name="cover" element={data} setElement={setData} />
          </FormWrapper>
        )}
        {type == "Content" && (
          <FormWrapper label="Document">
            <Document name="content" element={data} setElement={setData} />
          </FormWrapper>
        )}
        <button className="btn btn--primary" type="submit">
          Enregistrer
        </button>
      </FormLayout>
    </ModalLayout>
  );
}

export default BookModal;
