import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import clientRoutes from "./routes/client.js";
import userRoutes from "./routes/user.js";
import bdmWorksRoutes from "./routes/bdmWorks.js";
import developmentWorksRoutes from "./routes/developmentWorks.js";
import projectRoutes from "./routes/project.js";
import financeDetailsRoutes from './routes/financeDetails.js';
import leavesRoutes from './routes/leaves.js';
import videoEditorRoutes from './routes/videoEditor.js';
import socialMediaManagerRoutes from './routes/socialMediaManager.js';
import contentWriterRoutes from './routes/contentWriter.js';

/* CONFIGURATION */

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/client", clientRoutes);
app.use("/user", userRoutes);
app.use("/bdmworks", bdmWorksRoutes);
app.use("/developmentworks", developmentWorksRoutes);
app.use("/videoeditor", videoEditorRoutes);
app.use("/socialmediamanager", socialMediaManagerRoutes);
app.use("/contentwriter", contentWriterRoutes);
app.use("/financeDetails", financeDetailsRoutes);
app.use("/project", projectRoutes);
app.use("/leaves", leavesRoutes);

/* MONGOOSE SETUP */

const PORT = process.env.PORT || 9000;

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        app.listen(PORT, () => console.log(`ServerPort: ${PORT}`));
    })
    .catch((error) => console.log(`${error} did not connect`));
