---
layout: post
title: Machine Learning：Confidence Interval and Confidence Level based on T-test.
tags: learn
excerpt:
---

![cover]({{ site.baseurl }}/images/ConfidenceLevel/cover.png)
<div class="tooltip-container-orange">
  <span class="text-orange">#Blog</span>
</div><div class="tooltip-container-red"><span class="text-red">#Stats</span> <span class="text-red">#ML</span></div>
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
        <li>
            • 2 <a href="#PI"><u>Practical Instantiation.</u></a>
            <ul>
                <li>2.1 <a href="#BD"><u>Background Description.</u></a></li>
                <li>2.2 <a href="#PS"><u>Problem Solving.</u></a></li>
                <ul>
                    <li>2.2.1 <a href="#FM"><u>Formula Manipulation.</u></a></li>
                    <li>2.2.2 <a href="#TTLU"><u>T-Table Look-Up</u></a></li>
                    <li>2.2.3 <a href="#OCI"><u>Obtain Confidence Interval.</u></a></li>
                </ul>
            </ul>
        </li>
        <li>• 3 <a href="#end"><u>End.</u></a></li>
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
<div align="center">
  <img src="{{ site.baseurl }}/images/ConfidenceLevel/t_distribution_comparisons.png" alt="t_distribution_comparisons" height="405"/>
</div>
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
<br/>

### <a id="CLFRP">1.2.3 Confidence Level from a region perspective.</a>
<div align="center">
  <img src="{{ site.baseurl }}/images/ConfidenceLevel/Acceptance-and-rejection-regions.png" alt="Acceptance-and-rejection-regions" width="540" height="405"/>
</div>
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

---

# <a id="PI">2 Practical Instantiation.</a>
## <a id="BD">2.1 Background Description.</a>
Suppose we have an analytical population with unknown population mean $$\mu_{real}$$.Assuming that our confidence interval is set to be $$\alpha$$ and $$\sigma_{x}$$ is the standard deviation of our population.Our goal is to obtain the confidence interval of the analytical population by sampling the sample with size $$N$$(which is point estimation).Now, presuming that the mean of our point estimation is $$\mu_{s}$$.<br/>
<br/>
## <a id="PS">2.2 Problem Solving.</a>
### <a id="FM">2.2.1 Formula Manipulation.</a>
Since the distribution of our multiple samples conforms to the T-distribution, our critical $$\overline{X}$$ value needs to be calculated by the T-value.
Recall that the formula of t-value is:<br/>
<p align="center">$$t_{bound} = \frac{\overline{X}_{bound} - \mu_{s}}{\frac{\sigma_{x}}{\sqrt{N}}}$$</p>
There is no need to wonder why $$\mu_{s}$$ displaces the population mean $$\mu_{0}$$ here, because point estimation utilizes the sample mean to estimate the population mean, and that is:<br/>
<p align="center">$$\widehat{\mu_{0}} = \mu_{s}$$</p>
Now, we transform the formula for t-value into another form:<br/>
<p align="center">$$\overline{X}_{bound} = \mu_{s} + t_{bound} \cdot \frac{\sigma_{x}}{\sqrt{N}}$$</p>
The only term left undetermined by the quation is the value of $$t_{bound}$$.<br/>
<br/>

### <a id="TTLU">2.2.2 T-Table Look-Up</a>
<div align="center">
  <img src="{{ site.baseurl }}/images/ConfidenceLevel/t-test.jpeg"/>
</div>
This T-Table shows the range of the corresponding **rejection region(first two rows)** and the values of the corresponding **degrees of freedom(first column)**.
Recall that the formula for degree of freedom and TwoSide probability is:<br/>
<p align = "center">
$$
\begin{equation}
\begin{cases}
df = N - 1 \\
TwoSide = 1 - \alpha
\end{cases}
\end{equation}
$$
</p>
Depending on the confidence level and the degree of freedom, we lock the t-value in the table.<br/>
<br/>
It is quite significant to be careful here that the t-values in our table are all positive, but in fact there is a t-value of the same absolute magnitude in the negative half axis for the two-sides t:
<p align = "center">$$t_{bound} = \pm value$$</p>
<br/>

### <a id="OCI">2.2.3 Obtain Confidence Interval.</a>
After getting two values of $$t_{bound}$$, we can obtain two values of $$\overline{X}_{bound}$$, which are **critical points**.The smaller value is for the lower boundary of confidence interval, and the larger value is for the upper boundary of confidence interval.Definitely, we obtain the confidence interval for $$\mu_{s}$$:<br/>
<p align="center">$$[\mu_{s} - |t_{bound}| \cdot \frac{\sigma_{x}}{\sqrt{N}} , \mu_{s} + |t_{bound}| \cdot \frac{\sigma_{x}}{\sqrt{N}}]$$</p>
As you may have noticed, the so-called **floating range** is actually $$2 \cdot |t_{bound}| \cdot \frac{\sigma_{x}}{\sqrt{N}}$$. This is also **the width of acceptance region**.<br/>
<br/>

---

# <a id="end">3 End.</a>
We've ultimately got the confidence intervals we want, and I'm sure you know the concepts inside out! Note again: The confidence interval we construct does not contain $$\mu_{real}$$ with the probability of $$\alpha$$, but from the perspective of macroscopic multiple point estimates, the confidence intervals of $$\alpha$$ percent contain $$\mu_{real}$$.<br/>
<br/>
Thank you for reading my blog, if you like my blog, please offer me a comment to support!<br/>
<br/>




