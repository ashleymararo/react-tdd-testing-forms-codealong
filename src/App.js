import React, { useState } from "react";

function App() {
  const [addPepperoni, setAddPepperoni] = useState(false);
  const [size, setSize] = useState("Medium");
  const [contactInfo, setContactInfo] = useState("");
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setOrderSubmitted(true);
  }

  return (
    <div>
      <h1>Pizza Order</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="checkbox"
            checked={addPepperoni}
            onChange={(e) => setAddPepperoni(e.target.checked)}
          />
          Add Pepperoni
        </label>

        <br />

        <label>
          Select Size:
          <select value={size} onChange={(e) => setSize(e.target.value)}>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </label>

        <br />

        <p>Your Selection: {size} Pizza {addPepperoni ? "with Pepperoni" : "without Pepperoni"}</p>

        <input
          type="text"
          placeholder="Enter your contact info"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
        />

        <br />

        <button type="submit">Submit Order</button>
      </form>

      {orderSubmitted && <p>Order submitted! We'll contact you soon.</p>}
    </div>
  );
}

export default App;