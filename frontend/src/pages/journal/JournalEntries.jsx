import { useData } from "../../context/DataContext";

const JournalEntries = ({ setShowForm, setEditIndex }) => {
  const { entries, setEntries } = useData();
  // console.log(entries);
  const handleEdit = (index) => {
    // setFormData(entries[index]);
    setEditIndex(index);
    setShowForm(true);
    // console.log("Edit entry with index:", index);
  };

  const handleDelete = (id) => {
    setEntries((prev) => prev.filter((entry) => entry._id !== id));
    console.log("Delete entry with index:", id);
  };

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
};

export default JournalEntries;
