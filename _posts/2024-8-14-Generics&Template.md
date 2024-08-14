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
            • 1 <a href="#"><u>Java泛型淺述</u></a>
            <ul>
                <li>
                    1.1 <a href="#"><u>泛型類</u></a>
                    <ul>
                        <li>1.1.1 <a href="#"><u>泛型類的格式</u></a></li>
                        <li>1.1.2 <a href="#"><u>泛型類的靜態變量與靜態方法</u></a></li>
                        <li>1.1.2 <a href="#"><u>多類型泛型類的創建</u></a></li>
                    </ul>
                </li>
                <li>1.2 <a href="#"><u>泛型接口</u></a></li>
              <ul>
                <li>1.2.1 <a href="#"><u>泛型接口的格式</u></a></li>
                <li>1.2.2 <a href="#"><u>泛型接口的接口繼承</u></a></li>
                <li>1.2.3 <a href="#"><u>泛型接口的類實現</u></a></li>
                <li>1.2.4 <a href="#"><u>泛型類基於泛型接口的抽象實現</u></a></li>
              </ul>
              <li>1.3 <a href="#"><u>泛型方法</u></a></li>
              <li>1.4 <a href="#"><u>泛型的反演化：類型擦除</u></a></li>
            </ul>
        </li>
        <li>
            • 2 <a href="#"><u>C++模板淺述</u></a>
            <ul>
                <li>2.1 <a href="#"><u>類型模板函數</u></a></li>
                <li>2.2 <a href="#"><u>非類型模板參數</u></a></li>
                <li>2.3 <a href="#"><u>模板類</u></a></li>
                <ul>
                    <li>2.3.1 <a href="#"><u>模板類的格式</u></a></li>
                    <li>2.3.2 <a href="#"><u>模板類靜態成員函數與靜態成員變量</u></a></li>
                </ul>
                <li>2.4 <a href="#"><u>默認模板實參</u></a></li>
            </ul>
        </li>
        <li>• 3 <a href="#end"><u>總結 - 異同相較</u></a></li>
    </ul>
</body>

---
