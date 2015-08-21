# DOM

### 一. 概述
DOM(文档对象模型)是针对HTML和XML文档的一个API，DOM描述了一个层次化的节点树，允许开发人员添加、移除和修改页面的一部分。

### 二.Node类型
JavaScript中的所有节点都继承自Node类型。  
Node类型的基本属性和方法如下：

属性名（方法）|作用
---|---
nodeType|节点类型
nodeName|元素的标签名
childNodes|保存NodeList对象，用于访问子元素
NodeList.item(n)|访问NodeList的第n个元素
parentNode|父节点
previousSibling|同一列表的前一个节点
nextSibling|同一列表的后一个节点
firstChild|第一个子节点
lastChild|最后一个子节点
hasChildNodes()|判断是否含有子节点
ownerDocument|所属的文档节点
appendChild()|向子节点的末尾添加一个节点
insertBefore()|插入到某个子节点之前
replaceChild()|替换某个子节点
removeChild()|移除某个子节点
cloneNode(boolean)|复制某个节点，传true时复制子节点

### 三. Document类型
JavaScript通过Document类型表示文档，在浏览器中，document对象是HTMLDocument的一个实例，表示整个HTML页面。 
Document类型的基本属性和方法如下：

属性名（方法）|作用
---|---
documentElement|指向html元素
body|指向body元素
title|Title标签中的文本
URL|完整URL
domain|域名
referrer|来源页面的URL
getElementById()|根据ID取得元素
getElementsByName()|根据name取得NodeList
getElementsByTagName()|根据tag取得NodeList
write()|输出流到网页
writeln()|输出流到网页并添加换行符
createElement()|创建新元素

### 四. Element类型
Element类型用于表现XML或HTML元素，提供了对元素标签名、子节点及特性的访问。  
Element类型的基本属性和方法如下：

属性名（方法）|作用
---|---
tagName|标签名（始终大写）
id|唯一标识符
title|附加说明信息
lang|语言代码
dir|语言方向，ltr或rtl
class|css类
getAttribute()|获取某个特性值
setAttribute()|设置特性名和特性值
removeAttribute()|彻底移除某个特性值
