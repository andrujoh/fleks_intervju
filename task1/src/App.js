import people from "./data.json";
import { useState } from "react";

function getDateFormat(date) {
  return new Date(date).toLocaleDateString("en-NO");
}

const FILTERENUM = {
  FIRSTNAME: "firstName",
  LASTNAME: "lastName",
  BIRTHDAY: "birthday",
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
    const copyOfPeople = [...people];
    if ([FILTERENUM.FIRSTNAME, FILTERENUM.LASTNAME].includes(filter)) {
      return copyOfPeople.sort((a, b) => a[filter].localeCompare(b[filter]));
    } else if (filter === FILTERENUM.BIRTHDAY) {
      return copyOfPeople.sort((a, b) => getAge(a[filter]) - getAge(b[filter]));
    } else {
      return people;
    }
  };

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
                checked={filter === FILTERENUM.BIRTHDAY}
                onChange={changeFilter}
                value={FILTERENUM.BIRTHDAY}
                id={FILTERENUM.BIRTHDAY}
                type="radio"
                name="filter"
              />
              <label className="ml-2" htmlFor={FILTERENUM.BIRTHDAY}>
                Age
              </label>
            </div>
          </div>
          <button className="p-2 mb-2 bg-gray-200" type="button" onClick={() => setFilter(null)}>
            Clear filter
          </button>
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
                  {getDateFormat(birthday)}, Age:{" "}
                  <span className={filter === FILTERENUM.BIRTHDAY ? "font-bold" : ""}>{getAge(birthday)}</span>
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
