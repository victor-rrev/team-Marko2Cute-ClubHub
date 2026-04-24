import './App.css'
import { useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import Sidebar from './Sidebar.jsx'
import Discover from './Discover.jsx'
import Posts from './Posts.jsx'
import Events from './Events.jsx'
import Account from './Account.jsx'
import AccountProfile from './AccountProfile.jsx'
import ClubList from './ClubList.jsx'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState("discover");

  const handleSearch = () => {
    console.log('Searching for:', searchTerm)
  }

  return (
    <div className="app">
      <Sidebar setPage = {setPage} />
      {page !== "account" && <AccountProfile />}
      <main className = "main-content">
        {page == "discover" && (
          <>
          <header className="header">
          <div className="search-container">
            <CiSearch className="search-icon" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search clubs..."
              className="search-bar"
            />
          </div>
          </header>
          <Discover />
          </>
        )}
        {page == "posts" && <Posts/>}
        {page == "events" && <Events/>}
        {page == "account" && <Account/>}
      </main>
    </div>
  )
}

export default App
