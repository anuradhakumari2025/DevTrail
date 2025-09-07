import { useEffect, useState } from "react";
import "./Community.css";
import {
  fetchJournals,
  getFilteredTagsAndParams,
} from "../../utils/FilterFunction";
import { useData } from "../../context/DataContext";
import { categories } from "../journal/JournalData";

const Community = () => {
  const { tags, setEntries, backendUrl, entries } = useData();

  const [filterParentTag, setFilterParentTag] = useState("");
  const [filterChildTag, setFilterChildTag] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const { parentTags, childTags } = getFilteredTagsAndParams(
    tags,
    filterParentTag,
    filterChildTag,
    filterCategory
  );



 useEffect(() => {
    const { params } = getFilteredTagsAndParams(
      tags,
      filterParentTag,
      filterChildTag,
      filterCategory
    );
    fetchJournals(
      `${backendUrl}/journals/public?${params.toString()}`,
      setEntries
    );
    // eslint-disable-next-line
  }, [filterCategory, filterParentTag, filterChildTag]);
  return (
    <div className="communityContainer">
      <div className="community">
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
        </div>

        <div className="entries">
          {entries.length === 0 ? (
            <p className="no-entry">No entries found for this filter.</p>
          ) : (
            entries.map((entry) => (
              <div
                key={entry._id}
                className={`entry-card category-${entry.category}`}
              >
                <div className="top">
                  <div className="visibility">
                    {entry.visibility == "public" && (
                      <i
                        className="ri-eye-line"
                        title="Who can see your entry"
                      ></i>
                    )}
                    {entry.visibility == "private" && (
                      <i className="ri-eye-off-line"></i>
                    )}
                    <p>
                      {entry.visibility?.charAt(0).toUpperCase() +
                        entry.visibility?.slice(1)}
                    </p>
                  </div>
                  <div className="date" title="Date of entry when added">
                    <i className="ri-calendar-2-line"></i>
                    <p>{entry.date?.slice(0, 10)}</p>
                  </div>
                </div>

                <h2 className="title">{entry.title} </h2>

                <p className="content">
                  {entry.content.length > 100
                    ? entry.content?.slice(0, 100) + "..."
                    : entry.content}
                </p>

                <div className="category">
                  <i className="ri-folder-2-line" title="Category of entry"></i>
                  <p> {entry?.category}</p>
                </div>

                <div className="tagsContent">
                  <p className="tags">
                    {entry.tags?.map((tag) => {
                      // console.log(tag, "tag i love you", tag._id);
                      return (
                        <span key={tag._id} className="tag">
                          {tag.parent && tag?.category}
                        </span>
                      );
                    })}
                  </p>

                  <p className="tags">
                    {entry.tags?.map((tag) => {
                      return (
                        <span key={tag._id} className="tag">
                          {tag.parent && tag.name}
                        </span>
                      );
                    })}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Community;
