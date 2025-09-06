import { useState } from "react";
import "./Journal.css";
import JournalForm from "./JournalForm";
import JournalHeader from "./JournalHeader";
import JournalEntries from "./JournalEntries";

const Journal = () => {
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [viewValue, setViewValue] = useState("grid");

  return (
    <div className="journal-container">
      {/* Main Content */}
      <main className="journal-main">
        {/* Journal Header */}
        <JournalHeader
          setShowForm={setShowForm}
          setEditIndex={setEditIndex}
          viewValue={viewValue}
          setViewValue={setViewValue}
        />

        {/* Entries */}
        <JournalEntries
          setShowForm={setShowForm}
          setEditIndex={setEditIndex}
          viewValue={viewValue}
          setViewValue={setViewValue}
        />
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
