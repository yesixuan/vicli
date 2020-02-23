import React from 'react'

const Index<%= (rootOptions.plugins && rootOptions.plugins['@vue/cli-plugin-typescript']) ? `: React.FC` : `` %> = () => (
  <div className="App">
    <header className="App-header">
      <h3>Index page</h3>
    </header>
  </div>
)

export default Index
