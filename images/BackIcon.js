import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const BackCIcon = props => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={35} height={35} {...props}>
    <Path
      style={{
        stroke: 'none',
        fillRule: 'nonzero',
        fill: '#010002',
        fillOpacity: 1,
      }}
      d="m5.945 17.023 7.293-7.289-.668-.671L4.133 17.5l8.437 8.438.668-.672-7.293-7.293h23.992v-.95Zm0 0"
    />
    <Path
      style={{
        stroke: 'none',
        fillRule: 'nonzero',
        fill: '#010002',
        fillOpacity: 1,
      }}
      d="M17.5 0C7.852 0 0 7.852 0 17.5S7.852 35 17.5 35 35 27.148 35 17.5 27.148 0 17.5 0Zm0 34.172C8.309 34.172.828 26.692.828 17.5.828 8.305 8.308.828 17.5.828c9.191 0 16.672 7.477 16.672 16.672 0 9.191-7.48 16.672-16.672 16.672Zm0 0"
    />
  </Svg>
);

export default BackCIcon;
