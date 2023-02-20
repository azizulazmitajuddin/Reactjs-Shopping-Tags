import { useCallback, useEffect, useState } from "react";
import { data } from "./data";

export default function Home() {
  const [state, setState] = useState(data);
  const [listNumber, setListNumber] = useState([]);
  const [listName, setListName] = useState([]);

  const [valueSelectNumber, setValueSelectNumber] = useState(0);
  const [valueSelect1, setValueSelect1] = useState("");
  const [valueSelect2, setValueSelect2] = useState("");

  const [result, setResult] = useState([]);

  const handleSelect = useCallback((e, type) => {
    if (type === 0) {
      setValueSelectNumber(e.currentTarget?.value);
    } else if (type === 1) {
      setValueSelect1(e.currentTarget?.value);
    } else {
      setValueSelect2(e.currentTarget?.value);
    }
  }, []);

  const handleResult = useCallback(() => {
    const object1 = state.recipients.find((a) => a.name === valueSelect1);
    const object2 = state.recipients.find((a) => a.name === valueSelect2);

    console.log(object1.tags);
    console.log(object2.tags);
    console.log("=====");

    const uniqueSet = new Set(object2.tags);
    const filteredElements = object1.tags.filter((currentValue) => {
      if (valueSelectNumber > 0) {
        if (uniqueSet.has(currentValue)) {
          uniqueSet.delete(currentValue);
          return currentValue;
        }
      } else {
        return currentValue;
      }
    });
    console.log(valueSelectNumber);
    console.log(filteredElements);
    setResult(filteredElements);
  }, [valueSelectNumber, valueSelect1, valueSelect2]);

  const handleReset = () => {
    setValueSelectNumber(0);
    setValueSelect1("");
    setValueSelect2("");
    setResult([]);
  };

  useEffect(() => {
    let number = 0;
    const name = state?.recipients?.map((a) => {
      if (a?.tags?.length > number) {
        number = a.tags.length;
      }

      return a.name;
    });
    var uniqueName = name.filter(
      (value, index, array) => array.indexOf(value) === index
    );

    setListNumber(Array.from(Array(number).keys()));
    setListName(uniqueName);
  }, [state]);

  return (
    <div>
      <div style={styles.header}>
        <h2>Shopping Tags</h2>
      </div>

      <div style={styles.body}>
        <div style={styles.container}>
          <h3 style={{ borderBottom: "1px solid grey" }}>Calculate Tags</h3>

          <div style={styles.subContainer}>
            <p style={styles.para}>Select Number Similar Tag</p>
            <div style={styles.selectContainer}>
              <select
                name="num"
                id="num"
                value={valueSelectNumber}
                onChange={(e) => handleSelect(e, 0)}
              >
                <option value="">Please Select</option>
                {listNumber.map((a, i) => (
                  <option key={i} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={styles.subContainer}>
            <p style={styles.para}>Select First Name</p>
            <div style={styles.selectContainer}>
              <select
                name="name1"
                id="name1"
                value={valueSelect1}
                onChange={(e) => handleSelect(e, 1)}
              >
                <option value="">Please Select</option>
                {listName.map(
                  (a, i) =>
                    a !== valueSelect2 && (
                      <option key={i} value={a}>
                        {a}
                      </option>
                    )
                )}
              </select>
            </div>
          </div>

          <div style={styles.subContainer}>
            <p style={styles.para}>Select Second Name</p>
            <div style={styles.selectContainer}>
              <select
                name="name2"
                id="name2"
                value={valueSelect2}
                onChange={(e) => handleSelect(e, 2)}
              >
                <option value="">Please Select</option>
                {listName.map(
                  (a, i) =>
                    a !== valueSelect1 && (
                      <option key={i} value={a}>
                        {a}
                      </option>
                    )
                )}
              </select>
            </div>
          </div>

          <div style={styles.buttonContainer}>
            <button style={styles.button} onClick={handleReset}>
              Reset
            </button>
            <button style={styles.buttonResult} onClick={handleResult}>
              Show Result
            </button>
          </div>
        </div>

        {result.length > 0 ? (
          <div style={styles.containerResult}>
            <h3 style={{ borderBottom: "1px solid grey", margin: 0 }}>
              Result
            </h3>
            <div style={styles.subContainerResult}>
              {result.length >= valueSelectNumber
                ? result.toString().replace(",", ", ")
                : "no result"}
            </div>
          </div>
        ) : (
          <div style={styles.containerResult}>
            <div style={styles.subContainerResult}>No Result</div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  header: {
    paddingTop: 15,
    paddingBottom: 15,
    color: "black",
    backgroundColor: "oldlace",
    textAlign: "center",
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 50,
  },
  container: {
    border: "2px solid grey",
    borderRadius: 10,
    padding: "0 20px 20px",
    maxWidth: 400,
    margin: "0 auto",
  },
  subContainer: { display: "flex", flexDirection: "row" },
  para: { minWidth: 200 },
  selectContainer: { margin: "1em" },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: "30px 0 0 0",
    textAlign: "center",
  },
  buttonResult: {
    backgroundColor: "deepskyblue",
    color: "white",
    marginRight: 5,
    boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
  },
  button: {
    backgroundColor: "lightgrey",
    color: "black",
    marginRight: 5,
    boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
  },
  containerResult: {
    border: "2px solid grey",
    borderRadius: 10,
    padding: "20px 20px",
    maxWidth: 400,
    margin: "20px auto",
  },
  subContainerResult: {
    borderRadius: 10,
    padding: 10,
  },
};
