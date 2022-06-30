import React from 'react';

import styled from 'styled-components';

const StyledSunIcon = styled.svg`
  & circle,
  path {
    fill: #f90;
  }
`;

const SunIcon = () => (
  <StyledSunIcon viewBox="0 0 89.002 89">
    <g transform="translate(-5.499 -5.334)">
      <path d="M52.432,20.219A2.432,2.432,0,0,1,50,22.65h0a2.432,2.432,0,0,1-2.431-2.431V7.765A2.432,2.432,0,0,1,50,5.334h0a2.432,2.432,0,0,1,2.433,2.431Z" />
      <circle cx="24.163" cy="24.163" r="24.163" transform="translate(25.837 25.469)" />
      <path d="M47.568,79.447A2.434,2.434,0,0,1,50,77.015h0a2.433,2.433,0,0,1,2.431,2.432V91.9A2.433,2.433,0,0,1,50,94.334h0A2.434,2.434,0,0,1,47.568,91.9Z" />
      <path d="M79.613,52.265a2.431,2.431,0,0,1-2.43-2.433h0a2.431,2.431,0,0,1,2.43-2.43H92.069a2.432,2.432,0,0,1,2.432,2.43h0a2.434,2.434,0,0,1-2.432,2.433Z" />
      <path d="M20.385,47.4a2.432,2.432,0,0,1,2.432,2.432h0a2.433,2.433,0,0,1-2.432,2.431H7.931A2.433,2.433,0,0,1,5.5,49.834h0A2.432,2.432,0,0,1,7.931,47.4Z" />
      <path d="M72.66,30.612a2.431,2.431,0,0,1-3.439,0h0a2.434,2.434,0,0,1,0-3.438l8.808-8.807a2.432,2.432,0,0,1,3.438,0h0a2.434,2.434,0,0,1,0,3.439Z" />
      <path d="M27.34,69.055a2.432,2.432,0,0,1,3.439,0h0a2.432,2.432,0,0,1,0,3.438L21.972,81.3a2.433,2.433,0,0,1-3.438,0h0a2.433,2.433,0,0,1,0-3.44Z" />
      <path d="M69.221,72.492a2.432,2.432,0,0,1,0-3.438h0a2.433,2.433,0,0,1,3.438,0l8.807,8.806a2.434,2.434,0,0,1,0,3.438h0a2.432,2.432,0,0,1-3.44,0Z" />
      <path d="M30.778,27.173a2.431,2.431,0,0,1,0,3.439h0a2.433,2.433,0,0,1-3.438,0l-8.806-8.807a2.432,2.432,0,0,1,0-3.438h0a2.432,2.432,0,0,1,3.439,0Z" />
    </g>
  </StyledSunIcon>
);

export default SunIcon;
