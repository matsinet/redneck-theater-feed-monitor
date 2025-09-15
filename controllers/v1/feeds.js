import { Router } from "express";
import { Feed, Media} from "../../models/index.js";
import feed from "feed-read";

const router = Router();

router.post("/", async (request, response) => {
  try {
    const newRecord = new Feed(request.body);

    const data = await newRecord.save();

    response.status(201).json(data);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return response.status(400).json({
        error: "Validation failed",
        details: error.message
      });
    }

    response.status(500).json({
      error: "Internal server error",
      message: error.message
    });
  }
});

router.get("/", async (request, response) => {
  try {
    let feeds = await Feed.find({});

    response.json(feeds);
  } catch (error) {
    response.status(500).json({
      error: "Internal server error",
      message: error.message
    });
  }
});

router.get("/:id", async (request, response) => {
  try {
    let feeds = await Feed.findById(request.params.id);
    response.json(feeds);
  } catch (error) {
    response.status(500).json({
      error: "Internal server error",
      message: error.message
    });
  }
});

router.post("/:id/media", async (request, response) => {
  const document = await Feed.findById(request.params.id);

  feed(document.url, (error, articles) => {
    if (error) throw error;

    articles.forEach(async article => {
      const query = { title: article.title };
      const update = article;
      const options = { upsert: true, new: true, setDefaultsOnInsert: true };

      await Media.findOneAndUpdate( query, update, options );
    });
    response.json({ articles: articles.length })
  });
});

router.post("/media", async (request, response) => {
  const feeds = await Feed.find({});
  let count = 0;

  const promises = feeds.map(document => {
    return new Promise((resolve, reject) => {
      feed(document.url, async (error, articles) => {
        if (error) return reject(error);

        const updates = articles.map(async article => {
          const query = { title: article.title };
          const update = article;
          const options = { upsert: true, new: true, setDefaultsOnInsert: true };
          return Media.findOneAndUpdate(query, update, options);
        });

        await Promise.all(updates);
        count += articles.length;
        resolve();
      });
    });
  });

  await Promise.all(promises);
  console.info('count', count);
  response.json({ articles: count });
});

router.delete("/:id", async (request, response) => {
  try {
    const data = await Feed.findByIdAndDelete(request.params.id);

    if (!data) response.status(404).json({ error: "Feed not found" });

    response.json();
  } catch (error) {
    response.status(500).json({
      error: "Internal server error",
      message: error.message
    });
  }
});

export default router;
