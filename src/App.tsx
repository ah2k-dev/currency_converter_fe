import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Inputs from "./components/Inputs";
import { fetchCurrencies } from "./redux/actions/currencyActions";
import { AppDispatch } from "./redux/store";
import Loader from "./components/Loader";
import Conversions from "./components/Conversions";

function App() {
  const dispatch: AppDispatch = useDispatch();
  const { currencies } = useSelector((state: any) => state.currency);
  useEffect(() => {
    !currencies.length && dispatch(fetchCurrencies());
  }, []);
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="bg-dark text-light border border-secondary rounded p-4 w-100 h-100"
        style={{ maxWidth: "500px", overflowY: "auto" }}
      >
        <h3 className="text-center">Currency Converter</h3>
        {!currencies.length ? <Loader /> : <>
          <Inputs />
          <Conversions />
        </>}
      </div>
    </div>
  );
}

export default App;
