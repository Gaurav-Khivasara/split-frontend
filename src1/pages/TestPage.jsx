import { Link } from "react-router-dom";

export default function TestPage() {
  return (
    <>
      <h1>Test</h1>
      <Link to="/login" >Login</Link>
      <br /><br />
    </>
  );
}