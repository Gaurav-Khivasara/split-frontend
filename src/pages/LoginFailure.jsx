import { Link } from "react-router-dom";

export default function LoginFailure() {
  return (
    <>
      <h1>
        Login Failure
        <br />
      </h1>
      <Link to="/login" >Login</Link>
    </>
  );
}