import { useData } from "../../context/DataContext";
import { categories, tagsData } from "./JournalData";

const JournalForm = ({
  editIndex,
  setEditIndex,
  formData,
  setFormData,
  setShowForm,
}) => {
  const {
    entries,
    setEntries,
    selectedChildTag,
    setSelectedChildTag,
    selectedParentTag,
    setSelectedParentTag,
  } = useData();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddOrUpdateEntry = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedEntries = [...entries];
      updatedEntries[editIndex] = formData;
      setEntries(updatedEntries);
    } else {
      setEntries([formData, ...entries]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      date: "",
      category: "",
      content: "",
      visibility: "",
    });
    setEditIndex(null);
    setShowForm(false);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{editIndex !== null ? "Edit Entry" : "New Entry"}</h2>
        <form onSubmit={handleAddOrUpdateEntry}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          {/* Date */}
          <input
            type="date"
            name="date"
            max={new Date().toISOString().split("T")[0]}
            value={formData.date}
            onChange={handleChange}
            required
          />

          {/* Select Category */}
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option value={cat}>{cat}</option>
            ))}
          </select>

          {/* Content */}
          <textarea
            name="content"
            placeholder="Write your thoughts..."
            value={formData.content}
            onChange={handleChange}
            required
            rows={4}
          ></textarea>

          <select
            name=""
            id=""
            value={selectedParentTag}
            onChange={(e) => {
              setSelectedParentTag(e.target.value);
            }}
          >
            <option value="">Select Parent tag</option>

            {Object.keys(tagsData).map((parent) => (
              <option key={parent} value={parent}>
                {parent}
              </option>
            ))}
          </select>

          {selectedParentTag && (
            <>
              <select
                name=""
                id=""
                required
                value={selectedChildTag}
                onChange={(e) => {
                  setSelectedChildTag(e.target.value);
                }}
              >
                <option value="">Select child tag</option>

                {tagsData[selectedParentTag]?.map((child) => (
                  <option key={child} value={child}>
                    {child}
                  </option>
                ))}
              </select>
            </>
          )}

          {/* Visibility */}
          <select id="" onChange={handleChange} name="visibility">
            <option value="">Select Visibility</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>

          <div className="form-actions">
            <button type="button" className="cancel" onClick={resetForm}>
              Cancel
            </button>
            <button type="submit" className="save">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JournalForm;
