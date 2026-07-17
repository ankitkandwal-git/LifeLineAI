import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";
const Home = () => {
  return (
    <div className="min-h-screen font-sans bg-gray-50">
      <Navbar />
      <HeroSection />
      <Footer />
    </div>
  );
};

export default Home;