import "./main.scss";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Authors from "./pages/Authors";
import OperationAuthor from "./pages/OperationAuthor";
import Categories from "./pages/Categories";
import AddCategoryForm from "./pages/AddCategoryForm";
import CategoryView from "./pages/CategoryView";
import OperationBook from "./pages/OperationBook";
import Books from "./pages/Books";
import BookView from "./pages/BookView";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/authors" element={<Authors />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/categories/view/:id" element={<CategoryView />} />
      <Route path="/categories/add" element={<AddCategoryForm />} />

      <Route path="/books" element={<Books/>} />
      <Route path="/books/view/:id" element={<BookView/>} />
      <Route path="/books/add" element={<OperationBook />} />
      <Route path="/authors/add" element={<OperationAuthor />} />
    
    </Routes>
  );
}

export default App;