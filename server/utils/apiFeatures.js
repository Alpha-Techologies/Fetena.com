class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filter() {
        let newQuery = {
            ...this.queryString
        };
        let queryObject = ['sort', 'filter', 'fields', 'limit', 'page'];
        queryObject = queryObject.forEach(element => {
            delete newQuery[element]
        });
        
        let queryStr = JSON.stringify(newQuery);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
        queryStr =JSON.parse(queryStr);
       for(let i in queryStr){
        // code to be removed
        // queryStr[i] = new RegExp([queryStr[i]],"i");        
            // Convert boolean strings to actual boolean values
            if (queryStr[i] === "true" || queryStr[i] === "false") {
                queryStr[i] = JSON.parse(queryStr[i]);
            } else {
                // Convert other string values to case-insensitive regular expressions
                queryStr[i] = new RegExp(queryStr[i], "i");
            }
       }
       console.log(queryStr);
        this.query = this.query.find((queryStr))

        return this;
    }
    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else this.query = this.query.sort('-createdAt');

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
        this.query = this.query.countDocuments({})
        return this
    }
    field() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else this.query = this.query.select('-__v');

        return this
    }
    populate() {
        let questionPopulated = [
            { path: "questions",
                options: {strictPopulate: false}
        },
            // { path:"invigilatorID"}
        ]
        // if (this.queryString.fields) {
        //     const result = this.queryString.fields.split(',');
        //     rockPopulateObj = questionPopulated.filter((value) => {
        //         if (result.includes(`${value.path.split(".")[0]}`)) {
        //             return value
        //         }
        //     });
        // }

        this.query = this.query.populate(
            questionPopulated,
        )
        return this;
    }
}
module.exports = APIFeatures;