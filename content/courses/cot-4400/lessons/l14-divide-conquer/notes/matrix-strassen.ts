import type { TopicNotes } from "@/features/notes";

export const matrixStrassenNotes: TopicNotes = {
  topicId: "matrix-strassen",
  title: "Matrix Multiplication & Strassen",
  sections: [
    {
      id: "intuition",
      title: "Intuitive explanation",
      markdown: `Multiplying two $n \\times n$ matrices naïvely uses three nested loops — cubic time. A straightforward divide-and-conquer split into quadrants still needs **8** half-size multiplications, which Master Theorem again makes cubic. **Strassen** rearranges the algebra so only **7** multiplications are needed, shaving the exponent below $3$.`,
    },
    {
      id: "definition",
      title: "Formal definition",
      markdown: `**Naïve multiply:** for each entry $C[i][j]$, sum $A[i][k] \\cdot B[k][j]$ over $k$. Time complexity $O(n^3)$.

**D&C quadrant multiply:** split $A$ and $B$ into $n/2 \\times n/2$ blocks and form

$$
\\begin{aligned}
C_{11} &= A_{11}B_{11} + A_{12}B_{21} \\\\
C_{12} &= A_{11}B_{12} + A_{12}B_{22} \\\\
C_{21} &= A_{21}B_{11} + A_{22}B_{21} \\\\
C_{22} &= A_{21}B_{12} + A_{22}B_{22}
\\end{aligned}
$$

That is **8** recursive multiplications plus $O(n^2)$ work to add/combine blocks.

Source: *L14.Divide&Conquer.pptx*, slides 28–35.`,
    },
    {
      id: "recurrence-8",
      title: "Eight-multiplication recurrence",
      markdown: `$$
T(n) = 8T(n/2) + O(n^2)
$$

With $a=8$, $b=2$: $\\Theta(n^{\\log_b a}) = \\Theta(n^3)$. So plain D&C does **not** beat the naïve cubic bound.`,
    },
    {
      id: "strassen",
      title: "Strassen’s seven products",
      markdown: `Strassen still divides into $N/2 \\times N/2$ submatrices, but computes seven products (lecture notation with blocks $a,b,c,d$ and $e,f,g,h$):

$$
\\begin{aligned}
p_1 &= a(f-h), \\quad
p_2 = (a+b)h, \\quad
p_3 = (c+d)e, \\quad
p_4 = d(g-e) \\\\
p_5 &= (a+d)(e+h), \\quad
p_6 = (b-d)(g+h), \\quad
p_7 = (a-c)(e+f)
\\end{aligned}
$$

Then

$$
C = \\begin{bmatrix}
p_5 + p_4 - p_2 + p_6 & p_1 + p_2 \\\\
p_3 + p_4 & p_1 + p_5 - p_3 - p_7
\\end{bmatrix}
$$`,
    },
    {
      id: "complexity",
      title: "Complexity analysis",
      markdown: `Additions/subtractions of matrices are $O(n^2)$, so

$$
T(n) = 7T(n/2) + O(n^2) = O\\bigl(n^{\\log_2 7}\\bigr) \\approx O(n^{2.8074})
$$

Lecture reasons Strassen is often not preferred in practice:

1. Large constants — naïve can win for typical sizes
2. Sparse matrices have better specialized methods
3. Recursive submatrices need extra space
4. Limited precision accumulates larger errors than the naïve method`,
    },
    {
      id: "mistakes",
      title: "Common mistakes",
      markdown: `- Claiming the 8-multiply D&C is asymptotically faster than $O(n^3)$.
- Writing Strassen as $8T(n/2)$ instead of $7T(n/2)$.
- Memorizing $O(n^{2.8})$ without knowing it comes from $\\log_2 7$.
- Assuming Strassen is always the practical default.`,
    },
    {
      id: "exam",
      title: "Exam tips",
      markdown: `- Naïve / 8-multiply D&C: $O(n^3)$.
- Strassen: $T(n)=7T(n/2)+O(n^2)=O(n^{\\log_2 7})\\approx O(n^{2.807})$.
- Be able to state “7 multiplications instead of 8.”`,
    },
  ],
};
