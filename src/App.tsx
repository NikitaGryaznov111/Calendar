import { useEffect, useState } from 'react';
import InputDate from './components/InputDate/InputDate';
function App() {
  const [theme, setTheme] = useState<string>(
    localStorage.getItem('theme') || 'light'
  );
  const toggleTheme = (): void => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="App">
      <InputDate />

      <button className="btnToggleTheme" type="button" onClick={toggleTheme}>
        Переключить тему на {theme === 'light' ? 'темную' : 'светлую'}
      </button>
    </div>
  );
}

export default App;
