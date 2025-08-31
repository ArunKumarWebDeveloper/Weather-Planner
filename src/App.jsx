import './App.css'
import Navbar from './Components/Navbar'
import Weather from './Components/Weather'
import Planner from './Components/Planner';

function App() {
  const weatherData = {
    city: "New York",
    temperature: 25,
    description: "Sunny",
    icon: "01d"
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <Navbar />
      </aside>
      <main className="content">
        <Weather {...weatherData} />
        <Planner />
      </main>
    </div>
  );
}

export default App;



