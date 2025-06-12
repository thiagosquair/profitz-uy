const AICoachPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">AI Coach</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Your Personalized AI Learning Companion
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Unlock your full potential with our AI-powered coach. Get personalized guidance, track your progress, and
            achieve your learning goals.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  {/* Heroicon name: outline/globe-alt */}
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-3-1.5m-5.707 1.707l-1.414-1.414m2.828 2.828l-1.414 1.414m2.828-1.414l1.414 1.414m-1.414-2.828l1.414-1.414"
                    />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Personalized Learning Paths</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Our AI analyzes your strengths and weaknesses to create a customized learning path tailored to your
                specific needs.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  {/* Heroicon name: outline/scale */}
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 6l3 1m0 0l-3 9a5.166 5.166 0 005 1.5h9.43a5.166 5.166 0 005-1.5l-3-9m0 0l3-1m-3 1l3 9a5.166 5.166 0 01-5 1.5H6.57a5.166 5.166 0 01-5-1.5l3-9"
                    />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Real-time Progress Tracking</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Monitor your progress with detailed analytics and visualizations. Stay motivated and see how far you've
                come.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  {/* Heroicon name: outline/lightning-bolt */}
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Adaptive Learning Technology</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Our AI adapts to your learning style and pace, providing the right challenges at the right time to
                maximize your learning efficiency.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  {/* Heroicon name: outline/annotation */}
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 8h10M7 12h4m14-1a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Instant Feedback and Support</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Get instant feedback on your progress and access 24/7 support from our AI coach.
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="mt-12 bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Chat with your AI Coach</h3>
        <div className="border border-gray-200 rounded-md p-4 h-64 overflow-y-auto bg-gray-50">
          {/* Chat messages will go here */}
          <p className="text-gray-700">Welcome! How can I help you today?</p>
        </div>
        <div className="mt-4">
          <input
            type="text"
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Type your message..."
          />
          <button className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Send
          </button>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-white py-12 mt-12">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 sm:flex sm:items-center sm:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Ready to get started?</h2>
          <p className="mt-8 text-base text-gray-500 sm:mt-0 sm:ml-5">
            Start your personalized learning journey today.
          </p>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                Get started
              </a>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AICoachPage
