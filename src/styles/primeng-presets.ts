import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

export const Noir = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{zinc.50}',
      100: '{zinc.100}',
      200: '{zinc.200}',
      300: '{zinc.300}',
      400: '{zinc.400}',
      500: '{zinc.500}',
      600: '{zinc.600}',
      700: '{zinc.700}',
      800: '{zinc.800}',
      900: '{zinc.900}',
      950: '{zinc.950}',
    },
    colorScheme: {
      light: {
        primary: {
          color: '{zinc.950}',
          inverseColor: '#ffffff',
          hoverColor: '{zinc.900}',
          activeColor: '{zinc.800}',
        },
        highlight: {
          background: '{zinc.950}',
          focusBackground: '{zinc.700}',
          color: '#ffffff',
          focusColor: '#ffffff',
        },
      },
      dark: {
        primary: {
          color: '{zinc.200}',
          inverseColor: '{zinc.950}',
          hoverColor: '{zinc.100}',
          activeColor: '{zinc.200}',
        },
        highlight: {
          background: 'rgba(250, 250, 250, .16)',
          focusBackground: 'rgba(250, 250, 250, .24)',
          color: '{zinc.400}',
          focusColor: 'rgba(255,255,255,.87)',
        },
      },
    },

    formField: {
      paddingX: '0.5rem',
      paddingY: '0.450rem',
    },
    list: {
      padding: '0.1rem 0.1rem',
      header: {
        padding: '0.5rem 1rem 0.25rem 1rem',
      },
      option: {
        padding: '0.2rem 0.3rem',
        borderRadius: '{border.radius.sm}',
      },
      optionGroup: {
        padding: '0.2rem 0.3rem',
        fontWeight: '600',
      },
    },
  },
  components: {
    datatable: {
      header: {
        background: '{content.background}',
        borderColor: '{datatable.border.color}',
        color: '{content.color}',
        borderWidth: '0 0 1px 0',
        padding: '0.5rem 0.75rem',
      },
      headerCell: {
        background: '{content.background}',
        hoverBackground: '{content.hover.background}',
        selectedBackground: '{highlight.background}',
        borderColor: '{datatable.border.color}',
        color: '{content.color}',
        hoverColor: '{content.hover.color}',
        selectedColor: '{highlight.color}',
        gap: '0.3rem',
        padding: '0.5rem 0.75rem',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '-1px',
          shadow: '{focus.ring.shadow}',
        },
      },
      bodyCell: {
        padding: '0.5rem 0.75rem',
        fontSize: '2px',
        minHeight: '20px',
      },
    },
  },
});
