---
layout: post
title: Machine Learning：Confidence Interval and Confidence Level based on T-test.
tags: learn
excerpt:
---

![cover]({{ site.baseurl }}/images/ConfidenceLevel/cover.png)
On the road to machine learning, we will find that the basic algorithms are inseparable from the knowledge of mathematical statistics. This blog is to assist you to better understand Confidence Interval and Confidence Level from fundamental concepts to practical instances.<br/>
<br/>

---

<p align="center"><b>Blog Navigation</b></p>
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
            • 1 <a href="#FDF"><u>Fundamental definition and feature.</u></a>
            <ul>
                <li>
                    1.1 <a href="#TT"><u>T-test (T-distribution).</u></a>
                    <ul>
                        <li>1.1.1 <a href="#DT"><u>Definition of T-test.</u></a></li>
                        <li>1.1.2 <a href="#FT"><u>Feature of T-test.</u></a></li>
                    </ul>
                </li>
                <li>1.2 <a href="#CICL"><u>Confidence Interval and Confidence Level.</u></a></li>
              <ul>
                <li>1.2.1 <a href="#DCI"><u>Definition of Confidence Interval.</u></a></li>
                <li>1.2.2 <a href="#DCL"><u>Definition of Confidence Level.</u></a></li>
                <li>1.2.3 <a href="#CLFRP"><u>Confidence Level from a region perspective.</u></a></li>
                <li>1.2.4 <a href="#FCL"><u>Feature of Confidence Level.</u></a></li>
              </ul>
            </ul>
        </li>
        <li>• 2 <a href="#PI"><u>Practical Instances.</u></a></li>
    </ul>
</body>

---

# <a id="FDF">1 Fundamental definition and feature.</a>
## <a id="TT">1.1 T-test (T-distribution).</a>
### <a id="DT">1.1.1 Definition of T-test.</a>
In general,T-test can be classified as three tests: Single Population Test, Double Population Test, and Paired Sample Test.Without doubt, T-test is closely related to the T-distribution.To simplify our problem, we only consider **Single Population Test** here as our topic.<br/>
<br/>
A Single Population T-test tests whether a sample mean differs significantly from a known population mean. When the population distribution is normal, such as the population standard deviation is unknown and the sample size is less than 30, then the deviation statistic between the sample mean and the population mean is T-distributed.In other word, the purpose of T-test is to determine whether the mean difference between two types of samples on a certain variable is significant, which is also the reason why we constructing T-test.<br/>
<br/>
The formula of Single Population T-test is:<br/>
<p align="center">$$t = \frac{\overline{X} - \mu_{0}}{\frac{\sigma_{x}}{\sqrt{N}}}$$</p>
Here, $$\overline{X}$$ represents sample mean, $$\mu_{0}$$ represents population mean, $$\sigma_{x}$$ represents standard deviation and N represents the number of samples.In Single Population T-test, the **degree of freedom** $$df = N - 1$$. With more professional terminology, $$\frac{\sigma_{x}}{\sqrt{N}}$$ stands for **Standard Error of Mean**, which is:<br/>
<p align="center">$$SEM = \frac{\sigma_{x}}{\sqrt{N}}$$</p>
**SEM** is a quite significant concept.Instead of the standard deviation of the population, SEM utilizes the sample standard deviation.In light of above, we can conclude that **the t-value can be interpreted as the extent to which the sampling mean deviates from the population mean correspond to the SEM**.<br/>
<br/>

### <a id="FT">1.1.2 Feature of T-test.</a>
![t_distribution_comparisons]({{ site.baseurl }}/images/ConfidenceLevel/t_distribution_comparisons.png)<br/>
<p align="center">[figure source: <i><a href="https://www.scribbr.co.uk/stats/t-distribution-meaning/">www.scribbr.co.uk</a></i>]</p>
As the figure above, we can observe that when the degree of freedom increments, the curve becomes narrower and taller, and more resemble as normal distribution.Conversely, it becomes flatter.In the matter of fact, when $$df \geq 30$$, the T-distribution curve and the normal distribution curve are difficult to distinguish with the naked eyes.<br/>
<br/>

## <a id="CICL">1.2 Confidence Interval and Confidence Level.</a>
### <a id="DCI">1.2.1 Definition of Confidence Interval.
All confidence intervals are based on the concept of **point estimation**, in which a single sample is taken from the population and its sample mean is used as a point estimate of the population mean.The confidence interval is where we add a **floating range** to the point estimate, and the value within this interval is acceptable to the forecast.<br/>
<br/>
Since the mean of the point estimate is easy to find, what we really need to determine is the upper and lower **boundaries(critical points)** of confidence interval, that is, the floating range.We will elaborate it detailedly in the following content.<br/>
<br/>

### <a id="DCL">1.2.2 Definition of Confidence Level.</a>
To better understand the confidence level, we need to introduce **Significance Level $$\alpha$$** firstly.By definition, Significance level refers to the probability that the null hypothesis is wrongly rejected when the null hypothesis itself is true in a statistical hypothesis test.Significance Level is usually considered a prescribed two-sided threshold, i.e. one side is $$\alpha/2$$.Common values of $$\alpha$$ are 0.05, 0.01, and so on.<br/>
<br/>
**Confidence Level is an abstraction of Confidence Interval**.By repeatedly building the confidence interval, we obtain a set of confidence intervals.The confidence level is the frequency of the confidence interval that contains the real population mean in the set over the number of confidence intervals in the set.However,this formula is inefficient.In contrary,there exists a more efficient formula:
<p align="center">$$ConfidenceLevel = 1 - \alpha$$</p>

### <a id="CLFRP">1.2.3 Confidence Level from a region perspective.</a>
![Acceptance-and-rejection-regions]({{ site.baseurl }}/images/ConfidenceLevel/Acceptance-and-rejection-regions.png)<br/>
Let $$\mu_{real}$$ represents the population sample mean.Assuming we have the floating range by some means (I will discuss it later), we add or subtract the floating range from both sides with $$\mu_{real}$$ as the center to get a closed interval, we call this closed interval as **Acceptance Region**, and the remaining unclosed interval as **Reject Region**.<br/>
<br/>
However, since the floating range is fixed, then the confidence interval we construct for each point estimate and the acceptance region have the same width. Therefore, we can conclude that:<br/>
<i>• If $$\mu_{sample}$$ falls in acceptance region, then thesample confidence interval constructed by $$\mu_{sample}$$ must contain $$\mu_{real}$$.<br/>
• If $$\mu_{sample}$$ falls on reject region, then the sample confidence interval constructed by $$\mu_{sample}$$ must not contain $$\mu_{real}$$.</i><br/>
<br/>
In light of above, from the perspective of region, **a confidence level of $$(1 - \alpha)$$ is equivalent to a sampling distribution acceptance area of $$(1 - \alpha)$$**.<br/>
<br/>

### <a id="FCL">1.2.4 Feature of Confidence Level.</a>
Common confidence levels include 90%, 95%, and 99%.It's worth noting that if we take the 95% confidence level as an instance, the 95% does not represent that there exists a 95% probability for $$\mu_{real}$$ to fall within the confidence interval constructed by $$\mu_{sample}$$.Instead, it represents that the confidence interval with a large number of repeated build point estimates has a 95% probability of containing $$\mu_{real}$$.<br/>
<br/>
Here are two significant features for Confidence Level:<br/>
▸ When the confidence level is unchanged, the larger the sample size, the narrower the confidence interval.<br/>
▸ When the sample size is unchanged, the higher the confidence level, the wider the confidence interval.<br/>
<br/>

# 2 <a id="PI">Practical Instances.</a>
