// src/html.js

import React from "react";
import PropTypes from "prop-types";

const HTML = ({ body, bodyAttributes, headComponents, htmlAttributes, postBodyComponents, preBodyComponents }) => {
  const hideLoadingIndicator = () => {
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
      loadingIndicator.style.display = 'none';
    }
  };

  // Function to check if the component is a script
  const isScript = component => component.type === 'script';
  return (
    <html {...htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <script type="text/javascript" src="/~partytown/partytown.js"></script>
        {headComponents}
        {postBodyComponents.filter(isScript).map((script, index) => {
          {console.log("here how many time")}
          const scriptProps = { ...script.props };
          scriptProps.type = "text/partytown"
          scriptProps.defer = true; // Add defer attribute to script components
          return React.createElement('script', { ...scriptProps, key: index });
        })}
      </head>
      <body {...bodyAttributes}>
        {preBodyComponents}
        {/* Render a loading indicator with fixed dimensions */}
        <div id="loading-indicator" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="loading-skeleton" style={{ width: '100%', height: '10%0', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
            <div className="loading-skeleton-item" style={{ height: '13vh', width: "100%", marginBottom: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}></div>
            <div className="loading-skeleton-item" style={{ height: '65vh', width: "100%", marginBottom: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}></div>
            <div className="loading-skeleton-item" style={{ height: '15vh', width: "100%", backgroundColor: '#f0f0f0', borderRadius: '4px' }}></div>
          </div>
        </div>
        {/* Use visibility:hidden to reserve space for the loading indicator */}
        <div key={`body`} id="___gatsby" style={{ visibility: 'hidden' }} dangerouslySetInnerHTML={{ __html: body }} />
        {postBodyComponents.filter(component => !isScript(component))}
        <script dangerouslySetInnerHTML={{
          __html: `
            window.onload = function() {
              (${hideLoadingIndicator})();
              document.getElementById('___gatsby').style.visibility = 'visible';
            };
          `
        }} />
        {postBodyComponents}
        {/* Script to hide the loading indicator once the bundle is loaded */}
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
