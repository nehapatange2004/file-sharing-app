import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const UploadFile = () => {
  
  const [file, setFile] = useState<File | null>(null);
  const [isPublic, setIsPublic] = useState(false);
  const BACKEND = import.meta.env.VITE_BACKEND;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {

    try {
      console.log("upload clicked for type: ",isPublic );
  
      if(!localStorage.getItem("token")) {
        toast("Sign-in to upload");
        return;
      }
      const token = localStorage.getItem("token");
      if(!file) {
        console.log("no file selected");
        toast.error("Please select a file");
        return;
      }
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(`${BACKEND}/api/file/upload/${isPublic}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFile(null);
        
      console.log("RESPOSE after upload:", response.data);
    } catch (err) {
      console.log("err", err);
    }finally{
      toast.success("Upload successfull! you can go back.")
    }
  };
const handleCheckBoxChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
  e.target.checked?setIsPublic(true):setIsPublic(false);

}
  return (
    <>
      {/* <img src={`${BACKEND}/api/file/6896353bde84801cb7531986`} height={"200px"} alt="img from backend" /> */}
      <div className="flex items-center justify-center pt-20 bg-base-900">
  <div className="border border-base-700 rounded-md p-6 max-w-sm shadow-lg bg-base-800">
    <input
      type="file"
      onChange={handleFileChange}
      className="block w-full text-sm cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-base-700 file:text-primary hover:file:bg-base-600"
    />
    <button
      onClick={handleUpload}
      disabled={!file}
      className={`mt-4 w-full border rounded-md py-2 font-semibold transition-all duration-200  ${
        file
          ? 'btn btn-primary cursor-pointer hover:scale-95'
          : 'btn btn-secondary btn-disabled cursor-not-allowed '
      }`}
    >
      Upload
    </button>
    <label className="flex items-center gap-2 cursor-pointer mt-6">
  <input type="checkbox" className="w-4 h-4 rounded border border-zinc-400 focus:ring-0" onChange={handleCheckBoxChange} />
  <span className="text-sm ">Make public</span>
</label>

  </div>
</div>

    </>
  );
}

export default UploadFile