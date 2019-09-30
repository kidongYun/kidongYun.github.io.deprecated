---
layout: post
title:  "Project. Knights Landing Processor"
date:   2019-07-24 11:21:54 +0900
categories: project
---

### 1. Background
> KISTI 와 원광대학교 의 산학협력으로 진행하는 슈퍼 컴퓨팅 연구로 Knight Landing Processor 환경에서 Data Migration 와 Roofline 성능분석 모델을 활용해 Computing Performance를 향상시키는 연구를 했습니다. <br><br> 2분의 교수님 지휘 아래에서 2팀으로 나뉘어 서로 다른 소주제를 가지고 연구를 진행했습니다. '슈퍼컴퓨팅 시스템 기술 개발'라는 소주제를 받은 저는 교수님을 포함한 총 3인 1팀이 되어 MCDRAM(HBM)과 DRAM 사이에서 Data Migration을 활용한 성능 향상 방법을 모색했습니다. <br><br> __특히 이 연구에서 저는 Performance 향상을 위한 Data Migration Algorithm을 설계하는 것이 주된 과제였습니다.__

<img src="/workspace/project/knl/res/paper.png" style="width:80%;"/> 

### 2. Environment
> _System : Linux based Knight Landing Processor_ <br> _Language : Python, Bash Shell Script_ <br> _Framework & Library : numactl, Intel Advisor_

### 3. Technical Detail
> __1. Cache Coherence에 대한 이해__ <br> 초기에는 Cache Coherence 위한 방법 중 Snoopy Protocol에 대해 연구하였습니다. 그러나 일반 PC에서 사용하는 Snoopy Protocol방식은 Knight Landing와 같이 노드가 많은 슈퍼컴퓨터에서는 병목현상이 생겨나 성능이 급격히 감소하여 사용할 수가 없습니다. 그래서 Directory based Protocol를 집중 연구하였습니다. <br><br> __2. Knights Landing의 메모리 구조__ <br> Knights Landing Processor는 일반 범용 개인 컴퓨터들 과는 다르게 메모리가 DRAM과 MCDRAM(HBM) 두 종류로 나뉘어 있었습니다. 또 메모리와 프로세서가 독립적으로 구분된 UMA구조가 아니고 NUMA(Non-Uniform Memory Access)구조로서 노드별로 메모리와 프로세서가 종속적입니다. <br><br> __3. numactl, Intel advisor를 활용한 Data Migration__ <br> 메모리 수준에서의 Data Migration을 위해서 Low programming이 가능한 도구가 필요했습니다. 이를 위해 _numactl_, _Intel Advisor_ 등의 프로그램을 사용했습니다. Migration policy는 해당 데이터의 이용률이 높을수록 MCDRAM으로 올리고 그렇지 않을수록 DRAM으로 내립니다. <br><br> __4. Linear Regression Model을 통한 데이터 이용률 예측__ <br> 데이터 이용에 대한 과거 데이터를 가지고 가까운 미래에 대해서 높을지 아닐지를 예측합니다. 이를 위해 선형회귀 모델을 활용하였습니다. 이를 계속 반복하여 이 정책이 적용된 머신과 그렇지 않은 머신에 대해 성능차이를 분석합니다.

### 4. Impression
> 좋은 연구결과를 얻어 2018년도 타이페이에서 개최된 CICET 주관 컨퍼런스에서 Best Paper Award를 수상하였습니다. <br><br> 항상 접하기 쉬운 Application Layer에서 서비스를 위한 프로그램을 만들다가 메모리 레벨에서 무언가를 연구한 것은 정말 많은 것을 느낀 경험이었습니다. 

<br><br>

[[논문] HyDM: Data Migration Methodology for Hybrid Memories.pdf](https://github.com/kidongYun/kidongYun.github.io/files/3417296/knl_paper.pdf){: target="_blank"}

[[연구자료] Cache Coherence Protocols.pptx](/workspace/project/knl/res/Cache_Coherence_Protocols.pptx){: target="_blank"}

[[연구자료] Roofline Model.pptx](/workspace/project/knl/res/Roofline_Model.pptx){: target="_blank"}

[[연구자료] Applying Roofline Model to KNL.pptx](/workspace/project/knl/res/Applying_Roofline_Model_to_KNL.pptx){: target="_blank"}

[[연구자료] Optimization.pptx](/workspace/project/knl/res/Optimization.pptx){: target="_blank"}

[[연구자료] Data Migration Algorithm.pptx](/workspace/project/knl/res/Data_Migration_Algorithm.pptx){: target="_blank"}

