const { declare } = require('@babel/helper-plugin-utils');
const presetEnv = require('@babel/preset-env');
const presetReact = require('@babel/preset-react');
const pluginProposalObjectRestSpread = require('@babel/plugin-proposal-object-rest-spread');
const pluginProposalThrowExpressions = require('@babel/plugin-proposal-throw-expressions');
const pluginProposalClassProperties = require('@babel/plugin-proposal-class-properties');
const pluginSyntaxDynamicImport = require('@babel/plugin-syntax-dynamic-import');

module.exports = declare(api => {
    api.assertVersion(7);
    const isTest = api.env('test');
    const isProd = api.env('production');

    return {
        presets: [
            [
                presetEnv,
                {
                    ...(isTest ? { targets: { node: 'current' } } : {})
                }
            ],
            [
                presetReact,
                {
                    development: !isProd
                }
            ]
        ],
        plugins: [
            // Proposal
            pluginProposalObjectRestSpread,
            pluginProposalThrowExpressions,
            pluginProposalClassProperties,

            // Syntax
            pluginSyntaxDynamicImport
        ].filter(Boolean)
    };
});
