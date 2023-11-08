import React, { useEffect, useState } from "react";
import { getUser } from "../../services/api.service";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./profile.scss";
export default function Profile() {
  const [user, setUser] = useState([]);
  // const userId =useSelector((state)=>state.user.value.user)
  const { userId } = useParams();
  // const select = useSelector((state) => state.user.value)
  // console.log(select);
  // const userId =useSelector((state)=>state.user.value.userId)
  // const userId =user.userId

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getUser(userId);
        setUser(userData);
        console.log("this from profil", userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
    fetchUser();
  }, []);

  if (!user) {
    return <div>looading !!!!</div>;
  }

  return (
    <div className="bg-gray-100 bg-gradient-to-r from-sky-500 to-indigo-500">
      <div className="container mx-auto my-0 p-5">
        <div className="md:flex no-wrap md:-mx-2">
          {/* Left Side */}
          <div className="w-full md:w-3/12 md:mx-2">
            {/* Profile Card */}
            <div className="bg-white p-3 border-t-4 border-sky-400">
              <div className="image overflow-hidden">
                <img
                  className="h-auto w-full mx-auto rounded-full"
                  src={user.imgUrl}
                  alt=""
                />
              </div>
              <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                {user.userName}
              </h1>
              <h3 className="text-gray-900 font-lg font-bold  text-semibold leading-6">
                Bio
              </h3>
              <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                {user.description}Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Reprehenderit, eligendi dolorum sequi illum
                qui unde aspernatur non deserunt
              </p>
              <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li className="flex items-center py-3">
                  <span>Status</span>
                  <span className="ml-auto">
                    <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                      Active
                    </span>
                  </span>
                </li>
                <li className="flex items-center py-3">
                  <span>Member since</span>
                  <span className="ml-auto">{user.createdAt}</span>
                </li>
              </ul>
            </div>
            {/* End of profile card */}
            {/* Friends card */}
            <div className="bg-white p-3 hover:shadow">
              <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                <span className="text-green-500">
                  <svg
                    className="h-5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  ></svg>
                </span>
              </div>
            </div>
            {/* End of friends card */}
          </div>
          {/* Right Side */}
          <div className="w-full md:w-9/12 mx-2 h-64">
            {/* Profile tab */}
            {/* About Section */}
            <div className="bg-white p-3 shadow-sm rounded-sm">
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span className="text-green-500">
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {/* Your SVG path here */}
                  </svg>
                </span>
                <span className="tracking-wide">About</span>
              </div>
              <div class="text-gray-700">
                <div class="grid md:grid-cols-2 text-sm">
                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">FullName :</div>
                    <div class="px-4 py-2">{user.userName}</div>
                  </div>
                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Contact :</div>
                    <div class="px-4 py-2">{user.phone}</div>
                  </div>
                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Country :</div>
                    <div class="px-4 py-2">{user.country}</div>
                  </div>
                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Email :</div>
                    <div class="px-4 py-2">
                      <a class="text-blue-800" href="mailto:jane@example.com">
                        {user.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End of about section */}
            <div className="my-4"></div>
            {/* Experience and education */}
            <div className="bg-white p-3 shadow-sm rounded-sm">
              <div class="grid grid-cols-2">
                <div>
                  <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                    <span clas="text-green-500">
                      <svg
                        class="h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </span>
                    <span class="tracking-wide">My Service</span>
                  </div>
                </div>
              </div>
            </div>
            {/* End of profile tab */}
          </div>
        </div>
      </div>
    </div>
  );
}
