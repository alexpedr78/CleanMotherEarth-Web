import Navbar from "./../../components/Navbar/Navbar.jsx";
import Footer from "./../../components/Footer/Footer.jsx";

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
