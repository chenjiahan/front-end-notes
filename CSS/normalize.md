# Normalize

### 一. CSS Reset
**CSS Reset**的作用是清除所有浏览器默认样式，使页面在不同浏览器下表现一致。  
示例:

    h1, h2, h3, h4, h5, h6 {
        font-size: 100%;
        font-weight: normal
    }

### 二. Normalize.css
相比于传统的CSS Reset，**Normalize.css**是一种现代的、为HTML5准备的优质替代方案。  
示例：

    /**
     * Address variable `h1` font-size and margin within `section` and `article`
     * contexts in Firefox 4+, Safari, and Chrome.
     */
    
    h1 {
        font-size: 2em;
        margin: 0.67em 0;
    }
    
Normalize.css的主要目的：

* 保护有用的浏览器默认样式
* 为大部分元素提供一般化的样式
* 修复浏览器自身的bug
* 使用详细的注释来解释代码
* 减少调试工具中大段的继承链