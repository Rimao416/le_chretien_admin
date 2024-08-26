import MainLayout from "../layouts/MainLayout";
import Location from "../components/Location";
import DataTable from "react-data-table-component";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getAllCategories } from "../redux/slice/categorySlice";
import HeaderBar from "../components/HeaderBar";
import Button from "../components/Button";
import { IoIosAdd } from "react-icons/io";

// import { useEffect, } from "react";
function Categories() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategories()).then((result) => {
      console.log(result);
    });
  }, [dispatch]);
  const { categories, loading } = useSelector((state) => state.categoryReducer);
  const [searchQuery, setSearchQuery] = useState("");
  //   HANDLE CHANGE FUNCTION
  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const columns = [
    {
      name: "ID",
      selector: (row, index) => index + 1,
      sortable: false,
      // width: "100px",
    },
    {
      name: "Nom",
      selector: (row) => row.name,
      sortable: true,
      // width: "100px",
    },
  ];
  const filteredCategories = categories?.filter((row) => {
    // console.log(row);
    if (row && row.name) {
      const nameMatch = row.name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
      return nameMatch;
    }
    return false;
  });

  //   console.log(categories);
  return (
    <MainLayout
      title="Categories"
      subtitle={<Location category="Categories" active="Liste" />}
    >
      <HeaderBar
        placeholder={"Entrez le nom de la categorie souhaitée"}
        onChange={handleChange}
      >
        <Button icon={<IoIosAdd />} />
      </HeaderBar>

      <div className="categories__body">
        {loading ? (
          <h1>loading</h1>
        ) : (
          <DataTable columns={columns} data={filteredCategories} />
        )}
      </div>
      {/* NOUS DEVONS PREMIEREMENT CHARGER TOUTES LES CATEGORIES */}
    </MainLayout>
  );
}

export default Categories;
