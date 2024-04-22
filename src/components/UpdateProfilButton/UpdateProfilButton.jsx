import { useState } from "react";
import { useNavigate } from "react-router";
import Api from "../../service/myApi";

function UpdateProfilButton({
  reloadInfos,
  updateForm,
  setReloadInfos,
  userDetail,
  setUpdateForm,
}) {
  const [formState, setFormState] = useState({
    email: userDetail.email,
    // password: "",
    name: userDetail.name,
    pseudo: userDetail.pseudo,
    file: userDetail.avatar,
  });
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormState((prevState) => ({
      ...prevState,
      file: e.target.files[0],
    }));
  };
  const handleCancel = () => {
    // Reset form data and close the form
    setUpdateForm(!updateForm);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("email", formState.email);
      // formData.append("password", formState.password);
      formData.append("name", formState.name);
      formData.append("pseudo", formState.pseudo);
      formData.append("avatar", formState.file);

      const response = await Api.put("/users", formData);

      if (response.status === 201) {
        nav("/profil");
      }
      setUpdateForm(!updateForm);
      setReloadInfos(!reloadInfos);
    } catch (error) {
      console.error("Signup error:", error);
      setError(error.response?.data?.message || "An error occurred.");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  const { email, password, name, pseudo } = formState;
  return (
    <>
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col justify-center max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Update your account
            </h2>
            {error && (
              <p className="mt-2 text-center text-sm text-red-600">{error}</p>
            )}
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={handleChange}
                />
              </div>
              {/* <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={handleChange}
                />
              </div> */}
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Name"
                  value={name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="pseudo" className="sr-only">
                  Pseudo
                </label>
                <input
                  id="pseudo"
                  name="pseudo"
                  type="text"
                  autoComplete="username"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Pseudo"
                  value={pseudo}
                  onChange={handleChange}
                />
              </div>
              <div className="rounded-md border border-gray-300">
                <label htmlFor="avatar" className="sr-only">
                  Avatar
                </label>
                <input
                  id="avatar"
                  name="avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="appearance-none rounded-md py-2 px-3 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Update your Infos
              </button>
            </div>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateProfilButton;
