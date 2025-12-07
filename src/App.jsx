import './App.css'
import { HashRouter, Route, Routes } from 'react-router'
import { FavoriteProvider } from './contexts/FavoriteContext'
import Sneakers from './components/Sneakers'
import Home from './components/Home'
import Trending from './components/Trending'
import About from './components/About'
import NavigationBar from './components/NavigationBar'
import Contact from './components/Contact'
import FavoriteScreen from './components/FavoriteScreen'


function App() {
  return (
    <FavoriteProvider>
      <HashRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/trending" element={<Trending/>}></Route>
          <Route path="/sneakers" element={<Sneakers/>}></Route>
          <Route path="/favoriteScreen" element={<FavoriteScreen/>}></Route>
          <Route path="/about" element={<About/>}></Route>
          <Route path="/contact" element = {<Contact/>}></Route>
        </Routes>
      </HashRouter>
    </FavoriteProvider>
  )
}
  
export default App
