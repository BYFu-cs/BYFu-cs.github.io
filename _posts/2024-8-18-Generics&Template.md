---
layout: post
title: 淺談Java泛型與C++模板之異同（附大量代碼）
tags: tech
excerpt: 
color: "#89d8f8"
tip_text: "#New Blog"
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
            • 2 <a href="#2"><u>C++模板淺述</u></a>
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
        <pre><code class="language">
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
  <div class="tools">
    <div class="circle">
      <span class="red box"></span>
    </div>
    <div class="circle">
      <span class="yellow box"></span>
    </div>
    <div class="circle">
      <span class="green box"></span>
    </div>
  </div>
    </div>
在創建泛型類的對象時，必須指定類型參數T的具體數據類型，即尖括號&lt;&gt;中傳入的什麼數據類型，T便會被替換成對應的類型。若<>中什麼都不傳入，默認是<Object>即默認為對象類。<br/>
測試代碼：<br/>
<div class="pre-code-block">
<div class="code-language">Java</div>
<pre><code class="language">
1    @Test
2    public void test() {
3        Generic&lt;String&gt; generic = new Generic&lt;&gt;(); // 傳入 String 類型
4        
5        // &lt;&gt; 中什麼都不傳入，等價於 Generic&lt;Object&gt; generic = new Generic&lt;&gt;();
6        Generic generic = new Generic();
7    }
</code></pre>
  <div class="tools">
    <div class="circle">
      <span class="red box"></span>
    </div>
    <div class="circle">
      <span class="yellow box"></span>
    </div>
    <div class="circle">
      <span class="green box"></span>
    </div>
  </div>
    </div>
<br/>
  
### <a id="1.1.2">1.1.2 泛型類的靜態變量與靜態方法</a>
對於static的靜態變量或靜態方法儘量在定義時指明所用的具體類型，或者也可以使用非泛型類所聲明的類型參數。<br/>
針對靜態方法，我們**將靜態方法改寫為泛型靜態方法**。<br/>
> <div class="tooltip"><div class="icon"><b>i</b></div> <b>注意！</b></div>
> 被static修飾的所有靜態方法或靜態變量都不能使用泛型類所聲明的類型參數。一旦使用則會報錯。<br/>

舉例如下：
<div class="pre-code-block">
<div class="code-language">Java</div>
<pre><code class="language">
1    public class StaticExample&lt;T&gt; {   
2        // 泛型類定義的類型參數T不能在靜態方法中使用   
3        public static &lt;E&gt; E example(E one){ 
4            return null;    
5        }
6    }
</code></pre>
  <div class="tools">
    <div class="circle">
      <span class="red box"></span>
    </div>
    <div class="circle">
      <span class="yellow box"></span>
    </div>
    <div class="circle">
      <span class="green box"></span>
    </div>
  </div>
    </div>
此處static後面的&lt;E&gt;為方法簽名，必須要存在此簽名才能正確聲明泛型函數。<br/>
使用測試類：<br/>
<div class="pre-code-block">
<div class="code-language">Java</div>
<pre><code class="language">
1 @Test
2 public class Main {
3     public static void main(String[] args) {
4         // 直接調用靜態泛型方法
5         Integer integerValue = StaticExample.example(1); // 返回類型為Integer
6         String stringValue = StaticExample.example("Hello"); // 返回類型為String
7     }
8 }
</code></pre>
  <div class="tools">
    <div class="circle">
      <span class="red box"></span>
    </div>
    <div class="circle">
      <span class="yellow box"></span>
    </div>
    <div class="circle">
      <span class="green box"></span>
    </div>
  </div>
    </div>
類型參數在example方法被調用時<b>自動推斷</b>。因此，每次調用example方法時，我們都可以傳入不同類型的參數，並且每次調用的返回類型都會根據所傳遞對象的參數類型進行自動確定。<br/>
<br/>

