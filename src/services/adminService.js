const { APIError } = require('../utils/error.js');
const { ObjectId } = require('mongodb');
const { Store, Category, Address } = require('../models');

// 팝업 스토어 등록
exports.createStore = async (files, storeInfo) => {
  try {
    console.log(storeInfo);
    let imagesInfo = [];
    const categoryName = storeInfo.category === 'popup' ? '팝업' : '전시';
    const categoryId = await Category.findOne({ name: categoryName });

    files.map((file, index) => {
      let isMain = false;

      if (index === storeInfo.mainImageNumber) {
        isMain = true;
      }
      imagesInfo.push({ url: file.path, isMain });
    });

    const addressData = await Address.create({
      zipCode: storeInfo.zipCode,
      detail1: storeInfo.detail1,
      detail2: storeInfo.detail2,
    });

    console.log(addressData._id);

    const newStore = await Store.create({
      title: storeInfo.name,
      brandName: storeInfo.brandName,
      categoryId: categoryId._id,
      address: addressData._id,
      images: imagesInfo,
      startDate: storeInfo.startDate,
      endDate: storeInfo.endDate,
      isActive: true,
      views: 0,
      likes: 0,
      adultVerification: storeInfo.adultVerification,
      fee: storeInfo.fee,
      event: storeInfo.event,
      socialLink: storeInfo.socialLink,
      desc: storeInfo.desc,
      etc: storeInfo.etc,
    });

    // console.log('zz', storeInfo);
    console.log(newStore);
    return newStore;
  } catch (e) {
    throw new Error(e);
  }
};
