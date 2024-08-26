import { useDispatch, useSelector } from "react-redux";
import Location from "../components/Location";
import MainLayout from "../layouts/MainLayout";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { getAllBooks } from "../redux/slice/bookSlice";
import HeaderBar from "../components/HeaderBar";
import DataTable from "react-data-table-component";
import { IoIosAdd } from "react-icons/io";
import {  useNavigate } from "react-router-dom";

function Books() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBooks());
    // dispatch(initializeState())
  }, [dispatch]);

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const { books, loading } = useSelector((state) => state.bookReducer);
  console.log(books);
  const columns = [
    {
      name: "ID",
      selector: (row, index) => index + 1,
      sortable: false,
      width: "60px",
      // width: "100px",
    },
    {
      name: "Titre",
      selector: (row) => row.title,
      sortable: true,

      width: "200px",
      wrap: true,
    },
    {
      name: "Description",
      selector: (row) => row.description.substring(0, 100) + "...",
      width: "250px",
      wrap: true,
      style: {
        padding: "10px",
      },
    },
    {
      name: "Type",
      cell: (row) => {
        return (
          <p className={row.isPremium ? "btn-green" : "btn-yellow"} style={{borderRadius:"10px"}}>
            {row.isPremium ? "Premium" : "Gratuit"}
          </p>
        );
      },
      width: "150px",
    },
    {
      name: "Auteur",
      selector: (row) => row.author.fullName,
    },

    {
      name: "Action",
      width:"80px",
      cell: (row) => (
        <span>
          <Button icon={<MdOutlineRemoveRedEye />}  onClick={()=>navigate(`/books/view/${row._id}`)} />
        </span>
      ),
    },
  ];
  const filteredBooks = books?.filter((row) => {
    // console.log(row);
    if (row && row.title) {
      const nameMatch = row.title
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
      return nameMatch;
    }
    return false;
  });

  return (
    <MainLayout
      title="Livres"
      subtitle={<Location category={"Livres"} active="Liste" />}
    >
      <HeaderBar
        placeholder={"Entrez le nom du livre souhaité"}
      >
        <Button icon={<IoIosAdd />}  onClick={() => console.log("hello")}/>
      </HeaderBar>
      <div className="categories__body">
        {loading ? (
          <h1>loading</h1>
        ) : (
          <DataTable columns={columns} data={filteredBooks} />
        )}
      </div>
    </MainLayout>
  );
}

export default Books;
