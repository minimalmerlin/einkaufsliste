// The main application file for the Shopping List.
// Contains all logic for adding, completing, and archiving items.
"use client";

import { useState } from "react";

// Define the type for a single shopping list item
interface Item {
  id: number;
  text: string;
}

export default function ShoppingListPage() {
  // State for the input field
  const [newItemText, setNewItemText] = useState("");
  // State for the active shopping list items
  const [items, setItems] = useState<Item[]>([]);
  // State for the archived (completed) items
  const [archivedItems, setArchivedItems] = useState<Item[]>([]);

  // Function to handle adding a new item
  const handleAddItem = () => {
    // Trim the text and check if it's empty
    if (newItemText.trim() === "") {
      return; // Do not add empty items
    }
    // Create a new item object
    const newItem: Item = {
      id: Date.now(), // Use timestamp for a unique ID
      text: newItemText.trim(),
    };
    // Add the new item to the list and clear the input
    setItems([...items, newItem]);
    setNewItemText("");
  };

  // Function to handle checking off an item (moving it to the archive)
  const handleCheckItem = (itemToCheck: Item) => {
    // Remove the item from the active list
    setItems(items.filter((item) => item.id !== itemToCheck.id));
    // Add the item to the beginning of the archive
    setArchivedItems([itemToCheck, ...archivedItems]);
  };

  // Function to clear the entire archive
  const handleClearArchive = () => {
    // Ask for confirmation before deleting
    if (window.confirm("Möchten Sie das Archiv wirklich endgültig löschen?")) {
      setArchivedItems([]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="container mx-auto max-w-2xl p-4 sm:p-8">
        
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Einkaufsliste</h1>
          <p className="text-slate-500">Fügen Sie Artikel hinzu und haken Sie sie ab.</p>
        </header>

        {/* Add New Item Form */}
        <div className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
              placeholder="z.B. Milch, Brot, Eier..."
              className="flex-1 rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddItem}
              className="rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              Hinzufügen
            </button>
          </div>
        </div>

        {/* Active Shopping List */}
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold border-b border-slate-200 pb-2">Offene Artikel</h2>
          {items.length > 0 ? (
            <ul className="space-y-2">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between rounded-lg bg-white p-4 border border-slate-200 shadow-sm"
                >
                  <span className="text-slate-800">{item.text}</span>
                  <button
                    onClick={() => handleCheckItem(item)}
                    className="h-6 w-6 rounded-full border-2 border-slate-300 hover:border-green-500 hover:bg-green-50 transition-all"
                    aria-label={`"${item.text}" abhaken`}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-500 pt-2">Alle Artikel sind erledigt! Fügen Sie neue hinzu.</p>
          )}
        </div>

        {/* Archive Section */}
        {archivedItems.length > 0 && (
          <div className="mt-12">
            <div className="flex justify-between items-center border-b border-slate-200 pb-2 mb-4">
              <h2 className="text-2xl font-semibold">Archiv</h2>
              <button
                onClick={handleClearArchive}
                className="text-sm font-medium text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1 rounded-md transition-colors"
              >
                Archiv löschen
              </button>
            </div>
            <ul className="space-y-2">
              {archivedItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-4 rounded-lg bg-slate-100 p-4 border border-slate-200"
                >
                  <div className="h-5 w-5 flex-shrink-0 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-slate-500 line-through">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
