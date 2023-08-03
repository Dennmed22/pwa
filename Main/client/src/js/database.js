import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });


// Method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    const db = await openDB('jate', 1);
    const transaction = db.transaction('jate', 'readwrite');
    const obStore = transaction.objectStore('jate');

    // Get the current count value or return 0 if it's empty
    const count = (await obStore.get('counter')) || 0;
    count++;
    await obStore.put({ id: count, value: content });

    // Update the count value in the database
    await obStore.put(count, 'counter');
    await transaction.done;

    return count;
  } catch (error) {
    console.error('Error putting data into the database:', error);
  }
};

// Method that gets all the content from the database
export const getDb = async () => {
  try {
    const db = await openDB('jate', 1);
    const transaction = db.transaction('jate', 'readonly');
    const obStore = transaction.objectStore('jate');
    const result = await obStore.getAll();

    await transaction.done;

    return result;
  } catch (error) {
    console.error('Error getting data from the database:', error);
  }
};

// Initialize the IndexedDB database on application start
initdb();





