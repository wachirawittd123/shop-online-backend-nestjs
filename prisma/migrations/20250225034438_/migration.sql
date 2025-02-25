-- CreateTable
CREATE TABLE "Endpoint" (
    "id" TEXT NOT NULL,
    "apiServiceId" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "requestUrl" TEXT NOT NULL,
    "isActive" BOOLEAN,
    "requestMethod" TEXT,
    "creditPerRequest" DOUBLE PRECISION,
    "createdOn" TIMESTAMP(3),
    "updatedOn" TIMESTAMP(3),
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "order" INTEGER,
    "productName" TEXT,

    CONSTRAINT "Endpoint_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Endpoint" ADD CONSTRAINT "Endpoint_apiServiceId_fkey" FOREIGN KEY ("apiServiceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;
