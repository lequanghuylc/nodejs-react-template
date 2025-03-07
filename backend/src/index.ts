import express from 'express';
import "dotenv/config";
import DB from 'db/DB.Postgres';
import cors from 'cors';

DB.init();
const app = express();

const port = process.env.PORT || 3000;
app.use(cors());
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

DB.onReady().then(() => {
  console.log('DB is ready');
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/count', async (req, res) => {
  let count = await DB.GeneralData.findOne();
  if (!count) {
    count = await DB.GeneralData.create({
      id: 'count',
      userId: 'SYSTEM',
      type: 'count',
      name: 'count',
      data: 0,
    });
    res.send({ success: true, data: 0 });
  } else {
    res.send({ success: true, data: +count.data });
  }
});

app.post('/api/increase', async (req, res) => {
  const count = await DB.GeneralData.findOne();
  if (!count) {
    res.send({ success: false, message: 'Count not found' });
  } else {
    count.data = (+count.data || 0) + 1;
    await count.save();
    res.send({ success: true, data: count.data });
  }
});

app.post('/api/decrease', async (req, res) => {
  const count = await DB.GeneralData.findOne();
  if (!count) {
    res.send({ success: false, message: 'Count not found' });
  } else {
    count.data = (+count.data || 0) - 1;
    if (count.data < 0) {
      count.data = 0;
    }
    await count.save();
    res.send({ success: true, data: count.data });
  }
});

app.post('/reset', async (req, res) => {
  const count = await DB.GeneralData.findOne();
  if (!count) {
    res.send({ success: false, message: 'Count not found' });
  } else {
    count.data = 0;
    await count.save();
    res.send({ success: true, data: 0 });
  }
});