import { useEffect } from "react";
import { Link } from 'react-router-dom';

const PageNotFound = () => {

  const url = "/";

  useEffect(() => {
    document.body.style.backgroundColor = "#eee";

  }, []);

  return (
    <div className="Container" style={{ minHeight: '100vh' }}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: '100vh' }}>
        <div style={{ textAlign: "center" }}>
          <h1>404</h1>
          <h3>Page Not Found</h3>
          <Link to={url} style={{ textDecoration: "none" }}><h4>Go Back</h4></Link>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;