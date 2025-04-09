const app = require('./src/app');
const config = require('./src/config');

const PORT = config.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});