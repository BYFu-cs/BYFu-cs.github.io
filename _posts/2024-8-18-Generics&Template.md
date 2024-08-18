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
類型參數在example方法被調用時自動推斷。因此，每次調用example方法時，我們都可以傳入不同類型的參數，並且每次調用的返回類型都會根據所傳遞對象的參數類型進行自動確定。<br/>
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
**類型擦除的全過程**<br/>
1.編譯時：泛型代碼被檢查類型安全。<br/>
2.編譯後：所有的類型參數信息被擦除，替換為它們的界限（如果有的話），或者是Object類型（如果沒有界限）。<br/>
3.運行時：JVM看到的只是原始類型，沒有任何泛型類型參數。<br/>
<br/>
值得注意的是：儘管大部分情況下是這樣，但並非所有的類型擦除後都會退化為Object類型。在類型參數**使用了extends和super語法的有界類型參數**時情況就並非如此。<br/>
<br/>
如：<br/>
<div class="pre-code-block">
<div class="code-language">Java</div>
<pre><code class="language">
1 public class Caculate&lt;T extends Number&gt; {
2     private T num; // 反编译结果为：private Number num;
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

## <a id="2.2">2.2 非類型模板參數 (Non-type Template Function)</a>
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















