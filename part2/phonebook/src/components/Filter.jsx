const Filter = ( {filter, onChange} ) => {
  return (
    <div>
      <label htmlFor="filter">filter shown with </label>
      <input value={filter} type="text" id="filter" onChange={onChange} />
    </div>
  )
}

export default Filter
