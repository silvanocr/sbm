-- Migração para adicionar funcionalidades de Admin
-- Execute este SQL no Railway PostgreSQL Dashboard

-- 1. Adicionar campos ao User
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "photo" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "role" TEXT DEFAULT 'pilot';

-- 2. Criar tabela Event
CREATE TABLE IF NOT EXISTS "Event" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "registrationDeadline" TIMESTAMP(3) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "maxParticipants" INTEGER,
    "currentParticipants" INTEGER NOT NULL DEFAULT 0,
    "location" TEXT,
    "category" TEXT NOT NULL DEFAULT 'sbm',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- 3. Criar tabela EventRegistration
CREATE TABLE IF NOT EXISTS "EventRegistration" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "paymentId" TEXT,
    "receiptUrl" TEXT,
    "paymentMethod" TEXT,
    "installments" INTEGER DEFAULT 1,
    "totalPaid" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "EventRegistration_pkey" PRIMARY KEY ("id")
);

-- 4. Criar tabela Banner
CREATE TABLE IF NOT EXISTS "Banner" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "imageUrl" TEXT NOT NULL,
    "link" TEXT,
    "position" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Banner_pkey" PRIMARY KEY ("id")
);

-- 5. Criar tabela Message
CREATE TABLE IF NOT EXISTS "Message" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "replied" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- 6. Criar tabela PaymentConfig
CREATE TABLE IF NOT EXISTS "PaymentConfig" (
    "id" TEXT NOT NULL,
    "stripePublicKey" TEXT,
    "stripeSecretKey" TEXT,
    "stripeWebhookSecret" TEXT,
    "pixEnabled" BOOLEAN NOT NULL DEFAULT true,
    "creditCardEnabled" BOOLEAN NOT NULL DEFAULT true,
    "maxInstallments" INTEGER NOT NULL DEFAULT 12,
    "installmentsWithoutInterest" INTEGER NOT NULL DEFAULT 3,
    "interestRate" DOUBLE PRECISION NOT NULL DEFAULT 0.02,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "PaymentConfig_pkey" PRIMARY KEY ("id")
);

-- 7. Adicionar campos ao News
ALTER TABLE "News" ADD COLUMN IF NOT EXISTS "category" TEXT DEFAULT 'sbm';
ALTER TABLE "News" ADD COLUMN IF NOT EXISTS "featured" BOOLEAN DEFAULT false;

-- 8. Adicionar foreign keys
ALTER TABLE "EventRegistration" ADD CONSTRAINT "EventRegistration_userId_fkey" 
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "EventRegistration" ADD CONSTRAINT "EventRegistration_eventId_fkey" 
    FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_fkey" 
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- 9. Criar índices para performance
CREATE INDEX IF NOT EXISTS "EventRegistration_userId_idx" ON "EventRegistration"("userId");
CREATE INDEX IF NOT EXISTS "EventRegistration_eventId_idx" ON "EventRegistration"("eventId");
CREATE INDEX IF NOT EXISTS "EventRegistration_status_idx" ON "EventRegistration"("status");
CREATE INDEX IF NOT EXISTS "Event_active_idx" ON "Event"("active");
CREATE INDEX IF NOT EXISTS "Event_eventDate_idx" ON "Event"("eventDate");
CREATE INDEX IF NOT EXISTS "News_category_idx" ON "News"("category");
CREATE INDEX IF NOT EXISTS "News_published_idx" ON "News"("published");
CREATE INDEX IF NOT EXISTS "Message_read_idx" ON "Message"("read");
