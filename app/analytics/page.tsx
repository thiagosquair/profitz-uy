const AnalyticsPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <header className="text-center py-4">
        <h1 className="text-3xl font-semibold text-gray-900">Analytics Dashboard</h1>
      </header>

      <main className="container mx-auto px-4">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Total Users</h2>
            <p className="text-3xl font-bold text-gray-700">1,234</p>
            <p className="text-sm text-gray-500 mt-2">
              <span className="text-green-500">+10%</span> from last month
            </p>
            <div className="mt-4">
              <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                View Details
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Page Views</h2>
            <p className="text-3xl font-bold text-gray-700">5,678</p>
            <p className="text-sm text-gray-500 mt-2">
              <span className="text-red-500">-5%</span> from last month
            </p>
            <div className="mt-4">
              <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                View Details
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">New Signups</h2>
            <p className="text-3xl font-bold text-gray-700">89</p>
            <p className="text-sm text-gray-500 mt-2">
              <span className="text-green-500">+20%</span> from last month
            </p>
            <div className="mt-4">
              <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                View Details
              </button>
            </div>
          </div>
        </section>

        {/* Charts Section */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Charts</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart 1 */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">User Growth</h3>
              {/* Placeholder for Chart */}
              <div className="h-48 bg-gray-100 rounded"></div>
            </div>

            {/* Chart 2 */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Traffic Sources</h3>
              {/* Placeholder for Chart */}
              <div className="h-48 bg-gray-100 rounded"></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="text-center py-4 mt-8">
        <p className="text-gray-500">© 2023 Analytics Dashboard</p>
      </footer>
    </div>
  )
}

export default AnalyticsPage
