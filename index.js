import { declare } from '@babel/helper-plugin-utils';
import presetEnv from '@babel/preset-env';
import presetReact from '@babel/preset-react';
import pluginProposalObjectRestSpread from '@babel/plugin-proposal-object-rest-spread';
import pluginProposalThrowExpressions from '@babel/plugin-proposal-throw-expressions';
import pluginProposalClassProperties from '@babel/plugin-proposal-class-properties';
import pluginSyntaxDynamicImport from '@babel/plugin-syntax-dynamic-import';
import pluginTransformReactConstantElements from '@babel/plugin-transform-react-constant-elements';
import pluginTransformReactInlineElements from '@babel/plugin-transform-react-inline-elements';
import pluginTransformReactRemovePropTypes from 'babel-plugin-transform-react-remove-prop-types';

export default declare((api, options) => ({
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
