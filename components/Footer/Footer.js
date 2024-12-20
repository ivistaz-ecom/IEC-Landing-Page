"use client";
import Image from "next/image";
import ContactForm from "../../utils/contactForm";
import Modal from "../../app/contact-us/Modal";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const pathname = usePathname(); // Get current pathname

  return (
    <>
      <div className="bg-[url('/footer.svg')] bg-cover bg-center h-auto md:mt-0 -mt-32">
        <footer className="lg:mt-20">
          <div className="container mx-auto px-4">
            <div className="flex justify-center lg:mt-36 rounded-b-3xl bg-white w-52 items-center m-auto p-5 mt-10">
              <Image
                className="lg:mt-0 mt-36"
                width={400}
                height={100}
                src="/logo_dark.svg"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-20 items-center space-y-0 container mx-auto justify-center lg:pt-5  pt-20 py-5">
              {/* Quick Links Section */}
              <div className="text-center md:text-left">
                <h3 className="text-lg font-semibold text-purple-800 border-b-2 border-gray-600 mb-4 lg:mt-[26px] -mt-10">
                  Quick Links
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/about-us"
                      className={`text-gray-700 hover:text-purple-700 active:text-[#622F88] focus:text-purple-700 ${
                        pathname === "/about-us"
                          ? "text-purple-700 font-bold text-xl"
                          : ""
                      }`}
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/what-we-do"
                      className={`text-gray-700 hover:text-purple-700 active:text-[#622F88] focus:text-purple-700 ${
                        pathname === "/what-we-do"
                          ? "text-purple-700 font-bold text-xl"
                          : ""
                      }`}
                    >
                      What We Do
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/resources"
                      className={`text-gray-700 hover:text-purple-700 active:text-[#622F88] focus:text-purple-700 ${
                        pathname === "/resources"
                          ? "text-purple-700 font-bold text-xl"
                          : ""
                      }`}
                    >
                      Resources
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/faqs"
                      className={`text-gray-700 hover:text-purple-700 active:text-[#622F88] focus:text-purple-700 ${
                        pathname === "/faqs"
                          ? "text-purple-700 font-bold text-xl"
                          : ""
                      }`}
                    >
                      FAQs
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Social Media Section */}
              {/* <div className="text-center">
                <h3 className="text-lg font-semibold text-purple-800 mb-4 border-b-2 border-gray-600 lg:-mt-16 -mt-12">
                  Social Media
                </h3>
                <div className="flex justify-center space-x-4">
                  <a href="#" className="text-gray-700 hover:text-purple-700">
                    <Image width={30} height={50} src="/fb.svg" />
                  </a>
                  <a href="#" className="text-gray-700 hover:text-purple-700">
                    <Image width={30} height={50} src="/in.svg" />
                  </a>
                  <a href="#" className="text-gray-700 hover:text-purple-700">
                    <Image width={30} height={50} src="/x.svg" />
                  </a>
                </div>
              </div> */}

              {/* Expression of Interest Section */}
              <div className="text-center md:text-right">
                <h3 className="text-lg font-semibold text-purple-800 mb-4 border-b-2 border-gray-600 lg:-mt-11 -mt-16">
                  Expression of Interest
                </h3>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-white bg-[#232A35] lg:float-left mb-3 rounded-lg p-2"
                >
                  Reach Out To Us
                </button>
              </div>
            </div>
          </div>
          {/* modal start */}
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <ContactForm /> {/* Contact form component inside the modal */}
          </Modal>
          {/* modal end */}
        </footer>
      </div>
      <div className="bg-[#232A35] text-white flex lg:flex-row text-center flex-col justify-between p-3">
        <div className="container mx-auto">
          <p className="lg:float-start md:float-start  lg:px-10">All rights reserved © IEC®</p>
          <p className="lg:float-end md:float-end lg:pe-10">
            Terms and conditions | Privacy policy
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
