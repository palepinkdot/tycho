import color from 'color';
import { cloneDeep, merge } from 'lodash';

import makeDefaultThemeConfig from '../default';
import * as legacyStyles from '../legacy';

export default (brandPrimary: string) => {
  const defaultStyles = makeDefaultThemeConfig(brandPrimary);
  /*
  let brandPrimaryColor = color(legacyStyles.themeBrandPrimary);
  try {
    brandPrimaryColor = color(defaultStyles.brandPrimary);
  } catch {
    // Ignore invalid color and fall back to default.
  }
  */

  const colorBackground = legacyStyles.darkThemeGrayDarkest;
  const colorText = legacyStyles.darkThemeTextColor;
  const inputColor = legacyStyles.darkThemeGrayLightest;
  const inputBackground = legacyStyles.themeGrayDark;
  const inputBorder = `1px solid ${legacyStyles.darkThemeGrayLight}`;
  const inputPrefixColor = color(legacyStyles.darkThemeGrayLighter)
    .lighten(0.3)
    .hex();
  const buttonSecondaryTextColor = legacyStyles.darkThemeTextColor;
  const selectColor = inputColor;
  const drawerBg = color(colorBackground).lighten(0.3).hex();

  const services = merge({}, defaultStyles.services, {
    listItems: {
      borderColor: legacyStyles.darkThemeGrayDarker,
      hoverBgColor: legacyStyles.darkThemeGrayDarker,
      disabled: {
        color: legacyStyles.darkThemeGray,
      },
    },
  });

  return {
    ...defaultStyles,

    colorBackground,
    colorContentBackground: legacyStyles.darkThemeGrayDarkest,
    colorBackgroundSubscriptionContainer: legacyStyles.themeBrandInfo,

    colorHeadline: legacyStyles.darkThemeTextColor,
    colorText: legacyStyles.darkThemeTextColor,

    defaultContentBorder: legacyStyles.themeGrayDark,

    // Loader
    colorFullscreenLoaderSpinner: '#FFF',
    colorWebviewLoaderBackground: color(legacyStyles.darkThemeGrayDarkest)
      .alpha(0.5)
      .rgb()
      .string(),

    // Input
    labelColor: legacyStyles.darkThemeTextColor,
    inputColor,
    inputBackground,
    inputBorder,
    inputPrefixColor,
    inputPrefixBackground: legacyStyles.darkThemeGray,
    inputDisabledOpacity: 0.5,
    inputScorePasswordBackground: legacyStyles.darkThemeGrayDark,
    inputModifierColor: color(legacyStyles.darkThemeGrayLighter)
      .lighten(0.3)
      .hex(),
    inputPlaceholderColor: color(legacyStyles.darkThemeGrayLighter)
      .darken(0.1)
      .hex(),

    // Toggle
    toggleBackground: legacyStyles.darkThemeGray,
    toggleButton: legacyStyles.darkThemeGrayLighter,

    // Button
    buttonPrimaryTextColor: legacyStyles.darkThemeTextColor,

    buttonSecondaryBackground: legacyStyles.darkThemeGrayLighter,
    buttonSecondaryTextColor,

    buttonDangerTextColor: legacyStyles.darkThemeTextColor,

    buttonWarningTextColor: legacyStyles.darkThemeTextColor,

    buttonLoaderColor: {
      primary: '#FFF',
      secondary: buttonSecondaryTextColor,
      success: '#FFF',
      warning: '#FFF',
      danger: '#FFF',
      inverted: defaultStyles.brandPrimary,
    },

    // Select
    selectBackground: inputBackground,
    selectBorder: inputBorder,
    selectColor,
    selectToggleColor: inputPrefixColor,
    selectPopupBackground: legacyStyles.darkThemeGrayLight,
    selectOptionColor: '#FFF',
    selectOptionBorder: `1px solid ${color(legacyStyles.darkThemeGrayLight)
      .darken(0.2)
      .hex()}`,
    selectOptionItemHover: color(legacyStyles.darkThemeGrayLight)
      .darken(0.2)
      .hex(),
    selectOptionItemHoverColor: selectColor,
    selectSearchColor: inputBackground,

    // Modal
    colorModalOverlayBackground: color(legacyStyles.darkThemeBlack)
      .alpha(0.9)
      .rgb()
      .string(),
    colorModalBackground: legacyStyles.darkThemeGrayDark,

    // Services
    services,

    // Service Icon
    serviceIcon: merge({}, defaultStyles.serviceIcon, {
      isCustom: {
        border: `1px solid ${legacyStyles.darkThemeGrayDark}`,
      },
    }),

    // Workspaces
    workspaces: merge({}, defaultStyles.workspaces, {
      settings: {
        listItems: cloneDeep(services.listItems),
      },
      drawer: {
        background: drawerBg,
        addButton: {
          color: legacyStyles.darkThemeGrayLighter,
          hoverColor: legacyStyles.darkThemeGraySmoke,
        },
        listItem: {
          border: color(drawerBg).lighten(0.2).hex(),
          hoverBackground: legacyStyles.darkThemeGrayDark,
          activeBackground: legacyStyles.darkThemeGrayDarker,
          name: {
            color: colorText,
            activeColor: 'white',
          },
          services: {
            color: color(colorText).darken(0.5).hex(),
            active: color(colorText).darken(0.5).hex(),
          },
        },
      },
    }),

    // Todos
    todos: merge({}, defaultStyles.todos, {
      todosLayer: {
        borderLeftColor: legacyStyles.darkThemeGrayDarker,
      },
      toggleButton: {
        background: defaultStyles.styleTypes.primary.accent,
        textColor: defaultStyles.styleTypes.primary.contrast,
        shadowColor: 'rgba(0, 0, 0, 0.2)',
      },
      dragIndicator: {
        background: legacyStyles.themeGrayLight,
      },
    }),
  };
};
