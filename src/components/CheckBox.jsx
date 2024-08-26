
function CheckBox({data,onChange}) {
  return (
    <label className="switch">
            <input
              type="checkbox"
              checked={data.isPremium}
              id="button"
              className="checkbox"
              onChange={onChange}
            />
            <span className="slider"></span>
          </label>
  )
}

export default CheckBox