### <a id="1.1.3">1.1.3 多類型泛型類的創建</a>
多類型泛型類的創建格式如下：<br/>
<div class="pre-code-block">
<div class="code-language">Java</div>
<pre><code class="language">
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
  <div class="tools">
    <div class="circle">
      <span class="red box"></span>
    </div>
    <div class="circle">
      <span class="yellow box"></span>
    </div>
    <div class="circle">
      <span class="green box"></span>
    </div>
  </div>
    </div>
上述的泛型類支持兩種不同的參數類型。<br/>
聲明的代碼為：<br/>
<div class="pre-code-block">
<div class="code-language">Java</div>
<pre><code class="language">
1 MultiType<Integer, String> multiType = new MultiType<>();
</code></pre>
  <div class="tools">
    <div class="circle">
      <span class="red box"></span>
    </div>
    <div class="circle">
      <span class="yellow box"></span>
    </div>
    <div class="circle">
      <span class="green box"></span>
    </div>
  </div>
    </div>
<br/>

## <a id="1.2">1.2 泛型接口</a>
### <a id="1.2.1">1.2.1 泛型接口的格式</a>
泛型接口的創建格式如下：<br/>
<div class="pre-code-block">
<div class="code-language">Java</div>
<pre><code class="language">
1 public interface APIzero&lt;T, U&gt; {
2     int n = 10;
3     
4     public abstract void instance(T t);
5     T get(U u);
6     void yes(T t);
7     
8     default T method(U u) {
9         return null;
10     }
11 }
</code></pre>
  <div class="tools">
    <div class="circle">
      <span class="red box"></span>
    </div>
    <div class="circle">
      <span class="yellow box"></span>
    </div>
    <div class="circle">
      <span class="green box"></span>
    </div>
  </div>
    </div>
對於接受泛型參數的APIzero接口而言，有如下三大注意事項：<br/>
•接口中的屬性默認是靜態的，因此不能使用類型參數聲明，如：T element;這種聲明方式會直接報錯。<br/>
•抽象方法與普通方法都可以使用類型參數，如：T get(U u);和void yes(T t);這兩個抽象方法。<br/>
•亦可以在接口中使用默認方法, 默認方法可以使用泛型接口的類型參數。如：default T method(U u)等。<br/>
<br/>

### <a id="1.2.2">1.2.2 泛型接口的接口繼承</a>
定義一個接口APIone繼承了泛型接口APIzero，在繼承泛型接口時，必須指定泛型接口APIzero的類型參數。<br/>
如：<br/>
<div class="pre-code-block">
<div class="code-language">Java</div>
<pre><code class="language">
1 public interface APIone extends APIzero&lt;String, Double&gt; {
2 	        ...
3 }
</code></pre>
   <div class="tools">
    <div class="circle">
      <span class="red box"></span>
    </div>
    <div class="circle">
      <span class="yellow box"></span>
    </div>
    <div class="circle">
      <span class="green box"></span>
    </div>
  </div>
    </div>
我們可以用類A實現此接口：<br/>
<div class="pre-code-block">
<div class="code-language">Java</div>
<pre><code class="language">
1 public class A implements APIone {
2     @Override
3     public void instance(String s) { 
4         // 實現細節 
5     }
6     
7     @Override
8     public String get(Double i) { 
9         // 實現細節 
10    }
11    
12    @Override 
13    public void yes(String s) { 
14        // 實現細節
15    }
16 }
</code></pre>
  <div class="tools">
    <div class="circle">
      <span class="red box"></span>
    </div>
    <div class="circle">
      <span class="yellow box"></span>
    </div>
    <div class="circle">
      <span class="green box"></span>
    </div>
  </div>
    </div>
> <div class="tooltip"><div class="icon"><b>i</b></div> <b>注意！</b></div>
> 由於在繼承APIzero接口時，指定了類型參數T為 String，U為 Double，那麼在類A實現時必須要提供APIzero接口內抽象方法的具體實現。<br/>

<br/>

