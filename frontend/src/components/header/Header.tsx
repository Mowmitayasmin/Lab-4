import icon from "../../assets/icon.png";
import "./Header.css";

export default function Header() {
  return (
    <header>
      <img src={icon} />
      <h1>Pixell River Financial</h1>
      <span>Staff and Orginization Information</span>
    </header>
  );
}
