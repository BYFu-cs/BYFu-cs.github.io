---
layout: post
title: Machine Learning：Confidence Interval and Confidence Level based on T-test.
tags: learn
excerpt:
---

On the road to machine learning, we will find that the basic algorithms are inseparable from the knowledge of mathematical statistics. This blog is to assist you to better understand Confidence Interval and Confidence Level from fundamental concepts to practical instances.<br/>
<br/>

---

# 1.Fundamental definition and feature.
## 1.1 T-test (T-distribution).
### 1.1.1 Definition of T-test.
In general,T-test can be classified as three tests: Single Population Test, Double Population Test, and Paired Sample Test.Without doubt, T-test is closely related to the T-distribution.To simplify our problem, we only consider **Single Population Test** here as our topic.<br/>
<br/>
A Single Population T-test tests whether a sample mean differs significantly from a known population mean. When the population distribution is normal, such as the population standard deviation is unknown and the sample size is less than 30, then the deviation statistic between the sample mean and the population mean is T-distributed.In other word, the purpose of T-test is to determine whether the mean difference between two types of samples on a certain variable is significant, which is also the reason why we constructing T-test.<br/>
<br/>
The formula of Single Population T-test is:<br/>
<head><script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script></head>
$$\begin{aligned}t = \frac{\overline{X} - \mu_{0}}{\frac{\sigma_{x}}{\sqrt{N}}}\end{aligned}$$

