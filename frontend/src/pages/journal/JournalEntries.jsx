import { useData } from "../../context/DataContext";
import { Chrono } from "react-chrono";
import "./JournalEntries.css";

const JournalEntries = ({ setShowForm, setEditIndex, viewValue }) => {
  const { entries, setEntries } = useData();

  const handleEdit = (index) => {
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setEntries((prev) => prev.filter((entry) => entry._id !== id));
    console.log("Delete entry with index:", id);
  };

  const customDarkTheme = {
    // Base colors
    cardBgColor: "#27117d", //✅
    toolbarBgColor: "#27117d",
    toolbarBtnBgColor: "#6638fd",

    // Enhanced dark mode properties
    iconColor: "white",
    buttonHoverBgColor: "#361e96",

    // Borders and effects
    buttonBorderColor: "#6638fd", //grey
    buttonHoverBorderColor: "white", //sky blue
    shadowColor: "rgba(0, 0, 0, 0.8)",
    glowColor: "white",

    // Search and dark toggle
    darkToggleActiveBgColor: "#361e96", //✅
    darkToggleActiveIconColor: "pink", //white
    cardDetailsBackGround: "#27117d", //✅,
    toolbarTextColor: "white",
  };

  if (viewValue == "grid") {
    return (
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

              <div className="entry-actions">
                <button className="save" onClick={() => handleEdit(entry._id)}>
                  <i className="ri-pencil-line"></i> &nbsp;Edit
                </button>
                <button
                  className="cancel"
                  onClick={() => handleDelete(entry._id)}
                >
                  <i className="ri-delete-bin-6-line"></i> &nbsp;Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    );
  } else if (viewValue == "timeline") {
    return (
      <div style={{ width: "100%", height: "70vh" }}>
        {entries.length === 0 ? (
          <p className="no-entry">No entries found for this filter.</p>
        ) : (
          <Chrono
            items={entries.map((entry) => {
              // Tags ko readable text me convert karo
              const tagsText =
                entry.tags?.map((tag) =>
                  tag.parent ? `${tag?.category} - ${tag.name}` : null
                ) || [];
              return {
                title: entry.date?.slice(0, 10),
                cardTitle: entry.title,
                // cardTitle:entry.visibility,
                cardSubtitle:
                  entry.content.length > 100
                    ? entry.content.slice(0, 100) + "..."
                    : entry.content,
                cardDetailedText: tagsText.filter(Boolean), // Array of Tags
              };
            })}
            mode="VERTICAL_ALTERNATING"
            hideControls={false}
            cardHeight={100}
            theme={customDarkTheme}
            classNames={{
              card: "timelineCard",
              cardSubTitle: "timelineSubtitle",
              cardText: "my-card-text",
              cardTitle: "my-card-title",
              title: "my-timeline-title",
            }}
          />
        )}
      </div>
    );
  }
};

export default JournalEntries;
