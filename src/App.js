import './App.css';
import CurrenWeather from './components/current-weather/current-weather';
import Search from './components/search/search';

function App() {

  const handleOnSearchChange = (searchData) =>{
    console.log(searchData);
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}/>
      <CurrenWeather/>
    </div>
  );
}

export default App;
