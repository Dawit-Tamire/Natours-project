
class APIFeatures {
    constructor(query, queryString) {
        this.query = query
        this.queryString = queryString
    }
    // BUILD QUERY
    filter() {
        // 1A) Filtering
        let queryObj = { ...this.queryString }   // Save the variables REQ.QUERY to 1 Object
        const excludedFields = ['page', 'sort', 'limit', 'fields']
        excludedFields.forEach(el => delete queryObj[el])
        // 1B) Advanced filtering
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)

        this.query = this.query.find(JSON.parse(queryStr))

        return this
    }
    sort() {      
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort('-createdAt')    // default:  The Newest Tour
        }
        return this

    }
    limitFields() {

        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields)     
        } else {
            this.query = this.query.select('-__v')     //Default: Do not take "__v" to send to the client
        }
        return this
    }
    paginate() {
        const page = this.queryString.page * 1 || 1    //default page 1
        const limit = this.queryString.limit * 1 || 20;    //default limit = 20
        const skip = (page - 1) * limit

        this.query = this.query.skip(skip).limit(limit)

        return this
    }
}

module.exports = APIFeatures
