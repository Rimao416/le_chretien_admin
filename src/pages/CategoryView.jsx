import CardDashboard from "../components/CardDashboard"
import Location from "../components/Location"
import MainLayout from "../layouts/MainLayout"
import { BiBook } from "react-icons/bi";

import { AiOutlineBook } from "react-icons/ai";

import { PiApplePodcastsLogoLight } from "react-icons/pi";

function CategoryView() {
  return (
    <MainLayout title="Catégories" subtitle={<Location category="Catégories" active="Liste" />}>
      <div className="category__header">
        <CardDashboard title="Total des Livres" icon={<BiBook/>}/>
        <CardDashboard title="Nombre des lectures" icon={<AiOutlineBook/>} className={"btn-red"}/>
        <CardDashboard title="Nombre des Podcasts" icon={<PiApplePodcastsLogoLight/>} className={"btn-yellow"}/>
        
      </div>
    </MainLayout>
  )
}

export default CategoryView
