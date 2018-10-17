const { declare } = require('@babel/helper-plugin-utils');
const presetEnv = require('@babel/preset-env');
const presetReact = require('@babel/preset-react');
const pluginProposalObjectRestSpread = require('@babel/plugin-proposal-object-rest-spread');
const pluginProposalThrowExpressions = require('@babel/plugin-proposal-throw-expressions');
const pluginProposalClassProperties = require('@babel/plugin-proposal-class-properties');
const pluginSyntaxDynamicImport = require('@babel/plugin-syntax-dynamic-import');
const pluginTransformReactConstantElements = require('@babel/plugin-transform-react-constant-elements');
const pluginTransformReactInlineElements = require('@babel/plugin-transform-react-inline-elements');
const pluginTransformReactRemovePropTypes = require('babel-plugin-transform-react-remove-prop-types');

module.exports = declare((api, options) => ({
    presets: [
        [
            presetEnv,
            {
                modules: false,
                useBuiltIns: 'usage',
                forceAllTransforms: api.env('production'),
                ...(options.node ? { targets: { node: 'current' } } : {})
            }
        ],
        options.react && [
            presetReact,
            {
                development: !api.env('production')
            }
        ]
    ].filter(Boolean),
    plugins: [
        // Proposal
        pluginProposalObjectRestSpread,
        pluginProposalThrowExpressions,
        pluginProposalClassProperties,

        // Syntax
        pluginSyntaxDynamicImport,

        // Transforms
        api.env('production') && options.react && pluginTransformReactConstantElements,
        api.env('production') && options.react && pluginTransformReactInlineElements,
        api.env('production') && options.react && pluginTransformReactRemovePropTypes
    ].filter(Boolean)
}));
