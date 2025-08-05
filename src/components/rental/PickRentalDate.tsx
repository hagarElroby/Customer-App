import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";

interface PickRentalDateProps {
  onChange?: (dates: {
    startDate: string | null;
    endDate: string | null;
  }) => void;
}

const PickRentalDate: React.FC<PickRentalDateProps> = ({ onChange }) => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const handleStartDateChange = (date: Dayjs | null) => {
    setStartDate(date);
    onChange?.({
      startDate: date ? date.toISOString() : null,
      endDate: endDate ? endDate.toISOString() : null,
    });
  };

  const handleEndDateChange = (date: Dayjs | null) => {
    setEndDate(date);
    onChange?.({
      startDate: startDate ? startDate.toISOString() : null,
      endDate: date ? date.toISOString() : null,
    });
  };

  return (
    <div className="flex w-full overflow-hidden rounded-full border-[#F2F2F2] border-[4px]  bg-white">
      {/* Pickup */}
      <div className="flex w-1/2 flex-col items-center justify-center px-4 py-2 text-center cursor-pointer">
        <span className="font-bold text-xs text-[#212121]">Pickup</span>
        <DatePicker
          value={startDate}
          onChange={handleStartDateChange}
          placeholder="Select date"
          allowClear
          bordered={false}
          className="mt-0.5 text-xs text-[#808080]"
          style={{ backgroundColor: "transparent", textAlign: "center" }}
        />
      </div>

      {/* Divider */}
      <div className="h-full w-[4px] self-center bg-[#F2F2F2]" />

      {/* Drop off */}
      <div className="flex w-1/2 flex-col items-center justify-center px-4 py-2 text-center cursor-pointer">
        <span className="font-bold text-xs text-[#212121]">Drop off</span>
        <DatePicker
          value={endDate}
          onChange={handleEndDateChange}
          placeholder="Select date"
          allowClear
          bordered={false}
          className="mt-0.5 text-xs text-[#808080]"
          style={{ backgroundColor: "transparent", textAlign: "center" }}
        />
      </div>
    </div>
  );
};

export default PickRentalDate;
