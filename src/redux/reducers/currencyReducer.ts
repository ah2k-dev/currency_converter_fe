import currenctConstants from "../constants/currencyConstants";
interface CurrencyState {
  loading: boolean;
  currencies: {
    label: string;
    value: string;
  }[];
  conversions: {
    from: string;
    to: {
      [key: string]: number;
    };
    amount: number;
    date: string;
  }[];
  error: string | null;
}

const initialState: CurrencyState = {
  loading: false,
  currencies: [],
  conversions: [],
  error: null,
};

const currencyReducer = (state = initialState, action: any): CurrencyState => {
  switch (action.type) {
    case currenctConstants.FETCH_CURRENCY_REQUEST:
    case currenctConstants.CONVERT_CURRENCY_REQUEST:
      return { ...state, loading: true };
    case currenctConstants.FETCH_CURRENCY_SUCCESS:
      return { ...state, loading: false, currencies: action.payload };
    case currenctConstants.FETCH_CURRENCY_FAILURE:
    case currenctConstants.CONVERT_CURRENCY_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case currenctConstants.CONVERT_CURRENCY_SUCCESS:
      return {
        ...state,
        loading: false,
        conversions: [
          {
            from: action.payload.from,
            to: action.payload.to,
            amount: action.payload.amount,
            date: new Date().toISOString(),
          },
          ...state.conversions,
        ],
      };
    default:
      return state;
  }
};

export default currencyReducer;
