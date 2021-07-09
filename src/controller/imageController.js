const db = require('../database/models');
const sequelize = db.sequelize;
const {Image} = require('../database/models');

let imageController = {

    bulkCreate: async (productId, images) => {
        
        images.forEach(image => image.product_id = productId);

        console.log(images);
        console.log('------------------------------');

        return await db.Image.bulkCreate(images);

    },
    detail: async (productId) => {
        let imagenes = await Image.findAll(
            {
                where: {product_id: productId}
            },
            {
                order: [['id', 'ASC']]
            }
            );

        return imagenes;
    },
    update: async (imageId, imageName) => {
        let image = await Image.update({
            name: imageName
            
        },{
            where: {id: imageId}
        });

        return image;
    },
    bulkEdit: async (productId, images) => {
        let imagesCh=[];
        let numImg = 0;
        let imagesOld = await imageController.detail(productId);

        images.forEach(image => {
            numImg = image.image_num - 1;
            // console.log("num:" + numImg + " id:" + imagesOld[numImg].id + " name:" + image.image_name);
            imagesCh.push(imageController.update(imagesOld[numImg].id, image.name));
        });

        return imagesCh;
    }

}


module.exports = imageController;