import React, { useState, useEffect } from 'react';
import { CountryModal } from './CountryModal';
import { HeaderModal } from './HeaderModal';
import { FlagType } from './types';
import { CountryFilter } from './CountryFilter';
import { FlagButton } from './FlagButton';
import { useContext } from './CountryContext';
import { CountryList } from './CountryList';
const renderFlagButton = (props) => props.renderFlagButton ? (props.renderFlagButton(props)) : (<FlagButton {...props}/>);
const renderFilter = (props) => props.renderCountryFilter ? (props.renderCountryFilter(props)) : (<CountryFilter {...props}/>);
export const CountryPicker = (props) => {
    const { allowFontScaling = true, countryCode, region, subregion, countryCodes, renderFlagButton: renderButton, renderCountryFilter, filterProps, modalProps, flatListProps, onSelect, withEmoji, withFilter, withCloseButton, withCountryNameButton, withCallingCodeButton, withCurrencyButton, containerButtonStyle, withAlphaFilter = false, withCallingCode = false, withCurrency, withFlag, withModal = true, disableNativeModal, withFlagButton, onClose: handleClose, onOpen: handleOpen, closeButtonImage, closeButtonStyle, closeButtonImageStyle, excludeCountries, placeholder = 'Select Country', preferredCountries, } = props;
    const [state, setState] = useState({
        visible: props.visible || false,
        countries: [],
        filter: '',
        filterFocus: false,
    });
    const { translation, getCountriesAsync } = useContext();
    const { visible, filter, countries, filterFocus } = state;
    useEffect(() => {
        if (state.visible !== props.visible) {
            setState({ ...state, visible: props.visible || false });
        }
    }, [props.visible]);
    const onOpen = () => {
        setState({ ...state, visible: true });
        if (handleOpen) {
            handleOpen();
        }
    };
    const onClose = () => {
        setState({ ...state, filter: '', visible: false });
        if (handleClose) {
            handleClose();
        }
    };
    const setFilter = (filter) => setState({ ...state, filter });
    const setCountries = (countries) => setState({ ...state, countries });
    const onSelectClose = (country) => {
        onSelect(country);
        onClose();
    };
    const onFocus = () => setState({ ...state, filterFocus: true });
    const onBlur = () => setState({ ...state, filterFocus: false });
    const flagProp = {
        allowFontScaling,
        countryCode,
        withEmoji,
        withCountryNameButton,
        withCallingCodeButton,
        withCurrencyButton,
        withFlagButton,
        renderFlagButton: renderButton,
        onOpen,
        containerButtonStyle,
        placeholder: placeholder || 'Select Country',
    };
    useEffect(() => {
        let cancel = false;
        getCountriesAsync(withEmoji ? FlagType.EMOJI : FlagType.FLAT, translation, region, subregion, countryCodes, excludeCountries, preferredCountries, withAlphaFilter)
            .then((countries) => (cancel ? null : setCountries(countries)))
            .catch(console.warn);
        return () => {
            cancel = true;
        };
    }, [translation, withEmoji]);
    return (<>
      {withModal && renderFlagButton(flagProp)}
      <CountryModal {...{ visible, withModal, disableNativeModal, ...modalProps }} onRequestClose={onClose} onDismiss={onClose}>
        <HeaderModal {...{
        withFilter,
        onClose,
        closeButtonImage,
        closeButtonImageStyle,
        closeButtonStyle,
        withCloseButton,
    }} renderFilter={(props) => renderFilter({
            ...props,
            allowFontScaling,
            renderCountryFilter,
            onChangeText: setFilter,
            value: filter,
            onFocus,
            onBlur,
            ...filterProps,
        })}/>
        <CountryList {...{
        onSelect: onSelectClose,
        data: countries,
        letters: [],
        withAlphaFilter: withAlphaFilter && filter === '',
        withCallingCode,
        withCurrency,
        withFlag,
        withEmoji,
        filter,
        filterFocus,
        flatListProps,
    }}/>
      </CountryModal>
    </>);
};
//# sourceMappingURL=CountryPicker.js.map