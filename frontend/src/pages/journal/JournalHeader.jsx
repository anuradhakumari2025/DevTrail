import { useEffect, useState } from "react";
import { useData } from "../../context/DataContext";
import { categories } from "./JournalData";
import "./JournalHeader.css";
import axios from "axios";

const JournalHeader = ({ setShowForm, setViewValue }) => {
  const { tags, setEntries, backendUrl } = useData();
  const [view, setView] = useState(false);
  const [filterParentTag, setFilterParentTag] = useState("");
  const [filterChildTag, setFilterChildTag] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const parentTags = tags.filter((tag) => tag.parent === null);
  const childTags = tags.filter(
    (tag) => tag.parent && tag.parent._id === filterParentTag
  );

  const params = new URLSearchParams();
  if (filterCategory && filterCategory !== "All")
    params.append("category", filterCategory);
  if (filterParentTag && filterParentTag !== "ALL") params.append("parentTag", filterParentTag);
  if (filterChildTag && filterChildTag !== "ALL") params.append("childTag", filterChildTag);

  const fetchJournals = async () => {
    try {
      const res = await axios.get(
        `${backendUrl}/journals/get?${params.toString()}`
      );
      setEntries(res.data.journals);
    } catch (err) {
      // handle error
      console.error("Error fetching journals:", err);
    }
  };

  useEffect(() => {
    fetchJournals();
    // eslint-disable-next-line
  }, [filterCategory, filterParentTag, filterChildTag]);

  return (
    <div className="header filter-header">
      <div className="filter">
        <h2>
          <i className="ri-filter-2-line"></i>Filter:
        </h2>

        {/* Select Category */}
        <select
          name=""
          id=""
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
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
          value={filterParentTag}
          onChange={(e) => {
            setFilterParentTag(e.target.value);
            setFilterChildTag(""); // Clear child tag when parent changes
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
          <option value="All">All</option>
        </select>

        {/* // Child Tag Dropdown (shows only if parent is selected) */}
        {filterParentTag && (
          <select
            value={filterChildTag}
            onChange={(e) => setFilterChildTag(e.target.value)}
          >
            <option disabled value="">
              Select child tag
            </option>
            {childTags.map((child) => (
              <option key={child._id} value={child._id}>
                {child.name}
              </option>
            ))}
            <option value="All">All</option>
          </select>
        )}
      </div>

      <div className="addView">
        <div className="view" onClick={() => setView(!view)}>
          <i className="ri-eye-line"></i>
          <p>View</p>
          {view ? (
            <i className="ri-arrow-drop-up-line"></i>
          ) : (
            <i className="ri-arrow-drop-down-line"></i>
          )}

          {view && (
            <div className="viewOptions">
              <p onClick={() => setViewValue("grid")}>Grid</p>
              <p onClick={() => setViewValue("timeline")}>Timeline</p>
            </div>
          )}
        </div>

        <button onClick={() => setShowForm(true)} className="add-entry-btn">
          <i className="ri-add-line"></i> Add Entry
        </button>
      </div>
    </div>
  );
};

export default JournalHeader;
