export const files = {
  "_quarto.yml": `project:
  type: website
  output-dir: docs

website:
  title: "Differential Geometry"
  description: "Course notes for Differential Geometry"
  repo-url: "https://github.com/username/repo"
  sidebar:
    style: "docked"
    search: true
    contents:
      - index.qmd
      - 01-preliminaries.qmd
      - 02-curves.qmd
      - 03-surfaces.qmd
      - 04-curvature.qmd
      - 05-intrinsic.qmd

format:
  html:
    theme: cosmo
    css: styles.css
    toc: true
    number-sections: true
    html-math-method: katex
`,

  "index.qmd": `---
title: "Differential Geometry Notes"
author: "GE Jian"
institute: "Beijing Normal University"
date: last-modified
---

# Welcome {.unnumbered}

These are the supplementary materials for the course "Differential Geometry".

**Contact:** [jge@bnu.edu.cn](mailto:jge@bnu.edu.cn)

## Overview

This website contains lecture notes covering:

-   **Preliminaries**: Metric spaces, Topology, Vector spaces.
-   **Curves**: Parametrized curves, Frenet frames, Global properties.
-   **Surfaces**: Regular surfaces, First fundamental form.
-   **Curvature**: Shape operator, Gaussian & Mean curvature.
-   **Intrinsic Geometry**: Geodesics, Gauss-Bonnet Theorem.

::: {.callout-note}
## Note
These notes are automatically generated from LaTeX source.
:::
`,

  "01-preliminaries.qmd": `---
title: "Preliminaries"
---

This chapter contains materials that are either needed in the proofs of main theorems or help you to understand notation/concept beyond routine calculations and proofs.

## Metric spaces

::: {.callout-note}
## Definition (Metric Space)
$(X, \\mathrm{dist})$ is called a metric space if $X$ is a set and $\\mathrm{dist}: X\\times X \\to \\mathbb{R}\\cup \\{\\infty\\}$ is a *metric* or a *distance function*, i.e. it satisfies the following conditions:

1.  Positiveness: $\\mathrm{dist}(x, y)\\ge 0$ with equality holds if and only if $x=y$.
2.  Symmetry: $\\mathrm{dist}(x, y)=\\mathrm{dist}(y,z)$.
3.  Triangle inequality: $\\mathrm{dist}(x, z)\\ge \\mathrm{dist}(x, y)+\\mathrm{dist}(y, z)$.

A metric space $(X, \\mathrm{dist})$ is called *complete* if every Cauchy sequence in $X$ has a limit point that is also in $X$. We also write $\\mathrm{dist}(x,y)$ as $d(x,y)$ or simply $|xy|$. Elements in $X$ are called *points*.
:::

::: {.callout-tip}
## Example
A typical example of metric space is the usual Euclidean plane $\\mathbb{R}^{2}$ with the standard metric:
$$
d((x_{1}, y_{1}), (x_{2}, y_{2}))=\\sqrt{(x_{1}-x_{2})^{2}+(y_{1}-y_{2})^{2}}.
$$
:::

## Topology

::: {.callout-note}
## Definition (Topology)
A **topology** on a set $X$ is a collection $\\mathcal{T}$ of subsets of $X$, called *open sets*, such that:

1.  $\\emptyset \\in \\mathcal{T}$ and $X \\in \\mathcal{T}$,
2.  $\\mathcal{T}$ is closed under arbitrary unions,
3.  $\\mathcal{T}$ is closed under finite intersections.
:::

::: {.callout-note}
## Definition (Continuity)
A map $f: X\\to Y$ between two topological spaces $X, Y$ is called *continuous* if for every open set $U\\subset Y$, $f^{-1}(U)$ is an open set in $X$.
:::

## Vector spaces and its dual

### Musical Isomorphisms

Let $(V, \\mathbf{g})$ be a vector space with an inner product.

::: {.callout-note}
## Definition (Musical Isomorphisms)
We define isomorphisms $\\flat: V\\to V^*$ and $\\sharp: V^* \\to V$.
For $\\mathbf{v}\\in V$, we define $\\mathbf{v}^\\flat\\in V^*$ by:
$$
\\mathbf{v}^\\flat (\\mathbf{w})=\\mathbf{g}(\\mathbf{v}, \\mathbf{w}), \\quad \\text{for any}\\ \\mathbf{w}\\in V,
$$
and for any $\\mathbf{f}\\in V^*$, we define $\\mathbf{f}^\\sharp\\in V$ by requiring:
$$
\\mathbf{g}(\\mathbf{f}^\\sharp, \\mathbf{w})=\\mathbf{f}(\\mathbf{w}), \\quad \\text{for any}\\ \\mathbf{w}\\in V.
$$
:::

In coordinates, if $G=(g_{ij})$ is the metric matrix:

**Flat isomorphism:**
$$
\\mathbf{v}^{\\flat}=
\\begin{pmatrix}
    v^{1}&v^{2}&v^{3}
\\end{pmatrix}
G
\\begin{pmatrix}
    \\mathbf{f}^{1}\\\\ \\mathbf{f}^{2}\\\\ \\mathbf{f}^{3}
\\end{pmatrix}
$$

**Sharp isomorphism:**
$$
\\mathbf{f}^{\\sharp}=\\begin{pmatrix}
    \\mathbf{e}_{1}&\\mathbf{e}_{2}&\\mathbf{e}_{3}
\\end{pmatrix}
G^{-1}\\begin{pmatrix}f_{1}\\\\f_{2}\\\\f_{3}\\end{pmatrix}
$$
`,

  "02-curves.qmd": `---
title: "Curves"
---

## Parametrized curve

::: {.callout-note}
## Definition
A *(parametrized) differentiable/continuous curve* $\\gamma$ in $\\mathbb{R}^{n}$ is a differentiable/continuous map $\\gamma: I \\to \\mathbb{R}^{n}$. A parametrized continuous curve is called *simple* if for any point $p\\in \\gamma$, and an open neighborhood $U\\ni p$ such that $U\\cap \\gamma$ is homeomorphic to a real interval.
:::

::: {.callout-note}
## Definition (Regular Curve)
A differentiable curve $\\gamma: I \\to \\mathbb{R}^{n}$ is called *regular* if $\\dot{\\gamma}(t)\\ne 0$ for all $t\\in I$.
:::

## Regular curve in Euclidean space

For a unit speed regular curve $\\gamma(t)$, we define $\\mathbf{T}(t):=\\gamma'(t)$.

::: {.callout-note}
## Definition (Curvature)
The number $k(t):=|\\mathbf{T}'(t)|$ is called the *curvature* of the curve $\\gamma$ at $t$.
:::

If $k(t) \\ne 0$, we define the normal vector $\\mathbf{N}(t)$ by $\\mathbf{T}'(t)=k(t) \\mathbf{N}(t)$, and the binormal vector $\\mathbf{B}(t):=\\mathbf{T}(t)\\times \\mathbf{N}(t)$.

::: {.callout-note}
## Definition (Frenet Frame)
Along the unit speed curve $\\gamma$, the oriented orthonormal basis $\\{\\mathbf{T}, \\mathbf{N}, \\mathbf{B}\\}$ is called the *Frenet frame*.
:::

The **Frenet-Serret formulas** are:
$$
\\frac{d}{dt} \\begin{pmatrix} \\mathbf{T}(t) \\\\ \\mathbf{N}(t) \\\\ \\mathbf{B}(t) \\end{pmatrix} = 
\\begin{pmatrix} 
0 & k(t) & 0 \\\\
-k(t) & 0 & \\tau(t) \\\\
0 & -\\tau(t) & 0 
\\end{pmatrix} 
\\begin{pmatrix} \\mathbf{T}(t) \\\\ \\mathbf{N}(t) \\\\ \\mathbf{B}(t) \\end{pmatrix}
$$
where $\\tau(t)$ is the **torsion**.

### Fundamental Theorem of Space Curves

::: {.callout-tip}
## Theorem
Let $k(s)>0$ and $\\tau(s)$ be two smooth real valued functions. There exists a unit speed regular curve $\\gamma: I \\to \\mathbb{R}^{3}$, unique up to rigid motion, such that $k(s)$ is the curvature and $\\tau(s)$ is the torsion.
:::

## Global Properties

### Isoperimetric inequality

::: {.callout-tip}
## Theorem
Let $\\gamma$ be a simple closed unit speed curve in $\\mathbb{R}^{2}$ of length $\\ell$. Let $\\Omega$ be the domain enclosed by $\\gamma$. Then:
$$
\\mathrm{Area}(\\Omega)\\le \\frac{\\ell^{2}}{4\\pi} \\quad \\Leftrightarrow \\quad 4\\pi \\mathrm{Area}(\\Omega) \\le \\ell^{2}.
$$
Equality holds if an only if $\\gamma$ is a round circle.
:::

### Four-vertex Theorem

::: {.callout-note}
## Definition (Vertex)
A *vertex* of a regular curve is a point where $\\kappa'(t)=0$.
:::

::: {.callout-tip}
## Theorem (Four-Vertex Theorem)
For a simple closed smooth convex curve, there are at least four vertices.
:::
`,

  "03-surfaces.qmd": `---
title: "Surfaces"
---

## Regular Surfaces

::: {.callout-note}
## Definition
We call a subset $\\Sigma\\subset \\mathbb{R}^{3}$ a *regular surface*, if for each point $p\\in \\Sigma$, there exists a neighborhood $V\\subset \\Sigma$, an open subset $U \\subset \\mathbb{R}^{2}$, and a map $\\mathbf{F}: U\\to V$ (coordinate patch) such that:
1.  $\\\\mathbf{F}$ is smooth.
2.  $\\\\mathbf{F}$ is a homeomorphism.
3.  The differential $d\\mathbf{F}$ is one-to-one (full rank).
:::

::: {.callout-tip}
## Proposition (Graph Surface)
Let $f: U\\to \\mathbb{R}$ be a smooth function. Then the graph of $f$ given by $(x,y, f(x,y))$ is a smooth regular surface.
:::

::: {.callout-tip}
## Proposition (Implicit Surface)
If $a$ is a regular value of a smooth function $f: U\\to \\mathbb{R}$ ($U \\subset \\mathbb{R}^3$), then $f^{-1}(a)$ is a regular surface.
:::

## Tangent plane

::: {.callout-note}
## Definition
For $q\\in \\Sigma$, the *tangent plane* $T_{q}\\Sigma$ is the set of all tangent vectors $\\beta'(0)$ of curves on $\\Sigma$ passing through $q$. If parametrized by $\\mathbf{F}$, $T_{q}\\Sigma$ is spanned by $\\frac{\\partial \\mathbf{F}}{\\partial u}$ and $\\frac{\\partial \\mathbf{F}}{\\partial v}$.
:::

## First Fundamental Form

The induced metric on the surface from $\\mathbb{R}^3$.

::: {.callout-note}
## Definition
The *first fundamental form* is given by the matrix $G$:
$$
G =\\begin{pmatrix}
    \\langle \\mathbf{e}_{1}, \\mathbf{e}_{1} \\rangle & \\langle \\mathbf{e}_{1}, \\mathbf{e}_{2} \\rangle \\\\
    \\langle \\mathbf{e}_{2}, \\mathbf{e}_{1}\\rangle & \\langle \\mathbf{e}_{2}, \\mathbf{e}_{2}\\rangle \\\\
\\end{pmatrix}
=:\\begin{pmatrix}
g_{11}&g_{12}\\\\
g_{21}&g_{22}
\\end{pmatrix}
$$
where $\\mathbf{e}_1 = \\mathbf{F}_u$ and $\\mathbf{e}_2 = \\mathbf{F}_v$.
:::

The **area element** is $\\sqrt{\\det G} \\, du \\, dv$.

## Orientation

A surface is **orientable** if it admits a continuous global unit normal vector field $\\mathbf{n}$. The Moebius band is the classic non-orientable example.
`,

  "04-curvature.qmd": `---
title: "Curvature of Surface"
---

## Gauss map and shape operator

::: {.callout-note}
## Definition (Gauss Map)
The map $\\mathbf{N}: \\Sigma\\to \\mathbf{S}^{2}$ sending each point $q$ to its unit normal vector $\\mathbf{n}(q)$ is called the *Gauss map*.
:::

::: {.callout-note}
## Definition (Shape Operator)
The *shape operator* $\\mathcal{S}|_{q}$ is the differential of the Gauss map (up to sign):
$$
\\mathcal{S}|_{q}=-d\\mathbf{N}|_{q}: T_{q}\\Sigma\\to T_{q}\\Sigma.
$$
:::

## Second fundamental form

::: {.callout-note}
## Definition
The quadratic form $\\mathrm{II}_{q}$ on $T_{q}\\Sigma$ defined by:
$$
\\mathrm{II} (\\mathbf{u}, \\mathbf{v}):=\\langle \\mathcal{S}(\\mathbf{u}), \\mathbf{v} \\rangle
$$
is called the *second fundamental form*.
:::

## Curvatures

The **Principal Curvatures** $k_1, k_2$ are the eigenvalues of the shape operator.

::: {.callout-note}
## Definition (Gaussian and Mean Curvature)
*   **Gaussian Curvature**: $K(q) := \\det \\mathcal{S} = k_1 k_2$.
*   **Mean Curvature**: $H(q) := \\mathrm{Tr} \\mathcal{S} = k_1 + k_2$.
:::

Points are classified as:
*   **Elliptic**: $K > 0$
*   **Hyperbolic**: $K < 0$
*   **Parabolic**: $K = 0$ but $\\mathcal{S} \\ne 0$
*   **Planar**: $\\mathcal{S} = 0$

## Minimal surfaces

A surface is **minimal** if $H \\equiv 0$. Examples include the Catenoid, Helicoid, and Enneper surface.
`,

  "05-intrinsic.qmd": `---
title: "Intrinsic Geometry"
---

## Isometry

::: {.callout-note}
## Definition
A diffeomorphism $\\Phi: M \\to N$ is an *isometry* if it preserves the first fundamental form (metric).
:::

## The Gauss Theorem

::: {.callout-tip}
## Theorem (Theorema Egregium)
The Gaussian curvature $K$ is intrinsic, i.e., it can be expressed solely in terms of the first fundamental form and its derivatives.
:::

This is a remarkable result by Gauss, meaning a surface's curvature can be determined by measurements made *on* the surface without reference to the surrounding space.

## Geodesics

A **geodesic** is a curve $\\gamma$ with zero geodesic curvature ($k_g = 0$), meaning its acceleration is purely normal to the surface.

$$
\\nabla_{\\gamma'} \\gamma' = 0
$$

Geodesics generalize the concept of straight lines to curved surfaces.

## Gauss-Bonnet Formula

::: {.callout-tip}
## Theorem (Gauss-Bonnet)
For a compact oriented surface $\\Sigma$ (without boundary):
$$
\\iint_{\\Sigma} K \\, dA = 2\\pi \\chi(\\Sigma)
$$
where $\\chi(\\Sigma)$ is the Euler characteristic.
:::

This connects the geometry ($K$) to the topology ($\\chi$).
`
};
