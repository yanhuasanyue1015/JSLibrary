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
function attachLoadEvent(target, func) {
    if (!target || !func) {
        return false;
    }
    if (window.addEventListener) {
        target.addEventListener("onload", func, true);
    } else if (window.attachEvent) {
        target.attachEvent("onload", func);
    }
    return false;
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
    if (nextSiblingNode.nodeType == 1) {
        return nextSiblingNode;
    }
    if(nextSiblingNode.nextSibling){
        return getLastElmentChild(nextSiblingNode.nextSibling);
    }
    return null;
}


/***
 * 给某个元素增加class属性值
 * @param element  需要添加新class的元素element
 * @param value     增加新的class值
 */
function addClass(element, value) {
    if (!element.className) {
        element.className = value;
    } else {
        var classes = element.className.split(" ");
        for (var i = 0; i < classes.length; i++) {
            if (classes[i] === value) {
                return;
            }
        }
        element.className += " " + value;
    }
}

/**
 * 将元素移动到特定的位置
 * @param leftDestination   目标位置距离左侧的距离
 * @param topDestination    目标位置距离顶部的距离
 * @param target            需要移动的元素
 * @param interval          每隔多长时间更新位置,通过它控制移动速度,设置的越大,移动的越快
 * @param unit              移动的单位,默认px
 */
function moveElement(leftDestination, topDestination, target, interval, unit) {
    if (leftDestination == null || topDestination == null || target == null) {
        return false;
    }
    target.style.position = "absolute";
    if (!unit) {
        unit = "px"
    }
    if (!interval) {
        interval = 10;
    }
    if (target.movement) {
        clearTimeout(target.movement);
    }
    function move() {
        var leftPosition = !target.style.left ? 0 : parseInt(target.style.left);
        var topPosition = !target.style.top ? 0 : parseInt(target.style.top);
        var xMove = Math.ceil(Math.abs(leftPosition - leftDestination) / 10);
        var yMove = Math.ceil(Math.abs(topPosition - topDestination) / 10);
        var satisfyLeft;
        var satisfyTop;
        if (!leftPosition || (leftPosition && leftPosition != leftDestination)) {
            satisfyLeft = true;
        } else {
            satisfyLeft = false;
        }
        if (!topPosition || (leftPosition && topPosition != topDestination)) {
            satisfyTop = true;
        } else {
            satisfyTop = false;
        }
        if (satisfyLeft) {
            if (leftPosition > leftDestination) {
                target.style.left = leftPosition - xMove + unit;
            } else if (leftPosition < leftDestination) {
                target.style.left = leftPosition + xMove + unit;
            }
        }
        if (satisfyTop) {
            if (topPosition > topDestination) {
                target.style.top = topPosition - yMove + unit;
            } else if (topPosition < topDestination) {
                target.style.top = topPosition + yMove + unit;
            }
        }
        if (satisfyLeft == false && satisfyTop == false) {
            return true;
        }
        target.movement = setTimeout(move, interval);
    }

    move();
}
/**
 * 检查浏览器是否支持某种类型的输入控件
 */
function inputSupportType(type) {
    if (!(document.createElement)) {
        return false;
    }
    var input = document.createElement("input");
    input.setAttribute("type",type);
    input.type=='type'
}
