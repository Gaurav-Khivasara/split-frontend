import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <>
      <h1>
        Page Not Found
        <br />
      </h1>
      <Link to="/login" >Login</Link>
    </>
  );
}