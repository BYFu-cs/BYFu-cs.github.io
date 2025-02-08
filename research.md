---
layout: page
title: Research 研究
permalink: /research/
---

<p>
Boyi Fu is currently advised by Professor Junxiang Yang. If you're interested in his research work, please feel free to explore the research group via the link provided below:
<br/>
<br/>
<a href="https://cfdyang521.github.io/year-archive/">Prof.Yang's Group.</a>
</p>

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
    <h2>Numerical computing: 3D narrow volume reconstruction.</h2>
    <div class="collapsible">
        <p>
            The whole Scientific research Boyi Fu participated is based on Allen-Cahn(AC) equation and Crank-Nicolson(CN) Method. The proposed scheme, aiming to enhance the fitting model based on various point cloud models from previous studies, resulting in a more accurate reconstruction model. The research papers will outline requirements for energy stability, numerical robustness, and code operability of the model.<br/> 
        <br/> 
            付博亦目前参与之科研項目基于Allen-Cahn(AC)方程與Crank-Nicolson(CN)方法。根據不同的點雲模型，提出了一種新的算法可以在前人的研究上更加精進擬合模型，從而擁有更精確的重建模型。
課題組的研究論文將會對模型的能量穩定性、數值魯棒性以及代碼實操性提出要求。<br/> 
        <br/>
            • The key equations in our essays are:<br/>
            $$
            \small
            \begin{equation}
            \begin{cases}
            \frac{\phi^{n+1}_{ijk}-\phi^{n}_{ijk}}{ \Delta t} = -g(x)_{ijk}\mu^{n+\frac{1}{2}}_{ijk}    \\
            \mu^{n+\frac{1}{2}}_{ijk} = H^{\ast}_{ijk} \cdot \frac{F^{\prime}(\phi^{\ast}_{ijk})}{\varepsilon^{2}} - \frac{1}{2}(\Delta_{d}\phi^{n+1}_{ijk}+\Delta_{d}\phi^{n}_{ijk})+S(\frac{\phi^{n+1}_{ijk} + \phi^{n}_{ijk}}{2} - \phi^{\ast}_{ijk})
            \end{cases}
            \end{equation}
            $$
        <br/> 
            Below are some of the thesis results:
        <br/> 
        </p>
            <p style="text-align: center;">
            <img src="/images/research/Buddhatogether.gif" alt="Buddhatogether"><br/>
            I. The point cloud of a Buddha and its reconstruction.
            </p>
        <br/>
            <p style="text-align: center;">
            <img src="/images/research/owltogether.gif" alt="owltogether"><br/>
            II. The point cloud of a owl and its reconstruction.
            </p>
        <br/>
            <p style="text-align: center;">
            <img src="/images/research/disk1.png" alt="disk"><br/>
            III. The reconstruction of Disk we obtained.
            </p>
        <br/>            
            <p style="text-align: center;">
            <img src="/images/research/teapot.gif" alt="teapot"><br/>
            IV. The reconstruction of Teapot we obtained.
            </p>
        <br/>
<br/> 
(Warning: Please note that the paper is not yet published! Please do not distribute these results without permission! The right to pursue legal action is reserved.)<br/> 
<br/> 
(警告:請注意，目前論文尚未公開！閣下請勿未經允許私自傳播此結果！撰寫者保留依法追究責任之權利。)
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





