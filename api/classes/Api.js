const { responce_status } = require("../constraints/RESPONCE_STATUS");
const CustomError = require("./Error");
class API {
  constructor(request, responce, query = null,queryParams=[]) {
    this.req = request;
     this.res = responce;
      this.query = query;
    this.queryParams = queryParams;
  }
  /**
   * Description
   * @returns {any}
   */
  getParams() {
    return this.req.params;
  }
  getQuery() {
    const excludeFields = ["sort", "limit", "page", "fields"];
    let query = this.req.query;
    let queryObject = { ...query };
    const otherQuery = {};
    excludeFields.forEach((el) => {
      otherQuery[el] = queryObject[el];
      delete queryObject[el];
    });
    let filteringQuery = JSON.stringify(queryObject);
    filteringQuery = filteringQuery.replace(
      /\b(gte|lte|lt|gt)\b/g,
      (match) => `$${match}`
    );
    /**
     * @returns {allQuery: query,otherQuery,filteringQuery}
     */
    return {
      allQuery: query,
      otherQuery,
      filteringQuery,
    };
  }
  /**
   * Description 
   *@param {keyof responce_status} type='default'
   * @param {any} data=null
   * @param {String} customMsg=''
   * @param {number} status=null
   * @returns {any}
   */
  dataHandler(type = "default", data = null, customMsg ='', status = null) {
    let improvedData = {};
    if (data) {
      improvedData = {
        status: "success",
        length: data.length,
        data,
        msg: responce_status[type].msg,
        customMsg,
      };
    } else {
      improvedData = {
        status: "successed",
        msg: responce_status[type].msg,
        customMsg,
      };
    }

    this.res.status(status || responce_status[type].status).json(improvedData);
  }
  /**
   * Description
    *@param {keyof responce_status} type ='server_error
   * @param {string} message=null
   * @param {number} customStatus=null
   * @returns {any}
   */
  errorHandler(type = "server_error", message = null, customStatus = null) {
    const customError = new CustomError(
      message || responce_status[type].msg,
      customStatus || responce_status[type].status
    );
    return customError;
  }

}
module.exports = API
