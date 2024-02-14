import Header from './components/Header'
import Projects from './components/Projects'
import './App.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const App = () => (
  <div className="background-container">
    <Header />
    <Projects optionsList={categoriesList} />
  </div>
)
export default App
