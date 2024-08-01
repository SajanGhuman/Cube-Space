import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.algorithm.createMany({
    data: [
      // F2L algorithms
      { name: "f2l1", notation: "U (R U' R')", type: "f2l" },
      { name: "f2l2", notation: "y'' U'' (R'' U R)", type: "f2l" },
      { name: "f2l3", notation: "y'' (R'' U'' R)", type: "f2l" },
      { name: "f2l4", notation: "(R U R')", type: "f2l" },
      {
        name: "f2l5",
        notation: "U'' (R U'' R'' U) y'' (R'' U'' R)",
        type: "f2l",
      },
      { name: "f2l6", notation: "U'' (R U R'' U) (R U R')", type: "f2l" },
      {
        name: "f2l7",
        notation: "U'' (R U2'' R'' U) y'' (R'' U'' R)",
        type: "f2l",
      },
      { name: "f2l8", notation: "R'' U2'' R2 U R2'' U R", type: "f2l" },
      {
        name: "f2l9",
        notation: "y'' U (R'' U R U'') (R'' U'' R)",
        type: "f2l",
      },
      { name: "f2l10", notation: "U'' (R U'' R'' U) (R U R')", type: "f2l" },
      {
        name: "f2l11",
        notation: "y'' (U R'' U'' R) U2'' (R'' U R)",
        type: "f2l",
      },
      {
        name: "f2l12",
        notation: "y'' U (R'' U2 R) U2'' (R'' U R)",
        type: "f2l",
      },
      {
        name: "f2l13",
        notation: "U'' (R U2'' R'') U2 (R U'' R')",
        type: "f2l",
      },
      { name: "f2l14", notation: "U (R U2 R') U (R U'' R')", type: "f2l" },
      {
        name: "f2l15",
        notation: "y'' U'' (R'' U R U) (R'' U R U'') (R'' U R U'')",
        type: "f2l",
      },
      {
        name: "f2l16",
        notation: "y'' U'' (R'' U R U'') (R'' U R U'')",
        type: "f2l",
      },
      { name: "f2l17", notation: "(U'' R U R') U2 (R U'' R')", type: "f2l" },
      {
        name: "f2l18",
        notation: "y'' (U R'' U'' R) U2'' (R'' U R)",
        type: "f2l",
      },
      {
        name: "f2l19",
        notation: "y'' U (R'' U2 R) U2'' (R'' U R)",
        type: "f2l",
      },
      {
        name: "f2l20",
        notation: "U'' (R U2'' R'') U2 (R U'' R')",
        type: "f2l",
      },
      { name: "f2l21", notation: "U (R U2 R') U (R U'' R')", type: "f2l" },
      {
        name: "f2l22",
        notation: "U'' R U R'' U2 y'' (R'' U'' R)",
        type: "f2l",
      },
      { name: "f2l23", notation: "U (F'' U'' F) U'' (R U R')", type: "f2l" },
      { name: "f2l24", notation: "(R U'' R') U2 (F'' U F)", type: "f2l" },
      {
        name: "f2l25",
        notation: "y'' (U R'' U'' R) U2'' (R'' U R)",
        type: "f2l",
      },
      {
        name: "f2l26",
        notation: "y'' U (R'' U2 R) U'' (R'' U R)",
        type: "f2l",
      },
      { name: "f2l27", notation: "U'' (R U2 R'') U2 (R U'' R')", type: "f2l" },
      { name: "f2l28", notation: "U (R U2 R'') U (R U'' R')", type: "f2l" },

      // OLL algorithms
      {
        name: "oll1",
        notation: "R U2 R'' U'' R U'' R'' U'' R U'' R''",
        type: "oll",
      },
      {
        name: "oll2",
        notation: "R U2'' R'' U2'' R U'' R'' U'' R U'' R''",
        type: "oll",
      },
      { name: "oll3", notation: "F R U'' R'' U'' R U'' R'' F''", type: "oll" },
      { name: "oll4", notation: "r U2 R'' U'' R U'' R'' U'' r", type: "oll" },
      { name: "oll5", notation: "F R U R'' U'' R U'' R'' F''", type: "oll" },
      { name: "oll6", notation: "r U R'' U'' R U'' R'' U2 r", type: "oll" },
      {
        name: "oll7",
        notation: "R U R'' U'' R'' F R'' F R'' U R'' U'' R'' F R'' F''",
        type: "oll",
      },
      {
        name: "oll8",
        notation: "R U R'' U'' R U'' B R'' U'' R U R'' B R'' U'' R''",
        type: "oll",
      },
      {
        name: "oll9",
        notation: "L'' U'' R U2 L U L'' U'' R'' U'' L'' U'' L'' U'' L''",
        type: "oll",
      },
      { name: "oll10", notation: "r U R'' U'' M U R U'' r", type: "oll" },
      {
        name: "oll11",
        notation: "R U R U R'' U'' R U'' R'' U'' R''",
        type: "oll",
      },
      {
        name: "oll12",
        notation: "L U2 L'' U'' L U'' L'' U'' L'' U'' L''",
        type: "oll",
      },
      {
        name: "oll13",
        notation: "F U R U'' R'' F'' r U R U'' r''",
        type: "oll",
      },
      {
        name: "oll14",
        notation: "r U R'' U'' r'' U'' R U'' R'' U'' r''",
        type: "oll",
      },
      { name: "oll15", notation: "R U R'' U R U'' R U2 R''", type: "oll" },
      {
        name: "oll16",
        notation: "r U2 R U R'' U'' r'' U'' R U'' R'' U2 r''",
        type: "oll",
      },
      {
        name: "oll17",
        notation: "F U R U'' R'' F'' U'' F U R U'' R'' F''",
        type: "oll",
      },
      {
        name: "oll18",
        notation: "R U R'' U'' R U2 R'' U'' R U'' R'' U'' R''",
        type: "oll",
      },
      {
        name: "oll19",
        notation: "R U R'' U'' R U'' R'' U R U'' R''",
        type: "oll",
      },
      {
        name: "oll20",
        notation: "R U R'' U'' R U'' R'' U2 R U2 R'' U'' R''",
        type: "oll",
      },
      {
        name: "oll21",
        notation: "U2 R U'' R'' U'' R U'' R'' U2 R U R'' U'' R''",
        type: "oll",
      },
      {
        name: "oll22",
        notation: "R U R'' U'' R U'' R'' U'' R U'' R'' U'' R''",
        type: "oll",
      },

      // PLL algorithms
      { name: "pll1", notation: "x' R U' R D2 R' U R D2 R2 x", type: "pll" },
      {
        name: "pll2",
        notation:
          "R U R' U' R U2 R' U' R U' R' U' R U' R' U2 R U R' U R U R' U' R U2 R'",
        type: "pll",
      },
      {
        name: "pll3",
        notation:
          "U R U2 R' U2 R' U2 R' U R U' R' U2 R U R' U' R' U R U' U' U R U R'",
        type: "pll",
      },
      {
        name: "pll4",
        notation: "R U2 R' U2 R U2 R2 U R U' R' U2 R2 U' U R' U'",
        type: "pll",
      },
      { name: "pll5", notation: "R2 D R U2 R' D' R U2 R2", type: "pll" },
      {
        name: "pll6",
        notation: "R U R' U R U2 R' U2 R U R' U' R' U R' U' R U2 R U' R'",
        type: "pll",
      },
      {
        name: "pll7",
        notation: "U2 R U2 R2 U' R' U R U2 R' U R' U2 R'",
        type: "pll",
      },
      {
        name: "pll8",
        notation: "x' U2 R U' R D' R2 U' R D R' U2 R",
        type: "pll",
      },
      {
        name: "pll9",
        notation: "R' U R U2 R' U' R U R2 U R' U' R' U2 R U2 R' U R",
        type: "pll",
      },
      {
        name: "pll10",
        notation: "R2 D R U2 R' D' R U2 R2 U' R U' R U R U R' U R U R'",
        type: "pll",
      },
      {
        name: "pll11",
        notation: "U2 R U R' U R U R U' U' R U' R U2 R'",
        type: "pll",
      },
      {
        name: "pll12",
        notation: "R U R' U R U2 R' U2 R U' R' U R' U2 R U R'",
        type: "pll",
      },
      {
        name: "pll13",
        notation: "R U R' U R U2 R' U2 R U' R' U R' U2 R U R'",
        type: "pll",
      },
      {
        name: "pll14",
        notation: "x' U R U' R' U' D' R U2 R' D R2 U' R U R' U'",
        type: "pll",
      },
      {
        name: "pll15",
        notation: "R U R' U2 R U' R U R' U R U2 R' U R' U2 R U R'",
        type: "pll",
      },
      {
        name: "pll16",
        notation: "x' U2 R U R' U' U R U R' U2 R2",
        type: "pll",
      },
      {
        name: "pll17",
        notation: "R2 U R U R' U' R U' R' U R U' U R'",
        type: "pll",
      },
      {
        name: "pll18",
        notation: "U2 R U' R' U' R U2 R U R' U R' U R U R' U R'",
        type: "pll",
      },
      {
        name: "pll19",
        notation: "x' R U' R D' R U2 R' D R2 U' R U' R' U2 R'",
        type: "pll",
      },
      {
        name: "pll20",
        notation: "U2 R U2 R2 U R U' R U' R' U2 R U' R U2 R'",
        type: "pll",
      },
    ],
    skipDuplicates: true, // To avoid errors if some algorithms already exist
  });

  console.log("Algorithms have been seeded.");
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
