---
layout: post
title: 淺談Java泛型與C++模板之異同（附大量代碼）
tags: tech
excerpt: 
---

<div align="center">
  <img src="{{ site.baseurl }}/images/Generics&Template/Comparison.png" alt="Comparsion"/>
</div>
Java的泛型(Generics)是Java 5(也稱為Java 1.5)版本中首次引入的，此特性增加了Java語言的類型安全和靈活性。模板(Template)是C++98(也被稱為標準模板庫，Standard Template Library，STL)中引入的重要特性，此特性允許開發者編寫泛型代碼。本博客旨在通過代碼實例淺析Java的泛型與C++模板實現的異同。<br/>
<br/>

---

<p align="center"><b>博客指引</b></p>
<head>
    <meta charset="UTF-8">
    <title>Navigation</title>
    <style>
        ul {
            font-weight: bold;
            list-style-type: none;
            padding-left: 20px;
        }
        li {
            margin-bottom: 10px;
        }
        li:first-of-type {
            font-weight: bold;
            color: black;
        }
        a {
            text-decoration: none;
            color: black;
        }
    </style>
</head>
<body>
    <ul>
        <li>
            • 1 <a href="#1"><u>Java泛型淺述</u></a>
            <ul>
                <li>
                    1.1 <a href="#1.1"><u>泛型類</u></a>
                    <ul>
                        <li>1.1.1 <a href="#1.1.1"><u>泛型類的格式</u></a></li>
                        <li>1.1.2 <a href="#1.1.2"><u>泛型類的靜態變量與靜態方法</u></a></li>
                        <li>1.1.3 <a href="#1.1.3"><u>多類型泛型類的創建</u></a></li>
                    </ul>
                </li>
                <li>1.2 <a href="#1.2"><u>泛型接口</u></a></li>
              <ul>
                <li>1.2.1 <a href="#1.2.1"><u>泛型接口的格式</u></a></li>
                <li>1.2.2 <a href="#1.2.2"><u>泛型接口的接口繼承</u></a></li>
                <li>1.2.3 <a href="#1.2.3"><u>泛型接口的類實現</u></a></li>
                <li>1.2.4 <a href="#1.2.4"><u>泛型類基於泛型接口的抽象實現</u></a></li>
              </ul>
              <li>1.3 <a href="#1.3"><u>泛型方法</u></a></li>
              <li>1.4 <a href="#1.4"><u>泛型的反演化：類型擦除</u></a></li>
            </ul>
        </li>
        <li>
            • 2 <a href="#"><u>C++模板淺述</u></a>
            <ul>
                <li>2.1 <a href="#2.1"><u>類型模板函數</u></a></li>
                <li>2.2 <a href="#2.2"><u>非類型模板參數</u></a></li>
                <li>2.3 <a href="#2.3"><u>模板類</u></a></li>
                <ul>
                    <li>2.3.1 <a href="#2.3.1"><u>模板類的格式</u></a></li>
                    <li>2.3.2 <a href="#2.3.2"><u>模板類靜態成員函數與靜態成員變量</u></a></li>
                </ul>
                <li>2.4 <a href="#2.4"><u>默認模板實參</u></a></li>
            </ul>
        </li>
        <li>• 3 <a href="#3"><u>總結 - 異同相較</u></a></li>
    </ul>
</body>

---

# <a id="1">1 Java泛型淺述</a>
## <a id="1.1">1.1 泛型類</a>
泛型的本質是為了將類型參數泛化。在泛型的使用過程中，數據類型被設置為一個參數(你也可以稱之為類型佔位符)，在使用時再從外部傳入一個數據類型；而一旦傳入了具體的數據類型后，傳入變量(實參)的數據類型如果不匹配，編譯器就會直接報錯，這樣就可以避免程序在運行后產生報錯。這種參數化類型可以用在類、接口和方法中，分別被稱為泛型類、泛型接口、泛型方法。<br/>
在Java中，泛型**最重要的特性**就是其**類型安全檢測機制**。<br/>
<div align="center">
  <img src="{{ site.baseurl }}/images/Generics&Template/Java-Generics.jpg" alt="Generics" style="width: 50%; height: auto;"/>
</div>
    
### <a id="1.1.1">1.1.1 泛型類的格式</a>
泛型類格式可如下：<br/>
<div class="pre-code-block">
        <div class="code-language">Java</div>
        <pre><code class="language-java">
1    public class Generic&lt;T&gt; { 
2        private T key;
3    
4    public Generic(T key) { 
5        this.key = key;
6    }
7    
8    public T getKey(){ 
9        return key;
10   }
11 }
</code></pre>
    </div>
