export function Checkboxes({ title, onChange, options, checked }) {
  return (
    <label
      style={{
        margin: "1em",
        display: "flex",
        justifyContent: "center",
        gap: ".5em"
      }}
    >
      {title}
      <form style={{ display: "flex" }}>
        {options.map((value, i) => (
          value === checked ?
            <div key={value}>
              <input
                type="checkbox"
                id={value}
                name="checkbox"
                value={value}
                checked
                onChange={() => onChange(i)}
              />
              <label htmlFor={value}>{value}</label>
            </div> :
            <div key={value}>
              <input
                type="checkbox"
                id={value}
                name="checkbox"
                value={value}
                onChange={() => onChange(i)}
              />
              <label htmlFor={value}>{value}</label>
            </div>
        ))}
      </form>
    </label>
  );
}
