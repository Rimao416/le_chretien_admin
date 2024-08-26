import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Location from "../components/Location";
import { useDispatch } from "react-redux";
import FormLayout from "../layouts/FormLayout";
import FormWrapper from "../components/FormWrapper";
import Input from "../components/Input";
import Image from "../components/Image";
import JoditEditor from "jodit-react";
import { createAuthor } from "../redux/slice/authorSlice";
import { useNavigate } from "react-router-dom";

function OperationAuthor() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { status } = useSelector((state) => state.authorReducer);
  // const { status } = state.authorReducer;
  // useEffect(() => {
  //   if (status === "success") {
  //     navigate("/authors");
  //   }
  // }, [status, navigate]);
  // useEffect(() => {
  //   dispatch(initializeState());
  //   if (status === "success") {
  //     navigate("/authors");
  //   }
  // }, [dispatch, status, navigate]);
  // useSelector

  // console.log(author);

  const [author, setAuthor] = useState({
    fullName: "",
    biography: "",
    photo: "",
  });
  const handleChange = (event) => {
    setAuthor({
      ...author,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("fullName", author.fullName);
    formData.append("biography", author.biography);
    formData.append("photo", author.photo);
    console.log(author)
    console.log(formData.get("photo"));
    dispatch(createAuthor(formData)).then((result) => {
      if (result.payload && result.payload.data && result.payload.data.author && result.payload.data.status=="success") {
        // Redirection vers la page des auteurs si l'ajout est réussi
       navigate("/authors");
      } else {
        return;
        // Gérer les erreurs d'ajout d'auteur ici si nécessaire
      }
    });
    // console.log(formData);
  };
  // const editor = useRef(null);

  return (
    <MainLayout
      title="Formulaire"
      subtitle={<Location category="Formulaire" active="Ajout" />}
    >
      <FormLayout title="Ajouter un auteur" onSubmit={handleSubmit}>
        <FormWrapper label="Nom Complet">
          <Input
            type="text"
            placeholder="Entrez le nom de l'auteur"
            onChange={handleChange}
            name="fullName"
          />
        </FormWrapper>
        <FormWrapper label="Biographie">
          <JoditEditor
            value={author.biography}x
            onChange={(newContent) =>
              setAuthor({ ...author, biography: newContent })
            }
          />
        </FormWrapper>
        <FormWrapper label="Image de l'aute ur">
          <Image name="photo" element={author} setElement={setAuthor}/>
        </FormWrapper>
        <button type="submit" className="btn btn--primary">
          Confirmer
        </button>
      </FormLayout>
    </MainLayout>
  );
}

export default OperationAuthor;
