import axios from "axios";
import { useData } from "../../context/DataContext";
import { categories } from "./JournalData";
import { useEffect } from "react";

const JournalForm = ({ editIndex, setEditIndex, setShowForm }) => {
  const {
    entries,
    setEntries,
    selectedChildTag,
    setSelectedChildTag,
    selectedParentTag,
    setSelectedParentTag,
    formData,
    setFormData,
    parentTags,
    childTags,
    backendUrl,
  } = useData();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddOrUpdateEntry = async (e) => {
    e.preventDefault();
    const tagsToSend = [];
    if (selectedParentTag) tagsToSend.push(selectedParentTag);
    if (selectedChildTag) tagsToSend.push(selectedChildTag);
    console.log("Selected Tags:", tagsToSend);
    // Update formData before send
    const dataToSubmit = {
      ...formData,
      tags: tagsToSend,
    };
    console.log("Form Data Submitted:", dataToSubmit);

    try {
      if (editIndex) {
        const res = await axios.put(
          `${backendUrl}/journals/update/${editIndex}`,
          dataToSubmit
        );
        const updated = res.data.journal;
        if (updated) {
          setEntries((prev) =>
            prev.map((entry) => (entry._id === editIndex ? updated : entry))
          );
          if (updated.tags && updated.tags.length > 0) {
            setSelectedParentTag(updated.tags[0]._id || "");
            if (updated.tags[1]) {
              setSelectedChildTag(updated.tags[1]._id || "");
            } else {
              setSelectedChildTag("");
            }
          }
          console.log("Server Response:", res.data);
        }
      } else {
        const res = await axios.post(
          `${backendUrl}/journals/create`,
          dataToSubmit
        );
        console.log("Server Response:", res.data);
        if (res.data.journal) {
          setEntries((prev) => [res.data.journal, ...prev]);
        }
      }

      resetForm();
    } catch (error) {
      console.log("Error submitting form:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      date: "",
      category: "",
      content: "",
      visibility: "",
      tags: [],
    });
    setEditIndex(null);
    setShowForm(false);
  };
  useEffect(() => {
    if (editIndex) {
      const entryToEdit = entries.find((e) => e._id === editIndex);
      if (entryToEdit) {
        setFormData({
          ...entryToEdit,
          date: entryToEdit.date ? entryToEdit.date.slice(0, 10) : "",
        });

        // 🟢 Set tag dropdown values also
        if (entryToEdit.tags && entryToEdit.tags.length > 0) {
          // Assuming first is parent and second is child
          setSelectedParentTag(entryToEdit.tags[0]._id || "");
          if (entryToEdit.tags[1]) {
            setSelectedChildTag(entryToEdit.tags[1]._id || "");
          }
        }
      }
    }
  }, [
    editIndex,
    entries,
    setFormData,
    setSelectedChildTag,
    setSelectedParentTag,
  ]);
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
              <option key={cat} value={cat}>
                {cat}
              </option>
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
            <option value="" disabled>
              Select Parent tag
            </option>

            {parentTags.map((parent) => (
              <option key={parent._id} value={parent._id}>
                {parent.category}
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
                  // console.log(e.target.value, "child value");
                  setSelectedChildTag(e.target.value);
                }}
              >
                <option value="" disabled>
                  Select child tag
                </option>

                {childTags.map((child) => 
                {
                  // console.log(child, "child i love you",child._id);
                  return(
                     <option key={child._id} value={child._id}>
                    {child.name}
                  </option>
                  )
                }
                )}
              </select>
            </>
          )}

          {/* Visibility */}
          <select
            id=""
            onChange={handleChange}
            name="visibility"
            value={formData.visibility}
            required
          >
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
