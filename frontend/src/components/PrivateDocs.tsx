import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { auth } from "../wrapper/authWrapper";
type Asset = {
  _id: string;
  originalName: string;
  mimeType: string;
  previewUrl: string;
  size: number;
  isPublic: boolean,
};

const PrivateDocs = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const { userDetails } = auth();
  const BACKEND = import.meta.env.VITE_BACKEND;
  useEffect(() => {
    const getPrivateDocs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("No token found");
          return;
        }
        const response = await axios.post(`${BACKEND}/api/file/user-private`,{}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAssets(response.data);
        console.log("RES for publicdocs: ", response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getPrivateDocs();
  }, []);

  const renderPreview = (asset: Asset) => {
    if (asset.mimeType.startsWith("image/")) {
      return (
        <img
          src={`${BACKEND}/api/file/${asset._id}`}
          alt={asset.originalName}
          className="w-50 h-auto rounded"
        />
      );
    }
    if (asset.mimeType === "application/pdf") {
      return (
        <iframe
          src={`${BACKEND}/api/file/${asset._id}`}
          title={asset.originalName}
          className="w-50 h-auto rounded border border-gray-300"
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
    return <p className="text-gray-500">No preview available</p>;
  };

  if (loading)
    return (
      <p className="text-center py-6 text-gray-600">
        Loading public documents...
      </p>
    );

  return (<>
  <div className="text-2xl font-bold">Your Uploads</div>
    <div className="flex flex-row flex-wrap wrap-anywhere gap-6 p-6">
      {assets.map((asset: Asset) => (
        <NavLink
          to={`/${asset._id}`}
          key={asset._id}
          className="relative rounded-lg shadow-sm p-4 flex flex-col justify-between hover:shadow-2xl border border-zinc-50/1 hover:border place-self-center"
          title={asset.originalName}
        >
            <span className="absolute text-[0.7rem] bg-zinc-400/50 rounded-2xl p-0.5">{asset.isPublic?"public":"private"}</span>
          <div className="mb-4 flex justify-center">{renderPreview(asset)}</div>
          <h3 className="text-sm font-semibold mb-1 truncate">
            {`${asset.originalName.slice(0, 20)}${
              asset.originalName.length > 20 ? "..." : ""
            }`}
          </h3>
          <p className="text-[0.7rem] text-left text-gray-500">
            Size: {(asset.size / 1024).toFixed(2)} KB
          </p>
        </NavLink>
      ))}
    </div>
    </>
  );
};

export default PrivateDocs;
