import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import SubSection from "./SubSection";

const SectionTable = ({ colSpan, courseSection }) => {
  const [expandedSectionRows, setExpandedSectionRows] = useState({});

  const toggleSectionRow = (sectionId) => {
    setExpandedSectionRows((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  return (
    <table className="w-full bg-gray-100 border-t border-gray-300">
      <tbody>
        {courseSection.map((section, index) => (
          <React.Fragment key={section._id}>
            <tr
              className={`transition hover:bg-gray-200 ${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              }`}
            >
              <td className="px-6 py-3 border-b">
                <div className="flex items-center gap-x-3">
                  {expandedSectionRows[section._id] ? (
                    <FaAngleUp
                      onClick={() => toggleSectionRow(section._id)}
                      className="text-gray-600 cursor-pointer hover:text-gray-900 transition"
                    />
                  ) : (
                    <FaAngleDown
                      onClick={() => toggleSectionRow(section._id)}
                      className="text-gray-600 cursor-pointer hover:text-gray-900 transition"
                    />
                  )}
                  <span className="font-medium">{section.sectionName}</span>
                </div>
              </td>
            </tr>
            {expandedSectionRows[section._id] && (
              <tr colSpan={colSpan} className="bg-gray-100">
                <td className="bg-gray-100">
                  <SubSection subSection={section?.subSection} />
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default SectionTable;
