import { SButton } from "../Styled/Style";

function ButtonComponent({ onChange, checked, label, name, ...props }) {
  return (
    <>
      <div style={{ height: "fit-content" }}>
        <input
          onChange={onChange}
          checked={checked}
          type="checkbox"
          name={name}
          id={name}
          style={{ display: "none" }}
        />
        <label htmlFor={name}>
          <SButton>
            <p>{label}</p>
          </SButton>
        </label>
      </div>
    </>
  );
}

export default ButtonComponent;
