export var appendTheseTo = function (node) { return function (element) {
    return node.appendChild(element);
}; };
export var setclassName = function (name) { return function (e) {
    e.className = name;
    return e;
}; };
export var setInnerText = function (text) { return function (e) {
    e.innerText = text;
    return e;
}; };
export var setAttribute = function (attribute) {
    return function (value) {
        return function (e) {
            e.style[attribute] = value;
            return e;
        };
    };
};
export var debug = function (color) { return function (isDebug) { return function (el) {
    if (isDebug)
        setAttribute("backgroundColor")(color)(el);
}; }; };
export var createElementWIthId = function (type) { return function (id) {
    var element = document.createElement(type);
    element.id = id;
    return element;
}; };
export var createPWithText = function (text) {
    return setInnerText(text)(document.createElement("p"));
};
export var createDivWithClassName = function (classname) {
    return setclassName(classname)(document.createElement("div"));
};
export var build = function (node) {
    var stack = [node];
    var res = [];
    var _loop_1 = function () {
        var current = stack.pop();
        res.push(current);
        if (current) {
            var children = current.children;
            if (children)
                children.forEach(function (c) {
                    current.value.appendChild(c.value);
                    stack.push(c);
                });
        }
    };
    while (stack.length) {
        _loop_1();
    }
    return node.value;
};
