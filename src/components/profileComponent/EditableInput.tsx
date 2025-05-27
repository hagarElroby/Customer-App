import { useEffect, useState } from "react";

interface EditableInputProps {
  text: string;
  setText?: (text: string) => void;
  noEdit?: boolean;
}
const EditableInput: React.FC<EditableInputProps> = ({
  text,
  setText,
  noEdit,
}) => {
  const [editingText, setEditingText] = useState(text);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isEditing) {
      setEditingText(text);
    }
  }, [text, isEditing]);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditingText(text);
  };

  const handleSave = () => {
    setIsEditing(false);
    if (setText) {
      setText(editingText);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSave();
    }
  };

  return (
    <div className="flex items-center rounded bg-white border border-[#DADCE3]">
      <input
        type="text"
        value={editingText}
        onChange={(e) => setEditingText(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 p-2  border-0 bg-transparent focus:outline-none"
        disabled={!isEditing}
      />

      <button
        type="button"
        onClick={isEditing ? handleSave : handleEditClick}
        className={`px-4 w-14 py-2 text-sm font-semibold ${
          isEditing ? " text-main " : "text-main opacity-50"
        }`}
      >
        {!noEdit && (isEditing ? "Save" : "Edit")}
      </button>
    </div>
  );
};

export default EditableInput;
