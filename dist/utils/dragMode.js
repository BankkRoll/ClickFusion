"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDragModeEffect = void 0;
// src/utils/dragMode.ts
var react_1 = require("react");
var useDragModeEffect = function (effect, options) {
    var ref = (0, react_1.useRef)(null);
    var updateCanvasPosition = function (canvas, element) {
        var rect = element.getBoundingClientRect();
        canvas.style.left = "".concat(rect.left, "px");
        canvas.style.top = "".concat(rect.top, "px");
    };
    (0, react_1.useEffect)(function () {
        var _a, _b;
        var element = ref.current;
        if (!element || effect !== "dragmode")
            return;
        // Create canvas
        var canvas = document.createElement("canvas");
        var canvasWidth = (_a = options === null || options === void 0 ? void 0 : options.width) !== null && _a !== void 0 ? _a : 400;
        var canvasHeight = (_b = options === null || options === void 0 ? void 0 : options.height) !== null && _b !== void 0 ? _b : 400;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        // Initialize canvas position
        updateCanvasPosition(canvas, element);
        // Set styles and positions for canvas
        canvas.style.position = "relative";
        canvas.style.zIndex = "-1";
        if ((options === null || options === void 0 ? void 0 : options.color) === "light") {
            canvas.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
        }
        else if ((options === null || options === void 0 ? void 0 : options.color) === "dark") {
            canvas.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        }
        else {
            canvas.style.opacity = "0";
        }
        document.body.appendChild(canvas);
        element.style.position = "relative";
        element.style.zIndex = "1";
        element.style.cursor = "grab";
        var isDragging = false;
        var offsetX = 0, offsetY = 0;
        var startDrag = function (e) {
            isDragging = true;
            element.style.cursor = "grabbing";
            var clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
            var clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
            offsetX = clientX - element.getBoundingClientRect().left;
            offsetY = clientY - element.getBoundingClientRect().top;
        };
        var doDrag = function (e) {
            if (!isDragging)
                return;
            var clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
            var clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
            var x = clientX - offsetX;
            var y = clientY - offsetY;
            requestAnimationFrame(function () {
                element.style.left = "".concat(x, "px");
                element.style.top = "".concat(y, "px");
            });
        };
        var stopDrag = function () {
            isDragging = false;
            element.style.cursor = "grab";
        };
        var handleScrollOrResize = function () { return updateCanvasPosition(canvas, element); };
        window.addEventListener("scroll", handleScrollOrResize);
        window.addEventListener("resize", handleScrollOrResize);
        element.addEventListener("mousedown", startDrag);
        element.addEventListener("touchstart", startDrag);
        window.addEventListener("mousemove", doDrag);
        window.addEventListener("touchmove", doDrag);
        window.addEventListener("mouseup", stopDrag);
        window.addEventListener("touchend", stopDrag);
        return function () {
            // Remove event listeners and cleanup
            element.removeEventListener("mousedown", startDrag);
            element.removeEventListener("touchstart", startDrag);
            window.removeEventListener("mousemove", doDrag);
            window.removeEventListener("touchmove", doDrag);
            window.removeEventListener("mouseup", stopDrag);
            window.removeEventListener("touchend", stopDrag);
            window.removeEventListener("scroll", handleScrollOrResize);
            window.removeEventListener("resize", handleScrollOrResize);
            // Remove canvas
            document.body.removeChild(canvas);
        };
    }, [effect, options]);
    return ref;
};
exports.useDragModeEffect = useDragModeEffect;
