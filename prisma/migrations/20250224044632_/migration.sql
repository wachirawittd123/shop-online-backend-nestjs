-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "apiCategoriesId" TEXT NOT NULL,
    "price" DOUBLE PRECISION,
    "description" TEXT,
    "description_EN" TEXT,
    "order" INTEGER,
    "urlPath" TEXT,
    "useCaseDetail1" TEXT,
    "useCaseDetail1_EN" TEXT,
    "useCaseDetail2" TEXT,
    "useCaseDetail2_EN" TEXT,
    "useCaseDetail3" TEXT,
    "useCaseDetail3_EN" TEXT,
    "useCaseImagePath" TEXT,
    "imagePath" TEXT,
    "createdOn" TIMESTAMP(3),
    "updatedOn" TIMESTAMP(3),
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "docsUrl" TEXT,
    "isFeaturedProducts" BOOLEAN,
    "icon" TEXT,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Service_apiCategoriesId_key" ON "Service"("apiCategoriesId");

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_apiCategoriesId_fkey" FOREIGN KEY ("apiCategoriesId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
