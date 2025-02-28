import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegArrowAltCircleUp, FaTrash } from "react-icons/fa";
import Portal from "../pages/Portal.jsx";

const CreateCategory = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    imageOption: "url", // "url" or "upload"
    imageUrl: "",
    imageFile: null,
    status: "active", // "active" or "inactive"
  });
  const [previewImage, setPreviewImage] = useState("");
  const [draggingImage, setDraggingImage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setData((prevState) => ({
      ...prevState,
      imageFile: file,
    }));
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleRemoveFile = () => {
    setData((prevState) => ({
      ...prevState,
      imageFile: null,
    }));
    setPreviewImage("");
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggingImage(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggingImage(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggingImage(false);

    const file = e.dataTransfer.files[0];
    setData((prevState) => ({
      ...prevState,
      imageFile: file,
    }));
    setPreviewImage(URL.createObjectURL(file));
  };

  const navigation = useNavigate();

  const validateFields = () => {
    const validationArray = [];

    if (data?.name === "") {
      validationArray.push("Name");
    }
    if (data.imageOption === "url" && data?.imageUrl === "") {
      validationArray.push("Image URL");
    }
    if (data.imageOption === "upload" && !data?.imageFile) {
      validationArray.push("Image File");
    }

    if (validationArray.length !== 0)
      return { status: false, data: validationArray };

    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);

    const validationStatus = validateFields();
    if (validationStatus !== true && !validationStatus.status) {
      const missing = validationStatus.data.join(", ");
      toast.error(`Missing fields: ${missing}`);
      setLoading(false);
      return false;
    }

    try {
      let imageUrl = data.imageUrl;
      if (data.imageOption === "upload") {
        const formData = new FormData();
        formData.append("file", data.imageFile);
        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const uploadData = await uploadResponse.json();
        imageUrl = uploadData.url;
      }

      const newData = { ...data, imageUrl };

      const res = await fetch("/api/create-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });
      const resData = await res.json();

      if (resData?.success) {
        toast.success(`${resData?.message}`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigation("/admin/manage-content");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error?.message);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Portal>
        <div className="relative w-full">
          <div className="h-max w-[95%] mx-auto bg-gray-100 rounded-md p-3">
            <h2 className="py-2 text-xl font-bold">Create New Category</h2>
            <form
              action="submit"
              id="content-info"
              className="w-full bg-white rounded-md p-4 shadow-md"
            >
              <h2 className="font-bold text-lg p-1">Category Info</h2>

              <div className="flex gap-5 w-full">
                <div className="p-2 w-full">
                  <label htmlFor="name" className="text-xs font-bold">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full block p-2 rounded-md border-2 border-gray-200"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex gap-5 w-full">
                <div className="p-2 w-full">
                  <label htmlFor="imageOption" className="text-xs font-bold">
                    Image Option <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full block p-2 rounded-md border-2 border-gray-200"
                    name="imageOption"
                    value={data.imageOption}
                    onChange={handleChange}
                  >
                    <option value="url">Image URL</option>
                    <option value="upload">Upload Image</option>
                  </select>
                </div>
              </div>

              {data.imageOption === "url" && (
                <div className="flex gap-5 w-full">
                  <div className="p-2 w-full">
                    <label htmlFor="imageUrl" className="text-xs font-bold">
                      Image URL <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full block p-2 rounded-md border-2 border-gray-200"
                      name="imageUrl"
                      value={data.imageUrl}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}

              {data.imageOption === "upload" && (
                <div className="p-2">
                  <h3 className="my-1 ml-1 text-sm font-bold">Upload Image</h3>
                  {previewImage ? (
                    <div className="bg-gray-200 rounded-md p-3 flex gap-3 items-center">
                      <img
                        src={previewImage}
                        alt="preview"
                        className="w-[100px] h-[100px] rounded-md"
                      />
                      <FaTrash
                        onClick={handleRemoveFile}
                        className="text-white-600 text-2xl cursor-pointer hover:text-red-500"
                      />
                    </div>
                  ) : (
                    <div
                      id="drag-and-drop"
                      className="w-full bg-white rounded-md p-2 flex flex-col gap-2"
                    >
                      <div
                        className={`w-full flex justify-center transition-all items-center border-2 border-dashed border-gray-400 rounded-md ${
                          draggingImage ? "bg-blue-400" : "bg-blue-200"
                        }`}
                        onDragEnter={handleDragEnter}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                      >
                        <div className="flex flex-col justify-center items-center gap-2 p-2">
                          <h4 className="text-sm font-semibold text-gray-600">
                            Drag & Drop Image here
                          </h4>
                          <p className="text-gray-400 text-center">OR</p>
                          <input
                            type="file"
                            name="upload"
                            id="upload-img"
                            onChange={handleFileChange}
                            className="text-sm text-white bg-blue-600 hover:bg-blue-800 rounded-md p-1 w-3/4"
                          />
                          <p className="text-xs text-orange-500 text-center">
                            Maximum Size: 1MB
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-5 w-full">
                <div className="p-2 w-full">
                  <label htmlFor="status" className="text-xs font-bold">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full block p-2 rounded-md border-2 border-gray-200"
                    name="status"
                    value={data.status}
                    onChange={handleChange}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </form>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`absolute text-sm font-semibold right-12 bottom-[60px] py-2 px-4 text-white uppercase transition active:scale-95 rounded-md shadow-lg ${
              loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-800"
            }`}
          >
            Create Category
          </button>
          <FaRegArrowAltCircleUp
            className="absolute h-6 w-6 bottom-3 right-2 text-blue-600 hover:text-blue-800 transition cursor-pointer"
            onClick={scrollToTop}
          />
        </div>
      </Portal>
    </>
  );
};

export default CreateCategory;