### <a id="1.2.3">1.2.3 泛型接口的類實現</a>
定義一個類B直接實現泛型接口APIzero，在B類定義時需要確定泛型接口APIzero中的類型參數。
<div class="pre-code-block">
<div class="code-language">Java</div>
<pre><code class="language">
1 public class B implements APIzero&lt;String, Integer&gt; {
2     @Override 
3     public void instance(String s) { 
4         // 實現細節 
5     } 
6     
7     @Override 
8     public String get(Integer i) { 
9         // 實現細節
10     } 
11     
12     @Override 
13     public void yes(String s) { 
14         // 實現細節 
15     }
16     
17     // B類自己的方法
18     …
19 }
</code></pre>
  <div class="tools">
    <div class="circle">
      <span class="red box"></span>
    </div>
    <div class="circle">
      <span class="yellow box"></span>
    </div>
    <div class="circle">
      <span class="green box"></span>
    </div>
  </div>
    </div>
> <div class="tooltip"><div class="icon"><b>i</b></div> <b>注意！</b></div>
> 若B類在定義時未確定泛型接口APIzero中的類型參數，則全部默認為Object類型。<br/>

<br/>

### <a id="1.2.4">1.2.4 泛型類基於泛型接口的抽象實現</a>
若是用泛型類實現泛型接口則無需指明泛型類型參數，但其聲明的類型參數必須要和接口中的類型參數相同。<br/>
<div class="pre-code-block">
<div class="code-language">Java</div>
<pre><code class="language">
1 class C&lt;T, U&gt; implements APIzero&lt;T, U&gt; { 
2	       ...
3 }
</code></pre>
  <div class="tools">
    <div class="circle">
      <span class="red box"></span>
    </div>
    <div class="circle">
      <span class="yellow box"></span>
    </div>
    <div class="circle">
      <span class="green box"></span>
    </div>
  </div>
    </div>
如上，此處定義了一個泛型類C實現APIzero，二者的類型參數完全一致。<br/>
<br/>

## <a id="1.3">1.3 泛型方法</a>
泛型方法並非指在泛型類/泛型接口中使用了定義的泛型參數的方法。而只有在方法簽名中聲明了&lt;T&gt;的方法才是泛型方法。<br/>
如：<br/>
<div class="pre-code-block">
<div class="code-language">Java</div>
<pre><code class="language">
1 public class Method&lt;U&gt; {
2     public &lt;T, S&gt; T testMethod(T t, S s, U u) {
3         return null;
4     }
5 }
</code></pre>
  <div class="tools">
    <div class="circle">
      <span class="red box"></span>
    </div>
    <div class="circle">
      <span class="yellow box"></span>
    </div>
    <div class="circle">
      <span class="green box"></span>
    </div>
  </div>
    </div>
> <div class="tooltip"><div class="iconwarning"><b>i</b></div> <b>特別注意！</b></div>
> 泛型類中定義的類型參數和泛型方法中定義的類型參數是相互獨立的。<br/>

以下實例可以更好輔助您理解：<br/>
<div class="pre-code-block">
<div class="code-language">Java</div>
<pre><code class="language">
1 public class Test&lt;T&gt; {
2     public void testMethod1(T t) {
3         System.out.println(t);
4     }
   
5     public &lt;T&gt; T testMethod2(T t) {
6         return t;
7     }
8 }
</code></pre>
  <div class="tools">
    <div class="circle">
      <span class="red box"></span>
    </div>
    <div class="circle">
      <span class="yellow box"></span>
    </div>
    <div class="circle">
      <span class="green box"></span>
    </div>
  </div>
    </div>
•實例中testMethod1非泛型方法，且其使用的類型參數T與泛型類聲明的&lt;T&gt;是一致的。<br/>
•實例中testMethod2為泛型方法，且其使用的類型參數T與泛型類聲明的&lt;T&gt;無關，僅僅與方法簽名中的&lt;T&gt;一致。<br/>
<br/>

