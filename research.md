---
layout: page
title: Research Cooperation 研究合作
permalink: /research/
---

---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        .collapsible {
            max-height: 90px;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }
        .expanded {
            max-height: none;
        }
        .fancy-button {
        background-color: #0074D9; 
        color: #FFFFFF;
        border: none;
        padding: 8px 16px;
        border-radius: 5px;
        font-size: 14px; 
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    .fancy-button:hover {
        background-color: #0056A0; 
    }
    </style>
</head>
<body>
    <h2>Numerical computing: 3D narrow volume reconstruction utilizing leap-fog algorithm.</h2>
    <div class="collapsible">
        <p>
            The whole Scientific research I participated is based on Allen-Cahn(AC) equation and Crank-Nicolson(CN) Method.The proposed modified fusion algorithm, such as the leap-fog algorithm, aiming to enhance the fitting model based on various point cloud models from previous studies, resulting in a faster or more accurate model. The research papers by our group will outline requirements for energy stability, numerical robustness, and code operability of the model.<br/> 
        <br/> 
            我目前参与之科研基于Allen-Cahn(AC)方程與Crank-Nicolson(CN)方法。根據不同的點雲模型，我們提出了一種修正後的融合改良算法(如leap-fog algorithm)可以在前人的研究上更加精進我們的擬合模型，從而擁有更快的或更精確的模型。
課題組的研究論文將會對模型的能量穩定性、數值魯棒性以及代碼實操性提出要求。<br/> 
        <br/> 
            Below are some of the thesis results:
        <br/> 
        </p>
        <br/> 
            <p style="text-align: center;">
            <img src="/images/research/point_disk3.png" alt="pointcloud_disk"><br/>
            [1] The point cloud of a Disk.
            </p>
        <br/>
        <br/>
            <p style="text-align: center;">
            <img src="/images/research/point_tea.png" alt="pointcloud_tea"><br/>
            [2] The point cloud of a Teapot.
            </p>
        <br/>
        <br/>
            <p style="text-align: center;">
            <img src="/images/research/disk1.png" alt="disk"><br/>
            [3] The reconstruction of Disk we obtained.
            </p>
        <br/>
        <br/>
            <p style="text-align: center;">
            <img src="/images/research/tea.png" alt="tea"><br/>
            [4] The reconstruction of Teapot we obtained.
            </p>
        <br/>
        <br/>
            <p style="text-align: center;">
            <img src="/images/research/GoldenDragon.png" alt="GD"><br/>
            [5] The reconstruction of a Golden Dragon we obtained.
            </p>
        <br/>
<br/> 
(Warning: Please note that our papers are not yet public! Please do not distribute these results without permission! I reserve the right to pursue legal action.)<br/> 
<br/> 
(警告:請注意，目前論文尚未公開！閣下請勿未經允許私自傳播此結果！本人保留依法追究責任之權利。)
    </div>
    <button class="fancy-button" onclick="toggleText()">Read More</button>

    <script>
        function toggleText() {
            const paragraph = document.querySelector('.collapsible');
            paragraph.classList.toggle('expanded');
            const button = document.querySelector('.fancy-button');
            button.textContent = paragraph.classList.contains('expanded') ? 'Collapse' : 'Read More';
        }
    </script>
</body>
</html>





