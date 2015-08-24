    /**
     * 解析html,返回element
     * @param str
     * @returns {HTMLElement[]}
     */
    function parseHTML(str) {
        var el = document.createElement('div');
        el.innerHTML = str;
        return el.children;
    }
