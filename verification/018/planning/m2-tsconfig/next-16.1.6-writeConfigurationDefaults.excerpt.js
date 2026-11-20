        },
        // TODO: Semver check not needed once Next.js repo uses 5.4.
        ..._semver.default.gte(typescriptVersion, '5.4.0') && (userTsConfig == null ? void 0 : (_userTsConfig_compilerOptions = userTsConfig.compilerOptions) == null ? void 0 : (_userTsConfig_compilerOptions_module = _userTsConfig_compilerOptions.module) == null ? void 0 : _userTsConfig_compilerOptions_module.toLowerCase()) === moduleKindPreserve ? {
        } : {
            esModuleInterop: {
                value: true,
                reason: 'requirement for SWC / babel'
            },
            moduleResolution: {
                // In TypeScript 5.0, `NodeJs` has renamed to `Node10`
                parsedValue: moduleResolutionKindBundler,
                // All of these values work:
                parsedValues: [
                    moduleResolutionKindNode10,
                    moduleResolutionKindNodeJs,
                    // only newer TypeScript versions have this field, it
                    // will be filtered for new versions of TypeScript
                    moduleResolutionKindNode12,
                    moduleKindNode16,
                    moduleKindNodeNext,
                    moduleResolutionKindBundler
                ].filter((val)=>typeof val !== 'undefined'),
                value: 'node',
                reason: 'to match webpack resolution'
            },
            resolveJsonModule: {
                value: true,
                reason: 'to match webpack resolution'
            }
        },
        ...(userTsConfig == null ? void 0 : (_userTsConfig_compilerOptions1 = userTsConfig.compilerOptions) == null ? void 0 : _userTsConfig_compilerOptions1.verbatimModuleSyntax) === true ? undefined : {
