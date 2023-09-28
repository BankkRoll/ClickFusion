"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var utils_1 = require("../utils");
/**
 * ClickFusion Component
 *
 * This component is responsible for rendering particle effects around a single child element.
 *
 * @param {ClickFusionProps} props - The props that define the type of particle effect to use and its options.
 * @param {string} props.effect - The type of particle effect to use ('coolmode', 'rainmode', 'partymode', 'confettimode', 'codemode', 'dragmode').
 * @param {BaseParticleOptions | undefined} props.particleOptions - The options for customizing particle behavior.
 * @param {ReactNode} props.children - The child element around which the particle effect will be rendered.
 *
 * @returns {ReactElement | null} - The React element with particle effects, or null for an unsupported effect.
 */
var ClickFusion = function (_a) {
    var effect = _a.effect, particleOptions = _a.particleOptions, children = _a.children;
    var output = children;
    // Always call all hooks, even if not all are used
    var coolModeRef = (0, utils_1.useCoolModeEffect)(effect, particleOptions);
    var rainModeRef = (0, utils_1.useRainModeEffect)(effect, particleOptions);
    var partyModeRef = (0, utils_1.usePartyModeEffect)(effect, particleOptions);
    var confettiModeRef = (0, utils_1.useConfettiModeEffect)(effect, particleOptions);
    var codeModeRef = (0, utils_1.useCodeModeEffect)(effect, particleOptions);
    var dragModeRef = (0, utils_1.useDragModeEffect)(effect, particleOptions);
    // Choose the correct ref based on the effect
    var refs = {
        'coolmode': coolModeRef,
        'rainmode': rainModeRef,
        'partymode': partyModeRef,
        'confettimode': confettiModeRef,
        'codemode': codeModeRef,
        'dragmode': dragModeRef
    };
    var activeRef = refs[effect] || null;
    if (!activeRef) {
        console.error("Unsupported effect \"".concat(effect, "\""));
        return null;
    }
    // Clone the child and attach ref
    var child = react_1.default.Children.only(children);
    output = (0, react_1.cloneElement)(child, { ref: activeRef });
    return (react_1.default.createElement("div", { className: "click-fusion ".concat(effect) }, output));
};
exports.default = ClickFusion;
