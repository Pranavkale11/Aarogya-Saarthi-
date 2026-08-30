import { openDB } from 'idb';

const DB_NAME = 'aarogya-saarthi-db';
const DB_VERSION = 1;
export const saveSchemeOffline = async (schemeId) => {
  const db = await initDB();
  const savedScheme = {
    schemeId,
    savedAt: new Date().toISOString()
  };
  return db.put('saved-schemes', savedScheme);
};

export const getSavedSchemesOffline = async () => {
  const db = await initDB();
  return db.getAll('saved-schemes');
};

export const getAllSchemesOffline = async () => {
  const db = await initDB();
  return db.getAll('health-schemes');
};


export const initDB = async () => {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Store for chatbot models
      if (!db.objectStoreNames.contains('chatbot-models')) {
        db.createObjectStore('chatbot-models', { keyPath: 'id' });
      }
      
      // Store for user progress
      if (!db.objectStoreNames.contains('user-progress')) {
        db.createObjectStore('user-progress', { keyPath: 'diseaseId' });
      }
      
      // Store for medical knowledge bases
      if (!db.objectStoreNames.contains('medical-knowledge')) {
        db.createObjectStore('medical-knowledge', { keyPath: 'id' });
      }
      
      // Store for emergency guides
      if (!db.objectStoreNames.contains('emergency-guides')) {
        db.createObjectStore('emergency-guides', { keyPath: 'id' });
      }
      
      // Store for simulation data
      if (!db.objectStoreNames.contains('simulations')) {
        db.createObjectStore('simulations', { keyPath: 'diseaseId' });
      }
    },
  });
  return db;
};

export const saveToIndexedDB = async (storeName, data) => {
  const db = await initDB();
  return db.put(storeName, data);
};

export const getFromIndexedDB = async (storeName, key) => {
  const db = await initDB();
  return db.get(storeName, key);
};

export const getAllFromIndexedDB = async (storeName) => {
  const db = await initDB();
  return db.getAll(storeName);
};

export const deleteFromIndexedDB = async (storeName, key) => {
  const db = await initDB();
  return db.delete(storeName, key);
};

export const clearStore = async (storeName) => {
  const db = await initDB();
  return db.clear(storeName);
};
