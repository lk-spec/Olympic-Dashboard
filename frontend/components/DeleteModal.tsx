import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface DeleteModalProps {
  currentId: number;
  currentCompany: string;
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
}

const DeleteModal: FC<DeleteModalProps> = ({
  currentId,
  setShowDeleteModal,
  currentCompany,
}) => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      const deleteBody = {
        Id: currentId,
      };

      const response = await fetch(`http://127.0.0.1:5000/deleteCompany`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json", // Specify the content type as JSON
          // Add other headers if needed
        },
        body: JSON.stringify(deleteBody), // Convert the data to JSON format
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="z-10 flex justify-center bg-black">
      <div className="w-[400px] h-[300px] fixed bg-white border-black border-[2px] rounded-[8px] mt-[70px] flex flex-col items-center">
        <div className="text-[30px] font-semibold font-inter mt-[20px] text-center">
          Deletion Conformation
        </div>
        <div className="mt-[20px]">Are you sure you want to delete:</div>
        <div className="mt-[20px]">
          <b>{currentCompany}</b>
        </div>
        <div className="mt-[20px]">This action cannot be undone.</div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row gap-[20px]">
            <button
              className="w-[150px] mt-[30px] hover:bg-blue-400 hover:text-white rounded-[10px] h-[50px] text-black border-[3px] border-blue-400 text-[18px]"
              type="submit"
            >
              Confirm
            </button>
            <button
              className="w-[150px] mt-[30px] hover:bg-blue-400 hover:text-white rounded-[10px] h-[50px] text-black border-[3px] border-blue-400 text-[18px]"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteModal;
