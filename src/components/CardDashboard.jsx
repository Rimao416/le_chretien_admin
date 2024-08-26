import Button from "./Button"
import { BsGraphDownArrow } from "react-icons/bs";
function CardDashboard({title,icon,className}) {
  return (
    <div className="cardDashboard">
      <div className="cardDashboard__wrapper">
        <h3 className="cardDashboard__title">{title}</h3>
        <div className="cardDashboard__number">
            <h5 className="cardDashboard__number__value">45</h5>
            <h5 className="cardDashboard__number__value"> <span className="cardDashboard__number__value__icon"><BsGraphDownArrow/></span> 0.5</h5>
        </div>
      </div>
      <div className="cardDashboard__wrapper">
        <Button icon={icon} className={className}/>
      </div>
    </div>
  )
}

export default CardDashboard
