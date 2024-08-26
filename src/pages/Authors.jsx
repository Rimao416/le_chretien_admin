import MainLayout from "../layouts/MainLayout";
import CardAuthor from "../components/CardAuthor";
import Input from "../components/Input";
import { API } from "../config";
import { useState, useEffect } from "react";

import Button from "../components/Button";
import { IoIosAdd } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getAllAuthors } from "../redux/slice/authorSlice";
API.defaults.withCredentials = true;
function Authors() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllAuthors());
  }, [dispatch]);
  const { authors, loading } = useSelector((state) => state.authorReducer);
  const [searchQuery, setSearchQuery] = useState("");

  const handleFilter = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredAuthors = authors?.filter((row) => {
    const nameMatch = row.fullName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return nameMatch;
  });

  return (
    <MainLayout title="Auteurs">
      <div className="authors">
        <div className="authors__header">
          <Input
            type="text"
            placeholder={"Entrez le nom de l'autheur souhaité"}
            onChange={handleFilter}
          />
          <Button icon={<IoIosAdd />} />
        </div>
        <div className="authors__card">
          {loading ? (
            <h1>loading</h1>
          ) : (
            filteredAuthors.map((author) => <CardAuthor />)
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default Authors;
