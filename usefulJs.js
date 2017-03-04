/**
 * Created by 张磊buhao on 2017/3/2.
 */

/**
 * 有insertBefore方法,但是没有insertAfter方法,于是自定义了一个
* */
function insertAfter(newElement, taggetElement) {
    var parent = taggetElement.parentNode;
    if (taggetElement == parent.lastChild) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, taggetElement.nextSibling);
    }
}
/**
 * 动态的增加window.onload触发之后的触发函数
 * */
function addLoadEvent(func) {
    var oldOnLoad = window.onload;
    if (typeof oldOnLoad != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            oldOnLoad();
            func();
        };
    }
}
/**
 * 获取父标签最后一个元素标签
 * */
function getLastElmentChild(parent) {
    var elementChilds = parent.getElementsByTagName("*");
    if (!elementChilds || elementChilds.length == 0)return false;
    return elementChilds[elementChilds.length - 1];
}

/***
 * 设置公用的项目名称
 * @type {string}
 */
var applicationPath = "/day14";
function setForm() {
    var formElements = document.getElementsByTagName("form");
    for (var i = 0; i < formElements.length; i++) {
        var tag = formElements[i];
        var actionUri = tag.getAttribute("action");
        if (actionUri && !actionUri.startsWith(applicationPath)) {
            actionUri = applicationPath + actionUri;
            tag.setAttribute("action", actionUri);
        }
    }
}

/***
 * 设置公用的项目名称
 * @type {string}
 */
function setATag() {
    var aElements = document.getElementsByTagName("a");
    for (var i = 0; i < aElements.length; i++) {
        var tag = aElements[i];
        var actionUri = tag.getAttribute("href");
        if (actionUri && !actionUri.startsWith(applicationPath)) {
            actionUri = applicationPath + actionUri;
            tag.setAttribute("href", actionUri);
        }
    }
}

/***
 * 
 * @param nextSiblingNode
 * @returns {*}
 */
function getNextElement(nextSiblingNode) {
    if (node.nodeType == 1) {
        return node;
    }
    if(node.nextSibling){
        return getLastElmentChild(node.nextSibling);
    }
    return null;
}
