/**
 * A proper way to store some data
 */
class Cache {
  constructor() {
    this._cache = [];
  }

  /**
   * Puts some data to cache with specified key
   * @param key
   * @param data
   * @throws Error - if data if passed key is already exists
   */
  put(key, data) {
    if (this.exists(key)) throw new Error("A record with target key is already exists");
    this._cache.push({key, data});
  }

  /**
   * Gets a data from a cache record with specified key
   * @param key
   * @return {*}
   */
  get(key) {
    let record = this._cache.find(record => record.key === key);
    return record ? record.data : null;
  }

  /**
   * Refreshes a cache record with specified data
   * @param key
   * @param data
   */
  update(key, data) {
    let index = this.indexOf(key);
    if (index === -1) throw new Error("A record with target key is not exists");
    this._cache[index].data = data;
  }

  /**
   * Checks if a cache record with target key is exists
   * @param key
   * @return {boolean}
   */
  exists(key) {
    return this._indexOf(key) > -1;
  }

  /**
   * Gets the index of target cache record
   * @param key
   * @return {number}
   * @private
   */
  _indexOf(key){
    return this._cache.findIndex(record => record.key === key);
  }
}

export default Cache;
