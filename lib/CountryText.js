import React from 'react';
import { Text } from 'react-native';
import { useTheme } from './CountryTheme';
export const CountryText = (props) => {
    const { fontFamily, fontSize, onBackgroundTextColor } = useTheme();
    return (<Text {...props} style={{ fontFamily, fontSize, color: onBackgroundTextColor }}/>);
};
//# sourceMappingURL=CountryText.js.map