import { useState } from "react";
import "./Journal.css";
import JournalForm from "./JournalForm";
import JournalHeader from "./JournalHeader";
import JournalEntries from "./JournalEntries";

const Journal = () => {
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  // const [filter, setFilter] = useState("All");

 

  // Filter entries based on selected category
  // const filteredEntries =
  //   filter === "All"
  //     ? entries
  //     : entries.filter((entry) => entry.category === filter);

  return (
    <div className="journal-container">
      {/* Main Content */}
      <main className="journal-main">
        {/* Journal Header */}
        <JournalHeader setShowForm={setShowForm} setEditIndex={setEditIndex}/>

        {/* Entries */}
        <JournalEntries setShowForm={setShowForm} setEditIndex={setEditIndex} />
      </main>

      {/* Modal Form */}
      {showForm && (
        <JournalForm
          setEditIndex={setEditIndex}
          editIndex={editIndex}
          showForm={showForm}
          setShowForm={setShowForm}
        />
      )}
    </div>
  );
};

export default Journal;
