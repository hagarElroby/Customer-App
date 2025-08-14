import { useEffect, useState } from "react";

interface EditableInputProps {
  text: string;
  setText?: (text: string) => void;
  noEdit?: boolean;
  handleUpdate?: (input: string) => void;
  isEmail?: boolean;
  emailStatus?: string;
  onEmailFieldClicked?: () => void;
}
const EditableInput: React.FC<EditableInputProps> = ({
  text,
  setText,
  noEdit,
  handleUpdate,
  isEmail,
  emailStatus,
  onEmailFieldClicked,
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
    handleUpdate?.(editingText);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSave();
    }
  };

  return (
    <div className="flex w-full items-center rounded border border-[#DADCE3] bg-white px-2">
      <input
        type="text"
        value={editingText}
        onChange={(e) => setEditingText(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 border-0 bg-transparent p-2 focus:outline-none"
        disabled={!isEditing}
      />
      {!noEdit && !isEmail && (
        <button
          type="button"
          onClick={isEditing ? handleSave : handleEditClick}
          className={`w-14 px-4 py-2 text-sm font-semibold ${
            isEditing ? "text-main" : "text-main opacity-50"
          }`}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      )}
      {isEmail && emailStatus && (
        <button
          type="button"
          onClick={onEmailFieldClicked}
          className={`} w-14 px-4 py-2 text-sm font-semibold text-main`}
        >
          {emailStatus}
        </button>
      )}
    </div>
  );
};

export default EditableInput;
