import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={47}
    fill="none"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 46.584v-6.36h30v6.36H0Zm10.714-26.809h8.338l-3.974-12.76h-.156l-4.208 12.76Zm9.74-15.116 8.845 26.923h-6.546l-1.987-6.4H8.922l-2.143 6.4H.624L9.906 4.66C10.806 2.048 11.856 0 15.234 0s4.364 2.056 5.22 4.659Z"
      fill="#EF3124"
    />
  </Svg>
);

export default SvgComponent;
