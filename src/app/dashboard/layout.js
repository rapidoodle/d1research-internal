import Link from "next/link";
import SideNav from "../../components/SideNav";

export default function Layout({ children }) {
    return (
        <div className="container-fluid">
        <div className="row">
          <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
            <SideNav />
          </nav>
          <main className="col-md-9 ms-sm-auto col-lg-10 p-md-4 col-12">
            {children}v
          </main>
        </div>
      </div>
    );
  }