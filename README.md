<p align="center">
  <h3 align="center">Glides App</h3>
  <p align="center">
    A slide editor prototype
  </p>
  <p align="center">
    <a href="https://nextjs.org/">
      <img src="https://img.shields.io/badge/frontend-Next.js-%23000000?style=for-the-badge&logo=next.js" alt="Built with Next.js">
    </a>
    <a href="https://www.typescriptlang.org/">
      <img src="https://img.shields.io/badge/types-typescript-%23007ACC?style=for-the-badge&logo=typescript" alt="Built with Typescript">
    </a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Run App](#run-app)
  - [Preview](#preview)

<!-- ABOUT THE PROJECT -->

## About The Project

This repo was created with Next JS, using Typescript, tRPC, Prisma and styled-components + styled-system. It allows for basic presentation creation, with multiple slides containing customizable blocks/sections. The custom block system was built with extension and flexibility in mind, and can be found on the `src/entities/blocks.ts` file. 

A demo can be found [https://glides.vercel.app/](here), where presentations are uploaded to a DB hosted in Supabase.


## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

`yarn` installed on your local machine.

### Installation

1. Clone the repo

```sh
git clone https://github.com/TGlide/glides-app/
cd glides-app
```

2. Install Yarn dependencies

```sh
yarn
```

## Usage

### Run App

```sh
yarn dev
```

### Preview

You can check out a live preview at https://glides.vercel.app/



