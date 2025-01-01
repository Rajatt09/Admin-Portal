import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import SearchBar from '../../components/Searchbar/Searchbar'

const Dashboard = () => {
  const handleSearch = (searchTerm) => {
    // Handle search functionality here
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 ml-16 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mr-4 mt-1">Dashboard</h1>
            <SearchBar onSearch={handleSearch} />
          </div>
          {/* Dashboard Components Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
            {/* Example Dashboard Component 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium mb-4">Component 1</h2>
              {/* Your component content */}
            </div>

            {/* Example Dashboard Component 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium mb-4">Component 2</h2>
              {/* Your component content */}
            </div>

            {/* Add more components as needed */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium mb-4">Component 3</h2>
              {/* Your component content */}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium mb-4">Component 4</h2>
              {/* Your component content */}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard