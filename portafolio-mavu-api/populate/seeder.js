const { portfolios,blogs} = require('./data');
const Portfolio = require('../models/portfolio');
const Blogs = require('../models/blogs');
class Seeder {
    async clean() {
        await Portfolio.deleteMany({});
        await Blogs.deleteMany({});
    }

    async addData() {
        await Portfolio.create(portfolios);
        await Blogs.create(blogs);
    }
    async populate() {
        await this.clean();
        await this.addData();
    }
}
module.exports = new Seeder();