在創建泛型類的對象時，必須指定類型參數T的具體數據類型，即尖括號<>中傳入的什麼數據類型，T便會被替換成對應的類型。若<>中什麼都不傳入，默認是<Object>即默認為對象類。<br/>
測試代碼：<br/>
<div class="pre-code-block">
<div class="code-language">Java</div>
<pre><code class="language-java">
1    @Test
2    public void test() {
3        Generic&lt;String&gt; generic = new Generic&lt;&gt;(); // 傳入 String 類型
4        
5        // &lt;&gt; 中什麼都不傳入，等價於 Generic&lt;Object&gt; generic = new Generic&lt;&gt;();
6        Generic generic = new Generic();
7    }
</code></pre>
    </div>

### <a id="1.1.2">1.1.2 泛型類的靜態變量與靜態方法</a>
對於static的靜態變量或靜態方法儘量在定義時指明所用的具體類型，或者也可以使用非泛型類所聲明的類型參數。<br/>
針對靜態方法，我們**將靜態方法改寫為泛型靜態方法**。<br/>
> 注意！<br/>
> 被static修飾的所有靜態方法或靜態變量都不能使用泛型類所聲明的類型參數。一旦使用則會報錯。<br/>

舉例如下：
<div class="pre-code-block">
<div class="code-language">Java</div>
<pre><code class="language-java">
1    public class StaticExample&lt;T&gt; {   
2        // 泛型類定義的類型參數T不能在靜態方法中使用   
3        public static &lt;E&gt; E example(E one){ 
4            return null;    
5        }
6    }
</code></pre>
    </div>
此處static後面的&lt;E&gt;為方法簽名，必須要存在此簽名才能正確聲明泛型函數。<br/>
使用測試類：<br/>
<div class="pre-code-block">
<div class="code-language">Java</div>
<pre><code class="language-java">
1 @Test
2 public class Main {
3     public static void main(String[] args) {
4         // 直接調用靜態泛型方法
5         Integer integerValue = StaticExample.example(1); // 返回類型為Integer
6         String stringValue = StaticExample.example("Hello"); // 返回類型為String
7     }
8 }
</code></pre>
    </div>
類型參數在example方法被調用時自動推斷。因此，每次調用example方法時，我們都可以傳入不同類型的參數，並且每次調用的返回類型都會根據所傳遞對象的參數類型進行自動確定。<br/>

### <a id="1.1.3">1.1.3 多類型泛型類的創建</a>
多類型泛型類的創建格式如下：<br/>
<div class="pre-code-block">
<div class="code-language">Java</div>
<pre><code class="language-java">
1 public class MultiType&lt;T, E&gt; {
2     T key1;
3     E key2;
4     
5     public T getKey1() {
6         return key1;
7     }
8     
9     public E getKey2() {
10        return key2;
11     }
12 }
</code></pre>
    </div>
上述的泛型類支持兩種不同的參數類型。<br/>
聲明的代碼為：<br/>
<div class="pre-code-block">
<div class="code-language">Java</div>
<pre><code class="language-java">
1 MultiType<Integer, String> multiType = new MultiType<>();
</code></pre>
    </div>




<head>
    <!-- 其他头部信息 -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/styles/default.min.css">
    <script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/highlight.min.js"></script>
    <style>
        /* 自定义代码块样式 */
        .pre-code-block {
            background-color: #2d2d2d;
            /* 背景色 */
            border: 1px solid #444;
            /* 边框 */
            border-radius: 8px;
            /* 圆角 */
            padding: 10px;
            /* 内边距 */
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            /* 添加阴影效果 */
            overflow: auto;
            /* 溢出时显示滚动条 */
            color: #f8f8f2;
            /* 字体颜色 */
            max-height: 500px;
            /* 最大高度 */
            max-width: 100%;
            /* 最大宽度 */
            position: relative;
            /* 位置 */
        }

        /* 语言标示样式 */
        .code-language {
            position: absolute;
            /* 绝对定位 */
            top: 10px;
            left: 10px;
            background: #66d9ef;
            /* 背景颜色 */
            color: #282a36;
            /* 字体颜色 */
            padding: 5px 10px;
            /* 内边距 */
            border-radius: 4px;
            /* 圆角 */
            font-size: 1em;
            /* 字体大小 */
            font-family: Arial, sans-serif;
            /* 字体 */
            z-index: 1;
            /* 确保在其他内容之上 */
        }
    </style>
</head>

<body>
    <script>
        document.addEventListener('DOMContentLoaded', (event) => {
            document.querySelectorAll('code').forEach((block) => {
                hljs.highlightBlock(block);
            });
        });
    </script>
</body>

