## <a id="1.4">1.4 泛型的反演化：類型擦除</a>
在Java中，泛型主要用於提高代碼的復用性、可讀性和安全性，但它們在編譯時被處理，而在運行時不保留類型信息。這意味着虛擬機（JVM）在運行時看到的是擦除了具體類型的泛型代碼。<br/>
例如，考慮以下泛型類：<br/>
<div class="pre-code-block">
<div class="code-language">Java</div>
<pre><code class="language">
1 public class Box&lt;T&gt; {
2     private T t;
3     
4     public void set(T t) { this.t = t; }
5     
6     public T get() { return t; }
7 }
</code></pre>
  <div class="tools">
    <div class="circle">
      <span class="red box"></span>
    </div>
    <div class="circle">
      <span class="yellow box"></span>
    </div>
    <div class="circle">
      <span class="green box"></span>
    </div>
  </div>
    </div>
創建Box類的實例：<br/>
<div class="pre-code-block">
<div class="code-language">Java</div>
<pre><code class="language">
1 Box&lt;Integer&gt; integerBox = new Box&lt;&gt;();
</code></pre>
  <div class="tools">
    <div class="circle">
      <span class="red box"></span>
    </div>
    <div class="circle">
      <span class="yellow box"></span>
    </div>
    <div class="circle">
      <span class="green box"></span>
    </div>
  </div>
    </div>
在編譯時，Box<Integer>被看作是具有類型參數Integer的泛型類型。但是在運行時，integerBox實例不會保留Integer(&lt;T&gt;)類型的信息，它退化為Box(Object)類型。<br/>
<br/>
<b>類型擦除的全過程</b><br/>
1.編譯時：泛型代碼被檢查類型安全。<br/>
2.編譯後：所有的類型參數信息被擦除，替換為它們的界限（如果有的話），或者是Object類型（如果沒有界限）。<br/>
3.運行時：JVM看到的只是原始類型，沒有任何泛型類型參數。<br/>
<br/>
值得注意的是：儘管大部分情況下是這樣，但並非所有的類型擦除後都會退化為Object類型。在類型參數<b>使用了extends和super語法的有界類型參數</b>時情況就並非如此。<br/>
<br/>
如：<br/>
<div class="pre-code-block">
<div class="code-language">Java</div>
<pre><code class="language">
1 public class Caculate&lt;T extends Number&gt; {
2     private T num; // 反編譯結果為：private Number num;
3 }
</code></pre>
  <div class="tools">
    <div class="circle">
      <span class="red box"></span>
    </div>
    <div class="circle">
      <span class="yellow box"></span>
    </div>
    <div class="circle">
      <span class="green box"></span>
    </div>
  </div>
    </div>
Java泛型的類型擦除是為了在運行時保持性能和兼容性，編譯器會在編譯時去除泛型的類型信息，並將泛型類型替換為它們的界限，並在運行時使用原始類型。<br/>
上述實例中使用了extends語法的類型參數T在被擦除後會被替換為Number而並非是Object。<br/>
<br/>
extends是一個限定類型參數邊界的語法，其限定類型參數T只能是Number類或者是Number的子類。 也就是說，在創建Caculate類對象的時候，尖括號&lt;&gt;中只能傳入Number類或者Number的子類的參數類型，所以在創建Caculate類對象時無論傳入何種參數類型，Number均為其父類，於是使用Number類作為T的原始數據類型，進行類型擦除並替換。<br/>
<br/>
  
---

# <a id="2">2 C++模板淺述</a>
C++中也有與Java泛型類似的泛型編程範式，我們稱其為模板。在C++中，模板本質上就是一套宏指令集。<br/>
<div align="center">
  <img src="{{ site.baseurl }}/images/Generics&Template/C++.png" alt="Generics" style="width: 50%; height: auto;"/>
</div>
<br/>

