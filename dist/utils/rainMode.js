"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRainModeEffect = void 0;
// src/utils/rainMode.tsx
var react_1 = require("react");
var useRainModeEffect = function (effect, options) {
    var ref = (0, react_1.useRef)(null);
    var particles = (0, react_1.useRef)([]).current;
    var particleCount = (options === null || options === void 0 ? void 0 : options.particleCount) || 30;
    var speed = (options === null || options === void 0 ? void 0 : options.speedDown) || 5;
    var size = (options === null || options === void 0 ? void 0 : options.size) || 50;
    var customImage = options === null || options === void 0 ? void 0 : options.particle;
    // Function to remove all particles
    var cleanupParticles = function () {
        particles.forEach(function (p) { return p.element.remove(); });
        particles.length = 0;
    };
    var generateParticle = function () {
        var left = Math.random() * window.innerWidth;
        var top = 0;
        var particle = document.createElement('div');
        if (customImage) {
            particle.innerHTML = "<img src=\"".concat(customImage, "\" width=\"").concat(size, "\" height=\"").concat(size, "\" />");
        }
        else {
            particle.style.width = "".concat(size, "px");
            particle.style.height = "".concat(size, "px");
            particle.style.backgroundColor = "hsl(".concat(Math.random() * 360, ", 70%, 50%)");
        }
        particle.style.position = 'fixed';
        particle.style.top = "".concat(top, "px");
        particle.style.left = "".concat(left, "px");
        particle.style.zIndex = '2147483647';
        document.body.appendChild(particle);
        particles.push({
            element: particle,
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
        if (typeof document === 'undefined')
            return;
        var animationFrame;
        var loop = function () {
            refreshParticles();
            animationFrame = requestAnimationFrame(loop);
        };
        if (ref.current && effect === 'rainmode') {
            ref.current.addEventListener('click', handleClick);
            loop();
        }
        return function () {
            if (ref.current) {
                ref.current.removeEventListener('click', handleClick);
            }
            cancelAnimationFrame(animationFrame);
            cleanupParticles();
        };
    }, [effect, handleClick, refreshParticles]);
    return ref;
};
exports.useRainModeEffect = useRainModeEffect;
