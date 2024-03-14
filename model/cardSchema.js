const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema(
    {
        userid: String,
        themeid: String,
        profileImg: String,
        coverPhotoImg: String,
        logoImg: String,
        firstname: String,
        lastname: String,
        jobtitle: String,
        bname: String,
        baddress: String,
        bdesc: String,
        primaryaction: {
            mobile: String,
            office: String,
            email: String,
            website: String,
            location: String,
            whatsapp: String,
            skype: String,
            telegram: String,
            messenger: String,
            line: String,
            viber: String,
            wechat: String,
            store: String,
        },
        secondaryaction: {
            facebook: String,
            github: String,
            instagram: String,
            linkedin: String,
        },
        sections: [
            {
                _id: String,
                sectionName: String,
                subSections: [
                    {
                        _id: String,
                        image: String,
                        heading: String,
                    },
                ],
            },
        ],
    }
);

const card = mongoose.model("cardSchema", cardSchema);

module.exports = card;

// const mongoose = require('mongoose');

// const cardSchema = new mongoose.Schema(
//     {
//         userid: String,
//         themeid: String,
//         profileImg: String,
//         coverPhotoImg: String,
//         logoImg: String,
//         firstname: String,
//         lastname: String,
//         jobtitle: String,
//         bname: String,
//         baddress: String,
//         bdesc: String,
//         primaryaction: {
//             type: {
//                 mobile: Number,
//                 office: Number,
//                 email: String,
//                 website: String,
//                 location: String,
//                 whatsapp: Number,
//                 skype: String,
//                 telegram: String,
//                 messenger: String,
//                 line: String,
//                 viber: String,
//                 wechat: String,
//                 store: String,
//             },
//             required: true, // This ensures that primary action is required
//         },
//         secondaryaction: {
//             type: {
//                 facebook: String,
//                 github: String,
//                 instagram: String,
//                 linkedin: String,
//             },
//             required: true, // This ensures that secondary action is required
//         },
//         sections: [
//             {
//                 _id: String,
//                 sectionName: String,
//                 subSections: [
//                     {
//                         _id: String,
//                         image: String,
//                         heading: String,
//                     },
//                 ],
//             },
//         ],
//     }
// );

// const Card = mongoose.model("Card", cardSchema); // Changed model name to uppercase convention

// module.exports = Card;
