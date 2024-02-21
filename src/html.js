// src/html.js

import React from "react";
import PropTypes from "prop-types";

const HTML = ({ body, bodyAttributes, headComponents, htmlAttributes, postBodyComponents, preBodyComponents }) => {
  // Function to hide the loading indicator
  const hideLoadingIndicator = () => {
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
      loadingIndicator.style.display = 'none';
    }
  };

  return (
    <html {...htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        {headComponents}
      </head>
      <body {...bodyAttributes}>
        {preBodyComponents}
        {/* Render a loading indicator with fixed dimensions */}
        <div id="loading-indicator" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p>Loading...</p>
        </div>
        {/* Use visibility:hidden to reserve space for the loading indicator */}
        <div key={`body`} id="___gatsby" style={{ visibility: 'hidden' }} dangerouslySetInnerHTML={{ __html: body }} />
        {postBodyComponents}

        {/* Script to hide the loading indicator once the bundle is loaded */}
        <script defer dangerouslySetInnerHTML={{
          __html: `
            window.onload = function() {
              (${hideLoadingIndicator})();
              document.getElementById('___gatsby').style.visibility = 'visible';
            };
          `
        }} />
      </body>
    </html>
  );
};

HTML.propTypes = {
  body: PropTypes.string.isRequired,
  bodyAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  htmlAttributes: PropTypes.object,
  postBodyComponents: PropTypes.array,
  preBodyComponents: PropTypes.array,
};

export default HTML;
