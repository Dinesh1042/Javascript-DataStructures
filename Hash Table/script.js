// HashTable

class HashTable {
  constructor(hashTableSize = 7) {
    this.dataMap = Array.from({ length: hashTableSize });
  }

  #hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) hash += key.charCodeAt(i) * 11;
    return hash % this.size;
  }

  set(key, value) {
    const hash = this.#hash(key);

    if (!this.dataMap[hash]) this.dataMap[hash] = [];
    this.dataMap[hash].push({ key, value });
  }

  get(key) {
    const hashValue = this.#hash(key);
    if (!this.dataMap[hashValue]) return null;

    return this.dataMap[hashValue].find(({ key: _key }) => _key === key);
  }

  remove(key) {
    const _hash = this.#hash(key);

    if (!this.dataMap[_hash]) return null;

    this.dataMap[_hash] = this.dataMap[_hash].filter(
      ({ key: _key }) => _key !== key
    );

    if (!this.dataMap[_hash].length) this.dataMap[_hash] = undefined;
  }

  display() {
    return this.dataMap
      .filter((i) => i)
      .map((v) => v.map(({ key, value }) => [key, value]));
  }

  get size() {
    return this.dataMap.length;
  }
}

const hashTable = new HashTable();

hashTable.set("US", 12);
hashTable.set("AMERICA", 12);
hashTable.remove("AMERICA", 12);
hashTable.set("INDIA", 12);

hashTable.set("Dinesh");
hashTable.remove("Dinesh");
console.log(hashTable);
