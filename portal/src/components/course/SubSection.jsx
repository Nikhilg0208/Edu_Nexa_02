import React, { useState } from "react";
import { SiAirplayvideo } from "react-icons/si";
import ReactPlayer from "react-player";
import { IoMdCloseCircle } from "react-icons/io";
const SubSection = ({ subSection }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <div>
      {selectedVideo && (
        <div className="absolute inset-0 flex justify-center items-center backdrop-blur z-50">
          <div className="relative bg-white p-4 rounded-lg shadow-lg">
            <IoMdCloseCircle
              onClick={() => setSelectedVideo(null)}
              className="size-6 absolute top-1 right-0 rounded-xl hover:bg-red-600"
            />
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <ReactPlayer
                url={selectedVideo}
                controls
                width="800px"
                height="450px"
              />
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <table className="w-full bg-gray-100 border-t border-gray-300">
        <tbody>
          {subSection.map((subSec, index) => (
            <tr
              key={subSec._id}
              onClick={() => setSelectedVideo(subSec.videoUrl)}
              className={`cursor-pointer transition hover:bg-gray-200 ${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              }`}
            >
              <td className="px-6 py-3 border-b">
                <div className="flex items-center gap-x-3">
                  <SiAirplayvideo className="text-gray-600 cursor-pointer hover:text-gray-900 transition text-xl" />
                  <span className="font-medium text-blue-600 underline">
                    {subSec.title}
                  </span>
                </div>
              </td>
              <td className="px-6 py-3 border-b text-gray-700 text-right">
                ⏳ {subSec.timeDuration}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubSection;
