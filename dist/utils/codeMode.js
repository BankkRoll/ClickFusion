"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCodeModeEffect = void 0;
// src/utils/codeMode.ts
var react_1 = require("react");
var useCodeModeEffect = function (effect, options) {
    var ref = (0, react_1.useRef)(null);
    var particles = (0, react_1.useRef)([]).current;
    var particleCount = (options === null || options === void 0 ? void 0 : options.particleCount) || 30;
    var speed = (options === null || options === void 0 ? void 0 : options.speedDown) || 5;
    var size = (options === null || options === void 0 ? void 0 : options.size) || 10;
    // Function to remove all particles
    var cleanupParticles = function () {
        particles.forEach(function (p) { return p.element.remove(); });
        particles.length = 0;
    };
    var generateParticle = function () {
        var left = Math.random() * window.innerWidth;
        var top = 0;
        var particle = document.createElement("div");
        var textColor = (options === null || options === void 0 ? void 0 : options.color) === "light" ? "white" : "black";
        // Generate a random string of numbers to simulate code
        var code = generateRandomCode(8);
        particle.textContent = code;
        particle.style.color = textColor;
        particle.style.fontWeight = "bold";
        particle.style.fontSize = "".concat(size, "px");
        particle.style.position = "fixed";
        particle.style.top = "".concat(top, "px");
        particle.style.left = "".concat(left, "px");
        particle.style.zIndex = "2147483647";
        document.body.appendChild(particle);
        // Determine the color for this particle
        var color = (options === null || options === void 0 ? void 0 : options.color) || "dark";
        particles.push({
            element: particle,
            color: color,
            left: left,
            size: size,
            speedDown: speed,
            top: top,
        });
    };
    var refreshParticles = (0, react_1.useCallback)(function () {
        particles.forEach(function (p, index) {
            p.top += p.speedDown;
            if (p.top > window.innerHeight) {
                p.element.remove();
                particles.splice(index, 1);
            }
            else {
                p.element.style.transform = "translate3d(".concat(p.left, "px, ").concat(p.top, "px, 0)");
                // Change the code content to a new random string
                p.element.textContent = generateRandomCode(8);
            }
        });
    }, [particles]);
    var handleClick = (0, react_1.useCallback)(function () {
        cleanupParticles();
        var intervalId = setInterval(function () {
            generateParticle();
            if (particles.length >= particleCount) {
                clearInterval(intervalId);
            }
        }, 100);
    }, [particleCount, particles]);
    (0, react_1.useEffect)(function () {
        // Skip server-side rendering
        if (typeof document === "undefined")
            return;
        var animationFrame;
        var loop = function () {
            refreshParticles();
            animationFrame = requestAnimationFrame(loop);
        };
        if (ref.current && effect === "codemode") {
            ref.current.addEventListener("click", handleClick);
            loop();
        }
        return function () {
            if (ref.current) {
                ref.current.removeEventListener("click", handleClick);
            }
            cancelAnimationFrame(animationFrame);
            cleanupParticles();
        };
    }, [effect, handleClick, refreshParticles]);
    return ref;
};
exports.useCodeModeEffect = useCodeModeEffect;
// Function to generate a random code-like string
function generateRandomCode(length) {
    var characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var code = "";
    for (var i = 0; i < length; i++) {
        var randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
    }
    return code;
}
