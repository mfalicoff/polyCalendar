import SemesterRoute from '@routes/semester.route';

process.env['NODE_CONFIG_DIR'] = __dirname + '/config';

require('dotenv').config();
import App from '@app';
import AuthRoute from '@routes/auth.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new UsersRoute(), new AuthRoute(), new SemesterRoute()]);

app.listen();
