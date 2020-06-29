import app from './src/app'

const port = process.env.PORT || 5000;
app.listen(5000, () => console.log(`Server running on port ${port}`));