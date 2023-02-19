import {extendBaseTheme, extendTheme} from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
      global: {
          body: {
              'background': 'draft.global.background'
          }
      },
  },
  colors: {
      fileupload: {
          background: {
              active: 'RGBA(255, 255, 255, 0.9)',
              inactive: 'RGBA(255, 255, 255, 0.7)'
          }
      },
      card: {
          blank: '#4A5568' // gray 600
      },
      draft: {
          global: {
              background: '#1A202C' // gray 800
          },
          container: {
              background: '#2D3748' // gray 700
          },
      },
  }
});