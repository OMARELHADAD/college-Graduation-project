import axios from "axios";

const uploadToCloudinary = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "fiverr"); // تأكد إن preset موجود ومضبط unsigned
  data.append("folder", "fiverr"); // حط الفولدر اللي انت عايزه

  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dibejdgnx/image/upload",
      data
    );
    const { secure_url } = res.data;
    console.log("File uploaded successfully:", secure_url);
    return secure_url;
  } catch (err) {
    console.error("Upload failed:", err);
    throw err;
  }
};

export default uploadToCloudinary;