## <a id="2.1">2.1 類型模板函數 (Type Template Function)</a>
模板函數在代碼形式上類似於Java的泛型，模板參數T也存在於一對尖括號<>內，只不過在尖括號內還需要多加一個typename關鍵字。即以關鍵字template開始，後跟一個含有typename關鍵字的**模板參數列表**。<br/>
實例如下：<br/>
<div class="pre-code-block">
<div class="code-language">C++</div>
<pre><code class="language">
1 template&lt;typename T&gt;
2 void swap(T& a, T& b) {
3     T temp = a;
4     a = b;
5     b = temp;
6 }
</code></pre>
  <div class="tools">
    <div class="circle">
      <span class="red box"></span>
    </div>
    <div class="circle">
      <span class="yellow box"></span>
    </div>
    <div class="circle">
      <span class="green box"></span>
    </div>
  </div>
    </div>
類似於Java的泛型方法，C++的模板函數**根據函數傳入的實參來推斷模板實參**。<br/>
若實參為int型，編譯器會將模板實參推斷為int，並將它綁定到模板參數T。這意味著編譯器用推斷出的模板參數來為我們實例化，這些編譯器生成的版本通常被稱為**模板的實例**。<br/>
> <div class="tooltip"><div class="icon"><b>i</b></div> <b>注意！</b></div>
> 若要加上inline關鍵字使類型模板swap函數變為內聯函數的語法會略有不同。

具體語法如下：<br/>
<div class="pre-code-block">
<div class="code-language">C++</div>
<pre><code class="language">
1 template&lt;typename T&gt; inline void swap(T& a, T& b) {
2     T temp = a;
3     a = b;
4     b = temp;
5 }
</code></pre>
  <div class="tools">
    <div class="circle">
      <span class="red box"></span>
    </div>
    <div class="circle">
      <span class="yellow box"></span>
    </div>
    <div class="circle">
      <span class="green box"></span>
    </div>
  </div>
    </div>
二者的本質是相同的，注意到inline關鍵字置於尖括號後。<br/>
<br/>

## <a id="2.2">2.2 非類型模板參數 (Non-type Template Parameter)</a>
非類型模板參數允許我們在模板中使用常量值作為參數。它們用於在模板定義中指定一個常量值，而不是一個數據類型。非類型模板參數可以是整數、枚舉、指針或引用類型。在模板參數列表中，我們使用一個特定的類型來定義非類型模板參數。<br/>
例如：<br/>
<div class="pre-code-block">
<div class="code-language">C++</div>
<pre><code class="language">
1 template&lt;int N&gt;
2 int multiplyByN(int value) {
3     return value * N;
4 }
</code></pre>
  <div class="tools">
    <div class="circle">
      <span class="red box"></span>
    </div>
    <div class="circle">
      <span class="yellow box"></span>
    </div>
    <div class="circle">
      <span class="green box"></span>
    </div>
  </div>
    </div>
在上面的例子中，N是一個非類型模板參數，它表示一個整數常量值。在函數體內，我們可以將N用作常量值來執行相應的計算。<br/>
測試代碼：<br/>
<div class="pre-code-block">
<div class="code-language">C++</div>
<pre><code class="language">
1 int main()
2 {
3     //@test
4     int result = multiplyByN&lt;5&gt;(10); // result = 50
5     
6     int multiplier = 3; 
7     int result = multiplyByN&lt;multiplier&gt;(7); // result = 21
8     
9     return 0;
10 }
</code></pre>
  <div class="tools">
    <div class="circle">
      <span class="red box"></span>
    </div>
    <div class="circle">
      <span class="yellow box"></span>
    </div>
    <div class="circle">
      <span class="green box"></span>
    </div>
  </div>
    </div>
<br/>

