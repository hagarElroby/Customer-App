import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";

const { RangePicker } = DatePicker;

interface PickRentalDateProps {
  endDateRental: string;
  startDateRental: string;
  onChange?: (dates: {
    startDate: string | null;
    endDate: string | null;
  }) => void;
}

const PickRentalDate: React.FC<PickRentalDateProps> = ({
  startDateRental,
  endDateRental,
  onChange,
}) => {
  const [range, setRange] = useState<[Dayjs | null, Dayjs | null]>([
    null,
    null,
  ]);

  const handleRangeChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    const startDate = dates?.[0] || null;
    const endDate = dates?.[1] || null;
    setRange([startDate, endDate]);

    onChange?.({
      startDate: startDate ? startDate.toISOString() : null,
      endDate: endDate ? endDate.toISOString() : null,
    });
  };

  // Disable past dates (based on local date & time)
  const disabledDate = (current: Dayjs) => {
    return current && current < dayjs().startOf("day");
  };
  const disabledTime = (date: Dayjs | null) => {
    if (!date) return {};

    if (date.isSame(dayjs(), "day")) {
      const currentHour = dayjs().hour();
      const currentMinute = dayjs().minute();

      return {
        disabledHours: () => Array.from({ length: currentHour }, (_, i) => i),
        disabledMinutes: (selectedHour: number) =>
          selectedHour === currentHour
            ? Array.from({ length: currentMinute + 1 }, (_, i) => i)
            : [],
      };
    }
    return {};
  };

  return (
    <div className="flex w-full overflow-hidden rounded-full border-[#F2F2F2] border-[4px] bg-white">
      {/* Pickup */}
      <div className="flex w-full flex-col items-center justify-center px-4 py-2 text-center cursor-pointer">
        <span className="font-bold text-xs text-[#212121]">Pickup</span>
        <RangePicker
          value={range}
          onChange={handleRangeChange}
          placeholder={["Select date", "Select date"]}
          allowClear
          bordered={false}
          className="mt-0.5 text-xs text-[#808080] w-full text-center flex items-center justify-center"
          style={{ backgroundColor: "transparent", textAlign: "center" }}
          showTime={{ format: "HH:mm:ss" }}
          format="YYYY-MM-DD HH:mm:ss"
          disabledDate={disabledDate}
          disabledTime={disabledTime}
          getPopupContainer={(trigger) => trigger.parentElement as HTMLElement}
        />
      </div>

      {/* Divider */}
      {/* <div className="h-full w-[4px] self-center bg-[#F2F2F2]" /> */}
    </div>
  );
};

export default PickRentalDate;
