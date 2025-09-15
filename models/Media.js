import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String
    },
    published: {
      type: Date
    },
    author: {
      type: String
    },
    link: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Media = mongoose.model("Media", mediaSchema);

export default Media;

/*
  {
    "title": "I See You 2019 720p TUBI WEB-DL AAC 2 0 H 264-PiRaTeS",
    "content": "932 MB; Movie/Xvid",
    "published": "2025-09-15T02:34:38.000Z",
    "author": "",
    "link": "https://iptorrents.com/download.php/6890363/I See You 2019 720p TUBI WEB-DL AAC 2 0 H 264-PiRaTeS.torrent?torrent_pass=0ec46089c732961a0468cd12720d9cc7",
    "feed": {
      "source": "https://iptorrents.com/t.rss?u=613549;tp=0ec46089c732961a0468cd12720d9cc7;7;62;4;66;64;download",
      "link": "https://iptorrents.com",
      "name": "IPT"
    }
  }
*/
