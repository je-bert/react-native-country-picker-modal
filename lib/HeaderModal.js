import React from 'react';
import { View, StyleSheet, } from 'react-native';
import CloseButton from './CloseButton';
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
export const HeaderModal = (props) => {
    const { withFilter, withCloseButton = true, closeButtonImage, closeButtonStyle, closeButtonImageStyle, onClose, renderFilter, } = props;
    return (<View style={styles.container}>
      {withCloseButton && (<CloseButton image={closeButtonImage} style={closeButtonStyle} imageStyle={closeButtonImageStyle} onPress={() => onClose()}/>)}
      {withFilter && renderFilter(props)}
    </View>);
};
//# sourceMappingURL=HeaderModal.js.map