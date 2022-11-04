import people from "./data.json";
import { useState } from "react";

function getDateFormat(date) {
  return new Date(date).toLocaleDateString("en-NO");
}

const FILTERENUM = {
  FIRSTNAME: "firstName",
  LASTNAME: "lastName",
  AGE: "age",
};

function App() {
  const [filter, setFilter] = useState(null);

  function changeFilter(event) {
    setFilter(event.target.value);
  }

  function getAge(date) {
    const thisYear = new Date().getFullYear();
    return thisYear - new Date(date).getFullYear();
  }

  const sortedPeople = () => {
    if ([FILTERENUM.FIRSTNAME, FILTERENUM.LASTNAME].includes(filter)) {
      return people.sort((a, b) => a[filter].localeCompare(b[filter]));
    } else if (filter === FILTERENUM.AGE) {
      return people.sort((a, b) => a[filter] - b[filter]);
    } else {
      return people;
    }
  };
  filter === FILTERENUM.FIRSTNAME
    ? people.sort((a, b) => a[filter].localeCompare(b[filter]))
    : people.sort((a, b) => getAge(a.birthday) - getAge(b.birthday));
  return (
    <div className="mx-auto max-w-xl">
      <header>
        <h1 className="text-3xl font-bold">Birthdays</h1>
      </header>
      <main>
        <section>
          <h4>Sort by</h4>
          <div className="mb-4">
            <div>
              <input
                checked={filter === FILTERENUM.FIRSTNAME}
                onChange={changeFilter}
                value={FILTERENUM.FIRSTNAME}
                id={FILTERENUM.FIRSTNAME}
                type="radio"
                name="filter"
              />
              <label className="ml-2" htmlFor={FILTERENUM.FIRSTNAME}>
                First Name
              </label>
            </div>
            <div>
              <input
                checked={filter === FILTERENUM.LASTNAME}
                onChange={changeFilter}
                value={FILTERENUM.LASTNAME}
                id={FILTERENUM.LASTNAME}
                type="radio"
                name="filter"
              />
              <label className="ml-2" htmlFor={FILTERENUM.LASTNAME}>
                Last Name
              </label>
            </div>
            <div>
              <input
                checked={filter === FILTERENUM.AGE}
                onChange={changeFilter}
                value={FILTERENUM.AGE}
                id={FILTERENUM.AGE}
                type="radio"
                name="filter"
              />
              <label className="ml-2" htmlFor={FILTERENUM.AGE}>
                Age
              </label>
            </div>
          </div>
        </section>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Name</th>
              <th className="text-left">Birthday</th>
            </tr>
          </thead>
          <tbody>
            {sortedPeople().map(({ firstName, lastName, birthday }, index) => (
              <tr key={index}>
                <td>
                  <span className={filter === FILTERENUM.FIRSTNAME ? "font-bold" : ""}>{firstName}</span>{" "}
                  <span className={filter === FILTERENUM.LASTNAME ? "font-bold" : ""}>{lastName}</span>
                </td>
                <td className={filter === FILTERENUM.AGE ? "font-bold" : ""}>
                  {getDateFormat(birthday)}, Age: {getAge(birthday)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default App;
