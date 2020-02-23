import React from 'react'

const App<%= (rootOptions.plugins && rootOptions.plugins['@vue/cli-plugin-typescript']) ? `: React.FC` : `` %> = () => <>
  <div>
    <header>
      Hello React
    </header>
  </div>
</>

export default App
