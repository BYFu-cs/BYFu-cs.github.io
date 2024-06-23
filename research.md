---
layout: page
title: Research 研究合作
permalink: /research/
---

The file is not empty.

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        .collapsible {
            max-height: 50px;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }
        .expanded {
            max-height: none;
        }
        .fancy-button {
            background: conic-gradient(from 135deg, #FFFFFF 25%, #B3E0FF 25% 75%, #0074D9 75%);
            color: #0074D9;
            border: none;
            padding: 8px 16px;
            border-radius: 5px;
            font-size: 14px;
            cursor: pointer;
            transition: background 0.3s ease;
        }
        .fancy-button:hover {
            background: conic-gradient(from 135deg, #FFFFFF 25%, #99C2FF 25% 75%, #E6F0FF 75%);
        }
    </style>
</head>
<body>
    <p class="collapsible">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo nec nunc tincidunt tincidunt. Vivamus auctor, libero vel aliquam tincidunt, nunc elit tincidunt turpis, eu facilisis odio odio eu elit.
    </p>
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





