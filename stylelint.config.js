module.exports = {
  extends: 'stylelint-config-standard',
  ignoreFiles: [
    'pages/index.vue',
    'static/index.html',
    'static/legal.html',
    'static/404.html',
    'static/item.html',
    'static/shop.html',
    'static/updates.html',
    'static/unsub.html',
    'static/lookbook.html',
    'static/promo1.html',
    'components/header-main.vue'
  ],
  rules: {
    'declaration-block-no-duplicate-properties': [
      true,
      {
        ignore: ['consecutive-duplicates'],
      },
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'mixin',
          'include',
        ],
      },
    ],
    'alpha-value-notation': 'percentage',
    'color-function-notation': 'modern',
    'font-family-no-missing-generic-family-keyword': true,
    'font-family-name-quotes': 'always-where-recommended',
    'string-quotes': 'double',
    'number-no-trailing-zeros': true,
    'max-empty-lines': 1,
    'property-no-vendor-prefix': null, // Deaktiviere diese Regel, um alle Vendor-Prefixe zuzulassen
    'block-opening-brace-space-before': 'always',
    'indentation': 2,
    'no-missing-end-of-source-newline': true,
    'number-max-precision': 4,
    'function-url-quotes': 'always',
    'no-descending-specificity': null, // Deaktiviere diese Regel, wenn nötig
    'declaration-block-single-line-max-declarations': 1,
    'max-line-length': 120,
    'no-duplicate-selectors': true,
    'declaration-block-no-redundant-longhand-properties': true,
    'media-feature-name-no-unknown': [true, {
      ignoreMediaFeatureNames: ['min-device-pixel-ratio']
    }],
    'block-no-empty': true,
    'keyframes-name-pattern': '^[a-z][a-zA-Z0-9-]*$', // Erlaubt sowohl kebab-case als auch camelCase
    'selector-class-pattern': '^[a-z][a-zA-Z0-9\\-]+$', // kebab-case für Klassen
    'CssSyntaxError': null, // Ignoriere CssSyntaxError
    'property-no-unknown': [true, {
      ignoreProperties: [
        'animation-timeline',
        'animation-range-start',
        'animation-range-end',
      ],
    }],
  },
};
