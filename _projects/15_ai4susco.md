---
nr: "15"
title: "AI4SusCo - Development of an AI-based Classification System for Deforestation-Free Coffee Certification under EU Sustainability Regulation"
abbr: "AI4SusCo"
duration:
  beginning: 
    year: "2024"
    month: "07"
  end: 
    year: "2026"
    month: "06"
description: "The AI4SusCo project develops AI-based solutions for efficient and accurate coffee certification, contributing to sustainable coffee production, rainforest conservation, and climate protection through advanced remote sensing and deep learning technologies."
partners:
  - name: "GRAS Global Risk Assessment Services GmbH"
    link: "https://www.gras-system.org/"
  - name: "TH Köln - University of Applied Sciences"
    link: "https://www.th-koeln.de/"
funding:
  - name: "Bundesministerium für Wirtschaft und Energie (BMWE)"
    link: "https://www.zim.de/ZIM/Navigation/DE/Home/home.html"
main-logo: "../assets/images/projects/logos/bwe.png"
people:
  - name: "Prof. Dr. Gernot Heisenberg"
  - name: "M.Sc. Sven Wöhrle"
  - name: "M.Sc. Natasha Randall"
contact: "Prof. Dr. Gernot Heisenberg"
research-areas:
    areas:
      - name: "Artificial Intelligence"
        tag: "ai"
      - name: "Remote Sensing"
        tag: "remote_sensing"
      - name: "Sustainability"
        tag: "sustainability"
    topics:
      - name: "Deep Learning"
        tag: "deep_learning"
      - name: "Computer Vision"
        tag: "computer_vision"
      - name: "Environmental Monitoring"
        tag: "environmental_monitoring"
      - name: "spatio-temporal models (3D-UNet, ViT)"
        tag: "spatio_temporal_models"
      - name: "Coffee"
        tag: "coffee" 
      - name: "Deforestation"
        tag: "deforestation"
sitemap: true
---

## Problem Statement
In the AI4SusCo research project, we are developing technological solutions in collaboration with GRAS Global Risk Assessment Services GmbH to make coffee certification more efficient and accurate. This contributes significantly to the sustainable development of the coffee industry, the conservation of rainforests, and global climate protection.

By combining multi-temporal remote sensing data with modern deep learning architectures, particularly Convolutional Neural Networks (CNNs) and Transformers, we enable highly accurate spatial and temporal detection of coffee cultivation areas and their potential expansion into deforested regions.

## Approach

### 1. Using CNNs for Spatial Detection of Coffee Cultivation Areas
The identification of coffee cultivation areas is based on the automated analysis of multispectral and hyperspectral remote sensing data from satellite missions such as Sentinel-2 (ESA) and Landsat-8/9 (NASA/USGS). We employ CNNs which enable:

- **Spectral Signature Analysis** to distinguish between coffee plantations, other crops, and natural vegetation.
- **Semantic Segmentation** of satellite images for precise delineation of coffee cultivation areas.
- **Topographic Context Analysis** to verify coffee cultivation in regions with typical growing conditions (e.g., high altitudes).

Through transfer learning with pre-trained CNN models like U-Net, DeepLabV3+, or ResNet50, the detection algorithms are optimized for classifying coffee cultivation areas. A particular challenge lies in detecting and distinguishing different coffee cultivation systems and their temporally varying appearances.

### 2. Transformer Models for Temporal Monitoring and Change Detection
In addition to spatial mapping, the temporal dynamics of coffee cultivation are a central aspect for verifying EUDR (EU Deforestation Regulation) requirements. For this, we rely on spatiotemporal transformer architectures specifically developed for processing multi-temporal remote sensing data.

#### Implementation of Vision Transformers (ViTs) and Spatiotemporal Transformers (STTs)
- ViTs analyze satellite images over extended periods to identify changes in vegetation or deforestation activities.
- STTs combine spatial and temporal information to model correlations between land use changes and coffee cultivation.
- Through self-attention mechanisms, transformer models recognize not only local changes but also large-scale landscape patterns.

#### Time Series Analysis with Long Short-Term Memory (LSTM) Networks
In addition to transformer architectures, LSTM networks are used to capture long-term trends in vegetation dynamics. These models enable:
- Early detection of deforestation processes by analyzing NDVI (Normalized Difference Vegetation Index) time series from Sentinel-2 data.
- Identification of seasonal cultivation patterns to distinguish between natural vegetation cycles and new coffee cultivation areas.

### 3. Deriving Decision-Relevant Products from ML-Supported Analyses
The insights gained serve as the basis for generating decision-relevant products:
- High-resolution maps for detecting coffee cultivation areas.
- Deforestation risk indices based on correlations between land use changes and EUDR-relevant agricultural products.
- Predictive models for future cultivation areas to enable early regulatory measures.

The developed models are continuously optimized through validation with ground inspection data and drone imagery.
