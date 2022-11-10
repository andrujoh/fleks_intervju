import people from "./data.json";
import { useState } from "react";
import { differenceInYears, format } from "date-fns";

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
    return differenceInYears(new Date(), new Date(date));
  }

  function getSortedPeople() {
    const copyOfPeople = [...people];
    if ([FILTERENUM.FIRSTNAME, FILTERENUM.LASTNAME].includes(filter)) {
      return copyOfPeople.sort((a, b) => a[filter].localeCompare(b[filter]));
    } else if (filter === FILTERENUM.BIRTHDAY) {
      return copyOfPeople.sort((a, b) => getAge(a[filter]) - getAge(b[filter]));
    } else {
      return people;
    }
  }

  function getClass(target) {
    return filter === target ? "font-bold" : "";
  }

  return (
    <div className="mx-auto max-w-xl">
      <header>
        <h1 className="text-3xl font-bold">Birthdays</h1>
      </header>
      <main>
        <section>
          <h4>Sort by</h4>
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
          <button className="p-2 my-4 bg-gray-200" onClick={() => setFilter(null)}>
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
            {getSortedPeople().map(({ firstName, lastName, birthday }, index) => (
              <tr key={index}>
                <td>
                  <span className={getClass(FILTERENUM.FIRSTNAME)}>{firstName}</span>{" "}
                  <span className={getClass(FILTERENUM.LASTNAME)}>{lastName}</span>
                </td>
                <td>
                  {format(new Date(birthday), "dd-MM-YYY")}, Age:{" "}
                  <span className={getClass(FILTERENUM.BIRTHDAY)}>{getAge(birthday)}</span>
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
