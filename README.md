# BASE-REACT-VITE-TEMPLATE

## Description

This is a template for a React project using Vite.

### Features included

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />

<img src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white" />
<img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white" />

<img src="https://img.shields.io/badge/testing%20library-323330?style=for-the-badge&logo=testing-library&logoColor=red" />

<img src="https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white" />

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Tests](#quality-check)

---

## Installation

### Prerequisites

- Node.js
- Yarn

### Initialize project

```bash
yarn create vite .
```

### Install dependencies

```bash
yarn
```

---
## Usage

```bash
yarn start
```

---

## Quality check

### Mock Server

```bash
yarn mock
```

### Unit Tests

```bash
yarn test -u
```

### Sonarqube

```bash
yarn sonar
```

---

## Deployment

### Docker Build

```bash
docker build -t base-react-vite-template .
```

### Docker Run

```bash
docker run -p 3000:3000 base-react-vite-template
```

### Jenkins

Just run the pipeline on CI/CD ( After MR approval)