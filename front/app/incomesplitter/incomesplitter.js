'use client'
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";

const IncomeSplitter = () => {
  const [amount, setAmount] = useState(0);
  const [people, setPeople] = useState([]);
  const [results, setResults] = useState([]);

  const addPerson = () => {
    setPeople([...people, { name: "", minutes: 0 }]);
  };

  const removePerson = (index) => {
    setPeople(people.filter((_, i) => i !== index));
  };

  const updatePerson = (index, field, value) => {
    const updatedPeople = [...people];
    updatedPeople[index][field] = field === "minutes" ? parseInt(value) || 0 : value;
    setPeople(updatedPeople);
  };

  const calculateResults = () => {
    const totalMinutes = people.reduce((sum, person) => sum + person.minutes, 0);
    if (totalMinutes > 0) {
      setResults(people.map((person) => ({
        ...person,
        earnings: (person.minutes / totalMinutes) * amount
      })));
    } else {
      setResults([]);
    }
  };

  const downloadInvoice = () => {
    const date = new Date().toISOString().split('T')[0];
    let content = `Számla - ${date}\n\n`;
    results.forEach(person => {
      content += `${person.name}: ${person.earnings.toFixed(0)} $\n`;
    });
    
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Szamla_${date}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-slate-800 bg-opacity-60 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">CLINTON MINING CORPORATION</h2>
      <input
        type="number"
        placeholder="Összeg ($)"
        className="border p-2 w-full text-black"
        value={amount || ""}
        onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
      />
      <button
        className="bg-blue-500 text-black p-2 mt-2 w-full rounded"
        onClick={addPerson}
      >
        + Személy hozzáadása
      </button>
      {people.map((person, index) => (
        <div key={index} className="flex gap-2 mt-2 items-center">
          <input
            type="text"
            placeholder="Név"
            className="border p-2 flex-1 text-black"
            value={person.name || ""}
            onChange={(e) => updatePerson(index, "name", e.target.value)}
          />
          <input
            type="number"
            placeholder="Perc"
            className="border p-2 w-20 text-black"
            value={person.minutes || ""}
            onChange={(e) => updatePerson(index, "minutes", e.target.value)}
          />
          <button
            className="bg-red-500 text-black p-2 rounded-sm"
            onClick={() => removePerson(index)}
          >
            <MdDelete className="size-6"/>
          </button>
        </div>
      ))}
      <button
        className="bg-green-500 text-black p-2 mt-2 w-full rounded"
        onClick={calculateResults}
      >
        Számolás
      </button>
    
      {results.length > 0 && (
        <>
         <h3 className="mt-4 font-semibold">Eredmények:</h3>
      {results.map((person, index) => (
        <p key={index} className="mt-1">
          {person.name}: {person.earnings.toFixed(0)} $
        </p>
      ))}
        <button
          className="bg-purple-500 text-black p-2 mt-4 w-full rounded"
          onClick={downloadInvoice}
        >
          Számla letöltése
        </button>
        </>
      )}
    </div>
  );
};

export default IncomeSplitter;
