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

module.exports = declare((api, options) => {
    const isTest = api.env('test');
    const isProd = api.env('production');

    if (
        Object.prototype.hasOwnProperty.call(options, 'node') &&
        Object.prototype.hasOwnProperty.call(options, 'react')
    ) {
        throw new Error("Options 'node' and 'react' is required. Please specify.");
    }

    return {
        presets: [
            [
                presetEnv,
                {
                    ...(!isTest ? { modules: false } : {}),
                    useBuiltIns: 'usage',
                    forceAllTransforms: api.env('production'),
                    targets: {
                        ...(options.node || isTest ? { node: 'current' } : {})
                    }
                }
            ],
            options.react && [
                presetReact,
                {
                    development: !isProd
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
            isProd && options.react && pluginTransformReactConstantElements,
            isProd && options.react && pluginTransformReactInlineElements,
            isProd && options.react && pluginTransformReactRemovePropTypes
        ].filter(Boolean)
    };
});
