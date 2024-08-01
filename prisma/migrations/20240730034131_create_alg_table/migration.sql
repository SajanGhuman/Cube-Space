-- CreateTable
CREATE TABLE "Algorithm" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "notation" TEXT NOT NULL,
    "type" TEXT,

    CONSTRAINT "Algorithm_pkey" PRIMARY KEY ("id")
);
