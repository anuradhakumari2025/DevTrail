import { useState } from "react";
import "./Journal.css";
import { categories, tagsData } from "./JournalData";
import JournalForm from "./JournalForm";
import { useData } from "../../context/DataContext";

const Journal = () => {
  const [showForm, setShowForm] = useState(false);
  const {
    entries,
    setEntries,
    selectedChildTag,
    setSelectedChildTag,
    selectedParentTag,
    setSelectedParentTag,
  } = useData();

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    category: "",
    content: "",
    visibility: "",
    tags: [],
  });
  
  const [editIndex, setEditIndex] = useState(null);
  // const [filter, setFilter] = useState("All");

  const handleEdit = (index) => {
    setFormData(entries[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    setEntries((prev) => prev.filter((_, i) => i !== index));
  };

  // Filter entries based on selected category
  // const filteredEntries =
  //   filter === "All"
  //     ? entries
  //     : entries.filter((entry) => entry.category === filter);

  return (
    <div className="journal-container">
      {/* Main Content */}
      <main className="journal-main">
        <div className="header filter-header">
          <div className="filter">
            <h2>
              <i className="ri-filter-2-line"></i>Filter:
            </h2>

            {/* Select Category */}
            <select name="" id="">
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option value={cat}>{cat}</option>
              ))}
              <option value="All">All</option>
            </select>

            {/* Select Parent Tag */}
            <select
              value={selectedParentTag}
              onChange={(e) => {
                setSelectedParentTag(e.target.value);
                setSelectedChildTag(""); // Clear child tag when parent changes
              }}
            >
              <option value="">Select parent tag</option>
              {Object.keys(tagsData).map((parent) => (
                <option key={parent} value={parent}>
                  {parent}
                </option>
              ))}
            </select>

            {/* Select Child Tag */}
            <select
              value={selectedChildTag}
              onChange={(e) => setSelectedChildTag(e.target.value)}
              disabled={!selectedParentTag}
            >
              <option value="">Select child tag</option>
              {selectedParentTag &&
                tagsData[selectedParentTag].map((child) => (
                  <option key={child} value={child}>
                    {child}
                  </option>
                ))}
            </select>
          </div>
          <button onClick={() => setShowForm(true)} className="add-entry-btn">
            + Add Entry
          </button>
        </div>

        {/* Entries */}
        <div className="entries">
          {entries.length === 0 ? (
            <p className="no-entry">No entries found for this filter.</p>
          ) : (
            entries.map((entry, i) => (
              <div key={i} className={`entry-card category-${entry.category}`}>
                <div className="mainField">
                  <h4 className="tags">Title :</h4>
                  <p className="tagsContent">{entry.title} </p>
                </div>

                <div className="mainField">
                  <h4 className="tags">Content :</h4>
                  <p className="tagsContent">
                    {entry.content.length > 100
                      ? entry.content?.slice(0, 100) + "..."
                      : entry.content}
                  </p>
                </div>

                <div className="catVis">
                  <div>
                    <h4 className="tags">Category :</h4>
                    <p className="tagsContent"> {entry?.category}</p>
                  </div>

                  <div>
                    <h4 className="tags">Visibility :</h4>
                    <p className="tagsContent">
                      {entry.visibility?.charAt(0).toUpperCase() +
                        entry.visibility?.slice(1)}
                    </p>
                  </div>

                  <div>
                    <h4 className="tags">Date :</h4>
                    <p className="tagsContent">{entry.date?.slice(0, 10)}</p>
                  </div>
                </div>

                <div className="mainField">
                  <h4 className="tags">Tags :</h4>
                  <p className="tagsContent">
                    {entry.tags?.map((tag) => (
                      <span key={tag._id} className="tag">
                        {tag?.parent} - {tag?.child},&nbsp;
                      </span>
                    ))}
                  </p>
                </div>

                <div className="entry-actions">
                  <button className="save" onClick={() => handleEdit(i)}>
                    Edit
                  </button>
                  <button className="cancel" onClick={() => handleDelete(i)}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Modal Form */}
      {showForm && (
        <JournalForm
          setEditIndex={setEditIndex}
          editIndex={editIndex}
          formData={formData}
          setFormData={setFormData}
          showForm={showForm}
          setShowForm={setShowForm}
        />
      )}
    </div>
  );
};

export default Journal;
