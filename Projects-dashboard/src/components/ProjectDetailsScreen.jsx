import React, { useEffect, useState } from 'react';

export default function DetailsPage({ project, onBack }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 const apiHandlers = {
  CFP: async () => { return []; },
  SFP: async () => { return []; },
  SOIC: async () => { return []; },
  MAS: async () => { return []; },
  ORES: async () => { return []; },
  ORPRO: async () => { return []; },
  SUNCROP: async () => { return []; },
  INDIGO: async () => { return []; },
  SAXSON: async () => { return []; },
  ISMIE: async () => { return []; },
  CAPRICON: async () => { return []; },
};

  useEffect(() => {
    setLoading(true);
    setError(null);
    const handler = apiHandlers[project];
    if (handler) {
      handler()
        .then(setRows)
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    } else {
      setError('No API handler for this project');
      setLoading(false);
    }
  }, [project]);

  return (
    <div className="details-page">
      <div className="details-container">
        <div className="details-header">
          <div>
            <button className="back-btn" onClick={onBack}>
              ← Back
            </button>
            <h1 className="details-title">Project Environment Dashboard</h1>
            <p className="details-subtitle">{project}</p>
          </div>
        </div>
        <div className="details-card">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div style={{ color: 'red' }}>Error: {error}</div>
          ) : (
            <table className="details-table">
              <thead>
                <tr>
                  <th>Environment</th>
                  <th>Package Version</th>
                  <th>Tickets</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.env}>
                    <td>
                      <span className="env-badge">{row.env}</span>
                    </td>
                    <td className="pkg-cell">
                      {row.pkg === '-' ? (
                        <span className="pkg-empty">Not Deployed</span>
                      ) : (
                        row.pkg
                      )}
                    </td>
                    <td>
                      {row.tickets && row.tickets.length > 0 ? (
                        <select
                          defaultValue={row.tickets[0]}
                          className="ticket-select"
                        >
                          {row.tickets.map(ticket => (
                            <option key={ticket} value={ticket}>
                              #{ticket}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className="no-ticket">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}