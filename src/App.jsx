import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { db } from "./config/firestore";
import { collection, getDocs } from "firebase/firestore";
import Overlay from "./components/Overlay";
import Homepage from "./components/Homepage";
import Services from "./components/Services";
import Profile from "./components/Profile";
import About from "./components/About";
import Business from "./components/Business";

function App() {
  const navigate = useNavigate();
  const [datamd, setdatamd] = useState([]); // posts
  const [vendor_data, setvendor_data] = useState([]); // personal
  const [blurred, setblurred] = useState(true);
  const [pincode, setpincode] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 950);
  const [isOpen, setIsOpen] = useState(window.innerWidth > 950);
  const [products, setproducts] = useState([])

  const getPostData = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const venddata = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setdatamd(venddata);
    console.log(venddata, "datamd in App.jsx");
  };


  const getVendorData = async () => {
    const querySnapshot_vendor = await getDocs(collection(db, "vendors"));
    const vendata_personal = querySnapshot_vendor.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setvendor_data(vendata_personal);
    console.log(vendata_personal, "vendor data in App.jsx");
  };

  const getProductData = async () => {
    
    const querySnapshot_products = await getDocs(collection(db, "products"));
    let products_data = {};
    querySnapshot_products.docs.forEach(doc => {
      const servicesArray = Object.values(doc.data());
      products_data[doc.id] = servicesArray;
    })
    
   setproducts(products_data)
  };

  useEffect(() => {
    console.log(products,"prodcuts dataaaa")
  }, [products])
  

  useEffect(() => {
    getPostData();
    getVendorData();
    getProductData();

    const handleResize = () => {
      const isNowMobile = window.innerWidth <= 950;
      setIsMobile(isNowMobile);
      setIsOpen(!isNowMobile);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!blurred && window.location.pathname === "/") {
      navigate("/homepage");
    }
  }, [blurred, navigate]);

  const toggleSidebar = () => setIsOpen(prev => !prev);

  return (
    <div className="main-container container-fluid bg-dark d_off d-flex justify-content-center">
      {/* Hamburger Toggle (only on mobile) */}
      {isMobile && (
        <button
          className="btn btn-outline-light m-2"
          onClick={toggleSidebar}
          style={{
            position: "fixed",
            top: "10px",
            left: "10px",
            zIndex: 1100,
          }}
        >
          ☰
        </button>
      )}

      {/* Sidebar */}
      {isOpen && (
        <div
          className="d-flex flex-column flex-shrink-0 p-3 bg-dark text-light"
          style={{
            width: "250px",
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1000,
          }}
        >
          <a
            href="/"
            className="d-flex align-items-center mb-3 text-light text-decoration-none"
          >
            <img
              src="../Apni-E-Dukaan logo.png"
              alt="Logo"
              className="rounded-circle me-2"
              style={{ width: "40px", height: "40px" }}
            />
            <span className="fs-4">Apni-E-Dukaan</span>
          </a>
          <hr className="text-secondary" />
          <ul className="nav nav-pills flex-column mb-auto">
            <li>
              <a href="#home" className="nav-link text-light" onClick={()=>{navigate("/homepage")}}>
                Home
              </a>
            </li>
            
          </ul>
          <hr className="text-secondary" />
          <div className="mt-auto">
            <h6>Contact Us:</h6>
            <a
              href="mailto:arjuntandon2008@gmail.com"
              className="text-info text-decoration-none small"
            >
              arjuntandon2008@gmail.com
            </a>
          </div>
        </div>
      )}

      {/* Main content with margin if sidebar is open */}
      <div
        style={{
          marginLeft: isMobile || !isOpen ? "0" : "250px",
          padding: "20px",
          transition: "margin-left 0.3s ease",
          width: "100%",
        }}
      >
        <Routes>
          <Route
            path="/homepage"
            element={
              <Homepage
                setpincode={setpincode}
                pincode={pincode}
                setblurred={setblurred}
                vendor_data={vendor_data}
                datamd={datamd}
                navigate={navigate}
                products = {products}
              />
            }
          />
          <Route path="/service" element={<Services products = {products} />} />
          <Route path = "/profile" element = {<Profile vendor_data = {vendor_data} />}></Route>
          <Route path = "/about" element = {<About/>}></Route>
          <Route path = "/business" element = {<Business/>}></Route>
          <Route path = "/homepage" element = {<Homepage/>}></Route>
        </Routes>

        {/* Overlay to get pincode */}
        {blurred && (
          <Overlay
            setpincode={setpincode}
            pincode={pincode}
            setblurred={setblurred}
          />
        )}
      </div>
    </div>
  );
}


export default App;
