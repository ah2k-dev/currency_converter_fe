import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { currencyConvert } from "../redux/actions/currencyActions";
import Multiselect from "multiselect-react-dropdown";
import Loader from "./Loader";

const Inputs: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { loading, currencies } = useSelector((state: any) => state.currency);
  const [baseCurrency, setBaseCurrency] = React.useState<string>("EUR");
  const [targetCurrencies, setTargetCurrencies] = React.useState<string[]>([
    "USD",
  ]);
  const [amount, setAmount] = React.useState<number>(1);

  const convert = () => {
    dispatch(currencyConvert(baseCurrency, targetCurrencies, amount));
  };

  return (
    <div>
      {currencies.length > 0 && (
        <div className="row justify-content-between mt-3">
          <Multiselect
            options={currencies}
            singleSelect
            onSelect={(selectedList, selectedItem) =>
              setBaseCurrency(selectedItem.value)
            }
            selectedValues={[
              currencies.find((item: any) => item.value === baseCurrency),
            ]}
            displayValue="label"
            placeholder="Select Base Currency"
            style={{
              chips: { background: "#343a40" },
              searchBox: { color: "white", border: "1px solid #6c757d" },
              multiselectContainer: {
                color: "#343a40",
              },
            }}
            className="col-12 mb-1"
          />
          <Multiselect
            options={currencies}
            onSelect={(selectedList, selectedItem) =>
              setTargetCurrencies(selectedList.map((item: any) => item.value))
            }
            selectedValues={currencies.filter((item: any) =>
              targetCurrencies.includes(item.value)
            )}
            displayValue="label"
            placeholder="Select Target Currencies"
            style={{
              chips: { background: "#343a40" },
              searchBox: { color: "white", border: "1px solid #6c757d" },
              multiselectContainer: {
                color: "#343a40",
              },
            }}
            className="col-12 mb-1"
          />
          <input
            type="number"
            className="col-8 mb-3 ms-2 bg-dark text-light border border-secondary rounded p-2"
            placeholder="Enter Amount"
            value={amount}
            onChange={(event) => setAmount(parseFloat(event.target.value))}
          />
          <button
            className="btn btn-primary col-3 me-2 h-100 bg-dark text-light border border-secondary rounded p-2"
            onClick={convert}
            disabled={loading}
          >
            Convert
          </button>
        </div>
      )}
      {loading && <Loader />}
    </div>
  );
};

export default Inputs;
