import React from "react";
import Sidebar from "../components/Sidebar";
import MainLayout from "../layouts/MainLayout";
import { Title } from "../components/Title";
import Location from "../components/Location";

function Home() {
  return (
    <MainLayout
      title="Tableau de Bord"
      subtitle={<Location category="Admmin" active="Dashboard" />}
    ></MainLayout>
  );
}

export default Home;
