function getStyledProps(internalProps = {}) {
  let output = "";
  Object.keys(internalProps).forEach((key, index) => {
    output += `${internalProps[key]} `;
  });
  return output;
}

export default getStyledProps;
