import { useEffect, useState } from 'react';
import './Kalkulyator.css';

const Kalkulyator = () => {
  const [input, setInput] = useState('');
  const [activeKey, setActiveKey] = useState(null);

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => setInput('');
  const handleBackspace = () => setInput((prev) => prev.slice(0, -1));

  const handleEqual = () => {
    try {
      const result = eval(input).toString();
      setInput(result);
      setHistory((prev) => [...prev, `${input} = ${result}`]);
    } catch {
      setInput('Xato');
    }
  };

  // Keyboard event
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;
      setActiveKey(key);

      if (/^[0-9+\-*/.%]$/.test(key)) handleClick(key);
      else if (key === 'Enter' || key === '=') handleEqual();
      else if (key === 'Backspace') handleBackspace();
      else if (key === 'Delete') handleClear();
    };

    const handleKeyUp = () => setActiveKey(null);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [input]);

  const renderButton = (label, value = label) => (
    <button className={activeKey === value ? 'active' : ''} onClick={() => handleClick(value)}>
      {label}
    </button>
  );

  return (
    <div className='calculator-wrapper'>
      <div className='calculator'>
        <input type='text' value={input} readOnly className='calculator-input' />
        <div className='calculator-buttons'>
          <button onClick={handleClear} className='clear'>
            C
          </button>
          <button onClick={handleBackspace}>⌫</button>
          {renderButton('%')}
          {renderButton('÷', '/')}

          {renderButton('7')}
          {renderButton('8')}
          {renderButton('9')}
          {renderButton('×', '*')}

          {renderButton('4')}
          {renderButton('5')}
          {renderButton('6')}
          {renderButton('−', '-')}

          {renderButton('1')}
          {renderButton('2')}
          {renderButton('3')}
          {renderButton('+')}

          <button
            className={`zero ${activeKey === '0' ? 'active' : ''}`}
            onClick={() => handleClick('0')}
          >
            0
          </button>
          {renderButton('.')}
          <button onClick={handleEqual} className='equal'>
            =
          </button>
        </div>
      </div>
    </div>
  );
};

export default Kalkulyator;