## <a id="2.3">2.3 模板類</a>
### <a id="2.3.1">2.3.1 模板類的格式</a>
同樣，模板類與泛型類在形式上類似。
<div class="pre-code-block">
<div class="code-language">C++</div>
<pre><code class="language">
1 template &lt;typename T1, typename T2&gt;
2 class Pair {
3 private:
4     T1 key1;
5     T2 key2;
6 
7 public:
8     Pair(const T1& f, const T2& s) : key1(f), key2(s) {}
9     
10    T1 getFirst() const { return key1; }
11    T2 getSecond() const { return key2; }
12 };
</code></pre>
  <div class="tools">
    <div class="circle">
      <span class="red box"></span>
    </div>
    <div class="circle">
      <span class="yellow box"></span>
    </div>
    <div class="circle">
      <span class="green box"></span>
    </div>
  </div>
    </div>
<br/>
測試代碼如下：<br/>
<div class="pre-code-block">
<div class="code-language">C++</div>
<pre><code class="language">
1 int main() {
2     //@test
3     // 創建一個 Pair 對象，類型為 int 和 double
4     Pair&lt;int, double&gt; intDoublePair(1, 2.5);
5     
6     // 創建一個 Pair 對象，類型為 std::string 和 int
7     Pair&lt;std::string, int&gt; stringIntPair("Hello", 42);
8     
9     // 調用 getFirst() 和 getSecond() 成員函數
10     std::cout &lt;&lt; "First element (int, double pair): " &lt;&lt; intDoublePair.getFirst() &lt;&lt; std::endl;
11     std::cout &lt;&lt; "Second element (int, double pair): " &lt;&lt; intDoublePair.getSecond() &lt;&lt; std::endl;
12     
13     std::cout &lt;&lt; "First element (string, int pair): " &lt;&lt; stringIntPair.getFirst() &lt;&lt; std::endl;
14     std::cout &lt;&lt; "Second element (string, int pair): " &lt;&lt; stringIntPair.getSecond() &lt;&lt; std::endl;
15     
16     return 0;
17 }
</code></pre>
  <div class="tools">
    <div class="circle">
      <span class="red box"></span>
    </div>
    <div class="circle">
      <span class="yellow box"></span>
    </div>
    <div class="circle">
      <span class="green box"></span>
    </div>
  </div>
    </div>
上述二測試例皆顯式地指明了模板實參。<br/>
<br/>
C++與Java不同的一個<b>關鍵點</b>在於：C++的類允許在類內聲明函數而在類外定義具體函數，而Java類所有的方法都必須在類內定義。這就導致作為模板類，我們也同樣擁有模板類外的模板函數定義語法，這是Java泛型類所不具備的。<br/>
<br/>
下述實例可證明此點：<br/>
<div class="pre-code-block">
<div class="code-language">C++</div>
<pre><code class="language">
1 template&lt;typename T&gt;
2 class MyContainer {
3 private:
4     T element;
5 public:
6     MyContainer(const T& element);
7     T getElement() const ; 
8 };
9 //類外定義構造函數
10 template&lt;typename T&gt; 
11 MyContainer&lt;T&gt;::MyContainer(const T& element) : element(element) {
12     // 構造函數體
13 }
14 template&lt;typename T&gt; 
15 T MyContainer&lt;T&gt;::getElement() const{
16     return element;
17 }
</code></pre>
  <div class="tools">
    <div class="circle">
      <span class="red box"></span>
    </div>
    <div class="circle">
      <span class="yellow box"></span>
    </div>
    <div class="circle">
      <span class="green box"></span>
    </div>
  </div>
    </div>
在這個構造函數中，我們使用初始化列表將傳入的參數 element 直接賦值給類成員 element。如果T是一個複雜類型，使用初始化列表可以提高效率，因為它避免了複製或移動構造函數的調用。<br/>
測試代碼如下：<br/>
<div class="pre-code-block">
<div class="code-language">C++</div>
<pre><code class="language">
1 //@Test
2 int main() {
3     // 範例使用
4     MyContainer&lt;int&gt; intContainer(42);
5     std::cout &lt;&lt; "Element in intContainer: " &lt;&lt; intContainer.getElement() &lt;&lt; std::endl;
6     
7     MyContainer&lt;std::string&gt; stringContainer("Hello, World!");
8     std::cout &lt;&lt; "Element in stringContainer: " &lt;&lt; stringContainer.getElement() &lt;&lt; std::endl;
9     
10    return 0;
11 }
</code></pre>
  <div class="tools">
    <div class="circle">
      <span class="red box"></span>
    </div>
    <div class="circle">
      <span class="yellow box"></span>
    </div>
    <div class="circle">
      <span class="green box"></span>
    </div>
  </div>
    </div>
