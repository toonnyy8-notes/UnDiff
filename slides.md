---
theme: seriph
background: https://source.unsplash.com/collection/94734566/1920x1080
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
drawings:
  persist: false
transition: slide-left
title: UnDiff
mdc: true
download: true
---

# [UnDiff](https://www.isca-speech.org/archive/interspeech_2023/iashchenko23_interspeech.html)
## Unsupervised Voice Restoration
## with Unconditional Diffusion Model

Anastasiia Iashchenko$^{123∗}$
, Pavel Andreev$^{1∗}$
, Ivan Shchekotov$^{123∗}$
, Nicholas Babaev$^{1}$
, Dmitry Vetrov$^{24}$

$^1$Samsung AI Center, Moscow; $^2$HSE University, Moscow;
$^3$Skolkovo Institute of Science and Technology, Moscow;
$^4$Artificial Intelligence Research Institute, Moscow;
$^∗$equal contribution

## Interspeech 2023

<div class="abs-br m-6 flex gap-2">
  <a href="https://github.com/toonnyy8-notes/UnDiff" target="_blank" alt="GitHub"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-github />
  </a>
</div>

<!--
The last comment block of each slide will be treated as slide notes. It will be visible and editable in Presenter Mode along with the slide. [Read more in the docs](https://sli.dev/guide/syntax.html#notes)
-->

---

# Unsupervised Voice Restoration

<div></div>

<p class="text-2xl text-justify">

Audio restoration tasks are inverse problems with the aim to **Restore the Signal $\mathbf{x}$** from observations $\mathbf{y}=A(\mathbf{x})$ that have suffered **a Known Type of Degradation $A$**.  
- e.g., bandwidth extension, declipping, and Mel-spectrogram inversion. 

These problems are ill-posed in the sense that several different restorations may be equally plausible. Algorithms are typically constructed for
- A particular type of degradation using domain knowledge, and
- Data-driven generative models have also been recently proposed. 

</p>

<SlideCurrentNo class="absolute bottom-4 right-8" />

<!--
You can have `style` tag in markdown to override the style for the current page.
Learn more: https://sli.dev/guide/syntax#embedded-styles
-->

<style>
h1 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>

<!--
Here is another comment.
-->

---

# Unsupervised Voice Restoration

<div></div>

<p class="text-2xl text-justify">

However, A common shortcoming is that an algorithm engineered for one type of degradation is typically **Not Useful for Others**.

To address this issue, this study introduces UnDiff, which uses a differentiable operator $A$ to guide the **Diffusion Probabilistic Model** to solve various inverse tasks of speech processing.

<div class="grid grid-cols-2">

<div v-click>

- Bandwidth extension
- Declipping
</div>

<div v-click>

- Neural vocoding
- Source separation
</div>

</div>

<span v-click>UnDiff showcases the latent potential in solving general inverse problems for speech processing under the premise of **Unsupervised Learning**.</span>

</p>

<SlideCurrentNo class="absolute bottom-4 right-8" />

<!--
You can have `style` tag in markdown to override the style for the current page.
Learn more: https://sli.dev/guide/syntax#embedded-styles
-->

<style>
h1 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>

<!--
Here is another comment.
-->

---

# Diffusion Models

<img class="w-7/12 float-left" src="/imgs/SDE-DPM.png" />
<img class="w-5/12" src="/imgs/sampling.png" />

<div class="text-center text-sm">cite: <a target="_black" class href="https://openreview.net/forum?id=PxTIG12RRHS">Score-Based Generative Modeling through Stochastic Differential Equations</a></div>


<p class=text-2xl>

Connect normal distribution and data distribution through Markov chain or stochastic differential equation (SDE).</p>

<SlideCurrentNo class="absolute bottom-4 right-8" />

<style>
h1 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>

---

# Diffusion Models
<span class=text-2xl>Estimate noise $\varepsilon$</span>

<p class="text-2xl">

$$\begin{aligned}
&\mathbb{E}_{\mathbf{x}\sim p_{data},\varepsilon\sim\mathcal{N}(\mathbf{0},\mathbf{I})}\bigg(\lambda(t)\Vert\mathbf{s}_{\theta}(\mathbf{x}_t, t)-\nabla_{\mathbf{x}_t}\log p_t(\mathbf{x}_t)\Vert^2_2\bigg)\\
=&\underbrace{\mathbb{E}_{\mathbf{x}\sim p_{data},\varepsilon\sim\mathcal{N}(\mathbf{0},\mathbf{I})}\bigg(\lambda(t)\Vert\mathbf{s}_{\theta}(\mathbf{x}_t, t)-\cfrac{\varepsilon}{\sqrt{1-\bar\alpha(t)}}\Vert^2_2\bigg)}_{\text{in VP-SDE, }\mathbf{x}_t=\sqrt{\bar\alpha(t)}\mathbf{x} + \sqrt{1-\bar\alpha(t)}\varepsilon}
\end{aligned}$$

</p>

<SlideCurrentNo class="absolute bottom-4 right-8" />

<style>
h1 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>

---

# Inverse Problems with Diffusion Models
<div></div>

<p class="text-2xl">

$$\begin{aligned}
&p(x\vert y)=\cfrac{p(y\vert x)p(x)}{p(y)}\\
\Rightarrow&\nabla_{x_t} \log p(x_t\vert y)=\nabla_{x_t} \log p(y\vert x_t)+\underbrace{\nabla_{x_t}\log p(x_t)}
\end{aligned}$$

</p>

<span class="text-2xl absolute top-60 right-25">Unconditional Diffusion Models</span>

<SlideCurrentNo class="absolute bottom-4 right-8" />

<style>
h1 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>

---

# Inverse Problems with Diffusion Models
<div></div>

<p class="text-2xl">

$$\begin{aligned}
&p(\mathbf{x}\vert \mathbf{y})=\cfrac{p(\mathbf{y}\vert \mathbf{x})p(\mathbf{x})}{p(\mathbf{y})}\\
\Rightarrow&\nabla_{\mathbf{x}_t} \log p(\mathbf{x}_t\vert \mathbf{y})=\underbrace{\nabla_{\mathbf{x}_t} \log p(\mathbf{y}\vert \mathbf{x}_t)}+\nabla_{\mathbf{x}_t}\log p(\mathbf{x}_t)
\end{aligned}$$

</p>

<p class="text-2xl absolute top-52 right-25 m-0 p-0">

$$\begin{aligned}
\approx&\nabla_{\mathbf{x}_t} \log p(\mathbf{y}\vert \mathbf{\hat x}_0=\frac{1}{\sqrt{\bar\alpha(t)}}(\mathbf{x}_t-(1-\bar\alpha(t))\mathbf{s}_{\theta}(\mathbf{x}_t)))\\
=&-\xi(t)\nabla_{x_t}\Vert \mathbf{y}-A(\mathbf{\hat x}_0)\Vert
\end{aligned}$$

<span v-click>$A(\mathbf{x})$ is a differentiable degradation operator.</span>

</p>


<SlideCurrentNo class="absolute bottom-4 right-8" />

<style>
h1 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>

---

# Speech Inverse Tasks: Bandwidth Extension

<div></div>

<p class="text-2xl text-justify">

Frequency bandwidth extension (also known as audio super-resolution) can be viewed as a
realistic restoration of waveform’s high frequencies.

</p>
<p v-click class="text-2xl text-justify">

The observation operator is a lowpass filter 
$$\mathbf{y} = A(\mathbf{x}) = \text{LPF}(\mathbf{x})$$

</p>
<p v-click class="text-2xl text-justify">

And apply data consistency steps, where the
observed low frequencies are replaced with the denoised estimate
following $\mathbf{\bar x}_0 = \mathbf{y} + \mathbf{\hat x}_0 − \text{LPF}(\mathbf{\hat x}_0)$.

</p>

<p v-click class="text-2xl text-justify">

We can rewrite $\mathbf{s}_{\theta}$ using $\mathbf{\bar x}_0$

$$\Rightarrow \mathbf{\bar s}_{\theta}=\frac{1}{1-\bar\alpha(t)}(x_t-\sqrt{\bar\alpha(t)}\bar x_0)$$

</p>

<SlideCurrentNo class="absolute bottom-4 right-8" />

<style>
h1 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>

---

# Speech Inverse Tasks: Declipping

## What is clipping?

<img class="w-1/3 float-left" src="/imgs/clean.png"/>
<arrow v-click x1=360 y1=280 x2=620 y2=280></arrow>
<p v-after class="absolute top-50 left-100 text-2xl">

$A(\mathbf{x})=\mathbf{clip}(\mathbf{x})$
</p>
<img v-click class="w-1/3 float-right" src="/imgs/clipped.png"/>
<p v-click class="absolute top-65 left-90 text-2xl">

$=\frac{1}{2}(\vert\mathbf{x}+c\vert - \vert\mathbf{x}-c\vert )$
</p>

<span class="absolute top-100 left-35 text-sm">cite: <a target="_black" class href="https://spade.inria.fr/">Audio Declipping</a></span>

<SlideCurrentNo class="absolute bottom-4 right-8" />

<style>
h1 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>

---

# Speech Inverse Tasks: Neural Vocoding

<div></div>

<p class="text-2xl">

The majority of modern speech synthesis systems decompose this task into two stages.
1. Low-resolution intermediate representations (e.g., linguistic features, mel-spectrograms) are predicted from text data.
2. Transform intermediate representations to raw waveform by **Neural Vocoder**.

</p>

<div v-click>

##  Vocoder: $\mathcal{L}=||\mathbf{x} - \text{Vocoder}(A(\mathbf{x}))||^2_2$

</div>
<div class="color-#955" v-click>

## Issue of Supervised Vocoder
<p class="text-2xl">

Vocoders based on different intermediate representations **CANNOT be Used Universally**.
</p>
</div>

<SlideCurrentNo class="absolute bottom-4 right-8" />

<style>
h1 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>

---

# Speech Inverse Tasks: Neural Vocoding

<div></div>

<p class="text-2xl">

The majority of modern speech synthesis systems decompose this task into two stages.
1. Low-resolution intermediate representations (e.g., linguistic features, mel-spectrograms) are predicted from text data.
2. Transform intermediate representations to raw waveform by **Neural Vocoder**.

</p>

<div>

## Degradation Operator of Vocoding Task
<p class="text-2xl">

$$A(\mathbf{x})=\text{Mel}(\mathbf{x})$$
</p>

</div>

<SlideCurrentNo class="absolute bottom-4 right-8" />

<style>
h1 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>

---

# Speech Inverse Tasks: Source Separation

<div></div>

<p class="text-2xl">

The goal of single-channel speech separation is to extract individual speech signals from a mixed audio signal, in which multiple INDEPENDENT speakers are talking simultaneously.

</p>

<div>

<p v-click class="text-2xl">

$$
p(x^{(1)}, x^{(2)}|y)=p(x^{(1)}|y)p(x^{(2)}|y)=\cfrac{p(y|x^{(1)},x^{(2)})p(x^{(1)})p(x^{(2)})}{p(y)}\\
\nabla_{x_t^{(1)}}\log p(x_t^{(1)}|y)= \nabla_{x_t^{(1)}}\log p(y|x_t^{(1)},x_t^{(2)}) + \nabla_{x_t^{(1)}}\log p(x_t^{(1)})\\

$$

</p>

<p v-click class="text-2xl">

Specifically, note that y depends only the sum of x1 and x2, 

$\Rightarrow y=x^{(1)} + x^{(2)} = \frac{1}{\sqrt{\bar\alpha(t)}}(x_t^{(1)} + x_t^{(2)})+\sqrt{\frac{2(1-\bar\alpha(t))}{\bar\alpha(t)}}\varepsilon$  

$\Rightarrow p(y|x_t^{(1)}, x_t^{(2)}) = p(y|x_t^{(1)} + x_t^{(2)}) = \mathcal{N}(y;\frac{1}{\sqrt{\bar\alpha(t)}}(x_t^{(1)} + x_t^{(2)}),\frac{2(1-\bar\alpha(t))}{\bar\alpha(t)})$  

</p>

</div>

<SlideCurrentNo class="absolute bottom-4 right-8" />

<style>
h1 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>

---

# Speech Inverse Tasks: Source Separation

<div></div>

<div>


<p class="text-2xl">

$p(y|x_t^{(1)}, x_t^{(2)}) = p(y|x_t^{(1)} + x_t^{(2)}) = \mathcal{N}(y;\frac{1}{\sqrt{\bar\alpha(t)}}(x_t^{(1)} + x_t^{(2)}),\frac{2(1-\bar\alpha(t))}{\bar\alpha(t)})$  


$\log p(y|x_t^{(1)}, x_t^{(2)}) =-\frac{1}{2}\frac{\bar\alpha(t)(y-\frac{1}{\sqrt{\bar\alpha(t)}}(x_t^{(1)} + x_t^{(2)}))^2}{2(1-\bar\alpha(t))}+C$

</p>

<p v-click class="text-2xl">

$$\Rightarrow\nabla_{x_t^{(1)}}\log p(y|x_t^{(1)}, x_t^{(2)}) =\frac{\sqrt{\bar\alpha(t)}(y-\frac{1}{\sqrt{\bar\alpha(t)}}(x_t^{(1)} + x_t^{(2)}))}{2(1-\bar\alpha(t))}$$

</p>

<p v-click class="text-2xl">

$\nabla_{x_t^{(1)}}\log p(y|x_t^{(1)}, x_t^{(2)})$ and $\nabla_{x_t^{(2)}}\log p(y|x_t^{(1)}, x_t^{(2)})$ can be derived without the need to compute the gradient of $\Vert\mathbf{y}-A(\mathbf{x}_t)\Vert^2_2$.
</p>

</div>

<SlideCurrentNo class="absolute bottom-4 right-8" />

<style>
h1 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>

---

# Architecture of Diffusion Model

<div class="grid grid-cols-2">

<div>

  ## Diffwave
  <img class="" src="/imgs/diffwave.png" />
  <span class="text-sm">cite: <a target="_black" class href="https://openreview.net/forum?id=a-xFK8Ymz5J">DiffWave: A Versatile Diffusion Model for Audio Synthesis</a></span>

  <myline x1=485 y1=90 x2=485 y2=500 width=1 color=#555></myline>
</div>

<div>

  ## FFC-AE
  <img class="w-2/5 float-left" src="/imgs/FFC-AE.png" />
  <img class="w-3/5 float-left" src="/imgs/FFC.png" />
  <span class="text-sm">cite: <a target="_black" href="https://www.isca-speech.org/archive/interspeech_2022/shchekotov22_interspeech.html">FFC-SE: Fast Fourier Convolution for Speech Enhancement</a></span>
  
  <myline x1=610 y1=275 x2=700 y2=160 width=2 color=#a57></myline>
  <myline x1=610 y1=300 x2=700 y2=430 width=2 color=#a57></myline>
</div>

</div>

<SlideCurrentNo class="absolute bottom-4 right-8" />

<style>
h1 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>

---

# Experiments

<img class="w-3/7 float-left" src="/imgs/BWE.png" />

<img class="w-5/11 float-right pr-5" src="/imgs/Decliping.png" />

<img class="w-5/11 float-right pt-5 pr-5" src="/imgs/Vocoding.png" />

<SlideCurrentNo class="absolute bottom-4 right-8" />

<style>
h1 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>

---

# Experiments: Source Separation

<br/>

<img class="w-4/9 float-left" src="/imgs/Separation.png" />


<img class="w-5/9 float-right" src="/imgs/separation-case.png" />

<p class="float-left w-4/9 text-justify text-xl">
Although Undiff is able to correctly separate voices in local regions, it mixes different voices within one sample.
</p>

<SlideCurrentNo class="absolute bottom-4 right-8" />

<style>
h1 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>

---

# Conclusions

<div></div>

<p class="text-2xl text-justify">

- The results highlight the potential of the <span class="color-#67b">**Unconditional Diffusion Models**</span> to serve as general voice restoration tools.

- Enabling models to produce globally coherent voices during source separation could be An interesting directions for future work.

</p>

<SlideCurrentNo class="absolute bottom-4 right-8" />

<style>
h1 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>