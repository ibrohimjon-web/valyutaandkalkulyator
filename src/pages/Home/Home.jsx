import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const BASE_URL = 'https://open.er-api.com/v6/latest/USD';

const Home = () => {
  const [rates, setRates] = useState({});

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        if (data?.result === 'success') {
          setRates({
            USD: data.rates.UZS,
            EUR: data.rates.UZS / data.rates.EUR,
            RUB: data.rates.UZS / data.rates.RUB,
            SAR: data.rates.UZS / data.rates.SAR,
          });
        }
      })
      .catch((err) => console.error('API xatolik:', err));
  }, []);

  return (
    <div className='home'>
      <h1 className='home-title'>Valyuta va Kalkulyator Xizmati</h1>

      <div className='rate-summary'>
        {Object.entries(rates).map(([cur, rate]) => (
          <div className='rate-box' key={cur}>
            <span>1 {cur} </span>
            <strong>{rate.toFixed(2)} UZS</strong>
          </div>
        ))}
      </div>

      <div className='home-links'>
        <Link to='/kalkulyator' className='home-btn'>
          🧮 Kalkulyator
        </Link>
        <Link to='/valyuta' className='home-btn'>
          💱 Valyuta Konvertor
        </Link>
      </div>
    </div>
  );
};

export default Home;
