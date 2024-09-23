import { db } from "./db"

export const updateUpdatedAtFields = async () => {
    const batchSize = 100
    let skip = 0
    let updatedCount = 0

    while (true) {
      const records = await db.uI.findMany({
        select: {
          id: true,
          createdAt: true
        },
        take: batchSize,
        skip: skip
      })

      if (records.length === 0) {
        break // No more records to update
      }

      for (const record of records) {
        await db.uI.update({
          where: { id: record.id },
          data: { updatedAt: record.createdAt }
        })
        updatedCount++
      }

      console.log(`Updated ${updatedCount} records so far...`)
      skip += batchSize
    }

    console.log(`Finished updating ${updatedCount} records.`)
  }