<br/>
    
### <a id="2.3.2">2.3.2 模板類靜態成員函數與靜態成員變量</a>
區別於Java中被static修飾的所有靜態方法或靜態變量都不能使用泛型類所聲明的類型參數，C++允許靜態函數使用類模板類型。<br/>
<div class="pre-code-block">
<div class="code-language">C++</div>
<pre><code class="language">
1 template&lt;typename T&gt;
2 class MyClass {
3 private:
4     static int count; // 靜態成員變量
5 public:
6     static int getCount() {
7         return count;
8     }
9     
10    // 靜態成員函數，返回類型為模板參數 T
11    static T getDefaultValue(const T &t);
12 };
13 
14 // 注意：此處定義無需再次使用關鍵字 static
15 // 模板類靜態成員變量的定義必須在類外進行
16 template&lt;typename T&gt;
17 int MyClass&lt;T&gt;::count = 1;
18 
19 // 注意：此處定義無需再次使用關鍵字 static
20 template&lt;typename T&gt;
21 T MyClass&lt;T&gt;::getDefaultValue(const T &t){
22     return t;
23 }
</code></pre>
  <div class="tools">
    <div class="circle">
      <span class="red box"></span>
    </div>
    <div class="circle">
      <span class="yellow box"></span>
    </div>
    <div class="circle">
      <span class="green box"></span>
    </div>
  </div>
    </div>
<br/>  
測試代碼如下：<br/>  
<div class="pre-code-block">
<div class="code-language">C++</div>
<pre><code class="language">
1 //@test
2 int main() {
3     std::cout &lt;&lt; "Count value is: " &lt;&lt; MyClass&lt;int&gt;::getCount() &lt;&lt; std::endl;
4     // 使用整型实例化 MyClass 並調用靜態成員函數
5     std::cout &lt;&lt; "Processed int value: " &lt;&lt; MyClass&lt;int&gt;::getDefaultValue(42) &lt;&lt; std::endl;
6     
7     // 使用字符串類型實例化 MyClass 並調用靜態成員函數
8     std::cout &lt;&lt; "Processed string value: " &lt;&lt; MyClass&lt;std::string&gt;::getDefaultValue("Hello World") &lt;&lt; std::endl;
9     
10    return 0;
11 }
</code></pre>
  <div class="tools">
    <div class="circle">
      <span class="red box"></span>
    </div>
    <div class="circle">
      <span class="yellow box"></span>
    </div>
    <div class="circle">
      <span class="green box"></span>
    </div>
  </div>
    </div>
> <div class="tooltip"><div class="icon"><b>i</b></div> <b>注意！</b></div>
> 靜態成員函數getCount()和靜態成員變量count與模板參數T無關。因此，於所有類型的實例對象，count是共享的。

<br/>
## <a id="2.4">2.4 默認模板實參</a>
正如對於Java泛型非限定類型參數邊界的情況，若不顯式指定泛型類型參數，則全部默認為Object類型。C++也提供了對於默認模板實參的支持，只不過這種默認模板實參需要開發者手動指明。<br/>
<div class="pre-code-block">
<div class="code-language">C++</div>
<pre><code class="language">
1 template &lt;typename T = int, typename F = std::less&lt;T&gt;&gt;
2 int compare(const T &v1, const T &v2, F f = F())
3 {
4     if (f(v1, v2)) return -1;
5     if (f(v2, v1)) return 1;
6     return 0;
7 }
</code></pre>
  <div class="tools">
    <div class="circle">
      <span class="red box"></span>
    </div>
    <div class="circle">
      <span class="yellow box"></span>
    </div>
    <div class="circle">
      <span class="green box"></span>
    </div>
  </div>
    </div>
