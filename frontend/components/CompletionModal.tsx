import React, { Dispatch, FC, SetStateAction } from "react";

interface CompletionModelProps {
  text: string;
  exitFunction: Dispatch<SetStateAction<boolean>>;
}

const CompletionModal: FC<CompletionModelProps> = ({ text, exitFunction }) => {
  return (
    <div className="z-10 flex justify-center bg-black">
      <div className="w-[400px] h-[250px] fixed bg-white border-black border-[2px] rounded-[8px] mt-[100px] flex flex-col items-center">
        <div className="text-[18px] font-semibold font-inter mt-[40px] text-center">
          {text}
        </div>
        <button
          className="w-[250px] mt-[90px] bg-blue-400 rounded-[10px] h-[60px] text-white text-[20px]"
          onClick={() => exitFunction(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CompletionModal;
