import { Outlet } from "react-router-dom";
import Nav from "./components/nav";
import Footer from './components/footer.jsx'

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8fbff] w-full h-full">
      {/* Navbar */}
      <header className="w-full fixed top-0 left-0 z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <Nav />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-28 px-4 sm:px-6 md:px-10">
        {/* 👆 Adjust padding to push content below navbar */}
        <Outlet />
      </main>
        <div>
         <Footer></Footer>
        </div>
    </div>
  );
}

export default App;