import React from 'react';

interface Props {
  onMouseEnter: () => void;
}

export default ({ onMouseEnter }: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="76" height="66" viewBox="0 0 76 66" onClick={onMouseEnter}>
    <g id="noun_menu_1769468" transform="translate(-12 -17)">
      <g id="그룹_1" data-name="그룹 1" transform="translate(0 -952.362)">
        <path
          id="패스_1"
          data-name="패스 1"
          d="M16,969.362a4,4,0,0,0,0,8H84a4,4,0,0,0,0-8Zm0,29a4,4,0,1,0,0,8H84a4,4,0,0,0,0-8Zm0,29a4,4,0,0,0,0,8H84a4,4,0,0,0,0-8Z"
        />
      </g>
    </g>
  </svg>
);
