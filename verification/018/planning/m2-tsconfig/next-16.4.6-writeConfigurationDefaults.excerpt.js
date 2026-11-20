    const moduleKindAMD = 'amd';
    // ModuleResolutionKind
    const moduleResolutionKindBundler = 'bundler';
    const moduleResolutionKindNode16 = 'node16';
    const moduleResolutionKindNodeNext = 'nodenext';
    const moduleResolutionKindNode12 = 'node12';
    const moduleResolutionKindNode = 'node';
    const configuredModule = typeof (userTsConfig == null ? void 0 : (_userTsConfig_compilerOptions = userTsConfig.compilerOptions) == null ? void 0 : _userTsConfig_compilerOptions.module) === 'string' ? userTsConfig.compilerOptions.module.toLowerCase() : undefined;
    const preferBundlerResolution = _semver.default.gte(typescriptVersion, '5.0.0') && configuredModule !== moduleKindCommonJS && configuredModule !== moduleKindAMD;
    // Jsx
    const jsxEmitReactJSX = 'react-jsx';
    return {
        target: {
            suggested: 'ES2017',
            reason: 'For top-level `await`. Note: Next.js only polyfills for the esmodules target.'
        },
        // These are suggested values and will be set when not present in the
        // tsconfig.json
        lib: {
            suggested: [
                'dom',
                'dom.iterable',
                'esnext'
            ]
        },
        allowJs: {
            suggested: true
        },
        skipLibCheck: {
            suggested: true
        },
        strict: {
            suggested: false
        },
        noEmit: {
            suggested: true
        },
        incremental: {
            suggested: true
        },
        // These values are required and cannot be changed by the user
        // Keep this in sync with the webpack config
        // 'parsedValue' matches the output value from ts.parseJsonConfigFileContent()
        module: {
            parsedValue: moduleKindESNext,
            // All of these values work:
            parsedValues: [
                _semver.default.gte(typescriptVersion, '5.4.0') && moduleKindPreserve,
                moduleKindES2020,
                moduleKindESNext,
                moduleKindCommonJS,
                moduleKindAMD,
                moduleKindNodeNext,
                moduleKindNode16
            ],
            value: 'esnext',
            reason: 'for dynamic import() support'
        },
        // TODO: Semver check not needed once Next.js repo uses 5.4.
        ..._semver.default.gte(typescriptVersion, '5.4.0') && (userTsConfig == null ? void 0 : (_userTsConfig_compilerOptions1 = userTsConfig.compilerOptions) == null ? void 0 : (_userTsConfig_compilerOptions_module = _userTsConfig_compilerOptions1.module) == null ? void 0 : _userTsConfig_compilerOptions_module.toLowerCase()) === moduleKindPreserve ? {
        } : {
            esModuleInterop: {
                value: true,
                reason: 'requirement for SWC / babel'
            },
            moduleResolution: {
                parsedValue: preferBundlerResolution ? moduleResolutionKindBundler : moduleResolutionKindNode,
                // All of these values work:
                parsedValues: preferBundlerResolution ? [
                    moduleResolutionKindNode16,
                    moduleResolutionKindNodeNext,
                    moduleResolutionKindBundler
                ] : [
                    moduleResolutionKindNode,
                    // only older TypeScript versions have this field
                    moduleResolutionKindNode12,
                    moduleResolutionKindNode16,
                    moduleResolutionKindNodeNext
                ],
                value: preferBundlerResolution ? moduleResolutionKindBundler : moduleResolutionKindNode,
                reason: preferBundlerResolution ? 'to match modern bundler resolution' : 'to match webpack resolution'
            },
            resolveJsonModule: {
                value: true,
                reason: 'to match webpack resolution'
            }
