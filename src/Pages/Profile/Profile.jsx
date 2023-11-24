import React, { useEffect, useState } from "react";
import { getUser } from "../../services/api.service";
import { useParams } from "react-router-dom";
import axios from "axios";
import ServiceCard from "../../components/ServiceCard/ServiceCard";
import { updateProfile } from "../../services/api.service";
import EditIcon from "@mui/icons-material/Edit";
import Navbar from "../../components/Navbar/Navbar";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [services, setMyService] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const { userId } = useParams();

  const [updatedInfo, setUpdatedInfo] = useState({
    userName: "",
    email: "",
    country: "",
    phone: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const handleEdit = (field) => {
    setIsEditing(field);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("userName", updatedInfo.userName);
    formData.append("email", updatedInfo.email);
    formData.append("country", updatedInfo.country);
    formData.append("phone", updatedInfo.phone);
    formData.append("description", updatedInfo.description);

    try {
      const result = await updateProfile(userId, formData);
      console.log("Profile updated:", result);
      window.location.reload()
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

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

    axios
      .get(`http://localhost:3000/service/getServicesForSpecificUser/${userId}`)
      .then((response) => {
        setMyService(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    fetchUser();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }
  console.log(services);

  return (
    <div>
      <Navbar/>
      {/* <!-- End of Navbar --> */}
      <div class="container mx-auto my-5 p-5">
        <div class="md:flex no-wrap md:-mx-2 ">
          {/* <!-- Left Side --> */}
          <div class="w-full md:w-3/12 md:mx-2">
            {/* <!-- Profile Card --> */}
            <div class="bg-white p-3 border-t-4 border-blue-400">
              <div
                class="image overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {isEditingImage ? (
                  <input type="file" onChange={handleImageChange} />
                ) : (
                  <img
                    className="h-auto w-full mx-auto rounded-full"
                    src={user.imgUrl}
                    alt=""
                    onClick={() => setIsEditingImage(true)}
                  />
                )}
                {isHovered && !isEditingImage && (
                  <span onClick={() => setIsEditingImage(true)} style={{ paddingLeft: '5px' }}>
                   <EditIcon style={{ fontSize: 16 }} /> <span>Edit your Photo </span>
                  </span>
                )}
                {isEditingImage && (
                  <button
                    onClick={handleSubmit}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                  >
                    Submit Image
                  </button>
                )}
              </div>
              <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">
                {isEditing === "userName" ? (
                  <input
                    type="text"
                    name="userName"
                    value={updatedInfo.userName}
                    onChange={handleInputChange}
                  />
                ) : (
                  <>
                    {user.userName}
                    <span onClick={() => handleEdit("userName")} style={{ paddingLeft: '5px' }}>
                    <EditIcon style={{ fontSize: 16 }} />
                    </span>
                  </>
                )}
              </h1>
              {/* <h3 class="text-gray-600 font-lg text-semibold leading-6">
                Owner at Her Company Inc.
              </h3>
              <p class="text-sm text-gray-500 hover:text-gray-600 leading-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur
                non deserunt
              </p> */}
              <ul class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                {/* <li class="flex items-center py-3">
                  <span>Status</span>
                  <span class="ml-auto">
                    <span class="bg-green-500 py-1 px-2 rounded text-white text-sm">
                      Active
                    </span>
                  </span>
                </li> */}
                <li class="flex items-center py-3">
                  <span>Member since</span>
                  <span class="ml-auto">{user.createdAt.substring(0, 10)}</span>
                </li>
              </ul>
            </div>
            {/* <!-- End of profile card --> */}
            <div class="my-4"></div>
            {/* <!-- Friends card --> */}
            <div class="bg-white p-3 hover:shadow">
              <div class="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                <span class="text-blue-500">
                  <svg
                    class="h-5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </span>
                <span>Bio</span>
              </div>
              <div class="grid grid-cols-0">
                <div class="text-center my-2">
                  <div class="px-4 py-2 font-semibold">
                    Description{" "}
                    <span onClick={() => handleEdit("description")} style={{ paddingLeft: '5px' }}>
                    <EditIcon style={{ fontSize: 16 }} />
                    </span>
                  </div>
                  <div class="px-4 py-2">
                    {isEditing === "description" ? (
                      <textarea
                        name="description"
                        value={updatedInfo.description}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <>{user.description} nice</>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- End of friends card --> */}
          </div>
          {/* <!-- Right Side --> */}
          <div class="w-full md:w-9/12 mx-2 h-64">
            {/* <!-- Profile tab -->
              <!-- About Section --> */}
            <div class="bg-white p-3 shadow-sm rounded-sm">
              <div class="flex items-center space-x-2 font-semibold text-blue-500 leading-8">
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <span class="tracking-wide">About</span>
              </div>
              <div class="text-gray-700">
                <div class="grid md:grid-cols-2 text-sm">
                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Username</div>
                    <div class="px-4 py-2">
                      {isEditing === "userName" ? (
                        <input
                          type="text"
                          name="userName"
                          value={updatedInfo.userName}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <>
                          {user.userName}
                          <span onClick={() => handleEdit("userName")}style={{ paddingLeft: '5px' }}>
                          <EditIcon style={{ fontSize: 16 }}  />
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Contact No.</div>
                    <div class="px-4 py-2">
                      {isEditing === "phone" ? (
                        <input
                          type="text"
                          name="phone"
                          value={updatedInfo.phone}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <>
                          {user.phone}
                          <span onClick={() => handleEdit("phone")} style={{ paddingLeft: '5px' }}>
                          <EditIcon style={{ fontSize: 16 }} />
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Country</div>
                    <div class="px-4 py-2">
                      {isEditing === "country" ? (
                        <input
                          type="text"
                          name="country"
                          value={updatedInfo.country}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <>
                          {user.country}
                          <span onClick={() => handleEdit("country")} style={{ paddingLeft: '5px' }}>
                          <EditIcon style={{ fontSize: 16 }} />
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Role</div>
                    <div class="px-4 py-2">
                      {" "}
                      {user.isSeller === true
                        ? "client"
                        : user.isSeller === false
                        ? "freelancer"
                        : null}
                    </div>
                  </div>
                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Email</div>
                    <div class="px-4 py-2">
                      {isEditing === "email" ? (
                        <input
                          type="text"
                          name="email"
                          value={updatedInfo.email}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <>
                          {user.email}
                          <span onClick={() => handleEdit("email")} style={{ paddingLeft: '5px' }}>
                          <EditIcon style={{ fontSize: 16 }} />
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <button class="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Submit Changes
                </button>{" "}
              </button>
            </div>
            {/* <!-- End of about section --> */}

            <div class="my-4"></div>

            {/* <!-- Experience and education --> */}
            <div class="bg-white p-3 shadow-sm rounded-sm">
              <div class="flex">
                <div>
                  <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                    <span class="text-blue-500">
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
                  {/* <!-- complete MyServices --> */}

                  <div className="services">
                    <div className="container mx-auto">
                      <h1 className="md:text-4xl">Available services</h1>

                      <div class="flex flex-wrap justify-start">
                        {services.map((service) => (
                          <div
                            key={service.id}
                            class="w-full sm:w-1/3 md:w-1/3 lg:w-1/3 p-2"
                          >
                            {" "}
                            {/* Adjust the padding value */}
                            <ServiceCard item={service} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- End of profile tab --> */}
          </div>
        </div>
      </div>
    </div>
  );
}
