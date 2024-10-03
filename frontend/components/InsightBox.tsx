import { FC } from "react";

interface InsightBoxProps {
  title: string;
  data: number | undefined | null;
  def: string;
}
const InsightBox: FC<InsightBoxProps> = ({ title, data, def }) => {
  return (
    <div className="w-[250px] h-[250px] bg-white rounded-[20px] text-black flex flex-col items-center">
      <span className="text-[30px] font-inter mt-[20px]">{title}</span>
      <span className="text-[50px] mt-[20px]">{data ? data : def}</span>
    </div>
  );
};

export default InsightBox;
