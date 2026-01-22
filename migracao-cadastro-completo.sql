-- Migração para adicionar campos completos de cadastro
-- Execute este SQL no Railway PostgreSQL Dashboard

-- Adicionar novos campos ao User
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "dateOfBirth" TIMESTAMP(3);
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "cep" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "address" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "city" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "state" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "healthInsurance" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "emergencyContact" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "emergencyPhone" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "bloodType" TEXT;
