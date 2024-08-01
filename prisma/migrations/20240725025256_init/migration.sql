-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'THEY');

-- CreateTable
CREATE TABLE "User" (
    "id" BIGSERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "phone_number" TEXT DEFAULT '',
    "country" TEXT DEFAULT '',
    "province" TEXT DEFAULT '',
    "gender" "Gender" NOT NULL DEFAULT 'MALE',
    "address" TEXT DEFAULT '',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reset_at" TIMESTAMP(3),
    "user_id" TEXT NOT NULL,

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_user_id_key" ON "User"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_token_key" ON "PasswordResetToken"("token");

-- AddForeignKey
ALTER TABLE "PasswordResetToken" ADD CONSTRAINT "PasswordResetToken_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
