import { ImageComponent } from "../ds";

export default function ImageComponentPartial(props) {
  return (
    <>
      <ImageComponent type={"svg"} variant={"sm"} />
      <ImageComponent />
    </>
  );
}
