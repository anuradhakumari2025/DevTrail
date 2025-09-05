import { useData } from "../../context/DataContext";
import { categories } from "./JournalData";

const JournalHeader = ({ setShowForm }) => {
  const {
    selectedChildTag,
    setSelectedChildTag,
    selectedParentTag,
    setSelectedParentTag,
    parentTags,
    childTags
  } = useData();

  return (
    <div className="header filter-header">
      <div className="filter">
        <h2>
          <i className="ri-filter-2-line"></i>Filter:
        </h2>

        {/* Select Category */}
        <select name="" id="">
          <option value="" disabled>
            Select Category
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
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
          <option value="" disabled>
            Select parent tag
          </option>
          {parentTags.map((tag) => (
            <option key={tag._id} value={tag._id}>
              {!tag.parent && tag.category}
            </option>
          ))}
        </select>

        {/* // Child Tag Dropdown (shows only if parent is selected) */}
        {selectedParentTag && (
          <select
            value={selectedChildTag}
            onChange={(e) => setSelectedChildTag(e.target.value)}
          >
            <option disabled value="">
              Select child tag
            </option>
            {childTags.map((child) => (
              <option key={child._id} value={child._id}>
                {child.name}
              </option>
            ))}
          </select>
        )}
      </div>
      <button onClick={() => setShowForm(true)} className="add-entry-btn">
        + Add Entry
      </button>
    </div>
  );
};

export default JournalHeader;