上述實例中compare函數是一個模板函數，其模板類型有兩個，接受三個參數。但是只有前兩個參數是必須的，且若不顯式指明，前二參數默認為整數類型。第三個參數是一個可選的函數對象參數，它有一個默認值為std::less<int>。<br/>
<br/>
在調用 compare 函數時，如果只提供了前兩個參數 v1 和 v2，編譯器會根據函數模板參數的默認類型進行<b>自動推導</b>。<br/>
<br/>
因此，下面這兩種調用方式均爲合法：<br/>
<div class="pre-code-block">
<div class="code-language">C++</div>
<pre><code class="language">
1 int result1 = compare(5, 10);  // 使用預設的比較函數對象 less&lt;int&gt;
2 int result2 = compare(5, 10, MyComparator());  // 使用自定義的比較函數對象 MyComparator
</code></pre>
  <div class="tools">
    <div class="circle">
      <span class="red box"></span>
    </div>
    <div class="circle">
      <span class="yellow box"></span>
    </div>
    <div class="circle">
      <span class="green box"></span>
    </div>
  </div>
    </div>
<br/>
此處我們在MyComparator結構體內重載operator()函數：<br/>
<div class="pre-code-block">
<div class="code-language">C++</div>
<pre><code class="language">
1 struct MyComparator {
2     bool operator()(int a, int b) const {
3         return a &lt; b; // 比較貳整數
4     }
5 };
</code></pre>
  <div class="tools">
    <div class="circle">
      <span class="red box"></span>
    </div>
    <div class="circle">
      <span class="yellow box"></span>
    </div>
    <div class="circle">
      <span class="green box"></span>
    </div>
  </div>
    </div>
此實例中，MyComparator是一個函數對象，它重載了函數調用運算符，因此可以被當作一個函數來調用。當它被傳遞給compare函數時，它將會被用於執行比較操作。<br/>
<br/>

---

# <a id="3">3 總結 - 異同相較</a>
其實無論是Java的泛型亦或是C++的模板，二者核心特性的實現皆在於：<b>讓編譯器識別參數類型</b>。而二者實現此特性的手段卻各不相同：<br/>
<b>C++使用的是「代碼生成」的方式，而Java使用的是「類型擦除」的方式</b>。<br/>
•「代碼生成」：編譯器在編譯期間識別實際傳入的參數類型，生成用於該類型的代碼。<br/>
•「類型擦除」：對於非限定類型參數邊界的情況，編譯器在編譯期間將實際類型擦除，將每個類型都視為Object類型。對於限定類型參數邊界的情況，類型退化為T類型的父類。<br/>
<br/>
以下四點為Java泛型與C++模板在實現上的<b>主要異同</b>：<br/>
⓵ Java泛型相比C++的最大優點在於其對於繼承、遺傳等特性方面有巨大優勢。Java通過不同的類與接口的實現在運用泛型操作方便的同時抽象程度更高，這使得結構的代碼復用效率更高、擴展性更強。而C++的模板更偏向直接使用,即模板特化。<br/>
⓶ C++模板可以使用int等基本數據類型，Java則不行。Java泛型在設計時要求類型參數是引用類型（或者稱為對象類型），而不是基本數據類型。這是為了避免與協變返回等Java特性的衝突。<br/>
⓷ Java中類的定義只能在類體內，而C++不受此規則限制。<br/>
⓸ Java中，自身類的類型參數不能用於靜態方法和變量，但在C++中，模板類型可以用於靜態方法和靜態變量，這是二者設計理念上的巨大差異。<br/>
<br/>
上述所有為本博客所淺述之全部，若您喜歡本博客，可以給予我評論支持，感謝閲讀！<br/>
<br/>
