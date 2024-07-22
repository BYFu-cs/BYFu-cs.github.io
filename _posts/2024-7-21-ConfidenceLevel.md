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

# 1.Fundamental definition and feature.
## 1.1 T-test (T-distribution).
### 1.1.1 Definition of T-test.
In general,T-test can be classified as three tests: Single Population Test, Double Population Test, and Paired Sample Test.Without doubt, T-test is closely related to the T-distribution.To simplify our problem, we only consider **Single Population Test** here as our topic.<br/>
<br/>
A Single Population T-test tests whether a sample mean differs significantly from a known population mean. When the population distribution is normal, such as the population standard deviation is unknown and the sample size is less than 30, then the deviation statistic between the sample mean and the population mean is T-distributed.In other word, the purpose of T-test is to determine whether the mean difference between two types of samples on a certain variable is significant, which is also the reason why we constructing T-test.<br/>
<br/>
The formula of Single Population T-test is:<br/>
<p align="center">$$t = \frac{\overline{X} - \mu_{0}}{\frac{\sigma_{x}}{\sqrt{N}}}$$</p>
Here, $$\overline{X}$$ represents sample mean, $$\mu_{0}$$ represents population mean, $$\sigma_{x}$$ represents standard deviation and N represents the number of samples.In Single Population T-test, the **degree of freedom** df = N -1. With more professional terminology, $$\frac{\sigma_{x}}{\sqrt{N}}$$ stands for **Standard Error of Mean**, which is:<br/>
<p align="center">$$SEM = \frac{\sigma_{x}}{\sqrt{N}}$$</p>
**SEM** is a quite significant concept.Instead of the standard deviation of the population, SEM utilizes the sample standard deviation.In light of above, we can conclude that **the t-value can be interpreted as the extent to which the sampling mean deviates from the population mean correspond to the SEM**.<br/>
<br/>

### 1.1.2 Feature of T-test.
![t_distribution_comparisons]({{ site.baseurl }}/images/ConfidenceLevel/t_distribution_comparisons.png)<br/>
<p align="center">[figure source: <i><a href="https://www.scribbr.co.uk/stats/t-distribution-meaning/">www.scribbr.co.uk</a></i>]</p>
As the figure above, we can observe that when the degree of freedom increments, the curve becomes narrower and taller, and more resemble as normal distribution.Conversely, it becomes flatter.In the matter of fact, when $$df \geq 30$$, the T-distribution curve and the normal distribution curve are difficult to distinguish with the naked eyes.<br/>
<br/>

## 1.2 Confidence Interval and Confidence Level
### 1.2.1 Definition of Confidence Interval.
All confidence intervals are based on the concept of **point estimation**, in which a single sample is taken from the population and its sample mean is used as a point estimate of the population mean.The confidence interval is where we add a **floating range** to the point estimate, and the value within this interval is acceptable to the forecast.<br/>
<br/>
Since the mean of the point estimate is easy to find, what we really need to determine is the upper and lower **boundaries(critical points)** of confidence interval, that is, the floating range.We will elaborate it detailedly in the following content.<br/>
<br/>

### 1.2.2 Definition of Confidence Level.
To better understand the confidence level, we need to introduce **Significance Level α** firstly.By definition, Significance level refers to the probability that the null hypothesis is wrongly rejected when the null hypothesis itself is true in a statistical hypothesis test.Significance Level is usually considered a prescribed two-sided threshold, i.e. one side is $$\alpha/2$$.Common values of $$\alpha$$ are 0.05, 0.01, and so on.<br/>
<br/>
**Confidence Level is an abstraction of Confidence Interval**.By repeatedly building the Confidence Interval, we get a set of Confidence intervals.The Confidence Level is the frequency of the Confidence Interval that contains the real population mean in the set over the number of Confidence intervals in the set, which is:<br/>
<p algn="center">$$ConfidenceLevel = \frac{Number_of_ConfidenceIntervals_contain_the_real_population_mean}{Totol_number_of_ConfidenceIntervals}$$</p>
However,this formula is inefficient.In contrary,there exists a more efficient formula:
<p algn="center">$$ConfidenceLevel = 1 - \alpha$$</p>


