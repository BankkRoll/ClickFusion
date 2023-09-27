"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useConfettiModeEffect = void 0;
// src/utils/confettiMode.ts
var react_1 = require("react");
var useConfettiModeEffect = function (effect, options) {
    var ref = (0, react_1.useRef)(null);
    var particles = (0, react_1.useRef)([]).current;
    var particlePool = [];
    var particleCount = (options === null || options === void 0 ? void 0 : options.particleCount) || 100;
    var speed = (options === null || options === void 0 ? void 0 : options.speedDown) || 6;
    var colorMode = (options === null || options === void 0 ? void 0 : options.color) || "rainbow";
    var burstCount = 3;
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
        particles.forEach(function (p) {
            p.element.style.display = "none";
            if (p.element instanceof HTMLElement) {
                particlePool.push(p.element);
            }
        });
        particles.length = 0;
    };
    var generateParticle = function () {
        var particle;
        if (particlePool.length > 0) {
            particle = particlePool.pop();
            particle.style.display = "block";
        }
        else {
            particle = document.createElement("div");
            document.body.appendChild(particle);
        }
        var left = Math.random() * window.innerWidth;
        var top = 0;
        var color = colorMap[colorMode][Math.floor(Math.random() * colorMap[colorMode].length)];
        var size = 5 + Math.random() * 7;
        var rotateX = Math.random() * 360;
        var rotateY = Math.random() * 360;
        var rotateZ = Math.random() * 360;
        particle.style.position = "fixed";
        particle.style.top = "".concat(top, "px");
        particle.style.left = "".concat(left, "px");
        particle.style.width = "".concat(size, "px");
        particle.style.height = "".concat(size, "px");
        particle.style.backgroundColor = color;
        particle.style.willChange = "transform";
        particles.push({
            element: particle,
            left: left,
            size: size,
            speedDown: speed,
            top: top,
            color: color,
            rotateX: rotateX,
            rotateY: rotateY,
            rotateZ: rotateZ,
        });
    };
    var refreshParticles = (0, react_1.useCallback)(function () {
        particles.forEach(function (p, index) {
            p.top += p.speedDown;
            p.rotateX += 3;
            p.rotateY += 3;
            p.rotateZ += 3;
            if (p.top > window.innerHeight) {
                p.element.style.display = "none";
                if (p.element instanceof HTMLElement) {
                    particlePool.push(p.element);
                }
                particles.splice(index, 1);
            }
            else {
                p.element.style.transform = "translate3d(".concat(p.left, "px, ").concat(p.top, "px, 0) rotateX(").concat(p.rotateX, "deg) rotateY(").concat(p.rotateY, "deg) rotateZ(").concat(p.rotateZ, "deg)");
            }
        });
    }, [particles]);
    var handleClick = (0, react_1.useCallback)(function () {
        cleanupParticles();
        var generatedCount = 0;
        var burstIntervalId = setInterval(function () {
            for (var i = 0; i < burstCount; i++) {
                generateParticle();
                generatedCount++;
            }
            if (generatedCount >= particleCount) {
                clearInterval(burstIntervalId);
            }
        }, 60);
    }, [particleCount, burstCount]);
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
