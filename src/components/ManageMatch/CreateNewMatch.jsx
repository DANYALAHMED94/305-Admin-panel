import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegArrowAltCircleUp, FaTrash } from "react-icons/fa";
import Portal from "../pages/Portal.jsx";

const CreateNewMatch = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    imageOption: "url", // "url" or "upload"
    imageUrl: "",
    imageFile: null,
    videoOption: "url", // "url" or "upload"
    videoUrl: "",
    videoFile: null,
    thumbnailUrl: "",
  });
  const [previewImage, setPreviewImage] = useState("");
  const [previewVideo, setPreviewVideo] = useState("");
  const [draggingImage, setDraggingImage] = useState(false);
  const [draggingVideo, setDraggingVideo] = useState(false);
  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const [draggingThumbnail, setDraggingThumbnail] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === "image") {
      setData((prevState) => ({
        ...prevState,
        imageFile: file,
      }));
      setPreviewImage(URL.createObjectURL(file));
    } else if (type === "video") {
      setData((prevState) => ({
        ...prevState,
        videoFile: file,
      }));
      setPreviewVideo(URL.createObjectURL(file));
    } else if (type === "thumbnail") {
      setData((prevState) => ({
        ...prevState,
        thumbnailFile: file,
      }));
      setPreviewThumbnail(URL.createObjectURL(file));
    }
  };

  const handleRemoveFile = (type) => {
    if (type === "image") {
      setData((prevState) => ({
        ...prevState,
        imageFile: null,
      }));
      setPreviewImage("");
    } else if (type === "video") {
      setData((prevState) => ({
        ...prevState,
        videoFile: null,
      }));
      setPreviewVideo("");
    } else if (type === "thumbnail") {
      setData((prevState) => ({
        ...prevState,
        thumbnailFile: null,
      }));
      setPreviewThumbnail("");
    }
  };

  const handleDragEnter = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    if (type === "image") {
      setDraggingImage(true);
    } else if (type === "video") {
      setDraggingVideo(true);
    } else if (type === "thumbnail") {
      setDraggingThumbnail(true);
    }
  };

  const handleDragLeave = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    if (type === "image") {
      setDraggingImage(false);
    } else if (type === "video") {
      setDraggingVideo(false);
    } else if (type === "thumbnail") {
      setDraggingThumbnail(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    if (type === "image") {
      setDraggingImage(false);
    } else if (type === "video") {
      setDraggingVideo(false);
    } else if (type === "thumbnail") {
      setDraggingThumbnail(false);
    }

    const file = e.dataTransfer.files[0];
    if (type === "image") {
      setData((prevState) => ({
        ...prevState,
        imageFile: file,
      }));
      setPreviewImage(URL.createObjectURL(file));
    } else if (type === "video") {
      setData((prevState) => ({
        ...prevState,
        videoFile: file,
      }));
      setPreviewVideo(URL.createObjectURL(file));
    } else if (type === "thumbnail") {
      setData((prevState) => ({
        ...prevState,
        thumbnailFile: file,
      }));
      setPreviewThumbnail(URL.createObjectURL(file));
    }
  };

  const navigation = useNavigate();

  const validateFields = () => {
    const validationArray = [];

    if (data?.title === "") {
      validationArray.push("Title");
    }
    if (data?.description === "") {
      validationArray.push("Description");
    }
    if (data.imageOption === "url" && data?.imageUrl === "") {
      validationArray.push("Image URL");
    }
    if (data.imageOption === "upload" && !data?.imageFile) {
      validationArray.push("Image File");
    }
    if (data.videoOption === "url" && data?.videoUrl === "") {
      validationArray.push("Video URL");
    }
    if (data.videoOption === "upload" && !data?.videoFile) {
      validationArray.push("Video File");
    }
    if (data?.thumbnailUrl === "") {
      validationArray.push("Thumbnail URL");
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

      let videoUrl = data.videoUrl;
      if (data.videoOption === "upload") {
        const formData = new FormData();
        formData.append("file", data.videoFile);
        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const uploadData = await uploadResponse.json();
        videoUrl = uploadData.url;
      }

      let thumbnailUrl = data.thumbnailUrl;
      if (data.thumbnailOption === "upload") {
        const formData = new FormData();
        formData.append("file", data.thumbnailFile);
        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const uploadData = await uploadResponse.json();
        thumbnailUrl = uploadData.url;
      }

      const newData = { ...data, imageUrl, videoUrl, thumbnailUrl };

      const res = await fetch("/api/create-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });
      const resData = await res.json();

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
            <h2 className="py-2 text-xl font-bold">Create New Banner</h2>
            <form
              action="submit"
              id="content-info"
              className="w-full bg-white rounded-md p-4 shadow-md"
            >
              <h2 className="font-bold text-lg p-1">Create new Match</h2>

              <div className="flex gap-5 w-full">
                <div className="p-2 w-1/2">
                  <label htmlFor="title" className="text-xs font-bold">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full block p-2 rounded-md border-2 border-gray-200"
                    name="title"
                    value={data.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="p-2 w-1/2">
                  <label htmlFor="description" className="text-xs font-bold">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    className="w-full block p-2 rounded-md border-2 border-gray-200 h-11 resize-none"
                    name="description"
                    value={data.description}
                    onChange={handleChange}
                  ></textarea>
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
                        onClick={() => handleRemoveFile("image")}
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
                        onDragEnter={(e) => handleDragEnter(e, "image")}
                        onDragOver={handleDragOver}
                        onDragLeave={(e) => handleDragLeave(e, "image")}
                        onDrop={(e) => handleDrop(e, "image")}
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
                            onChange={(e) => handleFileChange(e, "image")}
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
                  <label htmlFor="videoOption" className="text-xs font-bold">
                    Video Option <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full block p-2 rounded-md border-2 border-gray-200"
                    name="videoOption"
                    value={data.videoOption}
                    onChange={handleChange}
                  >
                    <option value="url">Video URL</option>
                    <option value="upload">Upload Video</option>
                  </select>
                </div>
              </div>

              {data.videoOption === "url" && (
                <div className="flex gap-5 w-full">
                  <div className="p-2 w-full">
                    <label htmlFor="videoUrl" className="text-xs font-bold">
                      Video URL <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full block p-2 rounded-md border-2 border-gray-200"
                      name="videoUrl"
                      value={data.videoUrl}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}

              {data.videoOption === "upload" && (
                <div className="p-2">
                  <h3 className="my-1 ml-1 text-sm font-bold">Upload Video</h3>
                  {previewVideo ? (
                    <div className="bg-gray-200 rounded-md p-3 flex gap-3 items-center">
                      <video
                        src={previewVideo}
                        controls
                        className="w-[100px] h-[100px] rounded-md"
                      />
                      <FaTrash
                        onClick={() => handleRemoveFile("video")}
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
                          draggingVideo ? "bg-blue-400" : "bg-blue-200"
                        }`}
                        onDragEnter={(e) => handleDragEnter(e, "video")}
                        onDragOver={handleDragOver}
                        onDragLeave={(e) => handleDragLeave(e, "video")}
                        onDrop={(e) => handleDrop(e, "video")}
                      >
                        <div className="flex flex-col justify-center items-center gap-2 p-2">
                          <h4 className="text-sm font-semibold text-gray-600">
                            Drag & Drop Video here
                          </h4>
                          <p className="text-gray-400 text-center">OR</p>
                          <input
                            type="file"
                            name="upload"
                            id="upload-video"
                            onChange={(e) => handleFileChange(e, "video")}
                            className="text-sm text-white bg-blue-600 hover:bg-blue-800 rounded-md p-1 w-3/4"
                          />
                          <p className="text-xs text-orange-500 text-center">
                            Maximum Size: 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* <div className="flex gap-5 w-full">
                <div className="p-2 w-full">
                  <label htmlFor="thumbnailUrl" className="text-xs font-bold">
                    Thumbnail URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full block p-2 rounded-md border-2 border-gray-200"
                    name="thumbnailUrl"
                    value={data.thumbnailUrl}
                    onChange={handleChange}
                  />
                </div>
              </div> */}

              <div className="flex gap-5 w-full">
                <div className="p-2 w-full">
                  <label
                    htmlFor="thumbnailOption"
                    className="text-xs font-bold"
                  >
                    Thumbnail Option <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full block p-2 rounded-md border-2 border-gray-200"
                    name="thumbnailOption"
                    value={data.thumbnailOption}
                    onChange={handleChange}
                  >
                    <option value="url">Thumbnail URL</option>
                    <option value="upload">Upload Thumbnail</option>
                  </select>
                </div>
              </div>

              {data.thumbnailOption === "url" && (
                <div className="flex gap-5 w-full">
                  <div className="p-2 w-full">
                    <label htmlFor="thumbnailUrl" className="text-xs font-bold">
                      Thumbnail URL <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full block p-2 rounded-md border-2 border-gray-200"
                      name="thumbnailUrl"
                      value={data.thumbnailUrl}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}

              {data.thumbnailOption === "upload" && (
                <div className="p-2">
                  <h3 className="my-1 ml-1 text-sm font-bold">
                    Upload Thumbnail
                  </h3>
                  {previewThumbnail ? (
                    <div className="bg-gray-200 rounded-md p-3 flex gap-3 items-center">
                      <img
                        src={previewThumbnail}
                        alt="preview"
                        className="w-[100px] h-[100px] rounded-md"
                      />
                      <FaTrash
                        onClick={() => handleRemoveFile("thumbnail")}
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
                          draggingThumbnail ? "bg-blue-400" : "bg-blue-200"
                        }`}
                        onDragEnter={(e) => handleDragEnter(e, "thumbnail")}
                        onDragOver={handleDragOver}
                        onDragLeave={(e) => handleDragLeave(e, "thumbnail")}
                        onDrop={(e) => handleDrop(e, "thumbnail")}
                      >
                        <div className="flex flex-col justify-center items-center gap-2 p-2">
                          <h4 className="text-sm font-semibold text-gray-600">
                            Drag & Drop Thumbnail here
                          </h4>
                          <p className="text-gray-400 text-center">OR</p>
                          <input
                            type="file"
                            name="upload"
                            id="upload-thumbnail"
                            onChange={(e) => handleFileChange(e, "thumbnail")}
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
            </form>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`absolute text-sm font-semibold right-12 bottom-[60px] py-2 px-4 text-white uppercase transition active:scale-95 rounded-md shadow-lg ${
              loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-800"
            }`}
          >
            Create Banner
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

export default CreateNewMatch;
