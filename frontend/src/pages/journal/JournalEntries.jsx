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
                  {entry.tags?.map((tag) => {
                    // console.log(tag, "tag i love you", tag._id);
                    return (
                      <span key={tag._id} className="tag">
                        {tag.parent && `${tag?.category} - ${tag.name}`}
                      </span>
                    );
                  })}
                </p>
              </div>

              <div className="entry-actions">
                <button className="save" onClick={() => handleEdit(entry._id)}>
                  Edit
                </button>
                <button
                  className="cancel"
                  onClick={() => handleDelete(entry._id)}
                >
                  Delete
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
