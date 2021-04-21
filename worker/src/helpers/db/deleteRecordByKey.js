import { openDB } from './openDB'

export const deleteRecordByKey = (storeName, recordKey) => new Promise((resolve) => {
  openDB().then((response) => {
    const { status, result: db } = response
    if (status !== 200) {
      resolve({ status, result: null })
      return
    }
    const store = db.transaction([storeName], 'readwrite').objectStore(storeName)
    Object.assign(store.delete(recordKey), {
      onsuccess: event => resolve({
        status: event.target.result ? 200 : 404,
        result: event.target.result ? event.target.result : `${recordKey} not found in db store ${storeName}`
      }),
      onerror: event => resolve({ status: 704, result: event.target.error })
    })
  })
})
