class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    let newQuery = {
      ...this.queryString,
    };
    let queryObject = ["sort", "filter", "fields", "limit", "page"];
    queryObject = queryObject.forEach((element) => {
      delete newQuery[element];
    });

    let queryStr = JSON.stringify(newQuery);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    queryStr = JSON.parse(queryStr);
    for (let i in queryStr) {
      // code to be removed
      // queryStr[i] = new RegExp([queryStr[i]],"i");
      // Convert boolean strings to actual boolean values
      if (
        queryStr[i].toLowerCase() == "true" ||
        queryStr[i].toLowerCase() == "false"
      ) {
        queryStr[i] = JSON.parse(queryStr[i].toLowerCase());
      } else {
        // Convert other string values to case-insensitive regular expressions
        queryStr[i] = new RegExp(queryStr[i], "i");
      }
    }
    this.query = this.query.find(queryStr);

    return this;
  }
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else this.query = this.query.sort("-createdAt");

    return this;
  }
  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
  count() {
    this.query = this.query.countDocuments({});
    return this;
  }
  field() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else this.query = this.query.select("-__v");

    return this;
  }
  populate() {
    let populated = [
      { path: "questions", options: { strictPopulate: false } },
      { path: "invigilatorID", options: { strictPopulate: false } },
      { path: "questions", options: { strictPopulate: false } },
      { path: "adminUser", options: { strictPopulate: false } },
      { path: "user", options: { strictPopulate: false } },
      { path: "questionID", options: { strictPopulate: false } },
      // { path: "adminOf", options: { strictPopulate: false } },
      { path: "organizationsFollowed", options: { strictPopulate: false } },
      { path: "organizationsJoined", options: { strictPopulate: false } },
      { path: "follower", options: { strictPopulate: false } },
      { path: "organization", options: { strictPopulate: false } },
      { path: "createdBy", options: { strictPopulate: false } },
      { path: "userAnswers", options: { strictPopulate: false } },
      { path: "user", options: { strictPopulate: false } },
      // { path: "exam", options: { strictPopulate: false } },

      // for user Answer
      { path: "userId", options: { strictPopulate: false } },
      { path: "examId", options: { strictPopulate: false } },
    ];

    let populateObj = [];
    if (this.queryString.fields) {
      const result = this.queryString.fields.split(",").map((value) => {
        return value.trim();
      });

      populateObj = populated.filter((value) => {
        if (result.includes(`${value.path.split(".")[0]}`)) {
          return true;
        }
        return false;
      });
    } else {
      populateObj = populated;
    }

    this.query = this.query.populate(populateObj);
    return this;
  }
}
module.exports = APIFeatures;
