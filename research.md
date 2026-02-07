---
layout: page
title: Research 研究
permalink: /research/
---

<p>
    You can feel free to click the botton below to visit my Google Scholar Page:
    <p>
    <a href="https://scholar.google.com/citations?user=dLNZiBAAAAAJ&hl=zh-TW&oi=sra" class="scholar-button" target="_blank" rel="noopener noreferrer">
        <i class="fas fa-graduation-cap" aria-hidden="true"></i> Google Scholar
    </a>
    </p>
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
    .research-gallery {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        gap: 20px;
        flex-wrap: wrap;
        align-items: flex-start;
    }
    .research-item {
        flex: 1;
        min-width: 280px;
        max-width: 320px;
        text-align: center;
        display: flex;
        flex-direction: column;
    }
    .research-item img {
        width: 100%;
        height: 260px;
        object-fit: contain;
        display: block;
        border-radius: 8px;
        background-color: #f5f5f5;
    }
    .research-item p {
        margin-top: 12px;
        font-size: 14px;
        line-height: 1.5;
        flex-grow: 1;
    }
    </style>
</head>
<body>
    <h2>Computing Geometry: 3D Volume Reconstruction.</h2>
    <div class="collapsible">
        <p>
            The current scientific research Boyi Fu participated is based on different computing Methods. The proposed scheme, aiming to enhance the fitting model based on various point cloud models from previous studies, resulting in a more accurate reconstruction model. The research papers will outline requirements for energy stability, numerical robustness, and code operability of the model.<br/> 
        <br/> 
            付博亦目前参与之科研項目基于不同算法。根據不同的點雲模型，提出了一種新的算法可以在前人的研究上更加精進擬合模型，從而擁有更精確的重建模型。
課題組的研究論文將會對模型的能量穩定性、數值魯棒性以及代碼實操性提出要求。<br/> 
        <br/>
            • The key equations in our former essays were:<br/>
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
            Below are some of the latest thesis results:
        <br/> 
        </p>

        <div class="research-gallery">
          <div class="research-item">
            <img src="/images/research/Buddhatogether.gif" alt="Buddhatogether">
            <p>I. The point cloud of a Buddha and its reconstruction.</p>
          </div>
          <div class="research-item">
            <img src="/images/research/owltogether.gif" alt="owltogether">
            <p>II. The point cloud of an Owl and its reconstruction.</p>
          </div>
          <div class="research-item">
            <img src="/images/research/teapot.gif" alt="teapot">
            <p>III. The reconstruction of a Teapot we obtained.</p>
          </div>
        </div>


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

<hr class="divider">

<h2><span class="title-underline">Publications</span> </h2>
[1] <b>B. Fu</b>, D. Cai, X. Kong, R. Gao, & J. Yang (2025). On the numerical approximation of a phase-field volume reconstruction model: Linear and energy-stable leap-frog finite difference scheme. Communications in Nonlinear Science and Numerical Simulation (CNSNS), 151, 109104. <br/> 
[2] D. Cai, <b>B. Fu</b>, R. Gao, X. Kong, & J. Yang (2025). Phase-field computation for 3D shell reconstruction with an energy-stable and uniquely solvable BDF2 method. Computers & Mathematics with Applications, 189, 1–23.<br/> 
[3] X. Kong, R. Gao, <b>B. Fu</b>, D. Cai, & J. Yang (2025). Two lower boundedness-preservity auxiliary variable methods for a phase-field model of 3D narrow volume reconstruction. Communications in Nonlinear Science and Numerical Simulation (CNSNS), 143, 108649.<br/> 

</body>
</html>

    



