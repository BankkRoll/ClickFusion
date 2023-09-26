"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useConfettiModeEffect = void 0;
// src/utils/confettiMode.ts
var react_1 = require("react");
var useConfettiModeEffect = function (effect, options) {
    var ref = (0, react_1.useRef)(null);
    var particles = (0, react_1.useRef)([]).current;
    var particleCount = (options === null || options === void 0 ? void 0 : options.particleCount) || 100;
    var speed = (options === null || options === void 0 ? void 0 : options.speedDown) || 5;
    var colorMode = (options === null || options === void 0 ? void 0 : options.color) || "rainbow";
    var colorMap = {
        rainbow: ["red", "orange", "yellow", "green", "blue", "purple"],
        red: ["red"],
        orange: ["orange"],
        yellow: ["yellow"],
        green: ["green"],
        blue: ["blue"],
        purple: ["purple"],
    };
    var cleanupParticles = function () {
        particles.forEach(function (p) { return p.element.remove(); });
        particles.length = 0;
    };
    var generateParticle = function () {
        var left = Math.random() * window.innerWidth;
        var top = 0;
        var color = colorMap[colorMode][Math.floor(Math.random() * colorMap[colorMode].length)];
        var shapes = ["circle", "rect", "triangle", "ellipse", "star", "hexagon"];
        var shape = shapes[Math.floor(Math.random() * shapes.length)];
        var size = 5 + Math.random() * 7;
        var particle = document.createElement("div");
        particle.style.position = "fixed";
        particle.style.top = "".concat(top, "px");
        particle.style.left = "".concat(left, "px");
        particle.style.width = "".concat(size, "px");
        particle.style.height = "".concat(size, "px");
        particle.style.backgroundColor = color;
        var shapeStyles = {
            circle: { borderRadius: "50%" },
            rect: {},
            triangle: { clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" },
            ellipse: { borderRadius: "50% 25%" },
            star: {
                clipPath: "polygon(50% 0%, 61.8% 38.2%, 98.1% 38.2%, 68.4% 61.8%, 79.4% 95.1%, 50% 76.2%, 20.6% 95.1%, 31.6% 61.8%, 1.9% 38.2%, 38.2% 38.2%)",
            },
            hexagon: {
                clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            },
        };
        Object.assign(particle.style, shapeStyles[shape]);
        document.body.appendChild(particle);
        particles.push({
            element: particle,
            left: left,
            size: size,
            speedDown: speed,
            top: top,
            color: color,
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
        if (typeof document === "undefined")
            return;
        var animationFrame;
        var loop = function () {
            refreshParticles();
            animationFrame = requestAnimationFrame(loop);
        };
        if (ref.current && effect === "confettimode") {
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
exports.useConfettiModeEffect = useConfettiModeEffect;
