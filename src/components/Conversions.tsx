import moment from "moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";
const Conversions: React.FC = () => {
  const { conversions } = useSelector((state: any) => state.currency);
  return (
    <div className="conversion">
      <h5>Conversions</h5>
      {conversions.length > 0 ? (
        conversions.map((conversion: any, index: number) => (
          <Conversion conversion={conversion} ind={index} />
        ))
      ) : (
        <Conversion
          conversion={{
            from: "N/A",
            to: { "N/A": 0 },
            amount: 0,
            date: "N/A",
          }}
          ind={0}
        />
      )}
    </div>
  );
};

const Conversion: React.FC<{
  conversion: {
    from: string;
    to: {
      [key: string]: number;
    };
    amount: number;
    date: string;
  };
  ind: number;
}> = ({ conversion, ind }) => {
  const [showAll, setShowAll] = useState<boolean>(false);

  const handleToggle = () => {
    setShowAll((prev) => !prev);
  };

  const displayedCurrencies = showAll
    ? Object.entries(conversion.to)
    : Object.entries(conversion.to).slice(0, 3);
  return (
    <div
      className="conversion-item p-3 mb-3"
      style={{
        minWidth: "300px",
        border: ind === 0 ? "1px solid green" : "1px solid #6c757d",
        borderRadius: "10px",
      }}
    >
      <p className="text-secondary mb-2 small fw-medium">
        {moment(conversion.date).format("DD-MM-YYYY hh:mm a")}
      </p>
      <div className="d-flex justify-content-between align-items-start">
        {/* From Section */}
        <div className="flex-grow-1" style={{ width: "35%" }}>
          <h6 className="text-secondary">{conversion.from || "N/A"}</h6>
          <p className="fw-bold">
            {conversion.amount % 1 === 0
              ? conversion.amount
              : conversion.amount.toFixed(8).replace(/\.?0+$/, "")}
          </p>
        </div>

        {/* Arrow Section */}
        <div
          className="align-self-center text-center me-4"
          style={{ width: "10%" }}
        >
          <img
            src="/images/right-arrow.png"
            alt="arrow"
            className="img-fluid"
            style={{ width: "32px" }}
          />
        </div>

        {/* To Section */}
        <div className="flex-grow-1" style={{ width: "55%" }}>
          {displayedCurrencies.map(([key, value]) => (
            <div key={key} className="mb-1">
              <h6 className="text-secondary">{key || "N/A"}</h6>
              <p className="fw-bold">
                {value % 1 === 0
                  ? value
                  : value.toFixed(8).replace(/\.?0+$/, "")}
              </p>
            </div>
          ))}
          {Object.keys(conversion.to).length > 3 && (
            <button
              className="btn btn-link p-0 text-primary small"
              onClick={handleToggle}
            >
              {showAll ? "See Less" : "See More"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Conversions;
