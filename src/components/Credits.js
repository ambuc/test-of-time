'use strict';

import React from 'react';

export class Credits extends React.Component {

  render() {
    return (
        <div className='Credits'>
          <p>Built by <a href="http://julianrosenblum.com">Julian</a> and <a href="http://jbuckland.com">James</a> using data from Wikipedia originally scraped by <a href="http://vizgr.org/historical-events/">Daniel Hienert</a>. Many thanks to <a href="http://casesandberg.com/">Case</a>. See the source on <a href="https://github.com/ambuc/test-of-time">Github</a>. </p>
        </div>
    );
  }
}

export default Credits;
