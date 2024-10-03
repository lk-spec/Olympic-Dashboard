import React, { FC, useEffect, useState } from "react";
import Downarrow from "./icons/Downarrow";
import { TableProps } from "./Table";
import PencilIcon from "./icons/PencilIcon";
import TrashIcon from "./icons/TrashIcon";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

const CompanyTable: FC<TableProps> = ({ data, headers }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentName, setCurrentName] = useState("");
  const [currentSponsor, setCurrentSponsor] = useState("");
  const [currentId, setCurrentId] = useState(0);

  return (
    <div>
      {showEditModal && (
        <EditModal
          currentSponsor={currentSponsor}
          currentCompany={currentName}
          currentId={currentId}
          setShowEditModal={setShowEditModal}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          currentCompany={currentName}
          currentId={currentId}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}
      <table
        suppressHydrationWarning
        className="w-[800px] table-fixed rounded-[10px] overflow-hidden"
      >
        <caption className="bg-white text-center h-[67px]">
          <span className="flex flex-col justify-center h-[67px] text-[30px] text-[#101828]">
            Companies
          </span>
        </caption>

        <tbody className="bg-white w-[615px]">
          <tr className="h-[44px] bg-[#EAECF0] text-[12px] text-[#667085] text-left w-[800px]">
            {headers.map((colName: string, key: number) => (
              <th key={key}>
                <div className="ml-[20px] flex flex-row">
                  <div>{colName}</div>
                  <div className="ml-[3px] mt-[2px]">
                    <Downarrow />
                  </div>
                </div>
              </th>
            ))}
          </tr>

          {data.length != 0 ? (
            data.map((entry: string[], key: number) => (
              <tr
                key={key}
                className="h-[60px] border-gray-300 border-[.5px] hover:bg-gray-300 hover:cursor-pointer"
              >
                {entry.map((val: string, idx: number) => (
                  <td
                    key={idx}
                    className="font-chivo text-[14px] text-[#667085]"
                  >
                    <div className="flex flex-row justify-between">
                      <div className="ml-[20px] font-bold">{val}</div>
                      {idx == entry.length - 1 && (
                        <div className="flex flex-row mr-[20px]">
                          <button
                            className="mr-[15px]"
                            onClick={() => {
                              setCurrentName(entry[0]);
                              setCurrentSponsor(entry[2]);
                              setCurrentId(Number(entry[3]));
                              setShowEditModal(true);
                            }}
                          >
                            <PencilIcon />
                          </button>
                          <button
                            onClick={() => {
                              setCurrentName(entry[0]);
                              setCurrentSponsor(entry[2]);
                              setCurrentId(Number(entry[3]));
                              setShowDeleteModal(true);
                            }}
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr className="h-[50px]">
              <td className="w-[800px] text-center" colSpan={headers.length}>
                No data to display
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyTable;
