import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useParams } from "react-router-dom";

const RenderDocWithParams = () => {
  type Asset = {
    id: string;
    originalName: string;
    mimeType: string;
    previewUrl: string;
    size: number;
  };

  const BACKEND = import.meta.env.VITE_BACKEND;
  const param = useParams();
  const location = useLocation();
  const [asset, setAsset] = useState<Asset | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getMetaData = async () => {
      try {
        const response = await axios.get(
          `${BACKEND}/api/file/metadata/${param.id}`
        );
        setAsset(response.data);
        console.log("MetaData recived for: ", param.id, "\n", response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    setLoading(true);
    getMetaData();
  }, []);

  const renderPreview = (asset: Asset) => {
    if (asset.mimeType.startsWith("image/")) {
      return (
        <>
          
          <img
            src={`${BACKEND}/api/file/${asset.id}`}
            alt={asset.originalName}
            className="w-[80vw] h-auto rounded-2xl border"
          />
        </>
      );
    }
    if (asset.mimeType === "application/pdf") {
      return (
        <iframe
          src={`${BACKEND}/api/file/${asset.id}`}
          title={asset.originalName}
          className="h-[calc(100vh-80px)] w-full content-stretch rounded border border-gray-300"
        />
      );
    }
    if (asset.mimeType.startsWith("video/")) {
      return (
        <video className="w-50 h-auto rounded" controls>
          <source src={asset.previewUrl} type={asset.mimeType} />
          Your browser does not support the video tag.
        </video>
      );
    }
    return;
  };



  // const handleCopyLink = ()=>{
  //   const 
  // }
  return loading ? (
    <p>Loading</p>
  ) : asset ? (
    <div className="w-full flex flex-col flex-wrap wrap-anywhere justify-center items-center">
      {/* Buttons */}
          <div className="flex gap-4 mb-2 items-center justify-end w-[80%]">
            {/* downlaod button */}
            <button
              title="download"
              className="px-5 py-2 rounded-md shadow transition border border-transparent hover:border-zinc-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m-6 3.75 3 3m0 0 3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
                />
              </svg>
            </button>
        {/* //copy link button */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `${window.location.href}`
                );
                toast.success("link copied!")
              }}
              title="copy link"
              className=" px-5 py-2 rounded-md shadow transition border border-transparent hover:border-zinc-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                />
              </svg>
            </button>
          </div>
      {renderPreview(asset)}
    </div>
  ) : (
    <p className="text-gray-500">No preview available</p>
  );
};

export default RenderDocWithParams;
