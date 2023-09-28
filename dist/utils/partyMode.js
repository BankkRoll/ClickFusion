"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePartyModeEffect = void 0;
// src/utils/partyMode.ts
var react_1 = require("react");
var usePartyModeEffect = function (effect, options) {
    var ref = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        if (ref.current && effect === "partymode") {
            // Initialization of the particle effect
            return applyParticleEffect(ref.current, options);
        }
    }, [effect, options]);
    return ref;
};
exports.usePartyModeEffect = usePartyModeEffect;
// Singleton pattern for generating or fetching the particle effect container
var getContainer = function () {
    var id = "_partyMode_effect";
    var existingContainer = document.getElementById(id);
    if (existingContainer) {
        return existingContainer;
    }
    var container = document.createElement("div");
    container.setAttribute("id", id);
    container.setAttribute("style", "overflow:hidden; position:fixed; height:100%; top:0; left:0; right:0; bottom:0; pointer-events:none; z-index:2147483647");
    document.body.appendChild(container);
    return container;
};
var instanceCounter = 0;
// Core logic for applying particle effects
var applyParticleEffect = function (element, options) {
    instanceCounter++;
    var limit = 150;
    var particles = [];
    var autoAddParticle = false;
    var mouseX = 0;
    var mouseY = 0;
    var container = getContainer();
    // Function to generate a single particle
    function generateParticle() {
        var size = (options === null || options === void 0 ? void 0 : options.size) || 2 + Math.random() * 6;
        var top = mouseY - size / 2;
        var left = mouseX - size / 2;
        var direction = Math.random() <= 0.5 ? -1 : 1;
        var speed = Math.random() * 10 + 5;
        var color = "hsl(".concat(Math.random() * 360, ", 70%, 50%)");
        // Create the SVG element
        var svgNS = "http://www.w3.org/2000/svg";
        var svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("width", "".concat(size, "px"));
        svg.setAttribute("height", "".concat(size, "px"));
        // Create the polygon element (triangle)
        var triangle = document.createElementNS(svgNS, "polygon");
        triangle.setAttribute("points", "".concat(size / 2, ",0 ").concat(size, ",").concat(size, " 0,").concat(size));
        triangle.setAttribute("fill", color);
        // Append the triangle to the SVG
        svg.appendChild(triangle);
        // Create the particle div to hold the SVG
        var particle = document.createElement("div");
        particle.style.position = "absolute";
        particle.style.transform = "translate3d(".concat(left, "px, ").concat(top, "px, 0px)");
        particle.appendChild(svg);
        container.appendChild(particle);
        particles.push({
            direction: Math.random() * 2 * Math.PI,
            element: particle,
            left: left,
            size: size,
            speed: speed,
            top: top,
        });
    }
    // Update existing particles' positions and other properties
    function refreshParticles() {
        particles.forEach(function (p) {
            var dx = p.speed * Math.cos(p.direction);
            var dy = p.speed * Math.sin(p.direction);
            p.left = p.left + dx;
            p.top = p.top + dy;
            // If particle is outside the viewport, remove it
            if (p.top > window.innerHeight ||
                p.left > window.innerWidth ||
                p.top < 0 ||
                p.left < 0) {
                particles = particles.filter(function (o) { return o !== p; });
                p.element.remove();
            }
            p.element.setAttribute("style", "position:absolute; will-change:transform; top:".concat(p.top, "px; left:").concat(p.left, "px;"));
        });
    }
    var animationFrame;
    // Animation loop for particles
    function loop() {
        if (autoAddParticle && particles.length < limit) {
            generateParticle();
        }
        refreshParticles();
        animationFrame = requestAnimationFrame(loop);
    }
    loop();
    var isTouchInteraction = "ontouchstart" in window;
    var tap = isTouchInteraction ? "touchstart" : "mousedown";
    var tapEnd = isTouchInteraction ? "touchend" : "mouseup";
    var move = isTouchInteraction ? "touchmove" : "mousemove";
    var updateMousePosition = function (e) {
        var _a, _b;
        if ("touches" in e) {
            mouseX = (_a = e.touches) === null || _a === void 0 ? void 0 : _a[0].clientX;
            mouseY = (_b = e.touches) === null || _b === void 0 ? void 0 : _b[0].clientY;
        }
        else {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }
    };
    var tapHandler = function (e) {
        updateMousePosition(e);
        autoAddParticle = true;
    };
    var disableAutoAddParticle = function () {
        autoAddParticle = false;
    };
    element.addEventListener(move, updateMousePosition, { passive: true });
    element.addEventListener(tap, tapHandler, { passive: true });
    element.addEventListener(tapEnd, disableAutoAddParticle, { passive: true });
    element.addEventListener("mouseleave", disableAutoAddParticle, {
        passive: true,
    });
    // Cleanup logic
    return function () {
        element.removeEventListener(move, updateMousePosition);
        element.removeEventListener(tap, tapHandler);
        element.removeEventListener(tapEnd, disableAutoAddParticle);
        element.removeEventListener("mouseleave", disableAutoAddParticle);
        // Cancel animation loop once animations are done
        var interval = setInterval(function () {
            if (animationFrame && particles.length === 0) {
                cancelAnimationFrame(animationFrame);
                clearInterval(interval);
                // Clean up container if this is the last instance
                if (--instanceCounter === 0) {
                    container.remove();
                }
            }
        }, 500);
    };
};
