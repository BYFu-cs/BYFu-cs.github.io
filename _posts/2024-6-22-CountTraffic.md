---
layout: post
title: How to count traffic on your own website?
tags: tech
excerpt:
---
  
Many people want to see the behavior of the client when building their own web pages. There is no doubt that client-facing analytics can always help web administrators run their web pages better. Here's how to count traffic for your website.<br/>
<br/>

---

## Count Traffic
The following content is based on Google Analytics.<br/>
<br/>
You can click here to visit: [Google Analytics](https://analytics.google.com/analytics/web).<br/>
<br/>
### Step I.
You should create your own account in **Google Analytics**, and then create a recognizable name in the account for the data stream that belongs to you.<br/>
<br/>
### Step II.
Open '**Admin**' in the bottom left corner of the page. Then open '**Data collection and modification**' in the '**Property settings**' popup on the left. You should select the '**Data Streams**' entry.The image below shows my workspace, where ids have been processed for privacy reasons.<br/>
![DataStreams]({{ site.baseurl }}/images/Fun_Blog1/DataStreams.png)<br/>
<br/>
### Step III.
Click on your data stream, and then in the '**Web stream details**' row to the bottom of the page. Locate the '**view tag instructions**' TAB in '**Google tag**' and click on it.<br/>
![InstallationInstructions]({{ site.baseurl }}/images/Fun_Blog1/InstallationInstructions.png)<br/>
<br/>
You need to choose '**Install manually**' as option.<br/>
Then you are able to see the **Tracking Code** of your personsal account is as follows:<br/>
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id="xxxxxxxxxx"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'xxxxxxxxxx');
</script>
```
You only need to substitue the **id** into yourself's.<br/>
<br/>
### Step IV.
Google Analytics actually captures your page traffic by embedding **Tracking Code** in your pages.So you need to copy the code above and copy it into your own website.<br/>
<br/>
For instance, I copied it into the **<head>** element of my **index.html** document.<br/>
<br/>
### Step V.
Then You can return to Google Analytics and refresh the page to make Google Analytics connect to your page.<br/>
![InstallationInstructions]({{ site.baseurl }}/images/Fun_Blog1/Finished.png)<br/>
<br/>

---

This is the whole tutorial regarding "How to count the traffic on your own website". If you like it, please offer me a comment support!<br/>
<br/>

<!--
<!-- return to the top -->
<head>
    <title>Back to Top</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
      #backToTop {
    display: none;
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: rgba(249, 249, 249, 0.5);
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 15px; 
    font-size: 18px; 
    cursor: pointer;
  }
      .fas {
    font-size: 24px;
  }
    </style>
    <script>
window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("backToTop").style.display = "block";
  } else {
    document.getElementById("backToTop").style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0; 
  document.documentElement.scrollTop = 0;
}
    </script>
  </head>	
  <body>
      <button onclick="topFunction()" id="backToTop"><i class="fas fa-arrow-up"></i></button>
  </body>
-->
