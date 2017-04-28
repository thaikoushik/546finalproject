const mongoCollections = require("../config/mongoCollections");
const Goods = mongoCollections.Goods;
const uuid = require('node-uuid');

let exportedMethods = {

	createGoods(goods,description,price){

		return new Promise((resolve,reject)=>{

			let ID = uuid.v4();

		return Goods().then((goodCollection)=>{

			let goodData = {
				
				_id: ID,
				goods: goods,
				description:description,
				score:[],
				price:price,
				comments:[]
			};
			
			goodCollection.insertOne(goodData).then(() => {
                   
                     resolve(true);

                }).catch((Error)=>{
                	
                	reject(false);
                });

		});

		});

	},

	getAllGoods(){
	
		return Goods().then((goodsCollection)=>{
			
			return goodsCollection.find({}).toArray();
		});

	},

	getGoodsById(id) {
        return Goods().then((goodsCollection) => {

            return goodsCollection.findOne({ _id: id }).then((good) => {
                // if (!good) throw "User not found";
                return good;
            });
        });
    },

	 createCommentForGoods(id, poster, comment) {
        return this.getGoodsById(id).then((currentGood) => {

            let commentData = {

                poster: poster,
                comment: comment
            };

            return userCollection.updateOne({ _id: id }, commentData).then(() => {
                return this.getGoodsById(id);
            });
        });
    }

}

module.exports = exportedMethods;