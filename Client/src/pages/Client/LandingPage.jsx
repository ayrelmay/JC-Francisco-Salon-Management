import { Facebook, Twitter, Instagram } from "lucide-react";
// import img1 from "../assets/2.jpg";
// import img2 from "../assets/6.jpg";

function LandingPage() {
  return (
    <div className={`min-h-screen bg-white`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* Navigation */}
        <nav className="py-6 flex items-center justify-between border-b-[.08rem] border-PrimBtn">
          <div className="flex items-center text-2xl font-semibold text-PrimBtn">
            <img
              src="/Logo (5).png"
              alt="Google logo"
              className="w-14 h-14 mr-4"
            />
            J.C Francisco Salon
          </div>
          <div className="hidden md:flex items-center gap-8 ">
            <a className=" text-PrimBtn hover:text-pink-500 " href="#">
              About
            </a>
            <a className=" text-PrimBtn hover:text-pink-500 " href="#">
              Contact
            </a>
            <button className="border border-PrimBtn text-PrimBtn py-2 px-4 rounded-full">
              Book Now
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-3xl text-PrimFont font-light leading-tight dark:text-white text-left">
              TRANSFORM YOUR LOOKS, ELEVATE YOUR CONFIDENCE –
              <br />
              STEP INTO OUR SALON AND LET
              <br />
              <span className="text-PrimBtn text-5xl"> YOUR BEAUTY SHINE!</span>
            </h1>
            <div className="flex justify-start">
              <button className="text-PrimFont text-left border-[.08rem] p-3 rounded-full text">
                Book now!<span className="ml-2">→</span>
              </button>
            </div>
          </div>

          <div className="relative">
            {/* Background circle behind the first image */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-pink-100 rounded-full" />
            {/* First Image */}
            <img
              alt="Beauty treatment demonstration"
              width={300}
              height={300}
              className="relative z-10 rounded-full"
            />

            <div className="absolute top-24 right-0 w-72 h-72 bg-pink-100 rounded-full">
              <img
                alt="Beauty result showcase"
                className="object-cover relative z-10 rounded-full"
                width={500}
                height={500}
              />
            </div>
          </div>
        </main>

        {/* About Section */}
        <section className="py-16 text-center">
          <div className="inline-block px-6 py-2 bg-pink-100 rounded-full">
            <span className=" text-PrimFont">About Us</span>
          </div>
          <h2 className="mt-8 text-4xl font-light text-PrimFont">
            Visit us and indulge in a little self-care today!
          </h2>
          <p className="mt-4  text-PrimFont ">
            Welcome to J.C. Francisco Salon! Since 2015, we’ve been dedicated to
            enhancing your natural beauty with exceptional hair, nail, and spa
            services. Our talented team stays on top of the latest trends to
            provide personalized experiences that leave you feeling rejuvenated
            and confident.
          </p>
          <button className="mt-8  text-PrimFont ">
            Know more<span className="ml-2">→</span>
          </button>
        </section>

        {/* Social Links */}
        <div className="fixed right-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-6">
          <a href="#" className=" text-PrimBtn">
            <Facebook className="w-5 h-5" />
          </a>
          <a href="#" className="text-PrimBtn">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="text-PrimBtn">
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
