import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Footer() {
  const user = useSelector((state) => state.user.value.isSeller);

  return (
    <footer className="bg-neutral-200 dark:bg-gray-900 m-0">
      <div className="w-full p-3 md:py-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-2xl font-bold my-2 ml-4 mr-7"> 
            <Link to={user === true ? "/clientHomePage" : user === false ? "/freelancerHomePage" : "/"}>
              <span className="text">Freelenci</span>
            </Link>
            <span className="font-bold text-blue-500">.</span>
          </div>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-black sm:mb-0 dark:text-gray-400">
            <li className="mr-4">
              <Link to="#" className="hover:underline">
                Contact: <span className="hover:text-blue-500">7328800</span>
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:underline">
                Email: <a href="mailto:Freelanci@gmail.com" className="hover:text-blue-500">Freelanci@gmail.com</a>
              </Link>
            </li>
          </ul>
          <hr className="border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-black sm:text-right dark:text-gray-400">
            © 2023 <a href="https://flowbite.com/" className="hover:underline">
              Freelanci
            </a>. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
