import React from "react";

function Location({ category, active }) {
  return (
    <span className="location">
      {category} / {active && <span className="location__active">{active}</span>}
    </span>
  );
}

export default Location;
