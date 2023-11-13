import React, { useEffect, useState } from "react";
import { getUser } from "../../services/api.service";
import { useParams } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getUser(userId);
        setUser(userData);
        console.log("User Data:", userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
    fetchUser();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-br from-blue-200 to-indigo-400 min-h-screen">
      <div className="container mx-auto my-5 p-5">
        <div className="md:flex no-wrap md:-mx-2">
          <div className="w-full md:w-3/12 md:mx-2">
            <div className="bg-white p-3 border-t-4 border-blue-400">
              <div className="image overflow-hidden">
                <img
                  className="h-auto w-full mx-auto rounded-full"
                  src={user.imgUrl}
                  alt="User"
                />
              </div>
              <h1 className="text-gray-900 font-bold text-xl leading-8 my-1 text-center">
                {user.userName}
              </h1>

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
                  <span className="ml-auto">{user.createdAt.substring(0,10)}</span>
                </li>
              </ul>

              <div className="bg-white p-3 hover:shadow mt-4">
              <h3 className="text-gray-900 font-semibold text-lg leading-6 pb-px	">
                    Bio 
                  </h3>
                <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                  <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                    {user.description}
                    I am an Author, and Engineer and an MBA with 15 years of international exposure and experience working with Fortune 500 companies. I am an expert in Digital Mar...
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-9/12 mx-2">
            <div className="bg-white p-3 shadow rounded">
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span className="tracking-wide">
                  <h3 className="text-gray-900 font-semibold text-lg leading-6 text-center">
                    About
                  </h3>
                </span>
              </div>
              <div className="text-gray-700">
                <div className="grid md:grid-cols-2 text-sm">
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Full Name :</div>
                    <div className="px-4 py-2">{user.userName}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Contact :</div>
                    <div className="px-4 py-2">{user.phone}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Country :</div>
                    <div className="px-4 py-2">{user.country}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Email :</div>
                    <div className="px-4 py-2">
                      <a className="text-blue-800" href={`mailto:${user.email}`}>
                        {user.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-4"></div>

            <div className="bg-white p-3 shadow rounded">
              <div className="grid grid-cols-2">
                <div>
                  <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3 justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg"></svg>
                    <span className="tracking-wide">My Service</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
