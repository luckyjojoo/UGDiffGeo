import { CourseData, BlockType } from '../types';

export const courseData: CourseData = {
  title: "Differential Geometry",
  author: "GE Jian",
  institution: "Beijing Normal University",
  email: "jge@bnu.edu.cn",
  chapters: [
    {
      id: "ch0",
      title: "Preliminaries",
      sections: [
        {
          id: "sec0.1",
          title: "Metric spaces",
          blocks: [
            {
              type: BlockType.DEFINITION,
              title: "Metric Space",
              content: "$(X, \\dist)$ is called a metric space if $X$ is a set and $\\dist: X\\times X \\to \\RR\\cup \\{\\infty\\}$ is a metric or a distance function, i.e. it satisfies: 1. Positiveness: $\\dist(x, y)\\ge 0$ with equality iff $x=y$. 2. Symmetry: $\\dist(x, y)=\\dist(y,z)$. 3. Triangle inequality: $\\dist(x, z)\\ge \\dist(x, y)+\\dist(y, z)$."
            },
            {
              type: BlockType.EXAMPLE,
              content: "A typical example is Euclidean plane $\\mathbb{R}^{2}$ with $d((x_{1}, y_{1}), (x_{2}, y_{2}))=\\sqrt{(x_{1}-x_{2})^{2}+(y_{1}-y_{2})^{2}}$."
            }
          ]
        },
        {
          id: "sec0.2",
          title: "Topology",
          blocks: [
            {
              type: BlockType.DEFINITION,
              title: "Topology",
              content: "A topology on a set $X$ is a collection $\\mathcal{T}$ of subsets of $X$ (open sets) such that $\\emptyset, X \\in \\mathcal{T}$, it is closed under arbitrary unions, and closed under finite intersections."
            },
            {
              type: BlockType.PARAGRAPH,
              content: "A metric space embodies a naturally defined topology called 'metric topology'. A subset $A$ is open if for any $x \\in A$, there exists $\\varepsilon > 0$ such that $B(x, \\varepsilon) \\subset A$."
            }
          ]
        },
        {
            id: "sec0.3",
            title: "Vector spaces and Duals",
            blocks: [
                {
                    type: BlockType.PARAGRAPH,
                    content: "Let $V$ be a real vector space of dimension 3. The dual space $V^*$ is the set of linear functionals. Given a basis $\\mathbf{e}_i$, we define a dual basis $\\mathbf{f}^i$ where $\\mathbf{f}^i(\\mathbf{e}_j) = \\delta^i_j$."
                },
                {
                    type: BlockType.DEFINITION,
                    title: "Musical Isomorphisms",
                    content: "Let $(V, \\mathbf{g})$ be a vector space with an inner product. We define isomorphisms $\\flat: V \\to V^*$ and $\\sharp: V^* \\to V$. For $\\mathbf{v} \\in V$, $\\mathbf{v}^\\flat(\\mathbf{w}) = \\mathbf{g}(\\mathbf{v}, \\mathbf{w})$. For $\\mathbf{f} \\in V^*$, $\\mathbf{g}(\\mathbf{f}^\\sharp, \\mathbf{w}) = \\mathbf{f}(\\mathbf{w})$."
                },
                {
                    type: BlockType.LATEX,
                    content: "\\mathbf{v}^{\\flat}=\\begin{pmatrix} v^{1}&v^{2}&v^{3} \\end{pmatrix} G \\begin{pmatrix} \\mathbf{f}^{1}\\\\ \\mathbf{f}^{2}\\\\ \\mathbf{f}^{3} \\end{pmatrix}"
                }
            ]
        }
      ]
    },
    {
      id: "ch1",
      title: "Curves",
      sections: [
        {
          id: "sec1.1",
          title: "Parametrized curve",
          blocks: [
            {
              type: BlockType.DEFINITION,
              content: "A parametrized differentiable curve $\\gamma$ in $\\mathbb{R}^{n}$ is a differentiable map $\\gamma: I \\to \\mathbb{R}^{n}$. It is simple if locally homeomorphic to an interval."
            },
            {
              type: BlockType.DEFINITION,
              title: "Regular Curve",
              content: "A differentiable curve $\\gamma: I \\to \\mathbb{R}^{n}$ is called regular if $\\dot{\\gamma}(t)\\ne 0$ for all $t\\in I$."
            },
            {
                type: BlockType.PARAGRAPH,
                content: "The length is given by $s(t)=\\int_{a}^{t}|\\dot{\\gamma}(\\tau)| d \\tau$."
            }
          ]
        },
        {
            id: "sec1.2",
            title: "Regular curve in Euclidean space",
            blocks: [
                {
                    type: BlockType.DEFINITION,
                    title: "Curvature",
                    content: "Let $\\gamma$ be a unit speed regular curve. The number $k(t):=|\\mathbf{T}'(t)|$ is called the curvature."
                },
                {
                    type: BlockType.DEFINITION,
                    title: "Frenet Frame",
                    content: "Along the unit speed curve $\\gamma$, we have the oriented orthonormal basis $\\{\\mathbf{T}, \\mathbf{N}, \\mathbf{B}\\}$ called the Frenet frame."
                },
                {
                    type: BlockType.LATEX,
                    content: "\\frac{d}{dt} \\begin{pmatrix} \\mathbf{T}(t) \\\\ \\mathbf{N}(t) \\\\ \\mathbf{B}(t) \\end{pmatrix} = \\begin{pmatrix} 0 & k(t) & 0 \\\\ -k(t) & 0 & \\tau(t) \\\\ 0 & -\\tau(t) & 0 \\end{pmatrix} \\begin{pmatrix} \\mathbf{T}(t) \\\\ \\mathbf{N}(t) \\\\ \\mathbf{B}(t) \\end{pmatrix}"
                },
                {
                    type: BlockType.EXAMPLE,
                    content: "For a Helix $\\gamma(t)= ( a \\cos\\frac{t}{c},\\ a \\sin \\frac{t}{c},\\ b \\frac{t}{c} )$, the curvature is $k = a/c^2$ and torsion is $\\tau = b/c^2$."
                }
            ]
        },
        {
            id: "sec1.6",
            title: "Global Properties",
            blocks: [
                {
                    type: BlockType.THEOREM,
                    title: "Isoperimetric Inequality",
                    content: "Let $\\gamma$ be a simple closed unit speed curve in $\\mathbb{R}^{2}$ of length $\\ell$ enclosing area $\\Area(\\Omega)$. Then $\\Area(\\Omega)\\le \\frac{\\ell^{2}}{4\\pi}$."
                },
                {
                    type: BlockType.PROOF,
                    content: "The proof utilizes the Cauchy-Schwartz inequality. $\\Area(\\Omega) + \\pi r^2 \\le \\ell r$. This implies $4\\pi \\Area(\\Omega) \\le \\ell^2$."
                },
                {
                    type: BlockType.THEOREM,
                    title: "Four-Vertex Theorem",
                    content: "For a simple closed smooth convex curve, there are at least four vertices (points where curvature derivative vanishes)."
                }
            ]
        }
      ]
    },
    {
        id: "ch2",
        title: "Surfaces",
        sections: [
            {
                id: "sec2.1",
                title: "Regular Surfaces",
                blocks: [
                    {
                        type: BlockType.DEFINITION,
                        content: "A subset $\\Sigma \\subset \\mathbb{R}^3$ is a regular surface if for each point $p$, there exists a neighborhood $V$ and a map $\\mathbf{F}: U \\to V$ such that $\\mathbf{F}$ is smooth, a homeomorphism, and its differential is one-to-one."
                    },
                    {
                        type: BlockType.EXAMPLE,
                        content: "The unit sphere $\\Sph^2$ is a regular surface."
                    }
                ]
            },
            {
                id: "sec2.3",
                title: "First Fundamental Form",
                blocks: [
                    {
                        type: BlockType.DEFINITION,
                        content: "The first fundamental form (metric tensor) is $G = \\begin{pmatrix} \\langle \\mathbf{e}_1, \\mathbf{e}_1 \\rangle & \\langle \\mathbf{e}_1, \\mathbf{e}_2 \\rangle \\\\ \\langle \\mathbf{e}_2, \\mathbf{e}_1 \\rangle & \\langle \\mathbf{e}_2, \\mathbf{e}_2 \\rangle \\end{pmatrix}$."
                    },
                    {
                        type: BlockType.PARAGRAPH,
                        content: "This allows the calculation of lengths and areas on the curved surface."
                    }
                ]
            }
        ]
    }
  ]
};