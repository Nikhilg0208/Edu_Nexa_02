import React from "react";
import { SiAirplayvideo } from "react-icons/si";
const SubSection = ({ subSection }) => {
  return (
    <table className="w-full bg-gray-50 border-t border-gray-300">
      <tbody>
        {subSection.map((subSec, index) => (
          <tr
            key={subSec._id}
            className={`transition hover:bg-gray-100 ${
              index % 2 === 0 ? "bg-gray-50" : "bg-white"
            }`}
          >
            <td className="px-6 py-3 border-b">
              <div className="flex items-center gap-x-3">
                <SiAirplayvideo className="text-gray-600 cursor-pointer hover:text-gray-900 transition text-xl" />
                <span className="font-medium">{subSec.title}</span>
              </div>
            </td>

            <td className="px-6 py-3 border-b text-gray-700 text-right">
              ⏳ {subSec.timeDuration}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SubSection;
