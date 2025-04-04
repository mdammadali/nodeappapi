import app from "./app.js";
import connectDB from "./config/database.js";
import config from "./config/index.js";


connectDB()
    .then(() => {
        const server = app.listen(config.port, () => {
            console.log(`Server running on port ${config.port}`);
        });
        process.on('unhandledRejection', (err) => {
            console.error('UNHANDLED REJECTION! 💥 Shutting down...');
            console.error(err.name, err.message);
            console.error(err);
            server.close(() => {
                process.exit(1);
            });
        });

    })
    .catch((err) => {
        console.error("Failed to connect to Database. Server not started.", err);
        process.exit(1);
    });


process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.error(err.name, err.message);
    console.error(err);
    process.exit(1);
});