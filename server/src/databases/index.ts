export const dbConnection = {
    url: process.env.MONGODB_URI,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    },
};
