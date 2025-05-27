import React, { useState, useRef, useEffect } from "react";
import { isValid } from "date-fns";
import { toast } from "sonner";

interface BirthDateProps {
  birthDate: string;
  setBirthDate: (date: string) => void;
}

const BirthdayInput: React.FC<BirthDateProps> = ({
  birthDate,
  setBirthDate,
}) => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const dayRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);
  const [editingText, setEditingText] = useState(birthDate);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (birthDate) {
      const date = new Date(birthDate);
      const dd = String(date.getDate()).padStart(2, "0");
      const mm = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
      const yyyy = String(date.getFullYear());
      setDay(dd);
      setMonth(mm);
      setYear(yyyy);
    }
  }, [birthDate]);

  useEffect(() => {
    if (!isEditing) {
      setEditingText(birthDate);
    } else {
      const combinedDate = `${year}-${month}-${day}`;
      setEditingText(combinedDate);
    }
  }, [day, month, year, isEditing, birthDate]);

  const handleDayInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setDay(value);
    if (value.length === 2) {
      monthRef.current?.focus();
    }
  };

  const handleMonthInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setMonth(value);
    if (value.length === 2) {
      yearRef.current?.focus();
    }
  };

  const handleYearInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setYear(value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (year && month && day) {
      const combinedDate = `${year}-${month}-${day}`;
      if (isValid(new Date(combinedDate))) {
        setBirthDate(combinedDate);
        setIsEditing(false);
      } else {
        toast.error("Invalid date format. Please enter a valid date.");
      }
    } else {
      toast.error("Please fill in all date fields.");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSave();
    }
  };

  return (
    <div className="flex items-center rounded border border-whiteBorder bg-transparent">
      <input
        ref={dayRef}
        type="text"
        value={day}
        onChange={handleDayInput}
        maxLength={2}
        placeholder="DD"
        disabled={!isEditing}
        onKeyDown={handleKeyDown}
        className="w-12 p-2 border-r border-whiteBorder text-center bg-transparent text-black placeholder-profileLabel outline-none"
      />
      <input
        ref={monthRef}
        type="text"
        value={month}
        onChange={handleMonthInput}
        maxLength={2}
        placeholder="MM"
        disabled={!isEditing}
        onKeyDown={handleKeyDown}
        className="w-12 p-2 border-r border-whiteBorder text-center bg-transparent text-black placeholder-profileLabel outline-none"
      />
      <input
        ref={yearRef}
        type="text"
        value={year}
        onChange={handleYearInput}
        maxLength={4}
        placeholder="YYYY"
        disabled={!isEditing}
        onKeyDown={handleKeyDown}
        className="w-32 p-2 text-center bg-transparent text-black placeholder-profileLabel outline-none"
      />
      <button
        type="button"
        onClick={isEditing ? handleSave : handleEditClick}
        className={`px-4 w-16 py-2 text-sm font-semibold ${isEditing ? "text-main" : "text-main opacity-50"}`}
      >
        {isEditing ? "Save" : "Edit"}
      </button>
    </div>
  );
};

export default BirthdayInput;
