import { useDispatch } from "react-redux";
import FormWrapper from "../components/FormWrapper";
import Input from "../components/Input";
import Location from "../components/Location";
import FormLayout from "../layouts/FormLayout";
import MainLayout from "../layouts/MainLayout";
import { createCategory } from "../redux/slice/categorySlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddCategoryForm() {
    const navigate = useNavigate();
    const [category,setCategory]=useState({
        name:""
    })
    const handleChange=(event)=>{
        setCategory({
            ...category,
            [event.target.name]:event.target.value
        })
    }
    const dispatch=useDispatch();
    const handleSubmit=(event)=>{
        event.preventDefault();
        dispatch(createCategory(category)).then((result)=>{
            if(result.payload && result.payload.data && result.payload.data.category && result.payload.data.status=="success"){
                navigate("/categories")
                // Redirection vers la page des auteurs si l'ajout est spéci
            }
        })
    }
  return (
    <MainLayout
      title="Formulaire"
      subtitle={<Location category="Formulaire" active="Ajout" />}
    >
      <FormLayout title="Ajouter une categorie" onSubmit={handleSubmit}>
        <FormWrapper label={"Nom"}>
          <Input
            type="text"
            placeholder={"Entrez le nom de la catégorie"}
            onChange={handleChange}
            name={"name"}
            max={50}
          />
        </FormWrapper>
        <button type="submit" className="btn btn--primary">
          Confirmer
        </button>
      </FormLayout>
    </MainLayout>
  );
}

export default AddCategoryForm;
