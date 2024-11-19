import axios from "axios";
import { Dispatch } from "redux";
import currencyConstants from "../constants/currencyConstants";

export const fetchCurrencies = () => async (dispatch: Dispatch) => {
  dispatch({ type: currencyConstants.FETCH_CURRENCY_REQUEST });
  try {
    const response = await axios.get(
      "https://compassionate-optimism-production.up.railway.app/currency-conversion"
    );
    if (response.status !== 200) {
      throw new Error("Failed to fetch currencies");
    }
    dispatch({
      type: currencyConstants.FETCH_CURRENCY_SUCCESS,
      payload: response.data.data.currencies,
    });
  } catch (error) {
    dispatch({
      type: currencyConstants.FETCH_CURRENCY_FAILURE,
      payload: (error as Error).message || "Failed to fetch currencies",
    });
  }
};

export const currencyConvert =
  (from: string, to: string[], amount: number) =>
  async (dispatch: Dispatch) => {
    dispatch({ type: currencyConstants.CONVERT_CURRENCY_REQUEST });
    try {
      const response = await axios.post(
        `https://compassionate-optimism-production.up.railway.app/currency-conversion`,
        {
          from,
          to,
          amount,
        }
      );
      if (response.status !== 200) {
        throw new Error("Failed to convert currencies");
      }
      dispatch({
        type: currencyConstants.CONVERT_CURRENCY_SUCCESS,
        payload: {
          conversion: response.data.data.conversions,
          from,
          to: response.data.data.conversions,
          amount,
        },
      });
    } catch (error) {
      dispatch({
        type: currencyConstants.CONVERT_CURRENCY_FAILURE,
        payload: (error as Error).message || "Failed to convert currencies",
      });
    }
  };
