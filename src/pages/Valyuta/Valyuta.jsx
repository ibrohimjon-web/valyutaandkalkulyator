import { useEffect, useState } from 'react';
import './Valyuta.css';

const BASE_URL = 'https://open.er-api.com/v6';

const Valyuta = () => {
  const [amount, setAmount] = useState(100);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('UZS');
  const [result, setResult] = useState(null);
  const [lastUpdated, setLastUpdated] = useState('');
  const [rates, setRates] = useState({});
  const [currencies, setCurrencies] = useState([]);

  // Barcha valyutalarni va kurslarni olish
  useEffect(() => {
    fetch(`${BASE_URL}/latest/USD`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result === 'success') {
          setRates(data.rates);
          setCurrencies(Object.keys(data.rates));
          setLastUpdated(data.time_last_update_utc);
        }
      })
      .catch((err) => console.error('API xatolik:', err));
  }, []);

  // Hisoblash
  useEffect(() => {
    if (!rates[from] || !rates[to]) return;
    const result = (amount / rates[from]) * rates[to];
    setResult(result.toFixed(2));
  }, [amount, from, to, rates]);

  const swapCurrencies = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div className='converter-container-wrapper'>
      <div className='converter-container'>
        <h2>Valyuta Konvertori</h2>

        <label htmlFor='amount'>Miqdor</label>
        <input
          id='amount'
          type='number'
          value={amount}
          min={0}
          onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
        />

        <div className='selectors'>
          <select value={from} onChange={(e) => setFrom(e.target.value)}>
            {currencies.map((cur) => (
              <option key={cur} value={cur}>
                {cur}
              </option>
            ))}
          </select>

          <button className='swap-btn' onClick={swapCurrencies}>
            ⟲
          </button>

          <select value={to} onChange={(e) => setTo(e.target.value)}>
            {currencies.map((cur) => (
              <option key={cur} value={cur}>
                {cur}
              </option>
            ))}
          </select>
        </div>

        {result !== null && (
          <div className='result'>
            <h3>
              {amount} {from} = {result} {to}
            </h3>
            <p className='time'>Oxirgi yangilanish: {lastUpdated}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Valyuta;
