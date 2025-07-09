"use client";
import React, { useState } from "react";

const Agecalculatorpage = () => {
  const [dob, setdob] = useState();
  const [age, setAge] = useState({ years: 0, months: 0, days: 0 });

  const calculateAge = () => {
    const birthDate = new Date(dob);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();


    if (days < 0) {
      months--;

      const LastMonth = new Date(today.getFullYear(), today.getMonth(), 0);

      // Adding the last month days to the days
      days += LastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({ years, months, days });
  };
  return (
    <>
      <h1>Age Calculator</h1>
      <p className="text-gray-600">
        Enter your date of birth to calculate your age.
      </p>
      <input type="date" onChange={(e) => setdob(e.target.value)} />
      <button onClick={calculateAge}>Calculate Age</button>

      {age && (
        <p>
          Your age is {age.years} years, {age.months} months, and {age.days}{" "}
          days
        </p>
      )}
    </>
  );
};

export default Agecalculatorpage;
